const { Conversation, Message } = require('../model/Chat');
const User  = require('../model/User');
const { generateToken, resolveToken } = require('../utils/tokenUserIdUtils');

module.exports = function (io) {
    // When a new client connects
    io.on('connection', (socket) => {

        // Listen for 'getChatList' event
        socket.on('getChatList', async (cb) => {
            try {
                // Find all conversations for the current user
                const list = await Conversation.find({ users: resolveToken(socket.request.session.user) }).populate('messages');

                // Map over the list to fetch user details and last message for each conversation
                const usersPromises = list.map(async(item) => {
                    let lastMessage;
                    if (item.messages.length > 0) {
                        lastMessage = item.messages[item.messages.length - 1];
                    }

                    // Fetch user details
                    const user = await User.findById(item.users[1]).populate('profileImages');

                    // Return user details and last message
                    return {
                        id: generateToken(user._id),
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatar: user.avatar ? user.avatar : user.profileImages[0].url,
                        lastMessage : lastMessage ? lastMessage.message : 'No messages yet',
                        time: lastMessage ? lastMessage.timestamp : null 
                    }
                });

                // Wait for all promises to resolve
                const users = await Promise.all(usersPromises);

                // Call the callback function with the result
                cb(users);
            } catch (error) {
                console.error('Error getting chat list:', error);
            }
        });

        // Listen for 'newChat' event
        socket.on('newChat', async (sessionTokenID, cb) => {
            try {
                // Resolve the session token ID
                const sessionID = resolveToken(sessionTokenID);

                // Create a new conversation
                const newChat = new Conversation({
                    users: [ resolveToken(socket.request.session.user) , sessionID],
                });

                // Save the new conversation
                await newChat.save();

                // Call the callback function with the result
                cb({ success: true, message: newChat.messages });

            } catch (error) {
                console.error('Error creating new chat:', error);
                cb({ success: false });
            }
        });

        // Listen for 'sendMessage' event
        socket.on('sendMessage', () => {
            // TODO: Implement sendMessage
        });

        // Listen for 'dispalayMessages' event
        socket.on('dispalayMessages', async (chatID, cb) => {
            try {
                // Find the conversation by ID
                const chat = await Conversation.findById(chatID);

                // Call the callback function with the result
                cb({ success: true, messages: chat.messages });
            } catch (error) {
                console.error('Error getting messages:', error);
                cb({ success: false });
            }
        });

        // When the client disconnects
        socket.on('disconnect', () => {
            console.log('messageNamespace disconnect');
        });
    });
}