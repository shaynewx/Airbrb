import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/LoginResult';
import HostedListing from './components/HostedListing';
import AllListing from './components/AllListing';
import logo from './components/logo/logo.png';

function PageList () {
  const [token, setToken] = React.useState(null);

  return (
    <div>
      <img src={logo} alt='Logo' style={{width:''}}/>
      <p>Airbrb</p>
      <nav>
        <Link to="/">Home</Link>
        &nbsp;|&nbsp;
        <Link to="/register">Register</Link>
        &nbsp;|&nbsp;
        <Link to="/login">Login</Link>
        &nbsp;|&nbsp;
        <Link to="/loginresult">Login Result</Link>
        &nbsp;|&nbsp;
        <Link to="/hosted-listing">Hosted Listing</Link>
        &nbsp;|&nbsp;
        <Link to="/all-listing">All Listing</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register token={token} setToken={setToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} />} />
        <Route path="/loginresult" element={<Dashboard token={token} />} />
        <Route path="/hosted-listing" element={<HostedListing token={token} />} />
        <Route path="/all-listing" element={<AllListing token={token} />} />
      </Routes>
    </div>
  );
}

export default PageList;
