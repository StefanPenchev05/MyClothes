const { Conversation, Message } = require('../model/Chat');
const User  = require('../model/User');
const { generateToken, resolveToken } = require('../utils/tokenUserIdUtils');

module.exports = function (io) {
    io.setMaxListeners(2);
    //When a new client connects
    io.on('connection', async(socket) => {
        console.log('New client connected for messages ' + socket.id);

        //get messages for conversation
        socket.on('get_messages', async (data) => {
            try {
                //get user id from token
                const userID = resolveToken(data.token);
                //get user from db
                const user = await User.findById(userID);
                //get conversation from db
                const conversation = await Conversation.findById(data.conversationID);
                //emit messages to user
                io.to(socket.id).emit('messages', {
                    messages: conversation.messages,
                    username: user.username
                });
            } catch (err) {
                console.log(err);
            }
        });

        //message sent by user
        socket.on('send_message', async (data) => {
            try {
                //get user id from token
                const userID = resolveToken(data.token);
                //get user from db
                const user = await User.findById(userID);
                //get conversation from db
                const conversation = await Conversation.findById(data.conversationID);
                //create new message
                const message = new Message({
                    sender: user._id,
                    text: data.message
                });
                //save message to db
                await message.save();
                //add message to conversation
                conversation.messages.push(message._id);
                //save conversation to db
                await conversation.save();
                //emit message to all users in conversation
                io.to(data.conversationID).emit('new_message', {
                    message: data.message,
                    sender: user.username
                });
            } catch (err) {
                console.log(err);
            }
        });

        // When the client disconnects
        socket.on('disconnect', function () {
            socket.removeAllListeners('disconnect');
            io.removeAllListeners('connection');
        });
    });
}