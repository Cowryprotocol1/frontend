import React from 'react';

import Mainboard from '@/pages/common/mainboard';

function Payment() {
  const paymentData = {
    title: "IFP Payment"
  }
  return (
    <div>
      {/* <WrapperComponent myComponent={Mainboard} data={paymentData}/> */}
      <Mainboard title={paymentData.title}/>
    </div>
  );
}

export default Payment;