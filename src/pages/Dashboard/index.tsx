import React, { useState, useMemo, useCallback } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageImg from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';
import opsImg from '../../assets/ops.svg';

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
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Ops's!",
        description: 'Nesse mês, não há registros de entradas ou saídas.',
        footerText:
          'Parece que você não fez nenhum resgistro no mês e ano selecionado.',
        icon: opsImg,
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
  }, [totalBalance, totalExpenses, totalGains]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: 'Entradas',
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: '#E44C4E',
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
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

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === 'recorrente')
          return (amountRecurrent += Number(expense.amount));
        if (expense.frequency === 'eventual')
          return (amountEventual += Number(expense.amount));
      });

    const total = amountRecurrent + amountEventual;

    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#f7931b',
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#e44c4e',
      },
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === 'recorrente')
          return (amountRecurrent += Number(gain.amount));
        if (gain.frequency === 'eventual')
          return (amountEventual += Number(gain.amount));
      });

    const total = amountRecurrent + amountEventual;

    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#f7931b',
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#e44c4e',
      },
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error('invalid month value. Is accept 0 - 24.');
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error('invalid year value. Is accept integer number.');
    }
  }, []);

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

        <BarChartBox
          title="Saídas"
          data={relationExpensevesRecurrentVersusEventual}
        />

        <BarChartBox
          title="Entradas"
          data={relationGainsRecurrentVersusEventual}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
