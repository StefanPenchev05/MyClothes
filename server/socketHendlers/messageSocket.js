const { Conversation } = require('../model/Chat');
const { generateToken, resolveToken } = require('../utils/tokenUserIdUtils');

module.exports = function (io) {
    let userID;
    io.use((socket, next) => {
        if (!socket.request.session) {
            next(new Error('Not Authenticated'));
        } else {
            userID = resolveToken(socket.request.session.user);
            next();
        }
    });

    io.on('connection', (socket) => {
        socket.on('getChatList', async () => {
            try {
                const list = await Conversation.find({ users: userID });
                socket.emit('chatList', list);
            } catch (error) {
                console.error('Error getting chat list:', error);
            }
        });

        socket.on('newChat', async (sessionTokenID, cb) => {
            try {
                const sessionID = resolveToken(sessionTokenID);
                const newChat = new Conversation({
                    users: [userID, sessionID],
                    messages: []
                });
                await newChat.save();
                cb({ success: true, chatId: newChat._id });
            } catch (error) {
                console.error('Error creating new chat:', error);
                cb({ success: false });
            }
        });

        socket.on('disconnect', () => {
            console.log('messageNamespace disconnect');
        });
    });
}