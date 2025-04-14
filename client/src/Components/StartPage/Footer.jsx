import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h3 className="footer-logo">Learn<span>ify</span></h3>
          <p className="footer-description">
            Образовательная платформа для получения современных знаний и навыков.
          </p>
        </div>

        <div className="footer-section">
          <h4>Быстрые ссылки</h4>
          <ul className="footer-links">
            <li><a href="/">Главная</a></li>
            <li><a href="/">Курсы</a></li>
            <li><a href="/">Преподаватели</a></li>
            <li><a href="/">О нас</a></li>
            <li><a href="/">Контакты</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Категории</h4>
          <ul className="footer-links">
            <li><a href="/">Веб-разработка</a></li>
            <li><a href="/">Data Science</a></li>
            <li><a href="/">Дизайн</a></li>
            <li><a href="/">Маркетинг</a></li>
            <li><a href="/">Бизнес</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Контакты</h4>
          <ul className="footer-contact">
            <li>
              <span>Москва, ул. Образовательная, 42</span>
            </li>
            <li>
              <span>+7 (495) 123-45-67</span>
            </li>
            <li>
              <span>info@learnify.ru</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Learnify. Все права защищены.</p>
        <div className="legal-links">
          <a href="/">Политика конфиденциальности</a>
          <a href="/">Условия использования</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;