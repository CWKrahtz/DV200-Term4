const express = require('express')
const router = express()
const { User, validate } = require('../models/users')
const bcrypt = require("bcrypt")
const multer = require('multer')
const path = require('path')

// Multer Middleware Prep
const userImgStore = multer.diskStorage({
    destination: ( req, file, callBack ) => {
        callBack(null, './userImages');
    },

    filename: ( req, file, callBack) => {
        console.log(file)
        callBack(null, Date.now() + path.extname(file.originalname));
    }
});

//Run Middleware
const uploadUserImage = multer({storage: userImgStore});

// update user profile image
router.put('/api/users/profilePic/:email', uploadUserImage.single('image'), async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        user.profilePic = req.file.filename;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error: ", details: error.message });
    }
});

// idk what this does but im afraid to remove it
router.post("/api/users", uploadUserImage.single('image'), async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(409)
            .send({ message: "User with given email already exist." })
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await new User({ ...req.body, password: hashPassword }).save()
        res.status(201).send({ message: "User Created succefully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

// read all users
router.get('/api/users/', async (req, res) => {
    try {
        const findUsers = await User.find();
        res.json(findUsers);
    } catch (error) {
        res.status(500).json({ error: "Error: ", details: error.message });
    }
})

// find user by email
router.get('/api/singleUser/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error: ", details: error.message });
    }

})

// update users profile pic by email
router.put('/api/updateUserImg/:email', async(req, res) => {
    console.log(req.body)

    const findUser = await User.updateOne(
        { email: req.params.email }, 
        {$set: {
           profilePic: req.body.profilePic
        }}
    )
    res.json(findUser)
})


// delete user by email
router.delete('/api/deleteUser/:email', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.params.email });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Error: ", details: error.message });
    }
});


// update user by email
router.put('/api/updateUser/:email', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ email: req.params.email }, req.body, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error: ", details: error.message });
    }
});

//End
module.exports = router