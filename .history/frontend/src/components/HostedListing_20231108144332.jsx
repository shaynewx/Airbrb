import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

// 作为房东的房源页面
function HostedListing () {
  const createNewListing = () => {
    console.log('createNewListing');
    
  }

  return (
      <div>
        <h1>Hosted Listing</h1>
        <Button type="primary" onClick={createNewListing}>Create a Listing</Button>
      </div>
  );
}

export default HostedListing;
