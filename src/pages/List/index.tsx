import React, { useMemo, useState, useEffect } from 'react';
import { v4 as uuid_v4 } from 'uuid';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import ListOfMonths from '../../utils/months';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

import { Container, Content, Filters } from './styles';

interface iRoutesParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<iRoutesParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );
  const [frequencyselectedFilter, setFrequencyselectedFilter] = useState([
    'recorrente',
    'eventual',
  ]);

  const movimentType = match.params.type;

  const pageData = useMemo(() => {
    return movimentType === 'entry-balance'
      ? {
          title: 'Entradas',
          lineColor: '#4E41F0',
          data: gains,
        }
      : {
          title: 'Saídas',
          lineColor: '#E44C4E',
          data: expenses,
        };
  }, [movimentType]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    const { data } = pageData;

    data.forEach((item) => {
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
  }, [pageData]);

  const months = useMemo(() => {
    return ListOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const handlerFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyselectedFilter.findIndex(
      (item) => item === frequency
    );

    if (alreadySelected >= 0) {
      const filtered = frequencyselectedFilter.filter(
        (item) => item !== frequency
      );
      setFrequencyselectedFilter(filtered);
    } else {
      console.log('foi agora');
      setFrequencyselectedFilter((prev) => [
        ...prev,
        frequency,
      ]); /*Estado anterior*/
    }
  };

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

  useEffect(() => {
    const { data } = pageData;

    const filteredDate = data.filter((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return (
        month === monthSelected &&
        year === yearSelected &&
        frequencyselectedFilter.includes(item.frequency)
      );
    });

    const formattedData = filteredDate.map((item) => {
      return {
        id: uuid_v4(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      };
    });
    setData(formattedData);
  }, [pageData, monthSelected, yearSelected, frequencyselectedFilter]);

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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

      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent ${
            frequencyselectedFilter.includes('recorrente') && 'tag-actived'
          }`}
          onClick={() => handlerFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>

        <button
          type="button"
          className={`tag-filter tag-filter-eventual ${
            frequencyselectedFilter.includes('eventual') && 'tag-actived'
          }`}
          onClick={() => handlerFrequencyClick('eventual')}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map((item) => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subTitle={item.dateFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
