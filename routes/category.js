const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category')

router.get('/',categoryController.GetCategory);
router.get('/addCategory',categoryController.GetAddCategory);
router.post('/addCategory',categoryController.postAddCategory);
router.get('/edit/:id',categoryController.GetEditCategory);
router.post('/edit',categoryController.postEditCategory);
router.get('/delete/:id',categoryController.getDeleteCategory);
module.exports = router;
