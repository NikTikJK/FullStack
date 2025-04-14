import "./Hero.css"
import brain from "../../assets/brain.png"


function Hero() {
    return ( 
        <section class="hero">
        <div class="hero-content">
          <h1>Начните своё обучение сегодня</h1>
          <p>Освойте новые навыки с лучшими курсами от экспертов</p>
          <button class="cta-button">Начать бесплатно</button>
        </div>
        <img src={brain} alt="Обучение" />
      </section>
     );
}

export default Hero;