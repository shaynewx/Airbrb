import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import CreateNewListing from './listing/CreateNewListing';

// 作为房东的房源页面
function HostedListing () {
  // const createNewListing = () => {
  //   console.log('createNewListing');
  //   <CreateNewListing />;
  // }

  return (
      <div>
        <h1>Hosted Listing</h1>
        <Button type="primary" onClick={createNewListing}>Create a Listing</Button>
        
      </div>
  );
}

export default HostedListing;
