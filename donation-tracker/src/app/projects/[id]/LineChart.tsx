"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface LineChartType {
  start: string;
  end: string;
  goal: number;
  progress: number;
  chartData: {
    x: string;
    y: number;
  }[];
}

const LineChart: React.FC<LineChartType> = ({
  start,
  end,
  goal,
  progress,
  chartData,
}) => {
  // get todays date for chart
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10);

  const data = {
    datasets: [
      // data line, append a 0 start at the start and todays date at the end to fill chart
      {
        data: [{ x: start, y: 0 }]
          .concat(chartData)
          .concat([{ x: formattedDate, y: progress }]),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
      // goal line
      {
        data: [
          { x: 0, y: goal },
          { x: end, y: goal },
        ],
        borderColor: "rgb(0, 0, 0)",
        borderDash: [5, 5],
      },
      // current day line
      {
        data: [
          { x: formattedDate, y: 0 },
          { x: formattedDate, y: goal },
        ],
        borderColor: "rgb(255, 0, 0)",
        borderDash: [5, 5],
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
        min: start,
        max: end,
      },
      y: {
        title: {
          display: true,
          text: "Dollars",
        },
        min: 0,
        max: Math.floor(goal * 1.2), // to add some height buffer
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
