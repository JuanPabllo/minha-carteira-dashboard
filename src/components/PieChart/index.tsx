import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight,
} from './styles';

interface IPieChartProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const PieChart: React.FC<IPieChartProps> = ({ data }) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        {data.map((indicator) => (
          <Legend key={indicator.name} color={indicator.color}>
            <div>{indicator.percent}</div>
            <span>{indicator.name}</span>
          </Legend>
        ))}
      </LegendContainer>
    </SideLeft>

    <SideRight></SideRight>
  </Container>
);

export default PieChart;

// eslint-disable-next-line no-lone-blocks
{
  /* <ResponsiveContainer>
        <PieChart>
          <Pie data={[]} labelLine={false} dataKey="percent">
            {}
          </Pie>
        </PieChart>
      </ResponsiveContainer> */
}
