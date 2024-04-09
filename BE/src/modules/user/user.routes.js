const router = require('express').Router();
const {getUsers,createUser,login,logout} = require('./controller/user.controller');
const validationFunc = require("../middleware/validation");
const {logInValidation} = require("./user.validation");

router.route('/').get(getUsers);
router.route('/create').post(validationFunc(logInValidation),createUser);
router.route('/login').post(validationFunc(logInValidation),login);
router.route('/logout').post(logout);



module.exports = router;