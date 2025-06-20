
import ImageGallery from './ImageGallery';
import PomodoroTimer from './PomodoroTimer';
import SimpleTimer from './SimpleTimer';
import LimitedTextArea from './LimitedTextArea';

function App() {
  //8.04
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
  //10.04
  // Изображения для галереи
  const galleryImages = [
    'https://via.placeholder.com/500x300/FF5733/FFFFFF?text=Image+1',
    'https://via.placeholder.com/500x300/33FF57/FFFFFF?text=Image+2',
    'https://via.placeholder.com/500x300/3357FF/FFFFFF?text=Image+3',
    'https://via.placeholder.com/500x300/F333FF/FFFFFF?text=Image+4'
  ];


  
  return (
    <>
    <h1>Hello, React</h1>
      {/*8.04*/}

      <div className="app">
      <h1>React Компоненты</h1>
      <>
        <h2>WeatherCard</h2>
        <WeatherCard city="Санкт-Петербург" temp={18} icon="⛅" />
      </>
      <>
        <h2>ClickCounterButton</h2>
        <ClickCounterButton 
          count={clickCount} 
          onClick={() => setClickCount(clickCount + 1)} 
        />
      </>
      <>
        <h2>Список продуктов</h2>
        {products.map(product => (
          <Product
            key={product.id}
            name={product.name}
            price={product.price}
            onBuy={() => handleBuy(product.name)}
          />
        ))}
      </>
      <>
        <h2>Список пользователей</h2>
        <UserList users={users} />
      </>
    </div>

      {/*10.04*/}

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>React Компоненты</h1>
      <section style={{ margin: '40px 0', borderBottom: '1px solid #eee', paddingBottom: '30px' }}>
        <h2>1. Галерея изображений</h2>
        <ImageGallery images={galleryImages} />
      </section>
      <section style={{ margin: '40px 0', borderBottom: '1px solid #eee', paddingBottom: '30px' }}>
        <h2>2. Pomodoro Таймер</h2>
        <PomodoroTimer />
      </section>
      <section style={{ margin: '40px 0', borderBottom: '1px solid #eee', paddingBottom: '30px' }}>
        <h2>3. Простой таймер</h2>
        <SimpleTimer />
      </section>
      <section style={{ margin: '40px 0' }}>
        <h2>4. Текстовое поле с ограничением</h2>
        <LimitedTextArea />
      </section>
    </div>
    </>
  );
}

export default App;
