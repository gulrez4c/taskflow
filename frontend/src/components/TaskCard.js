import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const priorityColors = {
  low: '#38a169',
  medium: '#dd6b20',
  high: '#e53e3e',
};

const TaskCard = ({ task, index, onClick }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
          onClick={() => onClick(task)}
        >
          <div className="task-card-header">
            <span
              className="priority-dot"
              style={{ backgroundColor: priorityColors[task.priority] }}
              title={`${task.priority} priority`}
            />
            <h4>{task.title}</h4>
          </div>
          {task.description && <p className="task-description">{task.description}</p>}
          {task.dueDate && (
            <span className="task-due-date">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
          {task.labels && task.labels.length > 0 && (
            <div className="task-labels">
              {task.labels.map((label, i) => (
                <span key={i} className="label-chip">
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
