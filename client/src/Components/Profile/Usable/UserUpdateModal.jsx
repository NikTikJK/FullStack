import { useState, useEffect } from 'react';
import './UserUpdateModal.css';

const UserUpdateModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    login: '',
    name: '',
    email: '',
    photo: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        login: user.login || '',
        name: user.name || '',
        email: user.email || '',
        photo: user.photo || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      onClose();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Редактирование профиля</h2>
        
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Логин:</label>
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Фото (URL):</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Отмена
            </button>
            <button type="submit" className="save-btn">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateModal;