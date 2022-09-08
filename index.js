/**
 * Title: Server for Next Node Chat
 * Description: Breakdown server side here
 * Author: Hasibul Islam
 * Date: 08/09/2022
 */

// external imports
const express = require("express");
const cors = require("cors");

// internal imports
const userRouter = require("./routes/users.route");
const chatRouter = require("./routes/chats.route");
const errorHandler = require("./utils/errorHandler");

// app connection
const app = express();
const port = process.env.PORT || 5000;

// middleware connection
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/users", userRouter);
app.use("/chats", chatRouter);

// enable request
app.get("/", (req, res) => {
    console.log(req);
    res.status(200).sendFile(`${__dirname}/index.html`);
})

app.all("*", (req, res) => {
    res.status(404).json({
        status: 404,
        error: true,
        message: "Not Found!"
    })
})

app.use(errorHandler);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})