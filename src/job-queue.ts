import { IJobQueue } from './types';

export class JobQueue implements IJobQueue {
  private _running = false;

  get active() {
    return this._running;
  }

  get name() {
    // TODO: replace by the queue name provided when init queue
    return 'My Queue';
  }

  async stop() {
    this._running = false;
    throw new Error('Method not implemented.');
  }

  async add() {
    throw new Error('Method not implemented.');
  }

  async start() {
    if (this._running) {
      return;
    }

    this._running = true;
  }
}
