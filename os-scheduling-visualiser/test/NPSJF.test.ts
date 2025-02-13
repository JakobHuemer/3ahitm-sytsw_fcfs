import { Process } from "../src/model/process/Process";
import { Status } from "../src/model/process/Status";
import { SchedulingStrategy } from "../src/model/algorithms/SchedulingStrategy";
import { Scheduler } from "../src/model/scheduler/Scheduler";
import { NPSJF } from "../src/model/algorithms/NPSJF";
import { describe, test, expect } from "@jest/globals";

describe("NPSJF Test", () => {
  test("should complete all processes and calculate correct times", () => {
    let process1 = new Process(1, 6, 3);
    let process2 = new Process(2, 8, 1);
    let process3 = new Process(3, 7, 2);
    let scheduler = new Scheduler([process1, process2, process3], 1);
    let npsjf = new NPSJF();
    scheduler.setStrategy(npsjf);

    while (scheduler.hasProcess()) {
      scheduler.progress();
    }

    expect(scheduler.getElapsedTime()).toBe(22);
    expect(scheduler.getAverageTurnaroundTime()).toBe("13.33");
    expect(scheduler.getAverageWaitingTime()).toBe("6.33");
    expect(process1.getCompletionTime()).toBe(15);
    expect(process2.getCompletionTime()).toBe(9);
    expect(process3.getCompletionTime()).toBe(22);
  });

  test("should complete all processes and calculate correct times", () => {
    let process1 = new Process(1, 5, 1);
    let process2 = new Process(2, 3, 2);
    let process3 = new Process(3, 8, 10);
    let process4 = new Process(4, 2, 19);
    let scheduler = new Scheduler([process1, process2, process3, process4], 1);
    let npsjf = new NPSJF();
    scheduler.setStrategy(npsjf);

    while (scheduler.hasProcess()) {
      scheduler.progress();
    }

    expect(scheduler.getElapsedTime()).toBe(21);
    expect(scheduler.getAverageTurnaroundTime()).toBe("5.50");
    expect(scheduler.getAverageWaitingTime()).toBe("1.00");
    expect(process1.getCompletionTime()).toBe(6);
    expect(process2.getCompletionTime()).toBe(9);
    expect(process3.getCompletionTime()).toBe(18);
    expect(process4.getCompletionTime()).toBe(21);
  });
});
