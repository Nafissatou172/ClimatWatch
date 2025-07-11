import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, AlertTriangle, Thermometer, TrendingUp, Activity } from 'lucide-react';
import { mockHistoryData} from '../../data/mockData';
import  { useEffect, useState } from 'react';
//import { Plus, Filter, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { Alert} from '../types';
import {USER} from '../types';
//import {StationMeteo} from '../types';


export const AdminHome: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [users, setUsers] = useState<USER[]>([]);
  const [loading, setLoading] = useState(true);
  const [TemperatureMoyenne, setTemperatureMoyenne] = useState();
  const [TemperatureMax, setTemperatureMax] = useState();
   const [stations, setStations] = useState<any[]>([]);

  //recuperation api stats pour les alertes
  useEffect(() => {
    axios.get('http://localhost:8000/api/alertes/')
      .then(res => {
        setAlerts(res.data);
        //setFiltered(res.data);
      })
      .catch(err => console.error('Erreur de récupération des alertes', err));
  }, []);

  //alerte d'aujourdhui : filtrer par date 
      const today = new Date().toISOString().split('T')[0]; // Format: "2025-07-10"
      const alertsOfToday = alerts.filter((alert: any) => {
        return alert.date_alerte?.startsWith(today); // ou "date" selon ton champ exact
      });

  //recuperation api stats des users
useEffect(() => {
    axios.get('http://localhost:8000/api/auth/users/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}` // si tu utilises JWT
      }
    })
    .then(res => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des utilisateurs', err);
      setLoading(false);
    });
  }, []);


  //recuperation api des temperatures moyenne et max par jour
  useEffect(() => {
  axios.get('http://localhost:8000/api/temperature_stats/')
    .then(res => {
      setTemperatureMoyenne(res.data.temperature_moyenne);
      setTemperatureMax(res.data.temperature_max);
    })
    .catch(err => console.error('Erreur température moyenne :', err));
}, []);


 //recuperation des stations meteorlogiques
const villes = ['Dakar', 'Thies', 'Fatick'];
useEffect(() => {
    const fetchAll = async () => {
      const allData: any[] = [];

      for (const ville of villes) {
        try {
          const res = await axios.get(`http://localhost:8000/api/live-weather/${ville}/`);
          console.log(`Réponse pour ${ville}`, res.data);
          if (res.data) allData.push(res.data);
        } catch (error) {
          console.error(`Erreur pour ${ville} :`, error);
        }
      }

      console.log("Stations récupérées :", allData);
      setStations(allData);
      setLoading(false);
    };

    fetchAll();
  }, []);

 //transformer une temperature kelvin en celcius
  function kelvinToCelsius(kelvin: number): string {
  const celsius = kelvin - 273.15;
  return celsius.toFixed(1); // Format avec 1 chiffre après la virgule
}


// code couleur selon le niveau d'alerte 
  const alertsByLevel = [
    { name: 'normal', value: alertsOfToday.filter(a => a.niveau === 'normal').length, color: '#329ccdff' },
    { name: 'Inconfortable', value: alertsOfToday.filter(a => a.niveau === 'inconfortable').length, color: '#32CD32' },
    { name: 'Dangereux', value: alertsOfToday.filter(a => a.niveau === 'dangereux').length, color: '#F97316' },
    { name: 'Tres dangereux', value: alertsOfToday.filter(a => a.niveau === 'tres_dangereux').length, color: '#FF6347' },
  ];

  const temperatureData = mockHistoryData.map(data => ({
    ...data,
    date: new Date(data.date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 font-poppins mb-2">
          Tableau de bord administrateur
        </h1>
        <p className="text-gray-600 font-poppins">
          Vue d'ensemble de la plateforme ClimaWatch
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-poppins">Utilisateurs totaux</p>
              <p className="text-3xl font-bold text-primary font-poppins">{users.length}</p>
              <p className="text-xs text-green-600 font-poppins">+12% ce mois</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-poppins">Alertes actives</p>
              <p className="text-3xl font-bold text-orange-500 font-poppins">{alerts.filter(a => a.is_active === true).length}</p>
              <p className="text-xs text-orange-600 font-poppins">{alerts.filter(a => a.niveau === 'dangereux').length} dangereux</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-poppins">Température moy.</p>
              <p className="text-3xl font-bold text-red-500 font-poppins">{TemperatureMoyenne}°C</p>
              <p className="text-xs text-red-600 font-poppins">+2.3°C vs normale</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-poppins">Pic de température</p>
              <p className="text-3xl font-bold text-danger font-poppins">{TemperatureMax}°C</p>
              <p className="text-xs text-red-600 font-poppins">Aujourd'hui</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-4">
            Évolution des températures
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fontFamily: 'Poppins' }} />
                <YAxis tick={{ fontSize: 12, fontFamily: 'Poppins' }} />
                <Tooltip 
                  formatter={(value: number) => [`${value}°C`, 'Température']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#1E90FF" 
                  strokeWidth={3}
                  dot={{ fill: '#1E90FF', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-4">
            Répartition des alertes
          </h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={alertsByLevel}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {alertsByLevel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [value, 'Alertes']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {alertsByLevel.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600 font-poppins">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weather Stations and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Stations */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-4">
            Stations météorologiques du Senegal
          </h3>
          <div className="space-y-4">
            {stations.map((station, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 font-poppins">{station.ville}</p>
                    <p className="text-sm text-gray-500 font-poppins">
                      {station.latitude.toFixed(4)}, {station.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary font-poppins">
                    {kelvinToCelsius(station.temperature)}°C
                  </p>
                  <p className="text-sm text-gray-500 font-poppins">
                    {station.humidity}% humidité
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-4">
            Alertes récentes
          </h3>
          <div className="space-y-3">
            {alertsOfToday.slice(0, 3).map((alert) => {
              const getAlertColor = (level: string) => {
                switch (level) {
                  case 'tres_dangereux': return 'bg-red-100 text-red-800 border-red-200';
                  case 'dangereux': return 'bg-orange-100 text-orange-800 border-orange-200';
                  case 'inconfortable': return 'bg-green-100 text-green-800 border-green-200';
                  default: return 'bg-gray-100 text-gray-800 border-gray-200';
                }
              };

              return (
                <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.niveau)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-sm font-poppins">{alert.temp}</p>
                      <p className="text-xs font-poppins mt-1">{alert.region}</p>
                    </div>
                    <span className="text-xs font-poppins">
                      {new Date(alert.date_alerte).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-4 text-primary hover:text-primary/80 font-semibold text-sm font-poppins transition-colors">
            Voir toutes les alertes →
          </button>
        </div>
      </div>
    </div>
  );
};