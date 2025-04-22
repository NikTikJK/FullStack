import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
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
    const postData = {
      login: formData.login,
      password: formData.password
    };
    
    try {
      const response = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
      
      if (!response.ok) {
        alert('Ошибка сети');
      }
      
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate('/profile')
    } catch (error) {
      alert('Произошла ошибка:', error);
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