import "./Hero.css"
import brain from "../../assets/brain.png"
import { useNavigate } from "react-router-dom";


function Hero() {
  const navigate = useNavigate()

    return ( 
        <section class="hero">
        <div class="hero-content">
          <h1>Начните своё обучение сегодня</h1>
          <p>Освойте новые навыки с лучшими курсами от экспертов</p>
          <button class="cta-button" onClick={() => {
            navigate('/auth')
          }}>Начать сейчас</button>
        </div>
        <img src={brain} alt="Обучение" />
      </section>
     );
}

export default Hero;