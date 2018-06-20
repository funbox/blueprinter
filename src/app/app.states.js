import { BrowserRouter } from 'react-router-dom';

import MainLayout from 'app/common/layouts/main';
import Home from './views/home';

const component = (
  <BrowserRouter basename={BASE_PATH}>
    <MainLayout>
      <Home/>
    </MainLayout>
  </BrowserRouter>
);

ReactDOM.render(component, document.getElementById('react-app'));
