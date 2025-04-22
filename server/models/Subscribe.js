const db = require("../DB/database");

class Subscribe {
  static getAll(callback) {
    db.all(`
      SELECT uc.*, 
             u.name as user_name,
             c.title as course_title
      FROM user_courses uc
      JOIN users u ON uc.user_id = u.id
      JOIN courses c ON uc.course_id = c.id
    `, callback);
  }

  static subscribe(userId, courseId, callback) {
    db.get("SELECT id FROM courses WHERE id = ?", [courseId], (err, course) => {
      if (err) return callback(err);
      if (!course) return callback(new Error("Курс не найден"));

      db.get("SELECT id FROM users WHERE id = ?", [userId], (err, user) => {
        if (err) return callback(err);
        if (!user) return callback(new Error("Пользователь не найден"));

        db.get(
          "SELECT id FROM user_courses WHERE user_id = ? AND course_id = ?",
          [userId, courseId],
          (err, existing) => {
            if (err) return callback(err);
            if (existing) return callback(new Error("Подписка уже существует"));

            db.run(
              `INSERT INTO user_courses 
                  (user_id, course_id) 
                  VALUES (?, ?)`,
              [userId, courseId],
              function (err) {
                if (err) return callback(err);

                callback(null, this.lastID);
              }
            );
          }
        );
      });
    });
  }

  static getByUser(userId, callback) {
    db.all(`
      SELECT uc.*, 
             c.title as course_title,
             c.description as course_description
      FROM user_courses uc
      JOIN courses c ON uc.course_id = c.id
      WHERE uc.user_id = ?
    `, [userId], callback);
  }

  static cancel(subscriptionId, callback) {
    db.run(
      "DELETE FROM user_courses WHERE id = ?",
      [subscriptionId],
      function (err) {
        if (err) return callback(err);
        callback(null, this.changes > 0);
      }
    );
  }
}

module.exports = Subscribe;
