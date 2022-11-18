const CustomError = require('./customerror')
const {StatusCodes} = require('http-status-codes')

class BadRequestAPIError extends CustomError {
    constructor (message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestAPIError