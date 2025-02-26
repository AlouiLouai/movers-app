import {
  Controller,
  Get,
  Request,
  UseGuards,
  Inject,
  Res,
  UnauthorizedException,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request as ExpressRequest, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RequestWithCookies } from 'src/common/interfaces/CookiesType';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  // Initiates the Google OAuth flow
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    this.logger.debug('Google OAuth login initiated');
    // No additional logic needed as @UseGuards handles redirection
  }

  // Handles the redirect after Google authentication
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Request() req: ExpressRequest,
    @Res() res: Response,
  ) {
    try {
      this.logger.debug('Google OAuth callback received');

      if (!req.user) {
        this.logger.warn('Google OAuth callback called, but no user found');
        throw new Error('Google authentication failed');
      }

      this.logger.info(`Authenticating Google user: ${req.user?.email}`);

      // Process user authentication
      const { user, token } = await this.authService.findOrCreateGoogleUser(
        req.user,
      );

      this.logger.info(`User authenticated: ${user.email}`);

      // Set token as an HTTP-only cookie
      res.cookie('authToken', token, {
        httpOnly: true, // Prevents JavaScript access
        secure: false, // Set to true in production with HTTPS
        sameSite: 'none', // Prevents CSRF
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      });

      // Redirect directly to dashboard
      res.redirect('http://localhost:3000/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error in googleAuthRedirect: ${error.message}`, {
          stack: error.stack,
        });
      } else {
        this.logger.error('Unexpected error in googleAuthRedirect', {
          rawError: String(error),
        });
      }

      throw error;
    }
  }

  @Get('verify')
  async verifyToken(@Request() req: RequestWithCookies) {
    const token = req.cookies?.authToken;
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    const user = await this.authService.verifyToken(token);
    return { email: user.email };
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logged out' });
  }
}
