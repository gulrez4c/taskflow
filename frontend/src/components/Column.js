import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, onAddTask, onTaskClick }) => {
  return (
    <div className="board-column">
      <div className="column-header">
        <h3>{column.title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`column-body ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} onClick={onTaskClick} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button className="add-task-btn" onClick={() => onAddTask(column.id)}>
        + Add task
      </button>
    </div>
  );
};

export default Column;
