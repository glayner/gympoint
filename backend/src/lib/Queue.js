import Bee from 'bee-queue';
import redisConfig from '../config/redis';
import CreationMail from '../app/jobs/CreationMail';
import HelpOrderMail from '../app/jobs/HelpOrderMail';

const jobs = [CreationMail, HelpOrderMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ Key, handle }) => {
      this.queues[Key] = {
        bee: new Bee(Key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.Key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}
export default new Queue();
