const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../database.sqlite');
const db = new sqlite3.Database(DB_PATH);

// Создание таблиц
const init = () => {
  db.serialize(() => {
    // Пользователи
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        login TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('student', 'teacher', 'admin')) DEFAULT 'student',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Курсы
    db.run(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        teacher_id INTEGER,
        price INTEGER,
        type TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES users(id)
      )
    `);

    // Студенты курсов (связь многие-ко-многим)
    db.run(`
      CREATE TABLE IF NOT EXISTS course_students (
        course_id INTEGER,
        student_id INTEGER,
        PRIMARY KEY (course_id, student_id),
        FOREIGN KEY (course_id) REFERENCES courses(id),
        FOREIGN KEY (student_id) REFERENCES users(id)
      )
    `);
  });

  console.log('База данных инициализирована');
};

module.exports = { db, init };