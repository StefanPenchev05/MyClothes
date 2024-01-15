const { Conversation } = require('../model/Chat')
const User = require('../model/User')
const { generateToken } = require('../utils/tokenUserIdUtils')

module.exports = {
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