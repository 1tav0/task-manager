const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-errors')
//old way without middleware
// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({tasks}) //we avoid using data here because in front end axios creates a data varaible for us
//     // res.status(200).json({tasks, amount: tasks.length})
//     // res.status(200).json({success: true, data: {tasks, nbHits: tasks.length}})
//     //res.status(200).json({status: "success", data: {tasks, nbHits: tasks.length}})
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// }
//new way with middleware
const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({tasks})
})
//old way
// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body)
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error })
//   }
// }
//new way
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task });
})

//old way
// const getTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOne({ _id: taskID });

//     if (!task) {
//       return res.status(404).json({msg: `No Task with id: ${taskID}`})
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// }
//new way
const getTask = asyncWrapper( async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

  if (!task) {
      // const error = new Error('Not Found');
      // error.status = 404;
      // return next(error);
      return next(createCustomError(`No Task with id: ${taskID}`,404))
      // return res.status(404).json({msg: `No Task with id: ${taskID}`})
    }
    res.status(200).json({ task });
})

// const deleteTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOneAndDelete({ _id: taskID });
//     if (!task) {
//       return res.status(404).json({msg: `No task with id: ${taskID}`})
//     }
//     res.status(200).json({ task });
//     // res.status(200).send();
//     // res.status(200).json({task: null, status: 'success'});
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// }
//new way
const deleteTask = asyncWrapper( async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      // return res.status(404).json({msg: `No task with id: ${taskID}`})
      return next(createCustomError(`No Task with id: ${taskID}`,404))
    }
    res.status(200).json({ task });
})

// const updateTasks = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;

//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true
//     });

//     if (!task) {
//       res.status(404).json({msg: `No task with id: ${taskID}` })
//     }

//     res.status(200).json({task});
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// }
//new way
const updateTasks = asyncWrapper( async (req, res, next) => {
    const { id: taskID } = req.params;
    
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      // res.status(404).json({msg: `No task with id: ${taskID}` })
      return next(createCustomError(`No Task with id: ${taskID}`,404))
    }

    res.status(200).json({task});
})


module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTasks,
  deleteTask
}