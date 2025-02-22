// src/logger/logger.module.ts
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(), // Adds timestamp as string
            winston.format.colorize(), // Applies colors to level
            winston.format.printf(({ timestamp, level, message, context }) => {
              // Ensure TypeScript knows these are strings
              const typedTimestamp = timestamp as string;
              const typedLevel = level;
              const typedMessage = message as string;
              const typedContext = (context as string) || 'App';

              return `${typedTimestamp} [${typedLevel}] ${typedContext} - ${typedMessage}`;
            }),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          maxsize: 5 * 1024 * 1024, // 5MB
          maxFiles: 5, // Rotate up to 5 files
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
      level: process.env.LOG_LEVEL || 'info',
      defaultMeta: { service: 'moving-app' },
    }),
  ],
})
export class LoggerModule {}
