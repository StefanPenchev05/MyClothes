const { Conversation, Message } = require("../model/Chat");
const User = require("../model/User");

let userSocketMap = new Map();
userSocketMap.clear();

module.exports = function (io) {
  const messageNamespace = io.of("/user/messages");

  messageNamespace.use(async (socket, next) => {
    if (!socket.request.session.user) {
      console.log("Not Authenticated");
      next(new Error("Not Authenticated"));
    } else {
      const userID = socket.request.session.user;
      const user = await User.findById(userID).populate("profileImages");

      if (userSocketMap.has(user._id.toString())) {
        const currentSocketId = userSocketMap.get(user._id.toString());
        if (currentSocketId !== socket.id) {
          // Remove the old socket ID from the map
          userSocketMap.delete(user._id.toString());

          // Set the new socket ID
          userSocketMap.set(user._id.toString(), socket.id);
        }
      } else {
        userSocketMap.set(user._id.toString(), socket.id);
      }

      socket.user = user;
      next();
    }
  });

  messageNamespace.on("connection", (socket) => {
    socket.on("get_chat_list", async () => {
      // Fetch all conversations for the current user and populate the messages for each conversation
      const list = await Conversation.find({ users: socket.user._id })
        .populate("messages")
        .sort({ lastUpdated: -1 })
        .exec();

      // Create a new Map to store user data
      const userMap = new Map();

      // Function to create a user object with specific fields
      const createUserObject = (user, userData) => ({
        id: user._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar || userData.profileImages[0]?.url,
        socket_id: userSocketMap.get(user._id.toString()) || null,
      });

      // Map over each conversation
      const dataList = list.map(async (chat) => {
        // Find the other user in the conversation
        const otherUser = chat.users.find(
          (user) => user._id.toString() !== socket.user._id.toString()
        );

        // If the other user's data is not in the userMap, fetch it and add it to the userMap
        if (!userMap.has(otherUser._id.toString())) {
          const userData = await User.findById(otherUser._id)
            .populate("profileImages")
            .populate("avatar");
          userMap.set(otherUser._id.toString(), userData);
        }

        // Get the other user's data from the userMap
        const otherUserData = userMap.get(otherUser._id.toString());

        // Create a user object for the other user
        const userObject = createUserObject(otherUser, otherUserData);

        // Create a chat object with the chat ID, the other user, the last message, and the timestamp of the last message
        const chatObject = {
          chat_id: chat._id,
          user: userObject,
          lastMessage: chat.messages.length
            ? chat.messages[chat.messages.length - 1].message
            : "No messages yet",
          timesnap: chat.messages.length
            ? chat.messages[chat.messages.length - 1].timestamp
            : "",
          totalMessages: chat.messages.length,
          seen: chat.messages.length
            ? chat.messages[chat.messages.length - 1].seen
            : true,
        };

        // Return the chat object
        return chatObject;
      });

      // Wait for all promises in the dataList array to resolve
      const finalDataList = await Promise.all(dataList);

      // Return the final data list
      return socket.emit("get_chat_list", finalDataList);
    });

    socket.on("created_chat", async (data) => {
      if (socket.user === undefined) {
        socket.user = await User.findById(
          userSocketMap.get(socket.request.session.user)
        ).populate("profileImages");
      }
      //get user from db
      const user = socket.user;

      socket.to(userSocketMap.get(data.otherUser_id)).emit("created_chat", {
        chat_id: data.chat_id,
        user_id: user._id,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar ? user.avatar : user.profileImages[0].url,
        },
        lastMessage: "No messages yet",
        timesnap: new Date(),
        seen: true,
      });
    });

    socket.on("joinRoom", async (data) => {
      try {
        const PAGE_SIZE = 15;
        const skip = (data.page - 1) * PAGE_SIZE;

        // Get conversation from db
        const conversation = await Conversation.findById(data.selectedChat)
          .populate({
            path: "messages",
            options: { sort: { timestamp: -1 }, skip, limit: PAGE_SIZE },
            populate: {
              path: "sender",
              model: "users",
              populate: {
                path: "profileImages",
                select: "url",
              },
            },
          })
          .populate({
            path: "users",
            model: "users",
            select: "firstName lastName avatar profileImages",
            populate: {
              path: "profileImages",
              select: "url",
            },
          });

        //add conversation to socket
        socket.conversation = conversation;
        //get other user cradenials
        const otherUser = conversation.users.find(
          (user) => user._id.toString() !== socket.user._id.toString()
        );
        //emit conversation to user
        socket.emit("get_conversation", {
          conversation_id: conversation._id,
          user: {
            id: otherUser._id,
            firstName: otherUser.firstName,
            lastName: otherUser.lastName,
            avatar: otherUser.avatar
              ? otherUser.avatar
              : otherUser.profileImages[0].url,
            socket_id: userSocketMap.get(otherUser._id.toString()) || null,
          },
          messages: conversation.messages.reverse().map((message) => ({
            conversation_id: conversation._id,
            message_id: message._id,
            message: message.message,
            sender: message.sender._id,
            timestamp: message.timestamp,
            reacted: "",
            seen: message.seen,
          })),
          page: data.page,
        });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("send_message", async (data) => {
      try {
        // make sure that the app will not crash by fiding the conversation again if needed
        if (socket.conversation === undefined) {
          socket.conversation = await Conversation.findById(data.selectedChat)
            .populate({
              path: "messages",
              populate: {
                path: "sender",
                model: "users",
                populate: {
                  path: "profileImages",
                  select: "url",
                },
              },
            })
            .populate({
              path: "users",
              model: "users",
              select: "firstName lastName avatar profileImages",
              populate: {
                path: "profileImages",
                select: "url",
              },
            });
        }

        if (socket.user === undefined) {
          socket.user = await User.findById(
            userSocketMap.get(socket.request.session.user)
          ).populate("profileImages");
        }
        //get user from db
        const user = socket.user;
        //create new message
        const message = new Message({
          sender: user._id,
          message: data.message,
        });
        //save message to db
        await message.save();
        //add message to conversation and update the last time updated
        await Conversation.updateOne(
          { _id: socket.conversation._id },
          {
            $push: { messages: message._id },
            $set: { lastUpdated: Date.now() },
          }
        );
        //emit message to all users in conversation
        socket
          .to(userSocketMap.get(data.otherUser_id.toString()))
          .emit("receive_message", {
            conversation_id: socket.conversation._id.toString(),
            message_id: message._id,
            sender: user._id,
            message: message.message,
            timestamp: message.timestamp,
            reacted: "",
            seen: false,
          });

        socket
          .to(userSocketMap.get(data.otherUser_id.toString()))
          .emit("notify", {
            conversation_id: socket.conversation._id.toString(),
            message: message.message,
            sender: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              avatar: user.avatar ? user.avatar : user.profileImages[0].url,
              socket_id: socket.id,
            },
          });

        socket.emit("sended_message", {
          conversation_id: socket.conversation._id.toString(),
          message_id: message._id,
          sender: user._id,
          message: message.message,
          timestamp: message.timestamp,
          reacted: "",
          seen: false,
        });
      } catch (err) {
        console.log(err);
      }
    });

    // Listen for 'message_seen' event
    socket.on("message_seen", async (data) => {
      try {
        // make sure that the app will not crash by fiding the conversation again if needed
        if (socket.conversation === undefined) {
          socket.conversation = await Conversation.findById(data.selectedChat)
            .populate({
              path: "messages",
              populate: {
                path: "sender",
                model: "users",
                populate: {
                  path: "profileImages",
                  select: "url",
                },
              },
            })
            .populate({
              path: "users",
              model: "users",
              select: "firstName lastName avatar profileImages",
              populate: {
                path: "profileImages",
                select: "url",
              },
            });
        }

        if (socket.user === undefined) {
          socket.user = await User.findById(
            userSocketMap.get(socket.request.session.user)
          ).populate("profileImages");
        }
        // Find the other user in the conversation
        const otherUser = socket.conversation.users.find(
          (user) => user._id.toString() !== socket.user._id.toString()
        );

        // update the message into the DataBase
        const updatedMessage = await Message.findByIdAndUpdate(
          data.lastMessage,
          {
            seen: true,
          }
        );
        if (updatedMessage) {
          // Emit 'seen_message' event to the other user
          socket
            .to(userSocketMap.get(otherUser._id.toString()))
            .emit("message_seen", {
              message_id: data.lastMessage,
            });
        }
      } catch (err) {
        // Log any errors
        console.log(err);
      }
    });

    socket.on("notify_deleted_chat", async (data) => {
      if (socket.user === undefined) {
        socket.user = await User.findById(
          userSocketMap.get(socket.request.session.user)
        ).populate("profileImages");
      }

      const user = socket.user;

      socket
        .to(userSocketMap.get(data.otherUser_id))
        .emit("notify_deleted_chat", {
          userName: user.firstName + " " + user.lastName,
          user_id: user._id,
        });
    });

    socket.on("leaveRoom", (data) => {
      socket.leave(data);
    });

    socket.on("disconnect", () => {
      socket.removeAllListeners("disconnect");
      io.removeAllListeners("connection");
    });
  });
};
