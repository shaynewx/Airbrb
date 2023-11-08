import React, { useState } from 'react';
import { Button } from 'antd';
import CreateNewListing from './listing/CreateNewListing';

// 作为房东的房源页面
function HostedListing () {
  // 创建一个状态来控制 CreateNewListing 组件的显示
  const [showCreateNewListing, setShowCreateNewListing] = useState(false);

  // 当按钮被点击时，更新状态以显示 CreateNewListing 组件
  const createNewListing = () => {
    setShowCreateNewListing(true);
  };

  return (
    <div>
      <h1>Hosted Listing</h1>
      <Button type="primary" onClick={createNewListing}>Create a Listing</Button>
      {/* 条件渲染 CreateNewListing 组件 */}
      {showCreateNewListing ? <CreateNewListing /> : null}
    </div>
  );
}

export default HostedListing;
