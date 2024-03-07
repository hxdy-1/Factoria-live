const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const { Users } = require("../db/db");
const authMiddleware = require("../middlewares/auth");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

const userBody = z.object({
	username: z.string(),
	password: z.string().min(6),
});

// Signup route:
router.post("/signup", async (req, res) => {
	const { username, password } = req.body;

	// Validating request body
	const { success } = userBody.safeParse(req.body);
	if (!success) {
		return res
			.status(400)
			.json({ message: "Invalid username or password" });
	}

	try {
		// Checking if the username already exists
		const userExists = await Users.findOne({ username });
		if (userExists) {
			return res.status(400).json({ message: "Username already taken" });
		}

		// Hashing the password
		const hashedPw = await hash(password, 12);

		// Creating a new user
		const newUser = await Users.create({ username, password: hashedPw });

		// Generating JWT token
		const token = jwt.sign({ userId: newUser._id, username }, JWT_SECRET);

		// Responding with success message and token
		res.status(201).json({
			message: "User created successfully",
			token,
			userId: newUser._id,
		});
	} catch (error) {
		console.error("Signup error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Login route:
router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	// Validating request body
	const { success } = userBody.safeParse(req.body);
	if (!success) {
		return res
			.status(400)
			.json({ message: "Incorrect username or password" });
	}

	try {
		// Finding the user by username
		const user = await Users.findOne({ username });
		if (!user) {
			return res
				.status(401)
				.json({ message: `User "${username}" does not exists` });
		}

		// Comparing passwords
		const isPasswordValid = await compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Incorrect credentials, double check, try again",
			});
		}

		// Generating JWT token
		const token = jwt.sign({ userId: user._id, username }, JWT_SECRET);

		// Responding with token
		res.json({ token, userId: user._id });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Route to get username:
router.get("/me", authMiddleware, async (req, res) => {
	try {
		const user = await Users.findOne({ _id: req.userId });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		// Assuming username is a field in the user document
		const username = user.username;
		res.status(200).json({ username });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
});

module.exports = router;
