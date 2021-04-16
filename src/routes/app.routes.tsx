import { Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';

const Routes: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/list/:type" component={List} exact />
      </Switch>
    </Layout>
  );
};

export default Routes;
