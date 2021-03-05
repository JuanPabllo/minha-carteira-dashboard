import React from 'react';

import { Container, ToggleLabel, ToggleSelector } from './styles';

const Toggle: React.FC = () => (
  <Container>
    <ToggleLabel>Ligth</ToggleLabel>
    <ToggleSelector
      checked
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={() => console.log('mudou')}
    />
    <ToggleLabel>Dark</ToggleLabel>
  </Container>
);

export default Toggle;
