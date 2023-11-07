import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/LoginResult';
import HostedListing from './components/HostedListing';

function PageList () {
  const [token, setToken] = React.useState(null);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        &nbsp;|&nbsp;
        <Link to="/register">Register</Link>
        &nbsp;|&nbsp;
        <Link to="/login">Login</Link>
        &nbsp;|&nbsp;
        <Link to="/loginresult">Login Result</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register token={token} setToken={setToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} />} />
        <Route path="/loginresult" element={<Dashboard token={token} />} />
        
      </Routes>
    </>
  );
}

export default PageList;
