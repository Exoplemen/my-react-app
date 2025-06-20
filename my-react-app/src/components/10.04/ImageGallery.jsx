import { useState, useEffect } from 'react';

function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <button onClick={prevImage}>Назад</button>
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex}`}
          style={{ maxWidth: '500px', maxHeight: '300px', margin: '0 10px' }}
        />
        <button onClick={nextImage}>Вперед</button>
      </div>
      <div>
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
}

export default ImageGallery;
// Использование:
// <ImageGallery images={['image1.jpg', 'image2.jpg', 'image3.jpg']} />