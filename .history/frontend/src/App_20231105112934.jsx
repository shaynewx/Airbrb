import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App () {
  return (
    // <>Let&apos;s go!</>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
