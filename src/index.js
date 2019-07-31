import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import store from './js/store/index.js';

import Head from './Components/Head/index.js';
import Main from './Components/Main/index.js';

//import index from "./js/index";

function App() {
  return <Main head={<Head />} />;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));