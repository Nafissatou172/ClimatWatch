export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Alert {
  id: string;
  level: 'green' | 'orange' | 'red';
  title: string;
  message: string;
  date: Date;
  zone: string;
  active: boolean;
}

export interface WeatherData {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  timestamp: Date;
}

export interface HistoryData {
  date: string;
  temperature: number;
  humidity: number;
  alerts: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'user' | 'admin') => Promise<boolean>;
  isLoading: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishedAt: Date;
  author: string;
}