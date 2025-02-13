import { Process } from "../../model/process/Process";
import { OutputController } from "../outputController/OutputController";
export class InputController {
  private algoSelect: HTMLSelectElement;
  private arrivalInput: HTMLInputElement;
  private burstInput: HTMLInputElement;
  private priorityInput: HTMLInputElement;
  private priorityDiv: HTMLDivElement;
  private quantumInput: HTMLInputElement;
  private quantumDiv: HTMLDivElement;
  private solveButton: HTMLButtonElement;
  private outputController: OutputController;

  constructor() {
    this.algoSelect = document.querySelector(
      "#algo-select"
    ) as HTMLSelectElement;
    this.arrivalInput = document.querySelector(
      "#arrival-time"
    ) as HTMLInputElement;
    this.burstInput = document.querySelector("#burst-time") as HTMLInputElement;
    this.priorityInput = document.querySelector(
      "#priorities"
    ) as HTMLInputElement;
    this.quantumInput = document.querySelector(
      "#quantum-time"
    ) as HTMLInputElement;
    this.solveButton = document.querySelector(
      "#solve-btn"
    ) as HTMLButtonElement;

    this.priorityDiv = document.querySelector(
      "#priorities-div"
    ) as HTMLDivElement;
    this.quantumDiv = document.querySelector(
      "#time-quantum-div"
    ) as HTMLDivElement;

    this.solveButton.addEventListener(
      "click",
      this.onSolveButtonClick.bind(this)
    );
    this.algoSelect.addEventListener(
      "change",
      this.onAlgoSelectChange.bind(this)
    );
    this.outputController = new OutputController();
  }

  private onAlgoSelectChange(e: Event): void {
    const selectedAlgo: string = this.getAlgoSelectValue();

    if (selectedAlgo === "NPP" || selectedAlgo === "PP") {
      this.priorityDiv.style.display = "block";
      this.quantumDiv.style.display = "none";
    } else if (selectedAlgo === "RR") {
      this.priorityDiv.style.display = "none";
      this.quantumDiv.style.display = "block";
    } else {
      this.priorityDiv.style.display = "none";
      this.quantumDiv.style.display = "none";
    }
  }
  private onSolveButtonClick(e: Event): void {
    e.preventDefault();
    if (this.validateInputs()) {
      const processes: Process[] = this.getProcecess();
      const selectedAlgo: string = this.getAlgoSelectValue();
      const quantum: number =
        selectedAlgo === "RR" ? this.getQuantumInputValue() : 1;
      this.outputController.solve(processes, selectedAlgo, quantum);
    }
  }

  private getAlgoSelectValue() {
    return this.algoSelect.value;
  }

  private getArrivalInputValue(): number[] {
    return this.arrivalInput.value
      .trim()
      .split(" ")
      .map((val) => parseInt(val));
  }

  private getBurstInputValue(): number[] {
    return this.burstInput.value
      .trim()
      .split(" ")
      .map((val) => parseInt(val));
  }

  private getPriorityInputValue(): number[] {
    return this.priorityInput.value
      .trim()
      .split(" ")
      .map((val) => parseInt(val));
  }

  private getQuantumInputValue(): number {
    return parseInt(this.quantumInput.value);
  }

  private validateInputs(): boolean {
    const arrival: number[] = this.getArrivalInputValue();
    const burst: number[] = this.getBurstInputValue();
    const priority: number[] = this.getPriorityInputValue();
    const quantum: number = this.getQuantumInputValue();
    const selectedAlgo: string = this.getAlgoSelectValue();

    if (arrival.some((val) => isNaN(val))) {
      alert("Arrival time should be a number");
      return false;
    }

    if (arrival.some((val) => val < 0)) {
      alert("Arrival time should be greater than or equal to 0");
      return false;
    }

    if (burst.some((val) => isNaN(val))) {
      alert("Burst time should be a number");
      return false;
    }

    if (burst.some((val) => val < 1)) {
      alert("Burst time should be greater than 0");
      return false;
    }

    if (selectedAlgo === "RR" && isNaN(quantum)) {
      alert("Quantum time should be a number");
      return false;
    }

    if (selectedAlgo === "RR" && quantum < 1) {
      alert("Quantum time should be greater than 0");
      return false;
    }

    if (
      (selectedAlgo === "NPP" || selectedAlgo === "PP") &&
      priority.some((val) => isNaN(val))
    ) {
      alert("Priority should be a number");
      return false;
    }

    if (
      (selectedAlgo === "NPP" || selectedAlgo === "PP") &&
      priority.some((val) => val < 1)
    ) {
      alert("Priority should be greater than 0");
      return false;
    }

    if (arrival.length !== burst.length) {
      alert("Number of processes should be equal in all fields");
      return false;
    }

    if (
      (selectedAlgo === "NPP" || selectedAlgo === "PP") &&
      arrival.length !== priority.length
    ) {
      alert("Number of processes should be equal in all fields");
      return false;
    }

    return true;
  }

  private getProcecess(): Process[] {
    const arrival: number[] = this.getArrivalInputValue();
    const burst: number[] = this.getBurstInputValue();
    const priority: number[] = this.getPriorityInputValue();
    const selectedAlgo: string = this.getAlgoSelectValue();
    const processes: Process[] = [];
    const numProcesses: number = arrival.length;

    for (let i = 0; i < numProcesses; i++) {
      if (selectedAlgo === "NPP" || selectedAlgo === "PP") {
        processes.push(new Process(i + 1, burst[i], arrival[i], priority[i]));
      } else {
        processes.push(new Process(i + 1, burst[i], arrival[i]));
      }
    }

    return processes;
  }
}
