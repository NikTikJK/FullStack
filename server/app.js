const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const Course = require('./models/Course');
const Subscribe = require('./models/Subscribe');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.get('/', (req, res) => {
  res.json({ message: 'Привет от Express сервера!' });
});

app.get('/api/users', (req, res) => {
  User.getAll((err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(users);
  });
});

app.post('/api/users', (req, res) => {
  const { name, login, email, password } = req.body;
  const photo = ''
  const type = 0

  if (!name || !login || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  User.create({ name, login, email, password, photo, type }, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ 
      id: this.lastID,
      message: 'User created successfully' 
    });
  });
});

app.put('/api/users/:id', async (req, res) => {
  console.log("users update");
  
  try {
    const { id } = req.params;
    const updates = req.body;

    delete updates.id;

    User.update(id, updates, (err, changes) => {
      if (err) {
        console.error('Ошибка обновления:', err);
        return res.status(500).json({ error: 'Ошибка сервера при обновлении данных' });
      }

      if (changes === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      User.getById(id, (err, user) => {
        if (err) {
          console.error('Ошибка получения пользователя:', err);
          return res.status(500).json({ error: 'Ошибка получения обновленных данных' });
        }

        if (!user) {
          return res.status(404).json({ error: 'Пользователь не найден после обновления' });
        }

        res.json(user);
      });
    });
  } catch (err) {
    console.error('Ошибка:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.post('/api/auth', async (req, res) => {
  console.log("auth");
  
  try {
    const { login, password } = req.body;
    
    if (!login || !password) {
      return res.status(400).json({ error: 'Логин и пароль обязательны' });
    }

    const user = await User.authenticate(login, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }

    res.json({
      message: 'Аутентификация успешна',
      user,
    });
  } catch (err) {
    console.error('Ошибка аутентификации:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.get("/api/courses", (req, res) => {
  Course.getAll((err, courses) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(courses);
  });
})

app.get("/api/subscribe", (req, res) => {
  const { userId } = req.query;

  if (userId) {
    Subscribe.getByUser(userId, (err, subscriptions) => {
      if (err) {
        console.error("Ошибка получения подписок:", err);
        return res.status(500).json({ error: "Ошибка сервера" });
      }
      res.json(subscriptions);
    });
  } else {
    Subscribe.getAll((err, allSubscriptions) => {
      if (err) {
        console.error("Ошибка получения всех подписок:", err);
        return res.status(500).json({ error: "Ошибка сервера" });
      }
      res.json(allSubscriptions);
    });
  }
});

app.post("/api/subscribe", (req, res) => {
  console.log("sub post");
  
  const { userId, courseId } = req.body;
  
  if (!userId || !courseId) {
    return res.status(400).json({ 
      success: false,
      error: "Не указаны userId или courseId" 
    });
  }

  Subscribe.subscribe(userId, courseId, (err, subscriptionId) => {
    if (err) {
      console.error("Ошибка подписки:", err.message);
      
      const statusCode = err.message.includes('не найден') ? 404 : 400;
      
      return res.status(statusCode).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      subscriptionId,
      message: "Подписка успешно оформлена"
    });
  });
});



app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});