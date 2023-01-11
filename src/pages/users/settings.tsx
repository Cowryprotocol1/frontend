import React from 'react';

import Mainboard from '@/pages/common/mainboard';

function Settings() {
  const settingsData = {
    title: "User Settings"
  }
  return (
    <div>
      <Mainboard title={settingsData.title}/>
    </div>
  );
}

export default Settings;