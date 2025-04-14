const { db } = require('./initDB');
const bcrypt = require('bcryptjs');

// Пользователи
const createUser = (user, callback) => {
  bcrypt.hash(user.password, 12, (err, hash) => {
    if (err) return callback(err);
    
    db.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [user.name, user.email, hash, user.role || 'student'],
      function(err) {
        callback(err, { id: this.lastID });
      }
    );
  });
};

const findUserByEmail = (email, callback) => {
  db.get('SELECT * FROM users WHERE email = ?', [email], callback);
};

// Курсы
const createCourse = (course, callback) => {
  db.run(
    'INSERT INTO courses (title, description, teacher_id) VALUES (?, ?, ?)',
    [course.title, course.description, course.teacher_id],
    function(err) {
      callback(err, { id: this.lastID });
    }
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  createCourse
};