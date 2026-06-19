const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createTask,
  getTasksByBoard,
  updateTask,
  reorderTasks,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.use(protect);

router.post('/', createTask);
router.get('/board/:boardId', getTasksByBoard);
router.put('/reorder', reorderTasks);
router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
