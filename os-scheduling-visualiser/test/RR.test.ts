import { Process } from "../src/model/process/Process";
import { Status } from "../src/model/process/Status";
import { SchedulingStrategy } from "../src/model/algorithms/SchedulingStrategy";
import { Scheduler } from "../src/model/scheduler/Scheduler";
import { RR } from "../src/model/algorithms/RR";
import { describe, test, expect } from "@jest/globals";

describe("RR Test", () => {
  test("should complete all processes and calculate correct times", () => {
    let process1 = new Process(1, 6, 0);
    let process2 = new Process(2, 4, 1);
    let process3 = new Process(3, 2, 2);
    let process4 = new Process(4, 3, 1);
    let scheduler = new Scheduler([process1, process2, process3, process4], 1);
    let rr = new RR();
    scheduler.setStrategy(rr);

    while (scheduler.hasProcess()) {
      scheduler.progress();
    }

    expect(scheduler.getElapsedTime()).toBe(15);
    expect(scheduler.getAverageTurnaroundTime()).toBe("10.50");
    expect(scheduler.getAverageWaitingTime()).toBe("6.75");
    expect(process1.getCompletionTime()).toBe(15);
    expect(process2.getCompletionTime()).toBe(13);
    expect(process3.getCompletionTime()).toBe(7);
    expect(process4.getCompletionTime()).toBe(11);
  });

  test("should complete all processes and calculate correct times", () => {
    let process1 = new Process(1, 10, 0);
    let process2 = new Process(2, 1, 0);
    let process3 = new Process(3, 2, 0);
    let process4 = new Process(4, 1, 0);
    let process5 = new Process(5, 5, 0);
    let scheduler = new Scheduler(
      [process1, process2, process3, process4, process5],
      1
    );
    let rr = new RR();
    scheduler.setStrategy(rr);
    while (scheduler.hasProcess()) {
      scheduler.progress();
    }

    expect(scheduler.getElapsedTime()).toBe(19);
    expect(scheduler.getAverageTurnaroundTime()).toBe("9.20");
    expect(scheduler.getAverageWaitingTime()).toBe("5.40");
    expect(process1.getCompletionTime()).toBe(19);
    expect(process2.getCompletionTime()).toBe(2);
    expect(process3.getCompletionTime()).toBe(7);
    expect(process4.getCompletionTime()).toBe(4);
    expect(process5.getCompletionTime()).toBe(14);
  });
});
