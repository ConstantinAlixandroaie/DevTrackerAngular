export interface UserLite{
    id: number;
    email: string;
}
export interface LoginRequest{
  email: string;
  password: string;
}

export interface LoginResponse{
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface RegisterRequest{
  email: string;
  password: string;
}

export interface RegisterResponse{
  type: string;
  title: string;
  status: number;
  instance: string;
  errors: { 
    [key: string]: string[]; 
  };
}