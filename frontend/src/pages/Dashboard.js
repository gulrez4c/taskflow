import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getBoards, createBoard, deleteBoard } from '../services/boardService';

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBoards = async () => {
    setLoading(true);
    const data = await getBoards();
    setBoards(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createBoard(title, description);
    setTitle('');
    setDescription('');
    setShowForm(false);
    fetchBoards();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this board and all its tasks?')) {
      await deleteBoard(id);
      fetchBoards();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>My Boards</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            + New Board
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="new-board-form">
            <input
              placeholder="Board title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        )}

        {loading ? (
          <p>Loading boards...</p>
        ) : boards.length === 0 ? (
          <p className="empty-state">No boards yet. Create your first one!</p>
        ) : (
          <div className="board-grid">
            {boards.map((board) => (
              <div key={board._id} className="board-card">
                <Link to={`/board/${board._id}`}>
                  <h3>{board.title}</h3>
                  <p>{board.description}</p>
                </Link>
                <button className="btn-icon-delete" onClick={() => handleDelete(board._id)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
