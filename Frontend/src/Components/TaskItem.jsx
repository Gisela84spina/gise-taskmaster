import React, { useState } from "react";

const TaskItem = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleSave = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
        }),
      });

      if (!res.ok) throw new Error("Error al editar tarea");

      const updatedTask = await res.json();
      onEdit(updatedTask); // Actualizamos en el estado global
      setIsEditing(false); // Salimos del modo edición
    } catch (error) {
      console.error("Error al guardar edición:", error);
    }
  };

  return (
    <li className="border rounded-lg p-3 shadow-sm bg-white">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
          <div className="space-x-2">
            <button onClick={handleSave} className="text-green-600 hover:underline">
              Guardar
            </button>
            <button onClick={() => setIsEditing(false)} className="text-gray-600 hover:underline">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            {task.description && <p>{task.description}</p>}
          </div>
          <div className="space-x-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:underline">
              Editar
            </button>
            <button onClick={() => onDelete(task.id)} className="text-red-600 hover:underline">
              Eliminar
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
