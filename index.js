const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const todoRoutes = require('./src/routes/todoRoutes');
app.use('/api/todo', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port 3001`);
});
