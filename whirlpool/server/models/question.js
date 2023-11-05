const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    question: { type: String, required: true },
    image: { type: String, required: false },
    tags: {
        tagOne: { type: String, required: true },
        tagTwo: { type: String, required: false },
        tagThree: { type: String, required: false }
    },
    votes: {
        total: { type: Number, required: false },
        likes: { type: Number, required: false },
        dislikes: { type: Number,  required: false }
    }
})

module.exports = mongoose.model("Question", questionSchema)