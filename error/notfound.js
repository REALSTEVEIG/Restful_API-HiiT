const CustomError = require('./customerror')
const {StatusCodes} = require('http-status-codes')

class NotFoundAPIError extends CustomError {
    constructor (message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundAPIError