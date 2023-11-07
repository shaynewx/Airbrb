import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PageList from './components/PageList';

function App () {
  return (
    <Router>
      <PageList />
    </Router>

  );
}

export default App;
