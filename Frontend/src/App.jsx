import React, { useEffect, useState } from "react";
import TaskList from "./Components/TaskList";
import TaskForm from "./Components/TaskForm";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Traer tareas al iniciar
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al traer las tareas");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  // Agregar tarea
  const handleAdd = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  // Eliminar tarea
  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar tarea");
        setTasks((prev) => prev.filter((task) => task.id !== id));
      })
      .catch((err) => console.error("Error:", err));
  };

  // Editar tarea (ya editada desde TaskItem)
  const handleEdit = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <div className="max-w-xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
      
        <h1 className="text-3xl font-bold text-center mb-6 mt-4 text-blue-800">
          Lista de Tareas
        </h1>
        <TaskForm onAdd={handleAdd} />
        <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
      
    </div>
  );
};

export default App;
