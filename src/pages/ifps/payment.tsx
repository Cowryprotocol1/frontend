import React from 'react';

import Mainboard from '@/pages/common/mainboard';

function Payment() {
  const paymentData = {
    title: "Payment"
  }
  return (
    <div>
      <Mainboard title={paymentData.title}/>
    </div>
  );
}

export default Payment;