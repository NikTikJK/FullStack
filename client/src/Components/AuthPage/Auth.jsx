import React, { useState } from 'react';
import './Auth.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button 
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Вход
          </button>
          <button 
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </button>
        </div>
        
        {isLogin ? <LoginForm /> : <RegisterForm />}
        
        <div className="auth-footer">
          {isLogin ? (
            <p>Нет аккаунта? <span onClick={() => setIsLogin(false)}>Зарегистрируйтесь</span></p>
          ) : (
            <p>Уже есть аккаунт? <span onClick={() => setIsLogin(true)}>Войдите</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;