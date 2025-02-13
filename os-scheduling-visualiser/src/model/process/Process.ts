import { Scheduler } from "../scheduler/Scheduler";
import { Status } from "./Status";

export class Process {
  private processId: number;
  private burstTime: number;
  private arrivalTime: number;
  private completionTime: number;
  private workingTime: number;
  private priority: number;
  private status: Status = Status.READY;

  constructor(
    processId: number,
    burstTime: number,
    arrivalTime: number = 0,
    priority: number = 1,
    completionTime: number = 0
  ) {
    this.processId = processId;
    this.burstTime = burstTime;
    this.workingTime = burstTime;
    this.arrivalTime = arrivalTime;
    this.completionTime = completionTime;
    this.priority = priority;
  }

  setProcessId(processId: number) {
    this.processId = processId;
  }

  setBurstTime(burstTime: number) {
    this.burstTime = burstTime;
  }

  setArrivalTime(arrivalTime: number) {
    this.arrivalTime = arrivalTime;
  }

  setCompletionTime(completionTime: number) {
    this.completionTime = completionTime;
  }

  setPriority(priority: number) {
    this.priority = priority;
  }

  setStatus(status: Status) {
    this.status = status;
  }

  getProcessId(): number {
    return this.processId;
  }

  getBurstTime(): number {
    return this.burstTime;
  }

  getArrivalTime(): number {
    return this.arrivalTime;
  }

  getCompletionTime(): number {
    return this.completionTime;
  }

  getPriority(): number {
    return this.priority;
  }

  getStatus(): Status {
    return this.status;
  }

  getProgress(): string {
    return (
      ((this.workingTime - this.burstTime) / this.workingTime) *
      100
    ).toFixed(0);
  }

  getTurnaroundTime(): number {
    return this.completionTime - this.arrivalTime;
  }

  getWaitingTime(): number {
    return this.completionTime - this.arrivalTime - this.workingTime;
  }

  execute(scheduler: Scheduler): void {
    if (this.burstTime > scheduler.getQuantumTime()) {
      this.burstTime -= scheduler.getQuantumTime();
      scheduler.incrementElapsedTime();
    } else {
      scheduler.incrementElapsedTime(this.burstTime);
      this.burstTime = 0;
      this.completionTime = scheduler.getElapsedTime();
      this.status = Status.COMPLETED;
    }
  }

  print(): void {
    console.log(
      `Process ID: ${this.processId}, Burst Time: ${this.burstTime}, Arrival Time: ${this.arrivalTime}, Completion Time: ${this.completionTime}, Priority: ${this.priority}, Status: ${this.status}`
    );
  }
}
