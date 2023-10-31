const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')


router.get('/login',userController.getLoginUser);
router.get('/register',userController.getRegisterUser);

router.post('/login',userController.postLoginUser);
router.post('/register',userController.postRegisterUser);

router.get('/logout',userController.getLogoutUser);

module.exports = router;
