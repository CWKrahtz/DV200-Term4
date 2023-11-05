const express = require('express');
const router = express.Router(); // Use express.Router() to create a router instance
const { User } = require("../models/users");
const Joi = require('joi');
const bcrypt = require('bcrypt');

// Create a new user
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Read all users
router.get("/api/users/", async (req, res) => {
	const findUsers = await User.find();
	res.json(findUsers)
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};


module.exports = router;