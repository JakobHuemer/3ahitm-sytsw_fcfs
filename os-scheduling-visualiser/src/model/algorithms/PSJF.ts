import { Scheduler } from "../scheduler/Scheduler";
import { SchedulingStrategy } from "./SchedulingStrategy";
import { Status } from "../process/Status";
import { Process } from "../process/Process";

// preemptive shortest job first
export class PSJF implements SchedulingStrategy {
  run(scheduler: Scheduler): Process | null {
    // stop any running process
    scheduler.stopRunningProcess();

    // sort by burst time
    scheduler
      .getProcesses()
      .sort((a, b) => a.getBurstTime() - b.getBurstTime());

    // select the first process that is ready to run
    for (let i = 0; i < scheduler.getProcesses().length; i++) {
      if (
        scheduler.getProcesses()[i].getStatus() == Status.READY &&
        scheduler.getProcesses()[i].getArrivalTime() <=
          scheduler.getElapsedTime()
      ) {
        scheduler.getProcesses()[i].setStatus(Status.RUNNING);
        scheduler.getProcesses()[i].execute(scheduler);
        return scheduler.getProcesses()[i];
      }
    }

    // increment the elapsed time by the quantum time if no process is ready to run
    scheduler.incrementElapsedTime();

    return null;
  }
}
