import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from '../components/Navbar';
import Column from '../components/Column';
import TaskModal from '../components/TaskModal';
import { getBoardById } from '../services/boardService';
import { createTask, updateTask, deleteTask, reorderTasks } from '../services/taskService';

const BoardPage = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);

  const fetchBoard = useCallback(async () => {
    const data = await getBoardById(id);
    setBoard(data.board);
    setTasks(data.tasks);
  }, [id]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  const tasksByColumn = (columnId) =>
    tasks.filter((t) => t.columnId === columnId).sort((a, b) => a.order - b.order);

  const handleAddTask = (columnId) => {
    setActiveTask(null);
    setActiveColumn(columnId);
    setModalOpen(true);
  };

  const handleTaskClick = (task) => {
    setActiveTask(task);
    setActiveColumn(task.columnId);
    setModalOpen(true);
  };

  const handleSaveTask = async (formData) => {
    if (activeTask && activeTask._id) {
      const updated = await updateTask(activeTask._id, formData);
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } else {
      const created = await createTask({ ...formData, board: id, columnId: activeColumn });
      setTasks((prev) => [...prev, created]);
    }
    setModalOpen(false);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    setModalOpen(false);
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const updatedTasks = [...tasks];
    const movedTaskIndex = updatedTasks.findIndex((t) => t._id === draggableId);
    updatedTasks[movedTaskIndex] = {
      ...updatedTasks[movedTaskIndex],
      columnId: destination.droppableId,
      order: destination.index,
    };
    setTasks(updatedTasks);

    await reorderTasks([
      { id: draggableId, columnId: destination.droppableId, order: destination.index },
    ]);
  };

  if (!board) return <p>Loading board...</p>;

  return (
    <div>
      <Navbar />
      <div className="board-page">
        <h1>{board.title}</h1>
        <p className="board-description">{board.description}</p>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="board-columns">
            {board.columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasksByColumn(column.id)}
                onAddTask={handleAddTask}
                onTaskClick={handleTaskClick}
              />
            ))}
          </div>
        </DragDropContext>

        {modalOpen && (
          <TaskModal
            task={activeTask}
            onClose={() => setModalOpen(false)}
            onSave={handleSaveTask}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
};

export default BoardPage;
