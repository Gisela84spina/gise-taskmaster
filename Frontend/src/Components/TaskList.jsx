import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <div >
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Mis Tareas</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas todavía.</p>
      ) : (
        <ul className="space-y-2 list-none ">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
