
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudSun, Droplets, Wind, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

const WeatherForecastCard = () => {
  // Mock weather data - in a real app, this would come from a weather API
  const [weather, setWeather] = useState({
    temperature: 14,
    condition: 'Light Rain',
    icon: '🌦️',
    city: 'Oslo',
    humidity: 78,
    windSpeed: 12,
    visibility: 8,
    recommendation: 'Pack rain gear for outdoor play!'
  });

  // Simulate fetching weather data
  useEffect(() => {
    // In a real implementation, you would fetch from a weather API here
    const mockWeatherData = {
      temperature: Math.floor(Math.random() * 20) + 5, // 5-25°C
      condition: 'Light Rain',
      icon: '🌦️',
      city: 'Oslo',
      humidity: 78,
      windSpeed: 12,
      visibility: 8,
      recommendation: 'Pack rain gear for outdoor play!'
    };
    setWeather(mockWeatherData);
  }, []);

  const getRecommendation = (condition: string, temp: number) => {
    if (condition.includes('Rain')) {
      return '⚠️ Pack rain gear for outdoor play!';
    } else if (temp > 20) {
      return '☀️ Perfect weather for outdoor activities!';
    } else if (temp < 5) {
      return '🧥 Dress warmly for outdoor time!';
    } else {
      return '🌤️ Great day for outdoor learning!';
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20" />
      <CardHeader className="relative pb-3">
        <CardTitle className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
            <CloudSun className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{weather.icon} {weather.city} Weather</h3>
            <p className="text-sm text-slate-600 font-normal mt-0.5">Outdoor activity planning</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex-1 flex flex-col space-y-4">
        {/* Main Weather Display */}
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-slate-900">{weather.temperature}°C</div>
          <div className="text-lg font-medium text-slate-700">{weather.condition}</div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="space-y-1">
            <Droplets className="w-4 h-4 text-blue-500 mx-auto" />
            <div className="text-xs text-slate-600">Humidity</div>
            <div className="text-sm font-semibold text-slate-900">{weather.humidity}%</div>
          </div>
          <div className="space-y-1">
            <Wind className="w-4 h-4 text-blue-500 mx-auto" />
            <div className="text-xs text-slate-600">Wind</div>
            <div className="text-sm font-semibold text-slate-900">{weather.windSpeed} km/h</div>
          </div>
          <div className="space-y-1">
            <Eye className="w-4 h-4 text-blue-500 mx-auto" />
            <div className="text-xs text-slate-600">Visibility</div>
            <div className="text-sm font-semibold text-slate-900">{weather.visibility} km</div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <div className="text-sm font-medium text-blue-800">
            {getRecommendation(weather.condition, weather.temperature)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecastCard;
