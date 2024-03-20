const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTodos = async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const newTodo = await prisma.todo.create({
    data: { title, description },
  });
  res.json(newTodo);
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(id) },
  });

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const updatedTodo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: { title, description },
  });

  res.json(updatedTodo);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'Todo deleted successfully' });
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
