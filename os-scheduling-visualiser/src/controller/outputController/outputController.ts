import { Process } from "../../model/process/Process";
import { Scheduler } from "../../model/scheduler/Scheduler";
import { SchedulingStrategy } from "../../model/algorithms/SchedulingStrategy";
import { FCFS } from "../../model/algorithms/FCFS";
import { NPP } from "../../model/algorithms/NPP";
import { NPSJF } from "../../model/algorithms/NPSJF";
import { PP } from "../../model/algorithms/PP";
import { RR } from "../../model/algorithms/RR";
import { PSJF } from "../../model/algorithms/PSJF";
import { GraphController } from "./GraphController";

export class OutputController {
  private selectedAlgoSpan: HTMLSpanElement;
  private outputDescription: HTMLParagraphElement;
  private processTableBody: HTMLTableSectionElement;
  private tableDiv: HTMLDivElement;
  private chartDiv: HTMLDivElement;
  private graphController: GraphController;
  private scheduler: Scheduler;

  constructor() {
    this.selectedAlgoSpan = document.querySelector(
      "#algo-value"
    ) as HTMLSpanElement;
    this.outputDescription = document.querySelector(
      "#output-desc"
    ) as HTMLParagraphElement;
    this.processTableBody = document.querySelector(
      "#process-table-body"
    ) as HTMLTableSectionElement;
    this.tableDiv = document.querySelector("#table-div") as HTMLDivElement;
    this.chartDiv = document.querySelector(
      "#gantt-chart-div"
    ) as HTMLDivElement;
    this.graphController = new GraphController();
  }
  public solve(processes: Process[], algo: string, quantum: number) {
    this.clearOutput();
    this.initScheduler(processes, algo, quantum);
    this.initProcessTable(processes);
    this.displayUIElements(algo);
    this.runScheduler(quantum);
  }

  private runScheduler(quantum: number): void {
    let curSelectedProcess: Process | null = null;
    let prevSelectedProcess: Process | null = null;

    let intervalId = setInterval(() => {
      if (!this.scheduler.hasProcess()) {
        let avgTurnaround: string = this.scheduler.getAverageTurnaroundTime();
        let avgWaiting: string = this.scheduler.getAverageWaitingTime();
        this.insertAvgRow(avgTurnaround, avgWaiting);
        clearInterval(intervalId);
      }

      prevSelectedProcess = curSelectedProcess;
      curSelectedProcess = this.scheduler.progress();

      if (curSelectedProcess === null) return;

      // update table
      this.updateProcessRow(prevSelectedProcess);
      this.updateProcessRow(curSelectedProcess);

      // update graph
      this.graphController.addProcess(
        curSelectedProcess,
        this.scheduler.getElapsedTime() - quantum,
        quantum
      );
    }, quantum * 1000);
  }

  private displayUIElements(algo: string): void {
    this.selectedAlgoSpan.innerHTML = algo;
    this.selectedAlgoSpan.style.display = "block";
    this.outputDescription.style.display = "none";
    this.tableDiv.style.display = "block";
    this.chartDiv.style.display = "flex";
    this.graphController.renderChart();
  }
  private initScheduler(
    processes: Process[],
    algo: string,
    quantum: number
  ): void {
    this.scheduler = new Scheduler(processes, quantum);
    this.scheduler.setStrategy(this.getStrategy(algo));
  }

  private getStrategy(algo: string): SchedulingStrategy {
    switch (algo) {
      case "FCFS":
        return new FCFS();
      case "NPP":
        return new NPP();
      case "NPSJF":
        return new NPSJF();
      case "PP":
        return new PP();
      case "RR":
        return new RR();
      case "PSJF":
        return new PSJF();
      default:
        return new FCFS();
    }
  }

  private initProcessTable(processes: Process[]): void {
    processes.forEach((process: Process) => {
      let row: HTMLTableRowElement = this.processTableBody.insertRow();
      let idCell: HTMLTableCellElement = row.insertCell();
      let arrivalCell: HTMLTableCellElement = row.insertCell();
      let burstCell: HTMLTableCellElement = row.insertCell();
      let progressCell: HTMLTableCellElement = row.insertCell();
      let statusCell: HTMLTableCellElement = row.insertCell();
      let completionCell: HTMLTableCellElement = row.insertCell();
      let turnaroundCell: HTMLTableCellElement = row.insertCell();
      let waitingCell: HTMLTableCellElement = row.insertCell();

      row.id = `process-${process.getProcessId()}`;
      idCell.innerHTML = process.getProcessId().toString();
      arrivalCell.innerHTML = process.getArrivalTime().toString();
      burstCell.innerHTML = process.getBurstTime().toString();
      progressCell.innerHTML = "0%";
      statusCell.innerHTML = process.getStatus().toString();
      completionCell.innerHTML = "-";
      turnaroundCell.innerHTML = "-";
      waitingCell.innerHTML = "-";
    });
  }

  private updateProcessRow(process: Process | null): void {
    if (process === null) return;

    let processRow: HTMLTableRowElement | null =
      this.processTableBody.querySelector(`#process-${process.getProcessId()}`);

    if (processRow === null) return;

    let progressCell: HTMLTableCellElement = processRow.cells[3];
    let statusCell: HTMLTableCellElement = processRow.cells[4];
    let completionCell: HTMLTableCellElement = processRow.cells[5];
    let turnaroundCell: HTMLTableCellElement = processRow.cells[6];
    let waitingCell: HTMLTableCellElement = processRow.cells[7];

    progressCell.innerHTML = `${process.getProgress()}%`;
    statusCell.innerHTML = process.getStatus().toString();
    if (process.getStatus() === "COMPLETED") {
      completionCell.innerHTML = process.getCompletionTime().toString();
      turnaroundCell.innerHTML = process.getTurnaroundTime().toString();
      waitingCell.innerHTML = process.getWaitingTime().toString();
    }
  }

  private insertAvgRow(avgTurnaround: string, avgWaiting: string): void {
    const avgRow: HTMLTableRowElement = document.createElement("tr");
    avgRow.id = "avg-row";

    const avgTextCell: HTMLTableCellElement = document.createElement("td");
    avgTextCell.colSpan = 6;
    avgTextCell.style.textAlign = "right";
    avgTextCell.textContent = "Average";
    avgRow.appendChild(avgTextCell);

    const avgTurnaroundCell: HTMLTableCellElement =
      document.createElement("td");
    avgTurnaroundCell.textContent = avgTurnaround;
    avgRow.appendChild(avgTurnaroundCell);

    const avgWaitingCell: HTMLTableCellElement = document.createElement("td");
    avgWaitingCell.textContent = avgWaiting;
    avgRow.appendChild(avgWaitingCell);

    this.processTableBody.appendChild(avgRow);
  }

  private clearTableRows(): void {
    let rows: NodeListOf<HTMLTableRowElement> =
      this.processTableBody.querySelectorAll("tr");
    rows.forEach((row: HTMLTableRowElement) => {
      if (row.id !== "avg-row") {
        row.remove();
      }
    });

    let avgRow: HTMLTableRowElement | null =
      this.processTableBody.querySelector("#avg-row");
    if (avgRow !== null) {
      avgRow.remove();
    }
  }

  private clearOutput(): void {
    this.clearTableRows();
    this.graphController.clearChart();
  }
}
