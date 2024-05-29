import React, { useState } from 'react';
import axios from 'axios';



function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            const url = `https://api.weatherapi.com/v1/forecast.json?key=07d684643ec449e9bf6230438242805&q=${location}&days=10&aqi=no&alerts=yes`;
            axios.get(url).then((response) => {
                if (response.data.error) {
                    setError('Місто не знайдено. Будь ласка, спробуйте ще раз.');
                } else {
                    setData(response.data);
                    setError('');
                }
            }).catch(error => {
                setError('Сталася помилка. Будь ласка, спробуйте ще раз пізніше.');
            });
            setLocation('');
        }
    };

    const closeErrorMessage = () => {
        setError('');
    };

    return (
        <div className="app">
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Enter Location'
                    type="text"
                />
            </div>
            <div className={`error-message ${error && 'show'}`} onClick={closeErrorMessage}>
                <p>{error}</p>
            </div>
            {data.location && (
                <div className={`weather-info`} data-weather={data.current.condition.text}>
                    <div className="location">
                        <p>{data.location.name}, {data.location.country}</p>
                    </div>
                    <div className="current">
                        <div className="temp">
                            <h1>{data.current.temp_c.toFixed()}°C</h1>
                        </div>
                    </div>
                    <div className="forecast">
                        {data.forecast.forecastday.map(day => (
                            <div key={day.date} className="card">
                                <div className="date">{day.date}</div>
                                <div className="temp">
                                    <p>Max: {day.day.maxtemp_c.toFixed()}°C</p>
                                    <p>Min: {day.day.mintemp_c.toFixed()}°C</p>
                                </div>
                                <div className="condition">
                                    <p>{day.day.condition.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
