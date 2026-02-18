import React from 'react';
import { MapPin, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { getWeatherIcon } from '../../utils/weatherUtils';

export default function CurrentWeather({ data }) {
    if (!data) return null;

    const {
        name,
        sys: { country },
        weather,
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        wind: { speed },
        visibility
    } = data;

    const description = weather[0].description;
    const iconCode = weather[0].icon;

    return (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <MapPin className="text-blue-500" size={24} />
                        <h2 className="text-3xl font-bold text-gray-800">
                            {name}, {country}
                        </h2>
                    </div>
                    <p className="text-xl text-gray-600 capitalize font-medium">{description}</p>
                </div>
                <div className="text-8xl filter drop-shadow-md transform hover:scale-110 transition-transform cursor-default">
                    {getWeatherIcon(iconCode)}
                </div>
            </div>

            {/* Temperature Section */}
            <div className="flex flex-col items-center justify-center gap-2 mb-10">
                <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    {Math.round(temp)}°
                </div>
                <div className="flex gap-4 text-gray-600 font-medium bg-gray-100/50 px-4 py-2 rounded-full">
                    <span>Feels like {Math.round(feels_like)}°</span>
                    <span>•</span>
                    <span>H: {Math.round(temp_max)}°</span>
                    <span>L: {Math.round(temp_min)}°</span>
                </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={<Wind className="text-blue-500" size={24} />}
                    label="Wind Speed"
                    value={`${speed} m/s`}
                    bgClass="bg-blue-50"
                />
                <StatCard
                    icon={<Droplets className="text-cyan-500" size={24} />}
                    label="Humidity"
                    value={`${humidity}%`}
                    bgClass="bg-cyan-50"
                />
                <StatCard
                    icon={<Eye className="text-purple-500" size={24} />}
                    label="Visibility"
                    value={`${(visibility / 1000).toFixed(1)} km`}
                    bgClass="bg-purple-50"
                />
                <StatCard
                    icon={<Gauge className="text-orange-500" size={24} />}
                    label="Pressure"
                    value={`${pressure} hPa`}
                    bgClass="bg-orange-50"
                />
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, bgClass }) {
    return (
        <div className={`${bgClass} rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 border border-white/50 shadow-sm`}>
            <div className="mb-2 p-2 bg-white rounded-full shadow-sm">{icon}</div>
            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</span>
            <div className="text-xl font-bold text-gray-800">{value}</div>
        </div>
    );
}
