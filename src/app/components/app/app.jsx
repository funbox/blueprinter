import { Route } from 'react-router-dom';

import MainLayout from 'app/common/layouts/main';
import Home from 'app/views/home';

export default class App extends React.Component {
  render() {
    return (
      <MainLayout>
        <Route exact path="/" component={Home}/>
      </MainLayout>
    );
  }
}
