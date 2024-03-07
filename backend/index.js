const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server is listening on PORT", PORT);
});
