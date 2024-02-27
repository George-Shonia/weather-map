import { useEffect, useState } from "react";
import classes from "../modules/Weather.module.scss";
import axios from "axios";

const Weather = () => {
  const [cityName, setCityName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    if (fetchData) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=e4138ac5592b6210a5de9783f2a7c2bd`
        )
        .then((res) => {
          setWeatherInfo(res.data);
        });
    }
    setFetchData(false);
  }, [cityName, fetchData]);

  const onChangeHandler = (e) => {
    setCityName(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setFetchData(true);
  };

  return (
    <div className={classes["weather-wrapper"]}>
      <div className={classes["weather-container"]}>
        <form onSubmit={onSubmitHandler}>
          <input type="text" placeholder="City" onChange={onChangeHandler} />
          <button>search</button>
        </form>
        <div className={classes['weather-info']}>
          <h3>Weather in {weatherInfo.name ? weatherInfo.name : '...'}</h3>
          <h1>{weatherInfo.main && weatherInfo.main.temp + " °C "}</h1>
          <div className={classes['image-div']}>
           { weatherInfo.weather && weatherInfo.weather[0].icon && <img
              src={`https://openweathermap.org/img/wn/${
                weatherInfo.weather && weatherInfo.weather[0].icon
              }@2x.png`}
              alt=""
              style={{ width: "50px", height: "50px" }}
            />}
            <p>{weatherInfo.weather && weatherInfo.weather[0].description}</p>
          </div>
          <p>Humidity: {weatherInfo.main && weatherInfo.main.humidity + "%"}</p>
          <p>
            Wind speed: {weatherInfo.wind && weatherInfo.wind.speed + " km/h "}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
