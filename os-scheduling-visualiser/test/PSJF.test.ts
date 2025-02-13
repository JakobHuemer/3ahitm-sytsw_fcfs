import { Process } from "../src/model/process/Process";
import { Status } from "../src/model/process/Status";
import { SchedulingStrategy } from "../src/model/algorithms/SchedulingStrategy";
import { Scheduler } from "../src/model/scheduler/Scheduler";
import { PSJF } from "../src/model/algorithms/PSJF";
import { describe, test, expect } from "@jest/globals";

describe("PSJF Test", () => {
  test("should complete all processes and calculate correct times", () => {
    let process1 = new Process(1, 6, 2);
    let process2 = new Process(2, 2, 5);
    let process3 = new Process(3, 8, 1);
    let process4 = new Process(4, 3, 0);
    let process5 = new Process(5, 4, 4);
    let scheduler = new Scheduler(
      [process1, process2, process3, process4, process5],
      1
    );

    let psjf = new PSJF();
    scheduler.setStrategy(psjf);
    while (scheduler.hasProcess()) {
      scheduler.progress();
    }

    expect(scheduler.getElapsedTime()).toBe(23);
    expect(scheduler.getAverageTurnaroundTime()).toBe("9.20");
    expect(scheduler.getAverageWaitingTime()).toBe("4.60");
    expect(process1.getCompletionTime()).toBe(15);
    expect(process2.getCompletionTime()).toBe(7);
    expect(process3.getCompletionTime()).toBe(23);
    expect(process4.getCompletionTime()).toBe(3);
    expect(process5.getCompletionTime()).toBe(10);
  });

  test("should complete all processes and calculate correct times", () => {
    let process1 = new Process(1, 6, 0);
    let process2 = new Process(2, 4, 1);
    let process3 = new Process(3, 2, 2);
    let process4 = new Process(4, 3, 3);
    let scheduler = new Scheduler([process1, process2, process3, process4], 1);
    let psjf = new PSJF();
    scheduler.setStrategy(psjf);

    while (scheduler.hasProcess()) {
      scheduler.progress();
    }

    expect(scheduler.getElapsedTime()).toBe(15);
    expect(scheduler.getAverageTurnaroundTime()).toBe("7.50");
    expect(scheduler.getAverageWaitingTime()).toBe("3.75");
    expect(process1.getCompletionTime()).toBe(15);
    expect(process2.getCompletionTime()).toBe(10);
    expect(process3.getCompletionTime()).toBe(4);
    expect(process4.getCompletionTime()).toBe(7);
  });
});
