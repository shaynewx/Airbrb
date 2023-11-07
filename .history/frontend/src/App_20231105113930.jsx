import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

function App () {
  return (
    <>
      {/* <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link> */}
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
