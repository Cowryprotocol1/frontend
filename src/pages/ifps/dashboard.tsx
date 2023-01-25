import React, {useState} from 'react';
import { IoIosArrowBack }  from 'react-icons/io';
import Mainboard from '@/pages/common/mainboard';
import IFPBalanceboard from '../common/ifp_balanceboard';
import Transaction from '../common/transactions';

function Dashboard() {
  const dashboardData = {
    title: "IFP Dashboard"
  }
  const [isTxn, setIsTxn] = useState(false)
  return (
    <div>
      <Mainboard title={!isTxn ? dashboardData.title : ""}>
        {!isTxn ?
        <div className="flex flex-col md:flex-row md:justify-between">
          <IFPBalanceboard />
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