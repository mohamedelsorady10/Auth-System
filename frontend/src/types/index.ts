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
