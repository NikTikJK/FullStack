import React, { useState, useCallback  } from 'react';
import './CoursesCarousel.css';

const CoursesCarousel = ({ courses }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => 
      prev === courses.length - 1 ? 0 : prev + 1
    );
  }, [courses.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? courses.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  return (
    <div className="courses-carousel">
      <h2 className="carousel-title">Рекомендуемые курсы</h2>
      
      <div 
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="carousel-arrow left" onClick={prevSlide}>
          &lt;
        </button>

        <div 
          className="carousel-track"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)` 
          }}
        >
          {courses.map((course, index) => (
            <div 
              key={course.id} 
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            >
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        <button className="carousel-arrow right" onClick={nextSlide}>
          &gt;
        </button>
      </div>

      <div className="carousel-dots">
        {courses.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Компонент карточки курса
const CourseCard = ({ title, category, rating, price, image }) => (
  <div className="course-card">
    <img src={image} alt={title} className="course-image" />
    <div className="course-info">
      <span className="course-category">{category}</span>
      <h3 className="course-title">{title}</h3>
      <div className="course-rating">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</div>
      <div className="course-price">{price}</div>
      <button className="course-button">Подробнее</button>
    </div>
  </div>
);

export default CoursesCarousel;