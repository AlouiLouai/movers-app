import { Request as ExpressRequest } from 'express';

// Extend Express Request type to include cookies
export interface RequestWithCookies extends ExpressRequest {
  cookies: { [key: string]: string | undefined };
}
