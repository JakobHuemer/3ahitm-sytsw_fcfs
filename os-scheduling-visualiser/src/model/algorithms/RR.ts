import { Scheduler } from "../scheduler/Scheduler";
import { SchedulingStrategy } from "./SchedulingStrategy";
import { Status } from "../process/Status";
import { Process } from "../process/Process";

// round robin
export class RR implements SchedulingStrategy {
  run(scheduler: Scheduler): Process | null {
    // stop any running process
    scheduler.stopRunningProcess();

    // select the first process that is ready to run
    for (let i = 0; i < scheduler.getProcesses().length; i++) {
      if (
        scheduler.getProcesses()[i].getStatus() == Status.READY &&
        scheduler.getProcesses()[i].getArrivalTime() <=
          scheduler.getElapsedTime()
      ) {
        scheduler.getProcesses()[i].setStatus(Status.RUNNING);
        scheduler.getProcesses()[i].execute(scheduler);
        let selectedProcess = scheduler.getProcesses()[i];
        // move the process to the end of the queue
        scheduler.getProcesses().push(scheduler.getProcesses().splice(i, 1)[0]);
        return selectedProcess;
      }
    }

    // increment the elapsed time by the quantum time if no process is ready to run
    scheduler.incrementElapsedTime();
    return null;
  }
}
