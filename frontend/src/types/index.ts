export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface SignupData {
  email: string;
  name: string;
  password: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  timestamp: string;
  path: string;
}

export interface Grade {
  date: string;
  grade: string;
  score: number;
}

export interface Address {
  building: string;
  coord: [number, number];
  street: string;
  zipcode: string;
}

export interface Restaurant {
  _id?: string;
  name: string;
  restaurant_id: string;
  borough: string;
  cuisine: string;
  address: Address;
  grades: Grade[];
}
