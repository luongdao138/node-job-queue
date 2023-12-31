import { merge } from 'lodash';
import { JobQueueService } from './services';
import { WorkerConfig } from './types';
import { DefaultLogger } from './utils/default-logger';

const defaultConfig = {
  logger: new DefaultLogger({ label: 'JobQueue' }),
};

export class JobQueueWorker {
  private _jobQueueService: JobQueueService;
  private _config: Required<WorkerConfig>;

  constructor(config: WorkerConfig = defaultConfig) {
    this._jobQueueService = new JobQueueService();
    this._config = merge(defaultConfig, config);
  }

  /**
   * @description Starts the job queues running so that the worker can handle background jobs
   * @returns {JobQueueWorker}
   */
  async start(): Promise<JobQueueWorker> {
    this._config.logger.info('Bootstrapping job queue worker...');
    await this._jobQueueService.start();

    return this;
  }
}
