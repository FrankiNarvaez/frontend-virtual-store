export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface UserProfile {
  onClose: () => void;
  user: User
}