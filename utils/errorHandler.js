/**
 * Title: Error handler
 * Description: Create a global error handler
 * Author: Hasibul Islam
 * Date: 08/09/2022
 */

const errorHandler = (error, req, res, next) => {
    res.status(503).json({
        error: true,
        title: error.name,
        message: error.message
    })
}

module.exports = errorHandler;