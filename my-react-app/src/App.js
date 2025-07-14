import { useState } from 'react';
// Измененные пути импортов
import ImageGallery from './components/10.04/ImageGallery';
import PomodoroTimer from './components/10.04/PomodoroTimer';
import SimpleTimer from './components/10.04/SimpleTimer';
import LimitedTextArea from './components/10.04/LimitedTextArea';
import CountdownTimer from './components/17.04/Timer';
import ImageSlider from './components/17.04/Slider';
import WeatherCard from './components/8.04/WeatherCard';
import ClickCounterButton from './components/8.04/ClickCounterButton';
import Product from './components/8.04/Product';
import UserList from './components/8.04/UserList';

function App() {
  // 8.04
  const [clickCount, setClickCount] = useState(0);
  const [products] = useState([
    { id: 1, name: 'Ноутбук', price: 45000 },
    { id: 2, name: 'Смартфон', price: 25000 }
  ]);
  const [users] = useState([
    { name: 'Алексей', email: 'alex@example.com' },
    { name: 'Елена', email: 'elena@example.com' }
  ]);

  const handleBuy = (productName) => {
    alert(`Вы купили ${productName}!`);
  };

  // 10.04
  const galleryImages = [
    'https://via.placeholder.com/500x300/FF5733/FFFFFF?text=Image+1',
    'https://via.placeholder.com/500x300/33FF57/FFFFFF?text=Image+2',
    'https://via.placeholder.com/500x300/3357FF/FFFFFF?text=Image+3',
    'https://via.placeholder.com/500x300/F333FF/FFFFFF?text=Image+4'
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>React Компоненты</h1>

      {/* 8.04 */}
      <section style={{ margin: '40px 0', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
        <h2>WeatherCard</h2>
        <WeatherCard city="Санкт-Петербург" temp={18} icon="⛅" />
      
        <h2>ClickCounterButton</h2>
        <ClickCounterButton 
          count={clickCount} 
          onClick={() => setClickCount(clickCount + 1)} 
        />
      
        <h2>Список продуктов</h2>
        {products.map(product => (
          <Product
            key={product.id}
            name={product.name}
            price={product.price}
            onBuy={() => handleBuy(product.name)}
          />
        ))}
      
        <h2>Список пользователей</h2>
        <UserList users={users} />
      </section>

      {/* 10.04 */}
      <section style={{ margin: '40px 0', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
        <h2>Галерея изображений</h2>
        <ImageGallery images={galleryImages} />
      
        <h2>Pomodoro Таймер</h2>
        <PomodoroTimer />
      
        <h2>Простой таймер</h2>
        <SimpleTimer />
      
        <h2>Текстовое поле с ограничением</h2>
        <LimitedTextArea />
      </section>

      {/* 17.04 */}
      <section style={{ margin: '40px 0', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
        <h2>Таймер обратного отсчёта</h2>
        <CountdownTimer />
      
        <h2>Слайдер изображений</h2>
        <ImageSlider />
      </section>
    </div>
  );
}

export default App;