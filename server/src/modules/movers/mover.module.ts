import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { MoverController } from './mover.controller';
import { MoverService } from './mover.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [MoverController],
  providers: [MoverService],
})
export class MoverModule {}
