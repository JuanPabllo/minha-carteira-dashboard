import React from 'react';

import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from 'recharts';

import formatCurrency from '../../utils/formatCurrency';

import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight,
} from './styles';

interface IBarChartBoxProps {
  title: string;
  data: {
    name: string;
    amount: number;
    percent: number;
    color: string;
  }[];
}

const BarChartBox: React.FC<IBarChartBoxProps> = ({ title, data }) => (
  <Container>
    <SideLeft>
      <h2>{title}</h2>

      <LegendContainer>
        {data.map((indicator) => (
          <Legend key={indicator.name} color={indicator.color}>
            <div>{indicator.percent}%</div>
            <span>{indicator.name}</span>
          </Legend>
        ))}
      </LegendContainer>
    </SideLeft>

    <SideRight>
      <ResponsiveContainer>
        <BarChart data={data}>
          <Bar name="Valor" dataKey="amount">
            {data.map((indicator) => (
              <Cell
                key={indicator.name}
                fill={indicator.color}
                cursor="pointer"
              />
            ))}
          </Bar>
          <Tooltip
            cursor={{ fill: 'none' }}
            formatter={(value: number) => formatCurrency(Number(value))}
          />
        </BarChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default BarChartBox;
