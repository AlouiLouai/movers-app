import { ConfigService } from '@nestjs/config';

export const getGoogleConfig = (configService: ConfigService) => {
  const clientID = configService.get<string>('google.clientID');
  const clientSecret = configService.get<string>('google.clientSecret');
  const callbackURL = configService.get<string>('google.callbackUrl');

  if (!clientID || !clientSecret || !callbackURL) {
    throw new Error('Missing required Google OAuth environment variables');
  }

  return { clientID, clientSecret, callbackURL };
};
