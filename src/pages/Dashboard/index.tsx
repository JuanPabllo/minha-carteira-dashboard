import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageImg from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';

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

  const totalExpenses = useMemo(() => {
    let total = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount, amount must be number.');
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount, amount must be number.');
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Que triste!',
        description: 'Nesse mês, você gastou mais do que ganhou.',
        footerText:
          'Verifique seus gastos e tente cortar coisas desnecessárias.',
        icon: sadImg,
      };
    } else if (totalBalance === 0) {
      return {
        title: 'Ufaa!',
        description: 'Nesse mês, você quase chegou ao negativo.',
        footerText: 'Mais cuidado no próximo mês, tente poupar.',
        icon: grinningImg,
      };
    } else {
      return {
        title: 'Muito Bem!',
        description: 'Sua carteira está positiva!',
        footerText: 'Continue assim. Considere investir o seu saldo.',
        icon: happyImg,
      };
    }
  }, [totalBalance]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = (totalGains / total) * 100;
    const percentExpenses = (totalExpenses / total) * 100;

    const data = [
      {
        name: 'Entradas',
        value: totalExpenses,
        percent: Number(percentGains.toFixed(1)),
        color: '#E44C4E',
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(1)),
        color: '#F7931B',
      },
    ];
    return data;
  }, [totalGains, totalExpenses]);

  const historydata = useMemo(() => {
    return ListOfMonths.map((_, month) => {
      let amountEntry = 0;
      gains.forEach((gain) => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = date.getFullYear();

        if (gainMonth === month && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount);
          } catch {
            throw new Error(
              'AmountEntry is invalid. Amountentry must be valid number.'
            );
          }
        }
      });

      let amountOutPut = 0;
      expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const expenseMonth = date.getMonth();
        const expenseYear = date.getFullYear();

        if (expenseMonth === month && expenseYear === yearSelected) {
          try {
            amountOutPut += Number(expense.amount);
          } catch {
            throw new Error(
              'AmountOutPut is invalid. AmountOutPut must be valid number.'
            );
          }
        }
      });

      return {
        monthNumber: month,
        month: ListOfMonths[month].substr(0, 3),
        amountEntry,
        amountOutPut,
      };
    }).filter((item) => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      return (
        (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
        yearSelected < currentYear
      );
    });
  }, [yearSelected]);

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error('invalid month value. Is accept 0 - 24.');
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
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
          amount={totalBalance}
          icon="dolar"
          footerLabel="atualizado com base nas entradas e saídas"
        />

        <WalletBox
          title="entradas"
          color="#F7931B"
          amount={totalGains}
          icon="arrowUp"
          footerLabel="atualizado com base nas entradas e saídas"
        />

        <WalletBox
          title="saída"
          color="#E44C4E"
          amount={totalExpenses}
          icon="arrowDown"
          footerLabel="atualizado com base nas entradas e saídas"
        />

        <MessageImg
          title={message.title}
          description={message.description}
          icon={message.icon}
          footerText={message.footerText}
        />

        <PieChartBox data={relationExpensesVersusGains} />

        <HistoryBox
          data={historydata}
          lineColorAmountEntry="#f7931b"
          lineColorAmountOutPut="#e44c4e"
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
