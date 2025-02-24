declare namespace Express {
  interface Request {
    user: {
      googleId: string;
      email: string;
      name: string;
      avatar?: string;
    };
  }
}
