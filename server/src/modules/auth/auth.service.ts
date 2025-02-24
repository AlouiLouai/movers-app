import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { GoogleProfile } from 'src/common/interfaces/GoogleProfile';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,

    private readonly jwtService: JwtService,
  ) {}

  async findOrCreateGoogleUser(
    googleProfile: GoogleProfile,
  ): Promise<{ user: User; token: string }> {
    try {
      this.logger.debug(`Looking for Google user: ${googleProfile.email}`);

      let user = await this.userRepository.findOne({
        where: { googleId: googleProfile.googleId },
      });

      if (!user) {
        this.logger.info(`Creating new Google user: ${googleProfile.email}`);

        user = this.userRepository.create({
          googleId: googleProfile.googleId,
          email: googleProfile.email,
          name: googleProfile.name,
          avatar: googleProfile.avatar,
        });
      }

      // Generate JWT token
      const token = this.jwtService.sign({
        userId: user.id,
        googleId: user.googleId,
        email: user.email,
      });

      // Save token to the database
      user.token = token;
      await this.userRepository.save(user);

      this.logger.info(`User successfully created: ${user.email}`);

      return { user, token };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error in findOrCreateGoogleUser: ${error.message}`, {
          stack: error.stack,
        });
      } else {
        this.logger.error('Unexpected error in findOrCreateGoogleUser', {
          rawError: String(error),
        });
      }

      throw error;
    }
  }

  async findUserByGoogleId(googleId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { googleId } });
  }
}
