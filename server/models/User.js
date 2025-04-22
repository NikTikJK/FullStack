const db = require('../DB/database');

class User {
  static getAll(callback) {
    db.all('SELECT id, name, login, email, photo type FROM users', callback);
  }

  static create(user, callback) {
    const { name, login, email, password, photo, type } = user;
    db.run(
      'INSERT INTO users (name, login, email, password, photo, type) VALUES (?, ?, ?, ?, ?, ?)',
      [name, login, email, password, photo, type || 0],
      callback
    );
  }

  static getById(id, callback) {
    db.get(
      'SELECT id, name, login, email, photo, type FROM users WHERE id = ?', 
      [id], 
      callback
    );
  }

  static getByLogin(login, callback) {
    db.get(
      'SELECT * FROM users WHERE login = ?',
      [login],
      callback
    );
  }

  static async authenticate(login, password) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE login = ?',
        [login],
        async (err, user) => {
          if (err) return reject(err);
          if (!user) return resolve(null);
          
          if (password === !user.password) return resolve(null);
          
          delete user.password;
          resolve(user);
        }
      );
    });
  }

  static update(id, updatedData, callback) {
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(updatedData)) {
      if (key !== 'id' && value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    
    if (fields.length === 0) {
      return callback(new Error('Нет данных для обновления'));
    }
    
    values.push(id);
    
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    
    db.run(sql, values, function(err) {
      if (err) return callback(err);
      
      callback(null, this.changes);
    });
  }
}

module.exports = User;