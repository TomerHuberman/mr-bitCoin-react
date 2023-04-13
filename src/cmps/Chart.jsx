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
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export function Chart({ data }) {
  const chartData = {
    labels: data?.values.map((value) =>
      new Date(value.x * 1000).toLocaleDateString()
    ),
    datasets: [
      {
        label: data?.name,
        data: data?.values.map((value) => value.y),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(70, 162, 235, 0.5)",
        tension: 0.1,
      },
    ],
  };
  console.log("chartData: ", chartData);

  return (
    <div>
      <Line data={chartData}/>
    </div>
  );
}
