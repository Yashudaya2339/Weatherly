import React from 'react';
import { Cloud, Calendar } from 'lucide-react';
import { getWeatherIcon } from '../../utils/weatherUtils';

export default function Forecast({ data }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-6 md:p-8 mt-6">
            <div className="flex items-center gap-2 mb-6 text-gray-800">
                <Calendar className="text-blue-500" size={24} />
                <h3 className="text-2xl font-bold">5-Day Forecast</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {data.map((day, idx) => (
                    <div
                        key={idx}
                        className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-blue-200/50 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                            <div className="font-semibold text-gray-700 mb-2 uppercase tracking-wide text-xs">
                                {day.date}
                            </div>

                            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                                {getWeatherIcon(day.icon)}
                            </div>

                            <div className="text-sm text-blue-600 font-medium mb-3 capitalize bg-blue-100/50 rounded-full py-1 px-2 mx-auto w-max">
                                {day.description}
                            </div>

                            <div className="flex justify-center items-center gap-3 text-sm">
                                <span className="font-bold text-gray-900 text-lg">{Math.round(day.temp_max)}°</span>
                                <span className="text-gray-500 border-l border-gray-300 pl-3">{Math.round(day.temp_min)}°</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
