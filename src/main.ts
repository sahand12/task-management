import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// Lifecycle events: Every application element has a lifecycle managed by Nest.
// Nest offers lifecycle hooks that provide visibility into key life moments and
// the ability to act when they occur.
// Lifecycle sequence:
// 1. OnModuleInit
// 2. OnApplicationBootstrap
// 3. OnModuleDestroy
// 4. OnApplicationShutdown

