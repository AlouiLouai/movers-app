import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { GoogleProfile } from 'src/common/interfaces/GoogleProfile';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getGoogleConfig } from 'src/utils/googleConfig';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger: Logger;

  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER) logger: Logger,
  ) {
    const { clientID, clientSecret, callbackURL } =
      getGoogleConfig(configService);
    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });

    this.logger = logger;
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    try {
      this.logger.debug(
        `Google OAuth Login Attempt: ${profile.emails?.[0]?.value}`,
      );

      // Extract user data from Google profile
      const googleProfile = this.extractUser(profile);

      // Find or create the user in the database
      const user = await this.authService.findOrCreateGoogleUser(googleProfile);

      this.logger.info(`Google OAuth Success for: ${user.user.email}`);

      done(null, user); // Return the user
    } catch (error: unknown) {
      this.logger.error('Google OAuth validation failed', {
        error: error instanceof Error ? error.message : String(error),
      });

      // Handle unknown error type
      throw new UnauthorizedException(
        error instanceof Error
          ? `Google OAuth validation failed: ${error.message}`
          : 'Google OAuth validation failed',
      );
    }
  }

  private extractUser(profile: Profile): GoogleProfile {
    const { id, displayName, emails, photos } = profile;
    return {
      googleId: id,
      email: emails?.[0]?.value ?? '',
      name: displayName,
      avatar: photos?.[0]?.value ?? '',
    };
  }
}
