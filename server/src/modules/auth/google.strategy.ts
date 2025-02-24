import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
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

  validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): void {
    try {
      const user = this.extractUser(profile);
      done(null, user);
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

// ✅ Utility function for strict validation
export const getGoogleConfig = (configService: ConfigService) => {
  const clientID = configService.get<string>('google.clientID');
  const clientSecret = configService.get<string>('google.clientSecret');
  const callbackURL = configService.get<string>('google.callbackUrl');

  if (!clientID || !clientSecret || !callbackURL) {
    throw new Error('Missing required Google OAuth environment variables');
  }

  return { clientID, clientSecret, callbackURL };
};
