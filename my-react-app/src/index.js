import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserInfo from'./components/UserInfo'
import Product from'./components/UserList'
import WeatherCard from'./components/WeatherCard'
import Product from'./components/Product'
import ClickCounterButton from'./components/ClickCounterButton'
//10.04
import UserInfo from'./components/10.04/ImageGallery'
import UserInfo from'./components/10.04/LimitedTextArea'
import UserInfo from'./components/10.04/PomodoroTimer'
import UserInfo from'./components/10.04/SimpleTimer'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <UserInfo />
    <UserList />
    <Product />
    <WeatherCard />
    <ClickCounterButton />
    {/* 10.04 */}
    <ImageGallery />
    <LimitedTextArea />
    <PomodoroTimer />
    <SimpleTimer />
  </React.StrictMode>
);
