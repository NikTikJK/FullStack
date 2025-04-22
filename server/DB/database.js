const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "../database.db"),
  (err) => {
    if (err) {
      console.error("Ошибка подключения к БД:", err.message);
    } else {
      console.log("Успешное подключение к SQLite БД");
    }
  }
);

db.serialize(() => {
  // Создание таблицы users
  db.run(
    `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        login TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        photo TEXT,
        type INTEGER DEFAULT 0 CHECK(type IN (0, 1, 2)),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,
    (err) => {
      if (err) {
        console.error("Ошибка при создании таблицы users:", err.message);
      } else {
        console.log("Таблица users успешно создана/проверена");
      }
    }
  );

  db.run(
    `
      CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  isMain BOOLEAN NOT NULL DEFAULT FALSE,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
    `,
    (err) => {
      if (err) {
        console.error("Ошибка при создании таблицы courses:", err.message);
      } else {
        console.log("Таблица courses успешно создана/проверена");
      }
    }
  );

  db.run(`
    CREATE TABLE IF NOT EXISTS user_courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      UNIQUE(user_id, course_id)  -- Одна запись на пользователя и курс
    )
  `, (err) => {
    if (err) console.error("Ошибка при создании таблицы user_courses:", err);
    else console.log("Таблица user_courses создана/проверена");
  });

});

module.exports = db;
