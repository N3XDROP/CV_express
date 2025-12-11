export interface User {
  id: number;
  email: string;
  name: string;
  lastName: string;
  role: string; // '0' user, '1' admin
  createdAt?: string;
  uptatedAt?: string;
  deletedAt?: string | null;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}
