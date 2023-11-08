import React, { useState } from 'react';
import { Button } from 'antd';
import CreateNewListing from './listing/CreateNewListing';

// 作为房东的房源页面
function HostedListing () {
  // 创建一个状态来控制CreateNewListing组件的显示
  const [showCreateNewListing, setShowCreateNewListing] = useState(false);

  // 当按钮被点击时，更新状态以显示CreateNewListing组件
  const createNewListing = () => {
    setShowCreateNewListing(true);
  };

  return (
      <div>
        <h1>Hosted Listing</h1>
        <Button type="primary" onClick={createNewListing}>Create a Listing</Button>
        {/* 根据状态来决定是否显示CreateNewListing组件 */}
        {showCreateNewListing && <CreateNewListing />}
      </div>
  );
}

export default HostedListing;
