export interface JwtPayload {
  userId: string;
  googleId: string;
  email: string;
  iat?: number;
  exp?: number;
}
