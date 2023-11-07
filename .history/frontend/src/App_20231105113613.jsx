import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
