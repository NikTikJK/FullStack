import "./HeaderProfile.css";
import { useLocation, useNavigate } from "react-router-dom";

function HeaderProfile() {
  const location = useLocation()
  const locPath = location.pathname
  const navigate = useNavigate()



  return (
    <header class="header">
      <div class="header-container">
        <a href="/profile" className="logo">
          <span class="logo-accent">Learn</span>ify
        </a>
        <div class="nav-buttons">
          <button 
          className={`btn ${locPath === '/courses' ? 'btn-accent' : 'btn-non-accent'}`}
          onClick={() => {navigate('/courses')}}
          >Курсы</button>
          <button
          className={`btn ${locPath === '/grades' ? 'btn-accent' : 'btn-non-accent'}`}
          onClick={() => {navigate('/grades')}}
          >Оценки</button>
          <button
          className={`btn ${locPath === '/profile' ? 'btn-accent' : 'btn-non-accent'}`}
          onClick={() => {navigate('/profile')}}
          >Профиль</button>
        </div>
      </div>
    </header>
  );
}

export default HeaderProfile;
