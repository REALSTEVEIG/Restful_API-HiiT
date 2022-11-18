const CustomError = require('./customerror')
const {StatusCodes} = require('http-status-codes')

class UnauthorizedAPIError extends CustomError {
    constructor (message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedAPIError