import React from 'react';

import Mainboard from '@/pages/common/mainboard';

function Dashboard() {
  const dashboardData = {
    title: "IFP Dashboard"
  }
  return (
    <div>
      <Mainboard title={dashboardData.title}/>
      {/* <WrapperComponent myComponent={Mainboard} data={dashboardData}/> */}
    </div>
  );
}

export default Dashboard;