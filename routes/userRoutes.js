var express = require('express')
var router = express.Router()
const UserController = require('../controllers/userController');
const { authUser } = require('../authmiddleware/auth')

router.route('/login').get( UserController.Login);
router.route('/verify').post(UserController.verifyUser);

router.route('/get-tasks').get(authUser, UserController.getTask);
router.route('/create-task').post(authUser, UserController.createTask);
router.route('/update-task').put(authUser, UserController.updateTask);
router.route('/delete-task').delete(authUser, UserController.deleteTask);

module.exports = router;
