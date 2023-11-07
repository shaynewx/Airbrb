import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import

function PageList () {
  const [token, setToken] = React.useState(null);
  // const logout = () => {
  //   setToken(null);
  //   localStorage.removeItem('token');
  // }

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        &nbsp;|&nbsp;
        <Link to="/register">Register</Link>
        &nbsp;|&nbsp;
        <Link to="/login">Login</Link>
        &nbsp;|&nbsp;
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register token={token} setToken={setToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
      </Routes>
    </>
  );
}

export default PageList;
