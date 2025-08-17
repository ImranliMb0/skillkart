import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: { title: string; sales: number }[];
}

const DashboardChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#fe9188" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
