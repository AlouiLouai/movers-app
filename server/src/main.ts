// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from 'nest-winston';
import { Logger } from 'winston';
import { LoggerService } from '@nestjs/common';

async function bootstrap() {
  // Create the app without logger first
  const app = await NestFactory.create(AppModule);

  // Get the Winston logger as LoggerService for NestJS
  const winstonLogger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);

  // Configure the app with the logger
  app.useLogger(winstonLogger); // Set Winston as the app-wide logger

  const configService = app.get(ConfigService);
  // Use WINSTON_MODULE_PROVIDER for raw Winston Logger
  const logger = app.get<Logger>(WINSTON_MODULE_PROVIDER); // Correct token for Winston Logger
  const port = configService.get<number>('app.port') || 3000;

  logger.debug(`Attempting to start application on port ${port}`);

  try {
    await app.listen(port);
    logger.info(`Application is running on port ${port}`);
  } catch (error) {
    logger.error('Failed to start the application', {
      error:
        error instanceof Error
          ? { message: error.message, stack: error.stack }
          : { raw: String(error) },
      port,
    });
    throw error; // Re-throw to trigger the outer .catch
  }
}

// Call and await the bootstrap function
bootstrap().catch((err: unknown) => {
  NestFactory.createApplicationContext(AppModule)
    .then((app) => app.get<Logger>(WINSTON_MODULE_PROVIDER)) // Use raw Winston Logger here too
    .then((logger: Logger) => {
      const errorDetails =
        err instanceof Error
          ? { message: err.message, stack: err.stack }
          : { raw: String(err) };
      logger.error('Error during bootstrap', { error: errorDetails });
    })
    .catch((fallbackErr) => {
      console.error('Error during bootstrap (fallback):', fallbackErr);
    })
    .finally(() => {
      console.log('Process exiting due to bootstrap failure');
      process.exit(1);
    });
});
