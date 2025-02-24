import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { GoogleProfile } from 'src/common/interfaces/GoogleProfile';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async findOrCreateGoogleUser(googleProfile: GoogleProfile): Promise<User> {
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
        await this.userRepository.save(user);
        this.logger.info(`User successfully created: ${user.email}`);
      } else {
        this.logger.debug(`User already exists: ${user.email}`);
      }

      return user;
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
}
