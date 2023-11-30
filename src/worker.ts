import { merge } from 'lodash';
import { JobQueueService } from './services';
import { RuntimeWorkerConfig, WorkerConfig } from './types';
import { DefaultLogger } from './utils/default-logger';

const defaultConfig = {
  logger: new DefaultLogger({ label: 'JobQueue' }),
  jobQueuePrefix: '',
  queues: [],
};

export class JobQueueWorker {
  private _jobQueueService: JobQueueService;
  private _config: RuntimeWorkerConfig;

  constructor(config: WorkerConfig = defaultConfig) {
    this._config = merge(defaultConfig, config);
    this._jobQueueService = new JobQueueService(this._config);
  }

  /**
   * @description Starts the job queues running so that the worker can handle background jobs
   * @returns {JobQueueWorker}
   */
  async start(): Promise<JobQueueWorker> {
    this._config.logger.info('Bootstrapping job queue worker...');

    // pre start
    await this.preStart();

    // start
    await this._jobQueueService.start();

    return this;
  }

  /**
   * @description Init some necessary things befor start
   */
  private async preStart() {
    const { queues } = this._config;

    // create queues before start
    await Promise.all(
      queues.map((queueOptions) =>
        this._jobQueueService.createQueue(queueOptions),
      ),
    );
  }

  /**
   * @description Expose service instance to use some necessary methods
   */
  get service() {
    return this._jobQueueService;
  }
}
