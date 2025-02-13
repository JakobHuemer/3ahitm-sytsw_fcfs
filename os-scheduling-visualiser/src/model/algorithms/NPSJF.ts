import { Scheduler } from "../scheduler/Scheduler";
import { SchedulingStrategy } from "./SchedulingStrategy";
import { Status } from "../process/Status";
import { Process } from "../process/Process";

// non-preemptive shortest job first
export class NPSJF implements SchedulingStrategy {
  run(scheduler: Scheduler): Process | null {
    // sort processes by burst time
    scheduler
      .getProcesses()
      .sort((a, b) => a.getBurstTime() - b.getBurstTime());

    // check if there are any processes that are not running currently
    const notRunningProcesses = scheduler
      .getProcesses()
      .filter((process) => process.getStatus() !== Status.RUNNING);

    // if there are no processes running currently and there are processes that are ready to run change the status of the first process to running
    if (notRunningProcesses.length == scheduler.getProcesses().length) {
      for (let i = 0; i < scheduler.getProcesses().length; i++) {
        if (
          scheduler.getProcesses()[i].getStatus() == Status.READY &&
          scheduler.getProcesses()[i].getArrivalTime() <=
            scheduler.getElapsedTime()
        ) {
          scheduler.getProcesses()[i].setStatus(Status.RUNNING);
          return null;
        }
      }
    }

    // if there are processes running currently execute the first process that is running
    for (let i = 0; i < scheduler.getProcesses().length; i++) {
      if (scheduler.getProcesses()[i].getStatus() == Status.RUNNING) {
        scheduler.getProcesses()[i].execute(scheduler);
        return scheduler.getProcesses()[i];
      }
    }

    // if processes do not arrive yet, increment the elapsed time by the quantum time
    scheduler.incrementElapsedTime();
    return null;
  }
}
