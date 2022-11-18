const {StatusCodes} = require('http-status-codes')
const Customer = require('../models/customers')

exports.register = async (req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body

        if (!(username || email || password || confirmPassword)) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg : 'Please provide all the required parameteres'})
        }
        
        const user = await Customer.findOne({email})

        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg : `${req.body.email} already exists`})
        }

        const newUser = await Customer.create({...req.body})

        const token = newUser.createJWT()

        return res.status(StatusCodes.CREATED).json({newUser, token})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
    }
}

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : 'Please provide all the information'})
    }

    const user = await Customer.findOne({email})

    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : 'Email does not exist'})
    }

    const suppliedPassword = await user.comparePassword(password)

    if (!suppliedPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : 'Password is incorrect'})
    }

    const token = await user.createJWT()

    return res.status(StatusCodes.OK).json({user, token})

  } catch (error) {
    console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
  }
}