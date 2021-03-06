import React from 'react';

import { Container, TitleContainer, Controllers } from './styles';

const ContentHeader: React.FC = () => {
  return (
    <Container>
      <TitleContainer>
        <h1>Titulo</h1>
      </TitleContainer>
      <Controllers>
        <button type="button">botao</button>
        <button type="button">botao2</button>
      </Controllers>
    </Container>
  );
};

export default ContentHeader;
