const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    portfolio: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    skills: [String],
    rating: {
        type: Number,
        default: 0
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    socialLinks: {
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String
    },
    awards: [{
        title: String,
        year: Number
    }],
    education: [{
        school: String,
        degree: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number
    }],
    experience: [{
        jobTitle: String,
        company: String,
        startYear: Number,
        endYear: Number,
        jobDescription: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('designers', designerSchema);