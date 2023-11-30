import { JobQueueWorker } from './worker';

async function bootstrap() {
  const worker = new JobQueueWorker();

  await worker.start();
}

bootstrap();
