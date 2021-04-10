import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight,
} from './styles';

const PieChart: React.FC = () => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        <Legend color="#F7931B">
          <div>5%</div>
          <span>Entradas</span>
        </Legend>
        <Legend color="#E44C4E">
          <div>95%</div>
          <span>Saídas</span>
        </Legend>
        <Legend color="#F7931B">
          <div>5%</div>
          <span>Entradas</span>
        </Legend>
        <Legend color="#E44C4E">
          <div>95%</div>
          <span>Saídas</span>
        </Legend>
        <Legend color="#F7931B">
          <div>5%</div>
          <span>Entradas</span>
        </Legend>
        <Legend color="#E44C4E">
          <div>95%</div>
          <span>Saídas</span>
        </Legend>
        <Legend color="#F7931B">
          <div>5%</div>
          <span>Entradas</span>
        </Legend>
        <Legend color="#E44C4E">
          <div>95%</div>
          <span>Saídas</span>
        </Legend>
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
