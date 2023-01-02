import React from 'react';

import Mainboard from '@/pages/common/mainboard';

function Dashboard() {
  const dashboardData = {
    title: "User Dashboard"
  }
  return (
    <div>
      {/* <WrapperComponent myComponent={Mainboard} data={dashboardData}/> */}
      <Mainboard title={dashboardData.title}/>
    </div>
  );
}

export default Dashboard;