import {
  Controller,
  Get,
  Request,
  Inject,
  UnauthorizedException,
  UseGuards,
  Put,
  Body,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RequestWithCookies } from 'src/common/interfaces/CookiesType';
import { MoverService } from './mover.service';
import { JwtAuthGuard } from 'src/shared/jwt-auth.guard';

@Controller('mover')
export class MoverController {
  constructor(
    private readonly moverService: MoverService, // Inject MoverService
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  // New endpoint to get connected user profile
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: RequestWithCookies) {
    const token = req.cookies?.authToken;
    if (!token) {
      this.logger.warn('No auth token provided for profile request');
      throw new UnauthorizedException('No token provided');
    }

    const user = await this.moverService.getConnectedUserProfile(token);
    this.logger.info(`Profile returned for user: ${user.email}`);

    // Return user profile (customize fields as needed)
    return {
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req: RequestWithCookies,
    @Body() updateData: { name?: string; avatar?: string },
  ) {
    const token = req.cookies?.authToken;
    if (!token) {
      this.logger.warn('No auth token provided for profile update');
      throw new UnauthorizedException('No token provided');
    }
    const user = await this.moverService.updateProfile(token, updateData);
    this.logger.info(`Profile updated for user: ${user.email}`);
    return { email: user.email, name: user.name, avatar: user.avatar };
  }

  @Get('movers')
  async getMovers() {
    return await this.moverService.getAllMovers();
  }
}
