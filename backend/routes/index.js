const express = require("express");
const userRouter = require("./users");
const factsRouter = require("./facts");

const router = express.Router();

router.use("/user", userRouter);
router.use("/facts", factsRouter);

module.exports = router;
