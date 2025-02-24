import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
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
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    try {
      // Extract user data from Google profile
      const googleProfile = this.extractUser(profile);

      // Find or create the user in the database
      const user = await this.authService.findOrCreateGoogleUser(googleProfile);
      done(null, user); // Return the user
    } catch (error) {
      done(error, undefined);
    }
  }

  private extractUser(profile: Profile) {
    const { id, displayName, emails, photos } = profile;
    return {
      googleId: id,
      email: emails?.[0]?.value ?? '',
      name: displayName,
      avatar: photos?.[0]?.value ?? '',
    };
  }
}

export const getGoogleConfig = (configService: ConfigService) => {
  const clientID = configService.get<string>('google.clientID');
  const clientSecret = configService.get<string>('google.clientSecret');
  const callbackURL = configService.get<string>('google.callbackUrl');

  if (!clientID || !clientSecret || !callbackURL) {
    throw new Error('Missing required Google OAuth environment variables');
  }

  return { clientID, clientSecret, callbackURL };
};
