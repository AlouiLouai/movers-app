import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptionsWithoutRequest } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/common/interfaces/Jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const secret = configService.get<string>('jwt.secret');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment');
    }

    const jwtFromRequest = (req: Request): string | null => {
      const authHeader = req.headers.authorization;
      if (!authHeader || typeof authHeader !== 'string') {
        return null;
      }
      const [bearer, token] = authHeader.split(' ');
      return bearer === 'Bearer' ? token : null;
    };

    const options: StrategyOptionsWithoutRequest = {
      jwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: false,
    };

    super(options);
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.authService.findUserByGoogleId(payload.googleId);
    if (!user) {
      throw new UnauthorizedException('Invalid token: User not found');
    }
    return user;
  }
}
