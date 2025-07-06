import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const BarChartComponent = ({ data, language, currency }) => {
  const tooltipFormatter = (value, name) => [
    `${value} ${currency === 'EUR' ? '€' : '$'}`,
    language === 'fr' ? 'Prix' : 'Price',
  ];

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 100 }}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} stroke="#ffffff" />
        <XAxis
          dataKey="model"
          stroke="#ffffff"
          angle={-45}
          textAnchor="end"
          interval={0}
          height={100}
          tick={{ fontSize: 18, fontWeight: 500 }}
        />
        <YAxis unit={currency === 'EUR' ? '€' : '$'} stroke="#ffffff" />
        <Tooltip
          contentStyle={{ backgroundColor: 'rgba(44, 62, 80, 0.9)', color: '#ffffff' }}
          itemStyle={{ color: '#ffffff' }}
          formatter={tooltipFormatter}
        />
        <Bar dataKey="price" fill="#FF4D4D" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;