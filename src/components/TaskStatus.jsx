import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ percentage }) => {
  // Color based on percentage range
  const getColor = (value) => {
    if (value <= 30) return '#F21E1E';   // Red
    if (value <= 60) return '#0225FF';   // Blue 
    return '#05A301';                    // Green
  };

  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [getColor(percentage), '#E5E7EB'], // light gray bg
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%', // Makes it a donut
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="relative w-32 h-32">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
        {percentage}%
      </div>
    </div>
  );
};

export default DonutChart;
