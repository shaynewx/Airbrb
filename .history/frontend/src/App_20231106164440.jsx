import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PageList from './PageList';
import { Button } from 'antd';

function App () {
  return (
    <Router>
      <PageList />
      <Button type="primary">Button</Button>
    </Router>
  );
}

export default App;
