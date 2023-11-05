const express = require('express');
const CommentSchema = require('../models/comment');
const router = express.Router();

// Get all comments
router.get('/api/allComments/', async (req, res) => {
    const findComments = await CommentSchema.find()
    res.json(findComments)
})

// Get comments by questionTitle
router.get('/api/comments/:questionTitle', async (req, res) => {
    try {
        const findComments = await CommentSchema.find({ questionTitle: req.params.questionTitle });
        res.json(findComments);
    } catch (error) {
        res.status(500).json({ error: "There was an error", details: error.message });
    }
});

//Update comment by ID
router.patch('/api/updateComment/:id', async (req, res) => {
    try {
        const data = req.body;

        const updatedComment = await CommentSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    likes: data.likes
                }
            },
            { new: true } // Set new: true to return the updated document
        );

        if (!updatedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.json(updatedComment);
    } catch (error) {
        res.status(400).json({ error: "There is an error", details: error.message });
    }
});

// Create new Comment
router.post('/api/newComment/', async (req, res) => {
    try {
        const data = req.body;
        
        const newComment = new CommentSchema({
            questionTitle: data.questionTitle,
            name: data.name,
            comment: data.comment,
            likes: 0
        });

        const savedComment = await newComment.save();
        res.json(savedComment);
    } catch (error) {
        res.status(400).json({ error: "There is an error", details: error.message });
    }
})

// Delete comment by id
router.delete('/api/deleteComment/:id', async (req, res) => {
    try {
        const deletedComment = await CommentSchema.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json(deletedComment);
    } catch (error) {
        res.status(500).json({ error: "There was an error", details: error.message });
    }
});

// Delete comments by question title
router.delete('/api/deleteComments/:questionTitle', async (req, res) => {
    try {
        const deletedComments = await CommentSchema.deleteMany({ questionTitle: req.params.questionTitle });
        res.json(deletedComments);
    } catch (error) {
        res.status(500).json({ error: "There was an error", details: error.message });
    }
});


// Export the router
module.exports = router;