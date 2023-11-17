import React from 'react';
import { Link } from 'react-router-dom';
import PublishedListings from '../components/listing/PublishedListing';

function Home () {
  return (
    <div>
      <p>First time to use? Click to <Link to="/register">Register</Link></p>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      <PublishedListings />
    </div>
  );
}

export default Home;
