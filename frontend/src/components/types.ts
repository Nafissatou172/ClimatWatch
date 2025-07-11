export interface AuthContextType {
  user: USER | null;
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
  error: string | null;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

export interface Alert {
  id: number;
  region: string;
  niveau: string;
  description: string;
  is_active: boolean;
  date_alerte: string;
  temp : number;

}

export interface USER {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  is_active: boolean;
  date_joined: string;
  last_login: string | null;
}

export interface StationMeteo {
   ville: string,
    temperature: number,
    humidity: number,
    wind_speed: number,
    latitude: number,
    longitude: number,
    description: string,
    icon: string,
    timestamps: string
}
