import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '../logger/winston.module';
import { appConfig, databaseConfig } from 'src/config';

@Module({
  imports: [
    // Load environment variables from .env files
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig], // Load app and database configuration
      isGlobal: true, // Make config available globally
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Dynamically load the appropriate .env file
    }),

    // LoggerModule for Winston logging
    LoggerModule,

    // Configure TypeORM using ConfigService
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('app.env') === 'development',
        logging: configService.get<string>('app.env') === 'development',
      }),
      inject: [ConfigService], // Inject ConfigService to use its methods
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
