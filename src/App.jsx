import React from "react";
import "./App.css";
import ToggleTheme from "./components/ToggleTheme";

function App() {
  // Get Weather Data
  const [weatherData, setWeatherData] = React.useState(null);
  React.useEffect(() => {
    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=13e532f19468403eb6234152232711 &q=Cairo&days=7&aqi=no&alerts=no"
    )
      .then((res) => res.json())
      .then((data) => setWeatherData(data));
  }, []);

  // Dark Mode
  const [darkMode, setDarkMode] = React.useState(true);
  function handleToggle() {
    setDarkMode(!darkMode);
  }
  const mode = darkMode ? "dark" : "light";

  // Current Weather, Forecast & Degree
  const daysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [degree, setDegree] = React.useState("c");
  function toggleDegree() {
    setDegree((prevDegree) => {
      return prevDegree === "c" ? "f" : "c";
    });
  }

  if (weatherData) {
    // Getting Last Updated Weather, Day and Time
    var currentWeather_c = Math.round(weatherData.current.temp_c);
    var currentWeather_f = Math.round(weatherData.current.temp_f);
    var currentWeather = degree === "c" ? currentWeather_c : currentWeather_f;

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
    } else if (hours === 0) {
      hours = 12;
    }
    var lastUpdateTime = `${hours}:${minutes} ${am_pm}`;

    // Forecast
    var forecastElements = weatherData.forecast.forecastday.map(
      (item, index) => {
        var forecastDate = new Date(item.date);
        var day = forecastDate.getDay();
        var dayName = daysArr[day];

        var maxTemp_c = Math.round(item.day.maxtemp_c);
        var minTemp_c = Math.round(item.day.mintemp_c);
        var maxTemp_f = Math.round(item.day.maxtemp_f);
        var minTemp_f = Math.round(item.day.mintemp_f);

        var maxTemp = degree === "c" ? maxTemp_c : maxTemp_f;
        var minTemp = degree === "c" ? minTemp_c : minTemp_f;

        var icon = item.day.condition.icon;
        var description = item.day.condition.text;

        return (
          <div key={forecastDate} className="weather--forecast-card">
            <div className="weather--forecast-day">
              {dayName}
              {index === 0 && ` - Today`}
            </div>
            <div className="weather--forecast-temperature">
              <div className="maxTemp">
                {maxTemp} º<span className="weather--degree">{degree}</span>
              </div>
              <div>/</div>
              <div className="minTemp">
                {minTemp} º<span className="weather--degree">{degree}</span>
              </div>
            </div>
            <div className="weather--forecast-details">
              <img src={`http://${icon}`} className="weather--forecast-icon" />
              <div className="weather--forecast-description">{description}</div>
            </div>
          </div>
        );
      }
    );
  }

  return (
    <div className={`container ${mode}`}>
      <nav>
        <a
          href="https://www.weatherapi.com/"
          target="_blank"
          title="Free Weather API"
        >
          <img
            src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
            alt="Weather data by WeatherAPI.com"
            border="0"
            className="nav--icon"
          />
        </a>
        <div className="weather--settings">
          <div className="weather--degree-select">
            <button onClick={toggleDegree} className="weather--degree">
              º{degree}
            </button>
          </div>
          <ToggleTheme theme={mode} handleToggle={handleToggle} />
        </div>
      </nav>

      {!weatherData ? (
        <div className="loading">
          <h1>
            Loading
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </h1>
          <h6>Looking outside for you... one sec</h6>
        </div>
      ) : (
        <div className="hero--content">
          <main className="weather--current">
            <div className="weather--main-header">
              <div>
                <h1 className="location">{weatherData.location.name}</h1>
                <p className="lastUpdate">
                  Last Updated: {`${lastUpdateDay} ${lastUpdateTime}`}
                </p>
              </div>

              <div className="weather--details">
                <h1 className="weather--temperature">
                  {currentWeather} º
                  <span className="weather--degree">{degree}</span>
                </h1>
                <img
                  src={`http://${weatherData.current.condition.icon}`}
                  className="weather--icon"
                />
                <div className="weather--description">
                  {weatherData.current.condition.text}
                </div>
              </div>
            </div>
          </main>

          <section className="weather--forecast">{forecastElements}</section>
        </div>
      )}
    </div>
  );
}

export default App;
