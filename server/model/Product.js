const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    sizes: [{
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    }],
    category: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Kids']
    },
    type: {
        type: String,
        required: true,
        enum: ['Shirts', 'Pants', 'Dresses', 'Shoes', 'Accessories']
    },
    image: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    sold: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designer',
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    ratings: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productScheme);