const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    questionTitle: { type: String, required: true },
    name: { type: String, required: true },
    comment: { type: String, required: true },
    likes: { type: Number, required: false }
})

module.exports = mongoose.model("Comment", commentSchema)