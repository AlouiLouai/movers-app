import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request as ExpressRequest } from 'express'; // Import Express Request

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Initiates the Google OAuth flow
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Google OAuth flow will redirect to the callback URL
    // No additional logic is needed here because @UseGuards does all the heavy lifting.
  }

  // Handles the redirect after Google authentication
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req: ExpressRequest) {
    // `req.user` will contain the user's Google profile after successful authentication
    const user = this.authService.findOrCreateGoogleUser(req.user);

    // Return a response to the client with the user info
    return {
      message: 'Login successful',
      user: {
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    };
  }
}
