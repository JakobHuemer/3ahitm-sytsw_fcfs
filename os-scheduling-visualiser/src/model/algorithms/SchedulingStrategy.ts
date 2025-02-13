import { Process } from "../process/Process";
import { Scheduler } from "../scheduler/Scheduler";
export interface SchedulingStrategy {
  run(scheduler: Scheduler): Process | null;
}
