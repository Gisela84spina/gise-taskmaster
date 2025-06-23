require('dotenv').config();

const cors = require('cors'); // importo cors

const express = require('express');
const app = express();
app.use(cors());//permite  peticion d dif origen


const port = process.env.PORT || 3001;


app.use(express.json());

let tasks = []; // Array para almacenar tareas

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const task = { id: Date.now(), ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id == id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id == id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
