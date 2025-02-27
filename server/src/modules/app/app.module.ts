import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '../logger/winston.module';
import { appConfig, databaseConfig, googleConfig, jwtConfig } from 'src/config';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { MoverModule } from '../movers/mover.module';

@Module({
  imports: [
    // Load environment variables from .env files
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig, googleConfig, jwtConfig], // Load app and database configuration
      isGlobal: true, // Make config available globally
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Dynamically load the appropriate .env file
    }),
    // LoggerModule for Winston logging
    LoggerModule,
    // Configure TypeORM using ConfigService
    DatabaseModule,
    // The Google Auth20 module
    AuthModule,
    // The Mover Module
    MoverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
