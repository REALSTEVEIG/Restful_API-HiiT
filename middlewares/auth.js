const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { UnauthorizedAPIError } = require('../error')

const authMiddleware = async (req, res, next) => {
    try {
        const autHeader = req.headers.authorization

        if (!autHeader || !autHeader.startsWith("Bearer ")) {
            throw new UnauthorizedAPIError('No token present at this time')
        }

        const token = autHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        user = {username : decoded.user}

        next()
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.FORBIDDEN).json({error : error.message})
    }
}

module.exports = authMiddleware