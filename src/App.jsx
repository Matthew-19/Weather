import React from "react";
import "./App.css";
import { FaRegSun, FaRegMoon } from "react-icons/fa6";

function App() {
  const [weatherData, setWeatherData] = React.useState(null);
  React.useEffect(() => {
    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=13e532f19468403eb6234152232711&q=Cairo&days=7&aqi=no&alerts=no"
    )
      .then((res) => res.json())
      .then((data) => setWeatherData(data));
  }, []);
  console.log(weatherData);

  const [darkMode, setDarkMode] = React.useState(true);
  function handleToggle() {
    setDarkMode(!darkMode);
  }
  const mode = darkMode ? "dark" : "light";

  const daysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  if (weatherData) {
    // Getting Last Updated Day and Time
    var currentDate = new Date(weatherData.current.last_updated);

    var day = currentDate.getDay();
    var lastUpdateDay = daysArr[day];

    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    var am_pm = "am";
    if (hours > 12) {
      hours -= 12;
      am_pm = "pm";
    }
    var lastUpdateTime = `${hours}:${minutes} ${am_pm}`;

    // Forecast
    var forecastElements = weatherData.forecast.forecastday.map((item) => {
      var forecastDate = new Date(item.date);
      var day = forecastDate.getDay();
      var dayName = daysArr[day];

      var maxTemp = Math.round(item.day.maxtemp_c);
      var minTemp = Math.round(item.day.mintemp_c);

      var icon = item.day.condition.icon;
      var description = item.day.condition.text;

      return (
        <div key={forecastDate} className="weather--forecast-card">
          <div className="weather--forecast-day">{dayName}</div>
          <div className="weather--forecast-temperature">
            <div className="maxTemp">{maxTemp} ºC</div>
            <div>/</div>
            <div className="minTemp">{minTemp} ºC</div>
          </div>
          <div className="weather--forecast-details">
            <img src={`http://${icon}`} className="weather--forecast-icon" />
            <div className="weather--forecast-description">{description}</div>
          </div>
        </div>
      );
    });
  }
  if (!weatherData) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className={`container ${mode}`}>
      <div onClick={handleToggle} className="button--group">
        <FaRegSun className="sun--icon" />
        <div className="toggle--darkMode">
          <div className="circle"></div>
        </div>
        <FaRegMoon className="moon--icon" />
      </div>

      <main className="weather--current">
        <h1 className="location">{weatherData.location.name}</h1>
        <p className="lastUpdate">
          Last Updated: {`${lastUpdateDay} ${lastUpdateTime}`}
        </p>

        <div className="weather--details">
          <h1 className="weather--temperature">
            {Math.ceil(weatherData.current.temp_c)} ºC
          </h1>
          <img
            src={`http://${weatherData.current.condition.icon}`}
            className="weather--icon"
          />
          <div className="weather--description">
            {weatherData.current.condition.text}
          </div>
        </div>
      </main>

      <section className="weather--forecast">{forecastElements}</section>
    </div>
  );
}

export default App;
