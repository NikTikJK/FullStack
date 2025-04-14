import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate()
  const toAuth = () => {
    navigate("/auth")
  }

  return (
    <header class="header">
      <div class="header-container">
        <a href="/" class="logo">
          <span class="logo-accent">Learn</span>ify
        </a>
        <div class="nav-buttons">
          <button class="btn btn-login" onClick={toAuth}>Войти</button>
          <button class="btn btn-register" onClick={toAuth}>Зарегистрироваться</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
