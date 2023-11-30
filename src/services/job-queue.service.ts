import { JobQueue } from '../entities/job-queue';
import { CreateQueueOptions, JobData, RuntimeWorkerConfig } from '../types';
import { concatString } from '../utils';

export class JobQueueService {
  // save all job queues of application
  private _jobQueues: JobQueue[] = [];

  // a flag to know if this service is started or not
  private _isStarted = false;

  constructor(private _config: RuntimeWorkerConfig) {}

  /**
   * Start the job queue service, start all the queues to process job
   */
  async start() {
    // mark this service is already inited
    this._isStarted = false;

    // start each queues
    for (const queue of this._jobQueues) {
      // if the queue has not started yet, we start the queue
      if (!queue.isStarted) {
        this._config.logger.info(`Starting queue: ${queue.name}`);
        await queue.start();
      }
    }
  }

  /**
   * @description Create a new job queue and add to queue array
   */
  async createQueue<T extends JobData<T>>(options: CreateQueueOptions<T>) {
    const { jobQueuePrefix } = this._config;
    if (jobQueuePrefix) {
      options.name = concatString('', jobQueuePrefix, options.name);
    }

    // check if queue name exist or not
    const isExist = this._jobQueues.some(
      (queue) => queue.name === options.name,
    );
    if (isExist) {
      throw Error(`Queue with name '${options.name}' already exists`);
    }

    const jobQueue = new JobQueue(options);

    if (this._isStarted) {
      // if job queue service has already started, start the queue when created
      await jobQueue.start();
    }

    // add the new queue to job queue arrays
    this._jobQueues.push(jobQueue);
    return jobQueue;
  }
}
