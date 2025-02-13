import ApexCharts from "apexcharts";
import { Process } from "../../model/process/Process";

export class GraphController {
  private options: any;
  private chart: any;

  constructor() {
    this.options = {
      series: [],
      chart: {
        height: 150,
        width: 800,
        type: "rangeBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
          rangeBarGroupRows: true,
        },
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#3F51B5",
        "#546E7A",
        "#D4526E",
        "#8D5B4C",
        "#F86624",
        "#D7263D",
        "#1B998B",
        "#2E294E",
        "#F46036",
        "#E2C044",
        "#1B998B",
        "#2E294E",
        "#F46036",
        "#E2C044",
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#3F51B5",
      ],
      fill: {
        type: "solid",
      },
      xaxis: {
        type: "datetime",
        labels: {
          formatter: (value: number) => {
            return value.toFixed(1);
          },
        },
      },
      legend: {
        position: "right",
      },
      yaxis: {
        labels: {
          show: false,
        },
      },

      tooltip: {
        custom: function (opts: any) {
          const fromSeconds = opts.y1.toFixed(1);
          const toSeconds = opts.y2.toFixed(1);

          const w = opts.ctx.w;
          let ylabel = w.globals.labels[opts.dataPointIndex];
          let seriesName = w.config.series[opts.seriesIndex].name
            ? w.config.series[opts.seriesIndex].name
            : "";
          const color = w.globals.colors[opts.seriesIndex];

          return (
            '<div class="apexcharts-tooltip-rangebar">' +
            '<div> <span class="series-name" style="color: ' +
            color +
            '">' +
            (seriesName ? seriesName : "") +
            "</span></div>" +
            ' </span> <span class="value start-value">From (' +
            fromSeconds +
            ')</span> <span class="separator">-</span> <span class="value end-value">To (' +
            toSeconds +
            ")</span></div>" +
            "</div>"
          );
        },
      },
    };
  }

  public renderChart(): void {
    this.chart = new ApexCharts(document.querySelector("#chart"), this.options);
    this.chart.render();
  }

  public updateChart(): void {
    //Calculate min and max times for the x-axis
    let minTime = Infinity;
    let maxTime = -Infinity;
    this.options.series.forEach((processObj: any) => {
      processObj.data.forEach((interval: any) => {
        if (interval.y[0] < minTime) minTime = interval.y[0];
        if (interval.y[1] > maxTime) maxTime = interval.y[1];
      });
    });

    // Update x-axis range
    this.options.xaxis.min = minTime;
    this.options.xaxis.max = maxTime;

    this.chart.updateOptions({
      xaxis: {
        min: minTime,
        max: maxTime,
      },
    });

    this.chart.updateSeries(this.options.series);
  }

  public addProcess(
    process: Process,
    elapsedTime: number,
    quantum: number
  ): void {
    let processExists: boolean = false;
    this.options.series.forEach((processObj: any) => {
      if (processObj.name === `P${process.getProcessId()}`) {
        // if process exists, update data
        processObj.data.push({
          x: "Processes",
          y: [
            new Date(elapsedTime).getTime(),
            new Date(elapsedTime + quantum).getTime(),
          ],
        });
        processExists = true;
      }
    });

    if (!processExists) {
      let processObj = {
        name: `P${process.getProcessId()}`,
        data: [
          {
            x: "Processes",
            y: [
              new Date(elapsedTime).getTime(),
              new Date(elapsedTime + quantum).getTime(),
            ],
          },
        ],
      };
      this.options.series.push(processObj);
    }

    this.updateChart();
  }

  public clearChart(): void {
    if (!this.chart) return;
    this.options.series = [];
    this.chart.updateSeries(this.options.series);
  }
}
