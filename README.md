# Weatherly 🌤️

> A professional, modern weather dashboard built with React, Vite, and Tailwind CSS.


## 🚀 Features

- **Real-time Weather**: Accurate current weather data for any city worldwide.
- **5-Day Forecast**: Plan ahead with a detailed daily forecast.
- **Precipitation Probability**: Hourly rain/snow chance chart.
- **Smart Search**: Autocomplete city search with suggestions.
- **Geolocation**: One-click "Use My Location" feature.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Modern UI**: Glassmorphism, smooth animations, and interactive elements.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks (Custom `useWeather` hook)
- **Charts**: Recharts
- **Icons**: Lucide React
- ** APIs**: OpenWeatherMap, Open-Meteo

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yashudaya2339/Weatherly.git
   cd Weatherly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory.
   - Copy the contents of `.env.example` into `.env`.
   - Add your OpenWeatherMap API key (Get it for free at [openweathermap.org](https://openweathermap.org/api)).

   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```
src/
├── components/         # Modular UI components
│   ├── Search/         # SearchFunctionality
│   └── Weather/        # Weather displays & charts
├── hooks/              # Custom React Hooks
│   └── useWeather.js   # Core business logic
├── utils/              # Helper functions
│   └── weatherUtils.js # Icon mapping, formatting
├── App.jsx             # Main layout & composition
└── main.jsx            # Entry point
```

## 🔮 Future Improvements

- [ ] Dark/Light Mode Toggle
- [ ] Interactive Map View
- [ ] PWA Support (Offline capabilities)
- [ ] Unit Tests with Vitest

## 📄 License

MIT © 2026 Weatherly
