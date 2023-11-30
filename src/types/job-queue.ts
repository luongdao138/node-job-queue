import { ILogger } from './logger';

export type WorkerConfig = {
  logger?: ILogger;
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
