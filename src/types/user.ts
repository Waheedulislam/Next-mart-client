export interface IUser {
  userId: string;
  name: string;
  email: string;
  hasShop?: string;
  isActive?: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}
