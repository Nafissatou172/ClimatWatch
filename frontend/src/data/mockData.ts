import { Alert, WeatherData, HistoryData, Article } from '../types';

export const mockAlerts: Alert[] = [
  {
    id: '1',
    level: 'red',
    title: 'Alerte Canicule',
    message: 'Températures extrêmes prévues dans votre région. Restez hydraté et évitez les sorties aux heures chaudes.',
    date: new Date('2024-01-15T10:00:00'),
    zone: 'Paris Centre',
    active: true,
  },
  {
    id: '2',
    level: 'orange',
    title: 'Forte Chaleur',
    message: 'Températures élevées attendues. Prenez des précautions.',
    date: new Date('2024-01-14T14:30:00'),
    zone: 'Lyon',
    active: true,
  },
  {
    id: '3',
    level: 'green',
    title: 'Conditions Normales',
    message: 'Les conditions météorologiques sont dans la normale saisonnière.',
    date: new Date('2024-01-13T09:00:00'),
    zone: 'Marseille',
    active: false,
  },
];

export const mockWeatherData: WeatherData[] = [
  {
    id: '1',
    location: 'Paris',
    latitude: 48.8566,
    longitude: 2.3522,
    temperature: 28.5,
    humidity: 65,
    pressure: 1013,
    windSpeed: 15,
    timestamp: new Date(),
  },
  {
    id: '2',
    location: 'Lyon',
    latitude: 45.7640,
    longitude: 4.8357,
    temperature: 31.2,
    humidity: 58,
    pressure: 1015,
    windSpeed: 12,
    timestamp: new Date(),
  },
  {
    id: '3',
    location: 'Marseille',
    latitude: 43.2965,
    longitude: 5.3698,
    temperature: 25.8,
    humidity: 72,
    pressure: 1018,
    windSpeed: 18,
    timestamp: new Date(),
  },
];

export const mockHistoryData: HistoryData[] = [
  { date: '2024-01-08', temperature: 22.5, humidity: 68, alerts: 0 },
  { date: '2024-01-09', temperature: 24.2, humidity: 65, alerts: 1 },
  { date: '2024-01-10', temperature: 26.8, humidity: 62, alerts: 1 },
  { date: '2024-01-11', temperature: 29.1, humidity: 58, alerts: 2 },
  { date: '2024-01-12', temperature: 31.5, humidity: 55, alerts: 3 },
  { date: '2024-01-13', temperature: 28.9, humidity: 60, alerts: 2 },
  { date: '2024-01-14', temperature: 26.3, humidity: 63, alerts: 1 },
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Comment se protéger des vagues de chaleur',
    excerpt: 'Découvrez les gestes essentiels pour protéger votre santé lors des épisodes de forte chaleur.',
    content: 'Les vagues de chaleur peuvent être dangereuses pour la santé...',
    imageUrl: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date('2024-01-10'),
    author: 'Dr. Sophie Martin',
  },
  {
    id: '2',
    title: 'Le changement climatique en France',
    excerpt: 'Analyse des tendances climatiques observées sur le territoire français ces dernières décennies.',
    content: 'Le changement climatique en France se manifeste par...',
    imageUrl: 'https://images.pexels.com/photos/60013/desert-drought-dehydrated-clay-soil-60013.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date('2024-01-08'),
    author: 'Prof. Pierre Durand',
  },
  {
    id: '3',
    title: 'Adaptation urbaine aux îlots de chaleur',
    excerpt: 'Solutions innovantes pour réduire les températures en ville et améliorer le confort urbain.',
    content: 'Les îlots de chaleur urbains sont un phénomène...',
    imageUrl: 'https://images.pexels.com/photos/2629233/pexels-photo-2629233.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: new Date('2024-01-05'),
    author: 'Ing. Laura Petit',
  },
];