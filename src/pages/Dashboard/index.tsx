import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageImg from '../../components/MessageBox';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import ListOfMonths from '../../utils/months';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const months = useMemo(() => {
    return ListOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error('invalid month value. Is accept 0 - 24.');
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error('invalid year value. Is accept integer number.');
    }
  };

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7921b">
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <Content>
        <WalletBox
          title="saldo"
          color="#4E41F0"
          amount={150.0}
          icon="dolar"
          footerLabel="atualizado com base nas entradas e saídas"
        />

        <WalletBox
          title="entradas"
          color="#F7931B"
          amount={5000.0}
          icon="arrowUp"
          footerLabel="atualizado com base nas entradas e saídas"
        />

        <WalletBox
          title="saída"
          color="#E44C4E"
          amount={4850.0}
          icon="arrowDown"
          footerLabel="atualizado com base nas entradas e saídas"
        />

        <MessageImg
          title="Muito Bem!"
          description="Sua carteira está positiva!"
          icon={sadImg}
          footerText="Continue assim. Considere investir o seu saldo."
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
