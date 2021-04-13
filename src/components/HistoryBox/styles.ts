import styled from 'styled-components';

interface ILegendProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};

  margin: 10px 0;
  padding: 30px 20px;

  border-radius: 7px;
`;

export const ChartHeader = styled.header`
  display: flex;
  justify-content: space-between;

  width: 100%;

  > h2 {
    margin-bottom: 20px;
    padding-left: 16px;
  }
`;

export const LegendContainer = styled.ul`
  display: flex;

  list-style: none;
  margin-right: 16px;
`;

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;

  margin-bottom: 7px;
  margin-left: 7px;

  > div {
    background-color: ${(props) => props.color};

    width: 45px;
    height: 40px;
    border-radius: 5px;

    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }

  > span {
    margin-left: 5px;
  }
`;

export const ChartContainer = styled.div`
  flex: 1;
  height: 260px;
`;
