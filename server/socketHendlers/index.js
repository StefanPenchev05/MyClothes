 const messageSocket = require('./messageSocket');
 const { Conversation, Message } = require('../model/Chat');
 const User  = require('../model/User');
 const { generateToken, resolveToken } = require('../utils/tokenUserIdUtils');


module.exports = function (io) {
    const messageNamespace = io.of("/user/messages");

    messageNamespace.use(async(socket, next) => {
        if (!socket.request.session.user) {
            console.log('Not Authenticated'); 
            next(new Error('Not Authenticated'));
        } else {
            next();
        }
    });

    messageNamespace.on('connection', (socket) => {

        socket.on('joinRoom', async (data) => {
            try {
                socket.join(data);
                //get user id from token
                const userID = resolveToken(socket.request.session.user);
                //get user from db
                const user = await User.findById(userID);
                //get conversation from db
                const conversation = await Conversation.findById(data).populate('messages');

                //get all messages 
                const messages = conversation.messages.map(message => ({
                    message: message.message,
                    sender: {
                        id: message.sender._id,
                        firstName: message.sender.firstName,
                        lastName: message.sender.lastName,
                        avatar: message.sender.avatar ? message.sender.avatar : '',
                    }
                }));
                //emit messages to user
                console.log('joinRoom');
                socket.emit('get_messages', messages);
            } catch (err) {
                console.log(err);
            }
        });
        
        socket.on('send_message', async (data) => {
            try {
                //get user id from token
                const userID = resolveToken(socket.request.session.user);
                //get user from db
                const user = await User.findById(userID).populate('profileImages');
                //get conversation from db
                const conversation = await Conversation.findById(data.chat_id);
                //create new message
                const message = new Message({
                    sender: user._id,
                    message: data.message
                });
                //save message to db
                await message.save();
                //add message to conversation
                conversation.messages.push(message._id);
                //save conversation to db
                await conversation.save();
                //emit message to all users in conversation
                socket.to(data.chat_id).emit('new_message', {
                    message: data.message,
                    sender: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatar: user.avatar ? user.avatar : user.profileImages[0].url,
                    }
                });
            } catch (err) {
                console.log(err);
            }
        });
        
        socket.on('disconnect', () => {
            socket.removeAllListeners('disconnect');
            io.removeAllListeners('connection');
        });
    });
};