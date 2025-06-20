function WeatherCard({ city, temp, icon }) {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <div className="weather-info">
        <span className="temperature">{temp}°C</span>
        <span className="weather-icon">{icon}</span>
      </div>
    </div>
  );
}
export default WeatherCard;