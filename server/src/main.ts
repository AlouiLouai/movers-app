import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Accessing the configuration service to get the port value
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3000; // Ensure fallback if config not found

  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}

// Call and await the bootstrap function here
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
