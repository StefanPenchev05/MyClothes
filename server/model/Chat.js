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
    },
    reacted: {
        type: String,
        default: ''
    },
    seen: {
        type: Boolean,
        default: false
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
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    },
});

ConversationSchema.post('findOneAndDelete', async function(doc, next) {
    if (doc) {
        console.log(doc);
        const users = doc.users;
        await User.updateMany(
            { _id: { $in: users } },
            { $pull: { conversations: doc._id } }
        );

        // Extract message IDs from doc.messages
        const messageIds = doc.messages.map(message => message._id);

        await Message.deleteMany({ _id: { $in: messageIds } });
    }
    next();
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = { Message, Conversation };