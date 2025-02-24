import { Injectable } from '@nestjs/common';

interface GoogleProfile {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
}

@Injectable()
export class AuthService {
  private users: Map<string, GoogleProfile> = new Map(); // Simple in-memory storage

  findOrCreateGoogleUser(googleProfile: GoogleProfile): GoogleProfile {
    let user = this.users.get(googleProfile.googleId);

    if (!user) {
      user = {
        googleId: googleProfile.googleId,
        email: googleProfile.email,
        name: googleProfile.name,
        avatar: googleProfile.avatar,
      };

      this.users.set(googleProfile.googleId, user);
    }

    return user;
  }
}
