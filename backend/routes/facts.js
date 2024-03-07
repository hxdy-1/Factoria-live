const express = require("express");
const authMiddleware = require("../middlewares/auth");
const z = require("zod");
const { Facts } = require("../db/db");

const router = express.Router();

// Zod schemas for validating request bodies
const newFactBody = z.object({
	text: z.string(),
	source: z.string().url(),
	category: z.string(),
});

const updateFactBody = z.object({
	text: z.string(),
	source: z.string().url(),
});

// Route for creating new facts
router.post("/", authMiddleware, async (req, res) => {
	const { text, category, source } = req.body;

	// Validating request body
	const { success } = newFactBody.safeParse(req.body);
	if (!success) {
		return res.status(400).json({
			message: "Invalid input types, make sure to provide a URL",
		});
	}

	try {
		// Creating new fact
		const newFact = await Facts.create({
			userId: req.userId,
			text,
			category,
			source,
			votesMindblowing: [],
			votesFalse: [],
			votesInteresting: [],
		});

		// Respond with the newly created fact
		res.status(201).json(newFact);
	} catch (error) {
		console.log("Error creating fact:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Route for retrieving all facts
router.get("/", async (req, res) => {
	try {
		// Retrieving all facts
		const facts = await Facts.find();
		res.json(facts.reverse());
	} catch (error) {
		console.log("Error retrieving facts:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Route for retrieving all facts posted by a user
router.get("/my-facts", authMiddleware, async (req, res) => {
	try {
		// console.log(req);
		// console.log(req.userId);
		// Finding all facts posted by the authenticated user (using userId)
		const myFacts = await Facts.find({ userId: req.userId });
		// Responding with the facts
		res.json(myFacts?.reverse());
	} catch (error) {
		console.error("Error retrieving user's facts:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Route for retrieving a single fact
router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		// Retrieving a single fact
		const fact = await Facts.findById(id);
		res.json(fact);
	} catch (error) {
		console.log("Error retrieving fact:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Route for updating a fact
router.put("/:id", authMiddleware, async (req, res) => {
	const { id } = req.params;
	const { text, source } = req.body;

	// Validating request body
	const { success } = updateFactBody.safeParse(req.body);
	if (!success) {
		return res.status(400).json({
			message: "Invalid input types, make sure to provide a URL",
		});
	}

	try {
		// Finding and updating the fact by it's _id
		const updatedFact = await Facts.findByIdAndUpdate(
			id,
			{ text, source },
			{ new: true }
		);

		// Responding with the updated fact
		res.json(updatedFact);
	} catch (error) {
		console.error("Error updating fact:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Route for deleting a fact
router.delete("/:id", authMiddleware, async (req, res) => {
	const { id } = req.params;

	try {
		// Finding and deleting a fact by it's _id
		await Facts.findByIdAndDelete(id);
		res.json({ message: "Fact deleted successfully" });
	} catch (error) {
		console.error("Error deleting fact:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Route for voting on a fact
router.post("/:id/vote", authMiddleware, async (req, res) => {
	const { id } = req.params;
	const { type } = req.body;
	const userId = req.userId;

	try {
		// Finding the fact by ID
		const fact = await Facts.findById(id);

		if (!fact) {
			return res.status(404).json({ error: "Fact not found" });
		}

		// Checking if the user has already voted for this fact
		const hasVotedInteresting = fact.votesInteresting.includes(userId);
		const hasVotedMindblowing = fact.votesMindblowing.includes(userId);
		const hasVotedFalse = fact.votesFalse.includes(userId);

		// Declaring a variable to store the updated fact
		let updatedFact;

		// Removing the user's vote from the respective array if they are already voted for this type
		if (type === "interesting" && hasVotedInteresting) {
			updatedFact = await Facts.findByIdAndUpdate(
				id,
				{
					$pull: { votesInteresting: userId },
				},
				{ new: true }
			);

			// console.log("interesting removed: ", updatedFact);

			return res.json({
				message: "Interesting vote removed successfully",
				updatedFact,
				userId: null,
			});
		} else if (type === "mindblowing" && hasVotedMindblowing) {
			updatedFact = await Facts.findByIdAndUpdate(
				id,
				{
					$pull: { votesMindblowing: userId },
				},
				{ new: true }
			);

			// console.log("mind-blowing removed: ", updatedFact);

			return res.json({
				message: "Mind-blowing vote removed successfully",
				updatedFact,
				userId: null,
			});
		} else if (type === "false" && hasVotedFalse) {
			updatedFact = await Facts.findByIdAndUpdate(
				id,
				{
					$pull: { votesFalse: userId },
				},
				{ new: true }
			);

			// console.log("false removed: ", updatedFact);

			return res.json({
				message: "False vote removed successfully",
				updatedFact,
				userId: null,
			});
		}

		// Add the user's vote to the respective array based on the type
		switch (type) {
			case "interesting":
				// removing vote from all types except "interesting"
				await Facts.findByIdAndUpdate(id, {
					$pull: { votesMindblowing: userId },
				});
				await Facts.findByIdAndUpdate(id, {
					$pull: { votesFalse: userId },
				});

				updatedFact = await Facts.findByIdAndUpdate(
					id,
					{
						$addToSet: { votesInteresting: userId },
					},
					{ new: true }
				);

				// console.log("interesting added: ", updatedFact);

				break;
			case "mindblowing":
				// removing vote from all types except "mindblowing"
				await Facts.findByIdAndUpdate(id, {
					$pull: { votesInteresting: userId },
				});
				await Facts.findByIdAndUpdate(id, {
					$pull: { votesFalse: userId },
				});

				updatedFact = await Facts.findByIdAndUpdate(
					id,
					{
						$addToSet: { votesMindblowing: userId },
					},
					{ new: true }
				);

				// console.log("mind-blowing added: ", updatedFact);

				break;
			case "false":
				// removing vote from all types except "false"
				await Facts.findByIdAndUpdate(id, {
					$pull: { votesInteresting: userId },
				});
				await Facts.findByIdAndUpdate(id, {
					$pull: { votesMindblowing: userId },
				});

				updatedFact = await Facts.findByIdAndUpdate(
					id,
					{
						$addToSet: { votesFalse: userId },
					},
					{ new: true }
				);

				// console.log("false added: ", updatedFact);

				break;
			default:
				return res.status(400).json({ error: "Invalid vote type" });
		}

		// console.log("final shape: ", updatedFact);
		res.json({
			message: "Vote recorded successfully",
			updatedFact,
			userId,
		});
	} catch (error) {
		console.error("Error recording vote:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
