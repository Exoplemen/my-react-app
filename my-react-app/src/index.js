import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserInfo from'./components/UserInfo'
import Product from'./components/UserList'
import WeatherCard from'./components/WeatherCard'
import Product from'./components/Product'
import ClickCounterButton from'./components/ClickCounterButton'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <UserInfo />
    <UserList />
    <Product />
    <WeatherCard />
    <ClickCounterButton />
  </React.StrictMode>
);
