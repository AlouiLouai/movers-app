import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithCookies } from 'src/common/interfaces/CookiesType';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithCookies>();
    const token = request.cookies?.authToken;
    if (!token) {
      throw new UnauthorizedException('No auth token provided');
    }
    request.headers['authorization'] = `Bearer ${token}`; // Pass to JwtStrategy
    return super.canActivate(context);
  }
}
