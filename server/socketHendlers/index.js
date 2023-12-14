const messageSocket = require('./messageSocket')

module.exports = function (io) {
    const mainNamespace = io.of("/");
    const messageNamespace = io.of("/user/messages");

    mainNamespace.on('connection', (socket) => {
        console.log('mainNamespace connection');

        socket.on('disconnect', () => {
            console.log('mainNamespace disconnect');
        });
    });

    messageSocket(messageNamespace);

};