import React from 'react';
import {useSelector} from 'react-redux';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.user.profile);
  const Routes = createRouter(!!signed);

  return <Routes />;
}
