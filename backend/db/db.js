const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL);

const UserSchema = mongoose.Schema({
	username: String,
	password: String,
});

const FactSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
	},
	text: String,
	source: String,
	category: String,
	votesInteresting: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
	votesMindblowing: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
	votesFalse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

const Users = mongoose.model("Users", UserSchema);
const Facts = mongoose.model("Facts", FactSchema);

module.exports = {
	Users,
	Facts,
};
