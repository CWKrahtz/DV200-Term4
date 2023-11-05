const express = require('express');
const QuestionSchema = require('../models/question');
const router = express.Router();
const multer = require('multer')
const path = require('path')

// Multer Middleware Prep
const questionImgStore = multer.diskStorage({
    destination: ( req, file, callBack ) => {
        callBack(null, './questionImages');
    },

    filename: ( req, file, callBack) => {
        console.log(file)
        callBack(null, Date.now() + path.extname(file.originalname));
    }
});

//Run Middleware
const uploadQuestionImage = multer({storage: questionImgStore});

// Create new Question
router.post('/api/newQuestion', uploadQuestionImage.single("image"), async (req, res) => {

    try {
        let data = JSON.parse(req.body.information);
        console.log(req.body.filename);

        const newQuestion = new QuestionSchema({
            name: data.name,
            title: data.title,
            question: data.question,
            image: req.file.filename,
            tags: {
                tagOne: data.tags.tagOne,
                tagTwo: data.tags.tagTwo,
                tagThree: data.tags.tagThree
            },
            votes: {
                total: 0, // Initialize total votes to 0
                likes: 0,
                dislikes: 0
            }
        });

        const savedQuestion = await newQuestion.save();
        res.json(savedQuestion);
    } catch (error) {
        res.status(400).json({ error: "There is an error", details: error.message });
    }

});



// Get Questions
router.get('/api/allQuestions', async (req, res) => {
    try {
        let findQuestions;
        if (req.query.tag) {
            findQuestions = await QuestionSchema.find({
                $or: [
                    { 'tags.tagOne': req.query.tag },
                    { 'tags.tagTwo': req.query.tag },
                    { 'tags.tagThree': req.query.tag }
                ]
            });
        } else {
            findQuestions = await QuestionSchema.find();
        }
        res.json(findQuestions);
    } catch (error) {
        res.status(500).json({ error: "There was an error", details: error.message });
    }
});

// Single Question by ID
router.get('/api/singleQuestion/:id', async (req, res) => {
    try {
        const question = await QuestionSchema.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ error: "There was an error", details: error.message });
    }
});

//Update Question
router.patch('/api/updateQuestion/:id', async (req, res) => {
    try {
        const data = req.body;

        // Calculate Total Votes
        const totalLikes = Number(data.votes.likes);
        const totalDisikes = Number(data.votes.dislikes);

        const totalVotes = totalLikes + totalDisikes;

        const updatedQuestion = await QuestionSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: data.name,
                    title: data.title,
                    question: data.question,
                    tags: {
                        tagOne: data.tags.tagOne,
                        tagTwo: data.tags.tagTwo,
                        tagThree: data.tags.tagThree
                    },
                    votes: {
                        total: totalVotes,
                        likes: totalLikes,
                        dislikes: totalDisikes
                    }
                }
            },
            { new: true } // Set new: true to return the updated document
        );

        if (!updatedQuestion) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ error: "There is an error", details: error.message });
    }
});

//Update Votes


// Get questions by name
router.get('/api/namedQuestions/:name', async (req, res) => {
    try {
        const questions = await QuestionSchema.find({ name: req.params.name });
        if (questions.length === 0) {
            // return res.status(404).json({ error: "Name not found" });
        }
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: "There was an error", details: error.message });
    }
});

// Delete Question
router.delete('/api/deleteQuestion/:id', async (req, res) => {
    try {
        const deletedQuestion = await QuestionSchema.findByIdAndDelete(req.params.id);
        res.json(deletedQuestion);
    } catch (error) {
        res.status(404).json({ error: "Question not found", details: error.message });
    }
});

// Export the router
module.exports = router;
