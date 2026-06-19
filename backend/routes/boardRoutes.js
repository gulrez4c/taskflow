const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} = require('../controllers/boardController');

const router = express.Router();

router.use(protect);

router.route('/').post(createBoard).get(getBoards);
router.route('/:id').get(getBoardById).put(updateBoard).delete(deleteBoard);

module.exports = router;
