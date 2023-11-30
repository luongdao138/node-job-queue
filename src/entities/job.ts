import { JobData } from '../types';

export class Job<T extends JobData<T> = any> {}
