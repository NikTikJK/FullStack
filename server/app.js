const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { db, init } = require('./db/initDB');
const { createUser, findUserByEmail } = require('./db/queries');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

init();

app.post('/api/register', async (req, res) => {
  try {
    const { email } = req.body;
    
    findUserByEmail(email, (err, user) => {
      if (user) return res.status(400).json({ error: 'Email уже используется' });
      
      createUser(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.id });
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});