import { BarChart, Bar, XAxis, YAxis } from "recharts";

const Chart = ({ amounts }) => {
  const chartData = amounts?.map((amount, index) => ({
    name: index === 0 ? "Custom" : `Category ${index}`,
    amount,
  }));

  return (
    <div className="w-[600px]">
    <BarChart
      width={545}
      height={300}
      data={chartData}
      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
    >
      <XAxis dataKey="name" tick={{ fill: 'white' }}/>
      <YAxis tick={{ fill: 'black' }} />
      <Bar barSize={30} dataKey="amount" fill="#F0C3F1" />
    </BarChart>
    </div>
  );
};

export default Chart;
