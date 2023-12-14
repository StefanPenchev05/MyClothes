const mongo = require('mongoose');
const Schema = mongo.Schema;
const Designer = require('./Designer.js');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "Don't want to state"],
        required: true
    },
    role: {
        type: String,
        enum: ['standardUser', 'designer', 'admin'],
        required: true,
        default: 'standardUser'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    designerInfo: {
        type: Schema.Types.ObjectId,
        ref: 'Designer'
    },
    address: [{
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }],
    phone: {
        type: String,
    },
    purchasedProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    avatar: {
        type: Schema.Types.ObjectId,
        ref: 'Avatar'
    },
    conversations: [{
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    }],
    profileImages: [{
        type: Schema.Types.ObjectId,
        ref: 'images'
    }],
    tokenResetPass: {
        type: mongo.Schema.Types.ObjectId,
        ref: "Token",
    }
}, {
    timestamps: true
});


const User = mongo.model('users', userSchema);
module.exports = User;
