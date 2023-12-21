const messageSocket = require('./messageSocket');
const { resolveToken } = require('../utils/tokenUserIdUtils');


module.exports = function (io) {
    const mainNamespace = io.of("/");
    const messageNamespace = io.of("/user/messages");

    mainNamespace.use(async(socket, next) => {
        if (!socket.request.session.user) {
            console.log('Not Authenticated'); 
            next(new Error('Not Authenticated'));
        } else {
            next();
        }
    });

    mainNamespace.on('connection', (socket) => {
        messageSocket(messageNamespace);
        socket.on('disconnect', () => {
            console.log('mainNamespace disconnect');
        });
    });
};