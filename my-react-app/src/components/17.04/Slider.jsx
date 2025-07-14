import React, { useState, useEffect, useRef } from 'react';

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const images = [
    'https://via.placeholder.com/600x400?text=Image+1',
    'https://via.placeholder.com/600x400?text=Image+2',
    'https://via.placeholder.com/600x400?text=Image+3',
    'https://via.placeholder.com/600x400?text=Image+4',
  ];

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Автоматическая прокрутка
    intervalRef.current = setInterval(goToNext, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // Сброс таймера при ручном изменении слайда
  const handleSlideChange = (index) => {
    clearInterval(intervalRef.current);
    goToSlide(index);
    intervalRef.current = setInterval(goToNext, 3000);
  };

  return (
    <div className="slider" ref={sliderRef}>
      <h2>Слайдер изображений</h2>
      <div className="slider-container">
        <button onClick={() => handleSlideChange(currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1)}>
          Назад
        </button>
        
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`} 
          style={{ width: '600px', height: '400px' }}
        />
        
        <button onClick={() => handleSlideChange(currentIndex + 1 >= images.length ? 0 : currentIndex + 1)}>
          Вперёд
        </button>
      </div>
      
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
          >
            •
          </span>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;