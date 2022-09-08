// external import
const fs = require("fs");

// global variable
const path = `${__dirname}/../public/chats.json`;

// get parsed data from stringified data
function getParsedUserData() {
    const userData = fs.readFileSync(path, {
        encoding: "utf-8",
        flag: "r"
    });
    const parsedData = JSON.parse(userData);

    return parsedData;
}

// post a message
module.exports.postAMessage = async (req, res, next) => {
    try {
        const body = req.body;
        const parsedChatData = getParsedUserData();
        parsedChatData.push(body);
        const stringifiedChatData = JSON.stringify(parsedChatData);

        fs.writeFileSync(path, stringifiedChatData);

        res.status(201).json({
            success: true,
            message: "Created"
        });
    } catch (error) {
        next(error);
    }
}

// get all message
module.exports.getAllMessage = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "OK",
            data: getParsedUserData()
        })
    } catch (error) {
        next(error);
    }
}

// delete a chat
module.exports.deleteAMessage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const parsedMessageData = getParsedUserData();
        const elseDeletedMessageData = parsedMessageData.filter(msg => msg._id !== Number(id));
        const stringifiedMessageData = JSON.stringify(elseDeletedMessageData);

        fs.writeFileSync(path, stringifiedMessageData);

        res.status(200).json({
            success: true,
            message: "OK"
        })
    } catch (error) {
        next(error)
    }
}