const asyncHandler = require('express-async-handler');
const Board = require('../models/Board');
const Task = require('../models/Task');

const DEFAULT_COLUMNS = [
  { id: 'todo', title: 'To Do', order: 0 },
  { id: 'in-progress', title: 'In Progress', order: 1 },
  { id: 'done', title: 'Done', order: 2 },
];

// @desc    Create a new board
// @route   POST /api/boards
// @access  Private
const createBoard = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const board = await Board.create({
    title,
    description,
    owner: req.user._id,
    members: [req.user._id],
    columns: DEFAULT_COLUMNS,
  });

  res.status(201).json({ success: true, data: board });
});

// @desc    Get all boards for logged-in user
// @route   GET /api/boards
// @access  Private
const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find({ members: req.user._id }).sort('-createdAt');
  res.json({ success: true, count: boards.length, data: boards });
});

// @desc    Get single board by id (with its tasks)
// @route   GET /api/boards/:id
// @access  Private
const getBoardById = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  if (!board.members.some((m) => m.toString() === req.user._id.toString())) {
    res.status(403);
    throw new Error('Not authorized to access this board');
  }

  const tasks = await Task.find({ board: board._id }).sort('order');

  res.json({ success: true, data: { board, tasks } });
});

// @desc    Update board
// @route   PUT /api/boards/:id
// @access  Private
const updateBoard = asyncHandler(async (req, res) => {
  let board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  if (board.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Only the board owner can update this board');
  }

  board = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: board });
});

// @desc    Delete board
// @route   DELETE /api/boards/:id
// @access  Private
const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  if (board.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Only the board owner can delete this board');
  }

  await Task.deleteMany({ board: board._id });
  await board.deleteOne();

  res.json({ success: true, message: 'Board removed successfully' });
});

module.exports = { createBoard, getBoards, getBoardById, updateBoard, deleteBoard };
