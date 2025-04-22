import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    login: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Введите имя";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Некорректный email";
    if (!formData.login.trim()) newErrors.login = "Введите логин";
    if (formData.password.length < 6)
      newErrors.password = "Пароль должен быть не менее 6 символов";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (!validate()) return;

    const postData = {
      name: formData.name,
      login: formData.login,
      password: formData.password,
      email: formData.email
    };

  try {
    const response = await fetch("http://localhost:5000/api/users ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      throw new Error('Ошибка сети');
    }
    
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate('/profile')
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="input-group">
        <div className="input-icon">
          <FaUser />
        </div>
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      {errors.name && <span className="error">{errors.name}</span>}

      <div className="input-group">
        <div className="input-icon">
          <FaEnvelope />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      {errors.email && <span className="error">{errors.email}</span>}

      <div className="input-group">
        <div className="input-icon">
          <FaUser />
        </div>
        <input
          type="text"
          name="login"
          placeholder="Логин"
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

      <div className="input-group">
        <div className="input-icon">
          <FaLock />
        </div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Подтвердите пароль"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      {errors.confirmPassword && (
        <span className="error">{errors.confirmPassword}</span>
      )}

      <button type="submit" className="auth-button">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
