import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { User } from '../auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is available
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [User],
        //synchronize: configService.get<string>('app.env') === 'development',
        synchronize: true,
        logging: configService.get<string>('app.env') === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
