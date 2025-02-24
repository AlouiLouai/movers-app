import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

interface GoogleProfile {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  private users: Map<string, GoogleProfile> = new Map(); // Simple in-memory storage

  async findOrCreateGoogleUser(googleProfile: GoogleProfile): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { googleId: googleProfile.googleId },
    });

    if (!user) {
      user = this.userRepository.create({
        googleId: googleProfile.googleId,
        email: googleProfile.email,
        name: googleProfile.name,
        avatar: googleProfile.avatar,
      });
      await this.userRepository.save(user);
    }

    return user;
  }
}
