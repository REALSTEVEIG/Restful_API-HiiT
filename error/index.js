const BadRequestAPIError = require('./badrequest')
const CustomError = require('./customerror')
const NotFoundAPIError = require('./notfound')
const UnauthorizedAPIError = require('./unauthourized')

module.exports = {
    BadRequestAPIError,
    CustomError,
    NotFoundAPIError,
    UnauthorizedAPIError
}