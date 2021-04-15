import React from 'react';

import { Container } from './styles';

interface IMessageBoxProps {
  title: string;
  description: string;
  icon: string;
  footerText: string;
}

const MessageBox: React.FC<IMessageBoxProps> = ({
  title,
  description,
  icon,
  footerText,
}) => (
  <Container>
    <header>
      <h1>
        {title} <img src={icon} alt={title} />
      </h1>
      <p>{description}</p>
    </header>

    <footer>
      <span>{footerText}</span>
    </footer>
  </Container>
);

export default MessageBox;
