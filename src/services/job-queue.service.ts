import { JobQueue } from '../job-queue';
import { RuntimeWorkerConfig } from '../types';

export class JobQueueService {
  // save all job queues of application
  private _jobQueues: JobQueue[] = [];

  constructor(private _config: RuntimeWorkerConfig) {}

  async start() {
    for (const queue of this._jobQueues) {
      if (!queue.active) {
        this._config.logger.info(`Starting queue: ${queue.name}`);
        await queue.start();
      }
    }
  }
}
