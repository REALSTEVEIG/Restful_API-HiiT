const express = require('express')
const router = express.Router()
const {register, login} = require('../controllers/cutomers')
const userValidate = require('../middlewares/userValidation')

router.route('/register').post(userValidate, register)
router.route('/login').post(login)

module.exports = router