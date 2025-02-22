import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

// Call and await the bootstrap function here
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
