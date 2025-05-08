import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: ['6d ago', '5d', '4d', '3d', '2d', '1d', 'Now'],
    datasets: [
      {
        data: data,
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    elements: {
      line: { tension: 0.4 },
    },
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return <Line data={chartData} options={options} height={30} width={80} />;
};

export default ChartComponent;
