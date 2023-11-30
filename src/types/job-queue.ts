import { Job } from '../entities';
import { JobData } from './job';
import { ILogger } from './logger';

export type WorkerConfig = {
  /**
   * @description config default logger for job queue
   */
  logger?: ILogger;

  /**
   * @description add prefix to all queue name
   */
  jobQueuePrefix?: string;

  /**
   * @description init some queues before bootstrap
   * you can also create queue with `createQueue` function
   */
  queues?: CreateQueueOptions<any>[];
};

export type RuntimeWorkerConfig = Required<WorkerConfig>;

export interface IJobQueue {
  /**
   * Start the queue
   */
  start(): void | Promise<void>;

  /**
   * Stop the queue
   */
  stop(): void | Promise<void>;

  /**
   * @description Add a new job to the queue
   * @param data Data to create job
   */
  add(data: any): any;
}

/**
 * @description Options when create queue
 */
export type CreateQueueOptions<T extends JobData<T>> = {
  /**
   * @description Each queue must have a unique name
   */
  name: string;

  /**
   * @description Defines how the work to be done for each job in the queue. The returned promise should resolve when the job is complete, or be rejected when has error
   * @param job Job to process
   * @returns {Promise<any>}
   */
  process: (job: Job<T>) => Promise<any>;
};
