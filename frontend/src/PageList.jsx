import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/LoginResult';
import HostedListing from './components/HostedListing';
import AllListing from './components/AllListing';
import EditListing from './components/listing/EditListing';
import PublishedListings from './components/listing/PublishedListing';
import ListingDetails from './components/listing/ListingDetails';

function PageList () {
  const [token, setToken] = React.useState(null);

  return (
    <div>
      <h1>Airbrb</h1>
      <h3>Welcome!</h3>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register token={token} setToken={setToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} />} />
        <Route path="/login-result" element={<Dashboard token={token} />} />
        <Route path="/hosted-listing" element={<HostedListing token={token} />} />
        <Route path="/all-listing" element={<AllListing token={token} />} />
        <Route path="/edit-listing/:id" element={<EditListing />} />
        <Route path="/published-listings" element={<PublishedListings />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
      </Routes>
    </div>
  );
}

export default PageList;
