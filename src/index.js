import React from 'react';
import ReactDOM from 'react-dom';

import Head from './Components/Head/index.js';
import Main from './Components/Main/index.js';

function App() {
  return <Main head={<Head />} />;
}

ReactDOM.render(<App />, document.getElementById('root'));