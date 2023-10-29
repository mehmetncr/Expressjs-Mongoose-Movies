const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart')

router.get('/',cartController.getCart);
router.get('/addCart/:id',cartController.getAddCart);
router.get('/payment',cartController.getPaymentCart);

module.exports = router;