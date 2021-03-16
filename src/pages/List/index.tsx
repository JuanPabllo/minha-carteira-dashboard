import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { Container, Content } from './styles';

const List: React.FC = () => {
  const options = [
    { value: 'Juan', label: 'Pablo' },
    { value: 'Bina', label: 'Mo' },
    { value: 'Davi', label: 'Lucas' },
  ];
  return (
    <Container>
      <ContentHeader title="Saídas" lineColor="#e44c4e">
        <SelectInput options={options} />
      </ContentHeader>

      <Content>
        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#e44c4e"
          title="Conta de luz"
          subTitle="16/03/2021"
          amount="R$ 129,99"
        />

        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#e44c4e"
          title="Conta de luz"
          subTitle="16/03/2021"
          amount="R$ 129,99"
        />

        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#e44c4e"
          title="Conta de luz"
          subTitle="16/03/2021"
          amount="R$ 129,99"
        />

        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#e44c4e"
          title="Conta de luz"
          subTitle="16/03/2021"
          amount="R$ 129,99"
        />

        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#e44c4e"
          title="Conta de luz"
          subTitle="16/03/2021"
          amount="R$ 129,99"
        />

        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#e44c4e"
          title="Conta de luz"
          subTitle="16/03/2021"
          amount="R$ 129,99"
        />

        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#e44c4e"
          title="Conta de luz"
          subTitle="16/03/2021"
          amount="R$ 129,99"
        />

        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#e44c4e"
          title="Conta de luz"
          subTitle="16/03/2021"
          amount="R$ 129,99"
        />

        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#e44c4e"
          title="Conta de luz"
          subTitle="16/03/2021"
          amount="R$ 129,99"
        />

        <HistoryFinanceCard
          cardColor="#313862"
          tagColor="#e44c4e"
          title="Conta de luz"
          subTitle="16/03/2021"
          amount="R$ 129,99"
        />
      </Content>
    </Container>
  );
};

export default List;
