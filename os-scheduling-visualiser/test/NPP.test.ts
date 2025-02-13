import { Process } from "../src/model/process/Process";
import { Status } from "../src/model/process/Status";
import { SchedulingStrategy } from "../src/model/algorithms/SchedulingStrategy";
import { Scheduler } from "../src/model/scheduler/Scheduler";
import { NPP } from "../src/model/algorithms/NPP";
import { describe, test, expect } from "@jest/globals";

describe("NPP Test", () => {
  test("should complete all processes and calculate correct times", () => {
    let process1 = new Process(1, 6, 2, 1);
    let process2 = new Process(2, 4, 5, 2);
    let process3 = new Process(3, 4, 5, 2);
    let scheduler = new Scheduler([process1, process2, process3], 1);
    let npp = new NPP();
    scheduler.setStrategy(npp);

    while (scheduler.hasProcess()) {
      scheduler.progress();
    }

    expect(scheduler.getElapsedTime()).toBe(16);
    expect(scheduler.getAverageTurnaroundTime()).toBe("8.00");
    expect(scheduler.getAverageWaitingTime()).toBe("3.33");
    expect(process1.getCompletionTime()).toBe(8);
    expect(process2.getCompletionTime()).toBe(12);
    expect(process3.getCompletionTime()).toBe(16);
  });

  test("should complete all processes and calculate correct times", () => {
    let process1 = new Process(1, 6, 0, 1);
    let process2 = new Process(2, 4, 1, 2);
    let process3 = new Process(3, 2, 2, 3);
    let process4 = new Process(4, 3, 3, 4);
    let scheduler = new Scheduler([process1, process2, process3, process4], 1);
    let npp = new NPP();
    scheduler.setStrategy(npp);

    while (scheduler.hasProcess()) {
      scheduler.progress();
    }

    expect(scheduler.getElapsedTime()).toBe(15);
    expect(scheduler.getAverageTurnaroundTime()).toBe("9.25");
    expect(scheduler.getAverageWaitingTime()).toBe("5.50");
    expect(process1.getCompletionTime()).toBe(6);
    expect(process2.getCompletionTime()).toBe(10);
    expect(process3.getCompletionTime()).toBe(12);
    expect(process4.getCompletionTime()).toBe(15);
  });
});
