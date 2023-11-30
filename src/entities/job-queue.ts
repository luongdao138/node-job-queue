import { CreateQueueOptions, IJobQueue, JobData, Json } from '../types';

export class JobQueue<T extends JobData<T> = Json> implements IJobQueue {
  private _isStarted = false;

  constructor(private _options: CreateQueueOptions<T>) {}

  get isStarted() {
    return this._isStarted;
  }

  get name() {
    return this._options.name;
  }

  async stop() {
    this._isStarted = false;
    throw new Error('Method not implemented.');
  }

  async add() {
    throw new Error('Method not implemented.');
  }

  async start() {
    if (this._isStarted) {
      return;
    }

    this._isStarted = true;
  }
}
