import React, { useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/Search/SearchBar';
import CurrentWeather from './components/Weather/CurrentWeather';
import Forecast from './components/Weather/Forecast';
import PrecipitationChart from './components/Weather/PrecipitationChart';

export default function WeatherApp() {
  const {
    city,
    weatherData,
    forecast,
    hourlyPrecip,
    loading,
    error,
    fetchWeather,
    getCurrentLocation,
    setCity
  } = useWeather();

  // Initial load
  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      fetchWeather(lastCity);
    } else {
      getCurrentLocation();
    }
  }, []);

  const handleSearch = (searchQuery, lat, lon) => {
    fetchWeather(searchQuery, lat, lon);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-md">
            Weatherly ✨
          </h1>
          <p className="text-blue-100 font-medium opacity-90">
            Professional Weather Dashboard
          </p>
        </div>

        {/* Search */}
        <SearchBar
          onSearch={handleSearch}
          onLocationClick={getCurrentLocation}
        />

        {/* Error State */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6 bg-red-100/95 backdrop-blur border border-red-400 text-red-700 px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 animate-pulse">
            <span className="text-2xl">⚠️</span>
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center my-20 text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-6 shadow-xl"></div>
            <p className="text-xl font-medium animate-pulse">Fetching weather data...</p>
          </div>
        )}

        {/* Main Content */}
        {!loading && weatherData && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <CurrentWeather data={weatherData} />

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              <Forecast data={forecast} />
              <PrecipitationChart data={hourlyPrecip} />
            </div>
          </div>
        )}

        {/* Empty State (No Data & Not Loading) */}
        {!loading && !weatherData && !error && (
          <div className="text-center text-white mt-20 opacity-80">
            <p className="text-2xl font-light">Search for a city to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}