import { Controller, Get, Request, UseGuards, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request as ExpressRequest } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

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
  async googleAuthRedirect(@Request() req: ExpressRequest) {
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

      return {
        message: 'Login successful',
        user: {
          googleId: user.googleId,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          token,
        },
      };
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
}
