import { useState, useEffect } from 'react';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export function useWeather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [hourlyPrecip, setHourlyPrecip] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const processForecastData = (forecastList) => {
        const dailyData = {};

        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });

            if (!dailyData[date]) {
                dailyData[date] = {
                    date,
                    temps: [],
                    descriptions: [],
                    icons: []
                };
            }

            dailyData[date].temps.push(item.main.temp);
            dailyData[date].descriptions.push(item.weather[0].description);
            dailyData[date].icons.push(item.weather[0].icon);
        });

        return Object.values(dailyData).slice(0, 5).map(day => ({
            date: day.date,
            temp_max: Math.round(Math.max(...day.temps)),
            temp_min: Math.round(Math.min(...day.temps)),
            description: day.descriptions[0],
            icon: day.icons[0]
        }));
    };

    const processHourlyPrecipitation = (meteoData) => {
        const current = new Date();
        const hourlyTimes = meteoData.hourly.time;
        const hourlyPrecip = meteoData.hourly.precipitation_probability;

        return Array.from({ length: 6 }, (_, i) => {
            const hour = new Date(current.getTime() + i * 60 * 60 * 1000);
            const hourIndex = hourlyTimes.findIndex(time =>
                new Date(time).getHours() === hour.getHours()
            );

            return {
                time: hour.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
                probability: hourIndex !== -1 ? hourlyPrecip[hourIndex] : 0
            };
        });
    };

    const fetchWeather = async (searchCity, lat = null, lon = null) => {
        setLoading(true);
        setError('');

        try {
            if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'undefined') {
                throw new Error('⚠️ Please add your OpenWeather API key to the .env file.');
            }

            let weatherUrl;
            if (lat && lon) {
                weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
            } else {
                weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${OPENWEATHER_API_KEY}&units=metric`;
            }

            const weatherResponse = await fetch(weatherUrl);

            if (!weatherResponse.ok) {
                if (weatherResponse.status === 401) {
                    throw new Error('Invalid API key. Please check your .env file.');
                }
                throw new Error('City not found. Try another city.');
            }

            const weatherData = await weatherResponse.json();
            setWeatherData(weatherData);
            setCity(weatherData.name); // Normalize city name

            let forecastUrl;
            const { lat: latitude, lon: longitude } = weatherData.coord;

            forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`;

            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            const dailyForecasts = processForecastData(forecastData.list);
            setForecast(dailyForecasts);

            const meteoResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation_probability&forecast_days=1`
            );

            const meteoData = await meteoResponse.json();
            const hourlyData = processHourlyPrecipitation(meteoData);
            setHourlyPrecip(hourlyData);

            // Save last search to localStorage
            localStorage.setItem('lastCity', weatherData.name);

        } catch (err) {
            setError(err.message || 'Unable to fetch weather data.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(null, latitude, longitude);
                },
                (error) => {
                    setError('Unable to get your location. Please enable permissions.');
                    setLoading(false);
                }
            );
        } else {
            setError('Geolocation is not supported by your browser');
        }
    };

    return {
        city,
        setCity,
        weatherData,
        forecast,
        hourlyPrecip,
        loading,
        error,
        fetchWeather,
        getCurrentLocation
    };
}
