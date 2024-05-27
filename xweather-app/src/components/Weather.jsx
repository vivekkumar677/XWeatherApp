import React, { useState } from 'react'
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [ weatherData, setWeatherData ] = useState(null);
    const [loding, setLoding] = useState(false);
    const [error, setError] = useState('');

    const API_KEY = "7949ec65577c4fa095c153253240203";

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSearch = () => {
        if (city.trim() === '') return ;

        setLoding(true);
        setError('');
        setWeatherData(null);

        fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                // setError('Failed to fetch weather data');
                alert('Failed to fetch weather data')
            } else {
                setWeatherData(data);
            }
            setLoding(false);
        })
        .catch(() => {
            // setError('Failed to fetch weather data');
            alert('Failed to fetch weather data')
            setLoding(false);
        });
    };

    return (
        <div className='weather-app'>
            <div>
                <input
                    type='text'
                    value={city}
                    onChange={handleInputChange}
                    placeholder='Enter Ciry Name'
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {loding && <p>Loading data...</p>}
            {weatherData && (
                <div className="weather-cards">
                    <div className="weather-card">
                        <p>Temperature</p>
                        <p>{weatherData.current.temp_c}°C</p>
                    </div>
                    <div className="weather-card">
                        <p>Humidity</p>
                        <p>{weatherData.current.humidity}%</p>
                    </div>
                    <div className="weather-card">
                        <p>Condition</p>
                        <p>{weatherData.current.condition.text}</p>
                    </div>
                    <div className="weather-card">
                        <p>Wind Speed</p>
                        <p>{weatherData.current.wind_kph} kph</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather;