import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PageL

function App () {
  return (
    <>
      <Router>
        <Link to="/">Home</Link>
        &nbsp;|&nbsp;
        <Link to="/register">Register</Link>
        &nbsp;|&nbsp;
        <Link to="/login">Login</Link>
        &nbsp;|&nbsp;
        <Link to="/dashboard">Dashboard</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register token={token} setToken={setToken} />} />
          <Route path="/login" element={<Login token={token} setToken={setToken} />} />
          <Route path="/dashboard" element={<Dashboard token={token} setToken={setToken} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
