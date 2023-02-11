import React, {useState} from 'react';

// import Mainboard from '@/pages/common/mainboard';
import Mainboard from '@/pages/common/mainboardUser';
import Balanceboard from '../common/balanceboard';
import Transactionboard from '../common/transactionboard';
import Transaction from '../common/transactions';
import { IoIosArrowBack }  from 'react-icons/io';

function Dashboard() {
  const dashboardData = {
    title: "Dashboard"
  }
  const [isTxn, setIsTxn] = useState(false)

  return (
    <div>
      <Mainboard title={!isTxn ? dashboardData.title : ""}>
        {!isTxn ?
        <div className="flex flex-col md:flex-row md:justify-between">
          <Balanceboard />
          <Transactionboard />
        </div>
        :
        <span className="flex flex-row items-center font-thin text-xl mb-2"><IoIosArrowBack className="mr-3 cursor-pointer" onClick={()=>setIsTxn(false)} /> Transactions</span>
        }
        <div>
        <Transaction isTxn={isTxn} setIsTxn={setIsTxn} />
        </div>
      </Mainboard>
    </div>
  );
}

export default Dashboard;