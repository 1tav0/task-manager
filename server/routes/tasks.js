const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTask,
  createTask,
  updateTasks,
  deleteTask
} = require('../controllers/tasks');

router
  .route('/')
  .get(getAllTasks)
  .post(createTask)

router
  .route('/:id')
  .get(getTask)
  .patch(updateTasks)
  .delete(deleteTask);

module.exports = router;