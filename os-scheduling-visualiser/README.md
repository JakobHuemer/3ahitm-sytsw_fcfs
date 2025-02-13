# CPU Scheduling Simulator

<div align="center">
  <img src="https://github.com/Abdulrahman295/CPU-Scheduling-Simulator/assets/89452130/b5e50b7f-7eec-4941-87cb-7acda1725265" alt="CPU Scheduling Simulator GIF">
  <p>A CPU Scheduling Simulator that supports FCFS, SJF, Priority, and Round Robin algorithms, featuring a user-friendly GUI. It includes a live Gantt Chart, displays average waiting and turnaround times, and provides real-time updates on remaining burst times for each process.</p>
</div>

## Features
- Live Scheduling Simulation where each time unit is mapped to 1 second in real time.
- Gantt Chart displaying the order and time taken by each process.
- Live updating tables showing the status, progress and other details for each process.
- Display of average waiting time and average turnaround time after all processes are completed.

## Supported Scheduling Algorithms
1) First-Come, First-Served (FCFS)
2) Shortest Job First (SJF)
   - Preemptive (PSJF)
   - Non-Preemptive (NPSJF)
3) Priority Scheduling
   - Preemptive (PP)
   - Non-Preemptive (NPP)
4) Round Robin (RR)

## UI Samples
### Preemptive Priority 
![ex1](https://github.com/Abdulrahman295/CPU-Scheduling-Simulator/assets/89452130/f0008961-e9d2-47b7-8510-0dc7321499a4)
### Round Robin
![ex2](https://github.com/Abdulrahman295/CPU-Scheduling-Simulator/assets/89452130/946df5d6-2895-429b-917c-3478dc02f4d8)


## Technologies Used

- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
- ![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=webpack&logoColor=black)
- ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

## Installation
1) Clone this repo:
```sh
git clone https://github.com/Abdulrahman295/CPU-Scheduling-Simulator.git
```

2) Install dependencies:
```sh
npm install
```

3) Build the app:
```sh
npm run build
```

## Testing
The CPU Scheduling Simulator includes a testing section to ensure the correctness and functionality of the implemented scheduling algorithms. To run the tests, use the following command:
```sh
npm test
```
The tests are written using Jest and can be found in the test/ directory, where each scheduling algorithm has its own test file

![test_ex](https://github.com/Abdulrahman295/CPU-Scheduling-Simulator/assets/89452130/76db064d-011b-4beb-b222-01aaf9cd15c5)

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.
