import React from 'react';

import Mainboard from '@/pages/common/mainboard';
import Settingboard from '../common/settings';

function Settings() {
  const settingsData = {
    title: "Settings",
    text: "You can edit your profile and understand how you can request to export your data."
  }
  return (
    <div>
      <Mainboard title={settingsData.title} text={settingsData.text}>
        <Settingboard />  
      </Mainboard>
    </div>
  );
}

export default Settings;