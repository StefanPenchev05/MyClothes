const { Conversation } = require('../model/Chat')
const User = require('../model/User')
const { generateToken } = require('../utils/tokenUserIdUtils')

module.exports = {
    getChatList: async (currentUserID) => {
        try {
            // Fetch all conversations for the current user and populate the messages for each conversation
            const list = await Conversation.find({ users: currentUserID }).populate('messages');

            // Create a new Map to store user data
            const userMap = new Map();

            // Function to create a user object with specific fields
            const createUserObject = (user, userData) => ({
                id: generateToken(user._id),
                firstName: userData.firstName,
                lastName: userData.lastName,
                avatar: userData.avatar || userData.profileImages[0]?.url,
            });

            // Map over each conversation
            const dataList = list.map(async chat => {
                // Find the other user in the conversation
                const otherUser = chat.users.find(user => user._id.toString() !== currentUserID);

                // If the other user's data is not in the userMap, fetch it and add it to the userMap
                if (!userMap.has(otherUser._id.toString())) {
                    const userData = await User.findById(otherUser._id).populate('profileImages');
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
                    lastMessage: chat.messages.length ? chat.messages[chat.messages.length - 1].message : 'No messages yet',
                    timesnap: chat.messages.length ? chat.messages[chat.messages.length - 1].timestamp : '',
                };

                // Return the chat object
                return chatObject;
            });

            // Wait for all promises in the dataList array to resolve
            const finalDataList = await Promise.all(dataList);

            // Return the final data list
            return finalDataList;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteChat: async(userID, chatID) => {
        try{
            // Attempt to find and delete the conversation with the given chatID and userID
            const result = await Conversation.findOneAndDelete({_id: chatID, users: userID});

            // If no conversation was found and deleted (result.n === 0), throw an error
            if(result.n === 0){
                throw new Error('Chat not found');
            }

            // If the conversation was successfully deleted, return true
            return true;
        }catch(err){
            // If an error occurred, log it to the console and re-throw it
            console.error(err);
            throw err;
        }
    },

    createNewChat: async(userID, personToChatID) => {
        try {
            // Check if a conversation between the users already exists
            const existingChat = await Conversation.findOne({
                users: { $all: [userID, personToChatID] }
            });

            if(existingChat){
                return {success: false, msg: 'Already existing Chat', data: existingChat};
            }

            // Create and save a new conversation
            const newConversation = await Conversation.create({
                users: [userID, personToChatID]
            });

            //update user conversations
            await User.findByIdAndUpdate(userID, { $push: { conversations: newConversation._id } });
            await User.findByIdAndUpdate(personToChatID, { $push: { conversations: newConversation._id } });

            // Return the new conversation
            return {
                chat_id: newConversation._id,
                lastMessage : 'No messages yet',
                timesnap: '',
            }

        } catch(err) {
            console.error(err);
            return {success: false, msg: 'An error occurred', error: err};
        }
    }
}