import './App.css';
import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from 'semantic-ui-react';
import Weather from './components/weather';
import Forecast from './components/forecast';
export default function App() {
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState(undefined);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    
      console.log(lat + " " + long)
      getWeather(lat, long)
      .then(weather => {
        setWeatherData(weather);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });

  }, [lat,long,error])

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please Enable your Location in your browser!");
    }
  }

  function getWeather(lat, long) {
    return fetch(
      `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => handleResponse(res))
      .then(weather => {
        if (Object.entries(weather).length) {
          const mappedData = mapDataToWeatherInterface(weather);
          return mappedData;
        }
      });
  }
  

  function mapDataToWeatherInterface(data) {
    const mapped = {
      date: data.dt * 1000, // convert from seconds to milliseconds
      description: data.weather[0].main,
      temperature: Math.round(data.main.temp),
    };
  
    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }
  
    return mapped;
  }
  
  return (
    <div className="App">
      {(typeof weatherData != 'undefined') ? (
        <div>          
          <Weather weatherData={weatherData}/>
        </div>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}
