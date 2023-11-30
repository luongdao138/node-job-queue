- job queue architecture inspired by vendure job queue
- support expressjs
- main component to use is JobQueueService

## AppWorker

- this class is responsible for starting queue
- include a job queue service instance to start the queue

## Job Queue Service

- this class is used to create new job queue instances
- also used to work with job buffer

## Job Queue

- used to add a job to queue or buffer job
- use a job queue strategy and jog buffer service to start and process jobs

- how to init a queue and start a queue
  - to init a queue, use jobQueueService.createQueue() function or using `queues` in worker config options

## Job Buffer Service

- used to manage buffer: add, remove, flush

## Job Queue Strategy

- defined how jobs are persisted and accessed.
