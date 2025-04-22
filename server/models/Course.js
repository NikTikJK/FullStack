const db = require('../DB/database');

class Course {
    static getAll(callback) {
        db.all('SELECT * FROM courses', callback);
      }

      static create(course, callback) {
        const { title, description, type, price, duration, isMain, user_id } = course;
        db.run(
            'INSERT INTO courses (title, description, type, price, duration, isMain, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                title,
                description || null,
                type,
                price,
                duration,
                isMain ? 1 : 0,
                user_id
            ],
            callback
        );
    }
}

module.exports = Course;
