import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Thermometer, Droplets } from 'lucide-react';
import { mockHistoryData } from '../../data/mockData';

export const UserHistory: React.FC = () => {
  const averageTemp = mockHistoryData.reduce((sum, data) => sum + data.temperature, 0) / mockHistoryData.length;
  const maxTemp = Math.max(...mockHistoryData.map(data => data.temperature));
  const totalAlerts = mockHistoryData.reduce((sum, data) => sum + data.alerts, 0);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 font-poppins mb-2">
          Historique personnel
        </h1>
        <p className="text-gray-600 font-poppins">
          Évolution des données climatiques et alertes reçues
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-poppins">Température moyenne</p>
              <p className="text-2xl font-bold text-primary font-poppins">
                {averageTemp.toFixed(1)}°C
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-poppins">Température max</p>
              <p className="text-2xl font-bold text-red-500 font-poppins">
                {maxTemp}°C
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-poppins">Total alertes</p>
              <p className="text-2xl font-bold text-orange-500 font-poppins">
                {totalAlerts}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-poppins">Humidité moyenne</p>
              <p className="text-2xl font-bold text-cyan-500 font-poppins">
                {(mockHistoryData.reduce((sum, data) => sum + data.humidity, 0) / mockHistoryData.length).toFixed(0)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
              <Droplets className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Temperature Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-6">
          Évolution de la température
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockHistoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fontFamily: 'Poppins' }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12, fontFamily: 'Poppins' }} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
                formatter={(value: number, name: string) => [
                  `${value}°C`,
                  'Température'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#1E90FF" 
                strokeWidth={3}
                dot={{ fill: '#1E90FF', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#1E90FF', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Humidity and Alerts Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-6">
            Évolution de l'humidité
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fontFamily: 'Poppins' }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
                />
                <YAxis tick={{ fontSize: 12, fontFamily: 'Poppins' }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR')}
                  formatter={(value: number) => [`${value}%`, 'Humidité']}
                />
                <Line 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  dot={{ fill: '#06B6D4', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-6">
            Alertes par jour
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fontFamily: 'Poppins' }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
                />
                <YAxis tick={{ fontSize: 12, fontFamily: 'Poppins' }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR')}
                  formatter={(value: number) => [value, 'Alertes']}
                />
                <Bar 
                  dataKey="alerts" 
                  fill="#F97316"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};