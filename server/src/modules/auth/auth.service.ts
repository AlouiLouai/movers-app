import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { GoogleProfile } from 'src/common/interfaces/GoogleProfile';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/Jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,

    private readonly jwtService: JwtService,
  ) {}

  // Function to find or create a Google user and return a JWT token
  async findOrCreateGoogleUser(
    googleProfile: GoogleProfile,
  ): Promise<{ user: User; token: string }> {
    try {
      this.logger.debug(`Looking for Google user: ${googleProfile.email}`);

      // Look for user by Google ID
      let user = await this.userRepository.findOne({
        where: { googleId: googleProfile.googleId },
      });

      if (!user) {
        this.logger.info(`Creating new Google user: ${googleProfile.email}`);

        // If user doesn't exist, create a new one
        user = this.userRepository.create({
          googleId: googleProfile.googleId,
          email: googleProfile.email,
          name: googleProfile.name,
          avatar: googleProfile.avatar,
        });

        // Save the new user to the database
        await this.userRepository.save(user);
      }

      this.logger.info('User found or created:', user.email);

      // Generate a JWT token
      const token = this.jwtService.sign({
        userId: user.id,
        googleId: user.googleId,
        email: user.email,
      });

      this.logger.info(`JWT token generated for: ${user.email}`);

      // Return user and token
      return { user, token };
    } catch (error: unknown) {
      // Enhanced error handling
      this.logger.error(
        `Error in findOrCreateGoogleUser: ${error instanceof Error ? error.message : String(error)}`,
        {
          stack: error instanceof Error ? error.stack : '',
        },
      );
      throw error;
    }
  }

  // Function to find a user by their Google ID
  async findUserByGoogleId(googleId: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { googleId } });
    } catch (error: unknown) {
      this.logger.error(`Error finding user by Google ID: ${googleId}`, {
        error: error instanceof Error ? error.message : String(error),
      });
      throw new UnauthorizedException('User not found');
    }
  }

  // Function to verify a JWT token
  async verifyToken(token: string): Promise<User> {
    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { id: payload.userId },
      });

      if (!user) throw new Error('User not found');
      return user;
    } catch (error: any) {
      this.logger.error(
        `Token verification failed: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new UnauthorizedException('Invalid token');
    }
  }
}
