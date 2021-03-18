import App from './app.routes';
import { BrowserRouter } from 'react-router-dom';

const Route: React.FC = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default Route;
