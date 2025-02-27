import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { User } from '../auth/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MoverService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,

    private readonly authService: AuthService,
  ) {}

  // Get the profile of the currently connected user
  async getConnectedUserProfile(token: string): Promise<User> {
    try {
      this.logger.debug('Fetching connected user profile');

      // Verify the token and get the user
      const user = await this.authService.verifyToken(token);

      this.logger.info(`Profile retrieved for user: ${user.email}`);
      return user; // Returns User entity with email, name, avatar, etc.
    } catch (error) {
      this.logger.error(
        `Error fetching connected user profile: ${error instanceof Error ? error.message : String(error)}`,
        { stack: error instanceof Error ? error.stack : '' },
      );
      throw error; // Let the controller handle the exception
    }
  }

  async updateProfile(
    token: string,
    updateData: { name?: string; avatar?: string },
  ): Promise<User> {
    try {
      this.logger.debug('Updating user profile');
      const user = await this.authService.verifyToken(token);
      if (updateData.name) user.name = updateData.name;
      if (updateData.avatar) user.avatar = updateData.avatar;
      await this.userRepository.save(user);
      this.logger.info(`Profile updated for user: ${user.email}`);
      return user;
    } catch (error: any) {
      this.logger.error(`Error updating profile: ${error}`);
      throw new UnauthorizedException('Failed to update profile');
    }
  }
}
