import React from 'react';
import CancelButton from './button/CancelButton';

function Dashboard () {
  return (
    <div>
      Dashboard Page
      {/* Dashboard界面代码 */}
      <CancelButton buttonText="Logout" on/>
    </div>
  );
}

export default Dashboard;
