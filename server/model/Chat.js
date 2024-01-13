const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', MessageSchema);

const ConversationSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

ConversationSchema.post('findOneAndDelete', async function(doc, next) {
    if (doc) {
        console.log(doc);
        const users = doc.users;
        await User.updateMany(
            { _id: { $in: users } },
            { $pull: { conversations: doc._id } }
        );

        await Message.deleteMany({ _id: { $in: doc.messages } });
    }
    next();
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = { Message, Conversation };