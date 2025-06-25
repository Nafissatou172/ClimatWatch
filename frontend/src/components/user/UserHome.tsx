import React from 'react';
import { Thermometer, Droplets, Wind, Eye, AlertTriangle, MapPin } from 'lucide-react';
import { mockWeatherData, mockAlerts } from '../../data/mockData';

export const UserHome: React.FC = () => {
  const currentWeather = mockWeatherData[0];
  const activeAlerts = mockAlerts.filter(alert => alert.active);

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'red': return 'bg-red-500';
      case 'orange': return 'bg-orange-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getAlertBgColor = (level: string) => {
    switch (level) {
      case 'red': return 'bg-red-50 border-red-200';
      case 'orange': return 'bg-orange-50 border-orange-200';
      case 'green': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 font-poppins mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-600 font-poppins">
          Surveillez les conditions climatiques en temps réel
        </p>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 font-poppins flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Alertes actives
          </h2>
          <div className="grid gap-4">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-xl border-2 p-4 animate-slide-up ${getAlertBgColor(alert.level)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className={`w-3 h-3 rounded-full mr-2 ${getAlertColor(alert.level)}`}></div>
                      <h3 className="font-semibold text-gray-800 font-poppins">{alert.title}</h3>
                      <span className="ml-2 text-sm text-gray-500 font-poppins">
                        {alert.zone}
                      </span>
                    </div>
                    <p className="text-gray-700 font-poppins">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-2 font-poppins">
                      {alert.date.toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weather Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Current Location Weather */}
        <div className="md:col-span-2 lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold text-gray-800 font-poppins">
                {currentWeather.location}
              </h3>
            </div>
            <span className="text-sm text-gray-500 font-poppins">Temps réel</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-4xl font-bold text-primary mr-4 font-poppins">
                {currentWeather.temperature}°C
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-gray-600">
                  <Droplets className="w-4 h-4 mr-2" />
                  <span className="text-sm font-poppins">{currentWeather.humidity}%</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Wind className="w-4 h-4 mr-2" />
                  <span className="text-sm font-poppins">{currentWeather.windSpeed} km/h</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl">☀️</div>
              <div className="text-sm text-gray-500 font-poppins mt-2">Ensoleillé</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-poppins">Pression</p>
                <p className="text-2xl font-bold text-gray-800 font-poppins">
                  {currentWeather.pressure}
                </p>
                <p className="text-xs text-gray-500 font-poppins">hPa</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-4">
          Carte interactive
        </h3>
        <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center space-y-4">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-600 font-poppins">
                Carte interactive
              </p>
              <p className="text-sm text-gray-500 font-poppins">
                Visualisation des températures en temps réel
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {mockWeatherData.map((location, index) => (
                <div key={location.id} className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-800 font-poppins">{location.location}</p>
                    <p className="text-lg font-bold text-primary font-poppins">
                      {location.temperature}°C
                    </p>
                    <div className="flex items-center justify-center mt-1">
                      <Thermometer className="w-3 h-3 text-red-500 mr-1" />
                      <span className="text-xs text-gray-500 font-poppins">
                        {location.humidity}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};