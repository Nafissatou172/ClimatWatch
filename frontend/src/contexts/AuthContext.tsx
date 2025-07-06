// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string,
    password2: string,
    firstName: string,
    lastName: string
  ) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Configuration de l'instance axios
  const api = axios.create({
    baseURL: 'http://localhost:8000/api/auth/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Vérifier le token et récupérer les infos utilisateur
          const response = await api.get('users/me/', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Erreur de vérification du token:', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.post('login/', { email, password });
      
      // Stocker les tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Récupérer les infos utilisateur
      const userResponse = await api.get('users/me/', {
        headers: {
          'Authorization': `Bearer ${response.data.access}`,
        },
      });
      
      setUser(userResponse.data);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    password2: string,
    firstName: string,
    lastName: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      await api.post('register/', {
        username,
        email,
        password,
        password2,
        first_name: firstName,
        last_name: lastName,
      });
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};