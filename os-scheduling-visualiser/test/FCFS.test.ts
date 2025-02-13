import { Process } from "../src/model/process/Process";
import { Status } from "../src/model/process/Status";
import { SchedulingStrategy } from "../src/model/algorithms/SchedulingStrategy";
import { Scheduler } from "../src/model/scheduler/Scheduler";
import { FCFS } from "../src/model/algorithms/FCFS";
import { describe, test, expect } from "@jest/globals";

describe("FCFS Test", () => {
  test("should complete all processes and calculate correct times", () => {
    let process1 = new Process(1, 10);
    let process2 = new Process(2, 5);
    let process3 = new Process(3, 3);
    let process4 = new Process(4, 7);
    let process5 = new Process(5, 1);
    let scheduler = new Scheduler(
      [process1, process2, process3, process4, process5],
      1
    );

    let fcfs = new FCFS();
    scheduler.setStrategy(fcfs);
    while (scheduler.hasProcess()) {
      scheduler.progress();
    }

    expect(scheduler.getElapsedTime()).toBe(26);
    expect(scheduler.getAverageTurnaroundTime()).toBe("18.80");
    expect(scheduler.getAverageWaitingTime()).toBe("13.60");
    expect(process1.getCompletionTime()).toBe(10);
    expect(process2.getCompletionTime()).toBe(15);
    expect(process3.getCompletionTime()).toBe(18);
    expect(process4.getCompletionTime()).toBe(25);
    expect(process5.getCompletionTime()).toBe(26);
  });

  test("should complete all processes and calculate correct times", () => {
    let process1 = new Process(1, 5, 1);
    let process2 = new Process(2, 3, 2);
    let process3 = new Process(3, 8, 10);
    let scheduler = new Scheduler([process1, process2, process3], 1);
    let fcfs = new FCFS();
    scheduler.setStrategy(fcfs);

    while (scheduler.hasProcess()) {
      scheduler.progress();
    }

    expect(scheduler.getElapsedTime()).toBe(18);
    expect(scheduler.getAverageTurnaroundTime()).toBe("6.67");
    expect(scheduler.getAverageWaitingTime()).toBe("1.33");
    expect(process1.getCompletionTime()).toBe(6);
    expect(process2.getCompletionTime()).toBe(9);
    expect(process3.getCompletionTime()).toBe(18);
  });
});
