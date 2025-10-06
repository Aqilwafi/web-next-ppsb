export type UserRegister = {
  email: string;
  username: string;
  password: string;
  lembaga: string;
  tingkatan?: string;
  nama_lengkap: string;
  jenis_kelamin: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

// types/auth.d.ts
export type UserLoginResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    username: string;
  };
};




export type User = {
  id: string; // UUID
  email: string;
  lembaga?: string;
  tingkatan?: string;
};
