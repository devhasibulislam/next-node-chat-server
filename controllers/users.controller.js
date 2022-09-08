// external import
const fs = require("fs");

// global variable
const path = `${__dirname}/../public/users.json`;

// get parsed data from stringified data
function getParsedUserData() {
    const userData = fs.readFileSync(path, {
        encoding: "utf-8",
        flag: "r"
    });
    const parsedData = JSON.parse(userData);

    return parsedData;
}

// check existing user email
function checkExistingUser(email) {
    const userData = getParsedUserData();
    const isFound = userData.length !== 0 && userData.every(dta => dta.email !== email);

    return isFound;
}

// get all users
module.exports.getUsers = (req, res) => {
    res.status(200).json({
        success: true,
        message: "OK",
        data: getParsedUserData()
    })
};

// insert a user
module.exports.postAUser = async (req, res, next) => {
    try {
        const body = req.body;
        const email = body.email;

        if (checkExistingUser(email)) {
            const userData = getParsedUserData();
            userData.push(body);
            const stringifiedUserData = JSON.stringify(userData);
            fs.writeFileSync(path, stringifiedUserData);

            res.status(201).json({
                success: true,
                message: "Created"
            })
        } else {
            res.status(409).json({
                success: false,
                message: "Conflict"
            })
        }
    } catch (error) {
        next(error);
    }
}

// logged in user
module.exports.loggedInUser = async (req, res, next) => {
    try {
        const body = req.body;
        const email = body.email;

        if (checkExistingUser(email)) {
            res.status(403).json({
                success: false,
                message: "Forbidden"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "OK"
            })
        }
    } catch (error) {
        next(error)
    }
}

// delete a user
module.exports.deleteAUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const parsedUserData = getParsedUserData();
        const elseDeletedUserData = parsedUserData.filter(dta => dta._id !== Number(id));
        const stringifiedUserData = JSON.stringify(elseDeletedUserData);

        fs.writeFileSync(path, stringifiedUserData);

        res.status(200).json({
            success: true,
            message: "OK"
        })
    } catch (error) {
        next(error)
    }
}