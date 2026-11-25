const mongoose = require('mongoose');
const _ = require('underscore');

const setContent = (content) => _.escape(content).trim();

const DomoSchema = new mongoose.Schema({
    content: { // name --> content
        type: String,
        required: true,
        trim: true,
        set: setContent,
    },
    authorId: { // owner --> authorId
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
    // isAd
    // isPrivate
    // createdDate - "X ago" feature
});

// what we need to send to client
DomoSchema.statics.toAPI = (doc) => ({
    content: doc.content,
    // age: doc.age,
    // level: doc.level
});

const DomoModel = mongoose.model('Domo', DomoSchema);

module.exports = DomoModel;