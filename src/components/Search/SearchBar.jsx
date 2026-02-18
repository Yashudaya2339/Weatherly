import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Navigation } from 'lucide-react';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function SearchBar({ onSearch, onLocationClick }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchSuggestions = async (value) => {
        if (value.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${OPENWEATHER_API_KEY}`
            );
            if (res.ok) {
                const data = await res.json();
                setSuggestions(data);
                setShowSuggestions(true);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        if (val.trim()) {
            fetchSuggestions(val);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelect = (suggestion) => {
        const cityName = suggestion.name;
        const fullName = `${suggestion.name}, ${suggestion.country}`;
        setQuery(fullName);
        setSuggestions([]);
        setShowSuggestions(false);
        onSearch(cityName, suggestion.lat, suggestion.lon);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setShowSuggestions(false);
        }
    };

    return (
        <div className="mb-8 relative z-50" ref={searchRef}>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder="Search for a city..."
                    className="w-full px-6 py-4 pr-32 rounded-full text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 bg-white/90 backdrop-blur text-black"
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                    {query && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery('');
                                setSuggestions([]);
                                setShowSuggestions(false);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                        >
                            <X size={20} />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onLocationClick}
                        className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors text-white"
                        title="Use current location"
                    >
                        <Navigation size={20} />
                    </button>

                    <button
                        type="submit"
                        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors text-white"
                    >
                        <Search size={20} />
                    </button>
                </div>

                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                        {suggestions.map((s, i) => (
                            <button
                                key={`${s.name}-${i}`}
                                type="button"
                                onClick={() => handleSelect(s)}
                                className="w-full px-6 py-3 text-left hover:bg-blue-50 flex items-center gap-3 border-b last:border-b-0 transition-colors"
                            >
                                <MapPin size={18} className="text-blue-500 shrink-0" />
                                <div>
                                    <div className="font-semibold text-gray-800">{s.name}</div>
                                    <div className="text-sm text-gray-500">
                                        {s.state ? `${s.state}, ` : ''}{s.country}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
}
