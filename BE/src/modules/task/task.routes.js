const router = require('express').Router();
const {createTask, getTasks, getTask, deleteTask, markTaskAsCompleted, getTasksOfUser, deleteAllTasksOfUser} = require("./controller/task.controller")
const auth = require("../middleware/auth");
const validationFunction = require("../middleware/validation");
const {createTaskValidation} = require("./task.validation");

router.route('/').get(auth(),getTasksOfUser).post(auth(),validationFunction(createTaskValidation),createTask);
router.route('/:id').get(auth(),getTask).delete(auth(),deleteTask).patch(auth(),markTaskAsCompleted);
router.route('/admin/all').get(getTasks);

module.exports = router;