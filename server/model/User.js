const mongo = require('mongoose');
const Schema = mongo.Schema;
const bcrypt = require("bcrypt");

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

userSchema.pre('save', (next) => {
    const user = this;
    if (user.role === 'standardUser') {
        user.designerInfo = null;
    };
    console.log('here')
    next();
})

userSchema.pre('findOneAndUpdate', async function (next) {
    const user = this;
    if (user._update.password) {
        const bcrypt = require('bcryptjs');
        user._update.password = await bcrypt.hash(user._update.password, 8);
    }
    console.log('here')
    next();
});


const User = mongo.model('users', userSchema);
module.exports = User;
