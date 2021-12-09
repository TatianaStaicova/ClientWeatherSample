import React from 'react';
import './styles.css';
import moment from 'moment';
import { Button } from 'semantic-ui-react';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function weather({weatherData}) {
  
  const WeatherIcon = styled.div`
  color: whitesmoke;
`;

  const refresh = () => {
    window.location.reload();
  }

  let weatherIcon = null;
  console.log(weatherData);
  if (weatherData.description === 'Thunderstorm') {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (weatherData.description === 'Drizzle') {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (weatherData.description === 'Rain') {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (weatherData.description === 'Snow') {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (weatherData.description === 'Clear') {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (weatherData.description === 'Clouds') {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  return (
    <div className="main">
      <div className="top">
        <p className="header">{weatherData.name}</p>
        <Button className="button" inverted color='blue' circular icon='refresh' onClick={refresh} />
      </div>
      <div className="flex">
        <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
        <div className="flex">
          <WeatherIcon style={{fontSize:30,marginTop:15}}>{weatherIcon}</WeatherIcon>
          <p className="description">{weatherData.description}</p>
        </div>
      </div>
    
  </div>
  )
}
