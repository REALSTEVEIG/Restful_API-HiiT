const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()

const {
    createProduct,
    getAllProduct,
    getSingleProduct, 
    updateProduct, 
    deleteProduct} = require('../controllers/products')

router.route('/product').post(authMiddleware, createProduct).get(getAllProduct)
router.route('/product/:id').get(getSingleProduct).patch(authMiddleware, updateProduct).delete(authMiddleware, deleteProduct)

module.exports = router
