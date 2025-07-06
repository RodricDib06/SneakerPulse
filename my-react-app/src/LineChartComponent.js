import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const LineChartComponent = ({ data, language, currency }) => {
  const tooltipFormatter = (value, name) => [
    `${value} ${currency === 'EUR' ? '€' : '$'}`,
    language === 'fr' ? 'Prix' : 'Price',
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }} // compact margin
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} stroke="#ffffff" />
        <XAxis
          dataKey="month"
          stroke="#ffffff"
          tickMargin={14}  // adds space between axis line and label
        />
        <YAxis
          unit={currency === 'EUR' ? '€' : '$'}
          stroke="#ffffff"
          tickMargin={12} // space between ticks and Y axis
          minTickGap={10} // minimum vertical space between Y-axis labels
        />
        <Tooltip
          contentStyle={{ backgroundColor: 'rgba(44, 62, 80, 0.9)', color: '#ffffff' }}
          itemStyle={{ color: '#ffffff' }}
          formatter={tooltipFormatter}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#FF5733"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
