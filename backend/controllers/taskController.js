const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const Board = require('../models/Board');

// @desc    Create a new task on a board
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, board, columnId, priority, dueDate, assignedTo, labels } = req.body;

  const boardDoc = await Board.findById(board);
  if (!boardDoc) {
    res.status(404);
    throw new Error('Board not found');
  }

  const taskCount = await Task.countDocuments({ board, columnId });

  const task = await Task.create({
    title,
    description,
    board,
    columnId,
    priority,
    dueDate,
    assignedTo,
    labels,
    createdBy: req.user._id,
    order: taskCount,
  });

  res.status(201).json({ success: true, data: task });
});

// @desc    Get all tasks for a board
// @route   GET /api/tasks/board/:boardId
// @access  Private
const getTasksByBoard = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ board: req.params.boardId }).sort('order');
  res.json({ success: true, count: tasks.length, data: tasks });
});

// @desc    Update a task (edit fields or move between columns)
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: task });
});

// @desc    Reorder/move multiple tasks at once (drag-and-drop support)
// @route   PUT /api/tasks/reorder
// @access  Private
const reorderTasks = asyncHandler(async (req, res) => {
  const { tasks } = req.body; // [{ id, columnId, order }, ...]

  const bulkOps = tasks.map((t) => ({
    updateOne: {
      filter: { _id: t.id },
      update: { columnId: t.columnId, order: t.order },
    },
  }));

  await Task.bulkWrite(bulkOps);

  res.json({ success: true, message: 'Tasks reordered successfully' });
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();

  res.json({ success: true, message: 'Task removed successfully' });
});

module.exports = { createTask, getTasksByBoard, updateTask, reorderTasks, deleteTask };
