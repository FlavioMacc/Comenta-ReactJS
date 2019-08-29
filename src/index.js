import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import store from './js/store/index.js';
import CometaContainer from './js/containers/index.js';

import Head from './Components/Head/index.js';

function App() {
  return <CometaContainer head={<Head />} />;
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));