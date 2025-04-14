import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const LoginForm = () => {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.login.trim()) newErrors.login = 'Введите логин';
    if (formData.password.length < 6) newErrors.password = 'Пароль должен быть не менее 6 символов';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
      
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        login: formData.login,
        password: formData.password
      });
  
      localStorage.setItem('authToken', response.data.token);
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      navigate('/dashboard');
      
    } catch (error) {
      if (error.response) {
        setErrors({
          server: error.response.data.error || 'Ошибка авторизации'
        });
      } else {
        setErrors({
          server: 'Ошибка соединения с сервером'
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="input-group">
        <div className="input-icon">
          <FaUser />
        </div>
        <input
          type="text"
          name="login"
          placeholder="Логин или Email"
          value={formData.login}
          onChange={handleChange}
        />
      </div>
      {errors.login && <span className="error">{errors.login}</span>}

      <div className="input-group">
        <div className="input-icon">
          <FaLock />
        </div>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {errors.password && <span className="error">{errors.password}</span>}

      <div className="auth-options">
        <label className="remember-me">
          <input type="checkbox" />
          Запомнить меня
        </label>
        <a href="/auth" className="forgot-password">Забыли пароль?</a>
      </div>

      <button type="submit" className="auth-button">Войти</button>
    </form>
  );
};

export default LoginForm;