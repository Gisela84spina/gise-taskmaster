import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Error al crear la tarea");
      const newTask = await res.json();
      onAdd(newTask);
      setTitle("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
      setError("No se pudo agregar la tarea. Intenta más tarde.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-700 rounded shadow">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow p-2 border border-gray-600 rounded-l-md bg-gray-800 t
          ext-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
        >
          Agregar
        </button>
      </div>
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </form>
  );
}
