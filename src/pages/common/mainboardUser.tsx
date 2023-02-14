
import React, {useEffect,useState} from 'react';

import Header from '@/components/layout/userHeader';
import Layout from '@/components/layout/Layout';
import TopBar from '@/components/layout/TopBar';
import type { NextPageWithLayout } from "../_app";
import { useUser } from "../../store/user";
import { useRouter } from 'next/router';

type MainboardProps = {
  title: string;
  text?: string;
  children?: any;
}

const Mainboard: NextPageWithLayout<MainboardProps> = ({title, text, children}) => {
  const {push} = useRouter();
  const [name, setName] = useState("")
  const { 
    toggleLogoutMode, role, setRole, getTransactions, setTransactions,
    getBalance, setBalances , setWalletAddress,
    getAccount, setIFPData
  } = useUser();

  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress")
    let x = localStorage.getItem("userType") 
    if (walletAddress === null) {
      toggleLogoutMode()
    }
    else{
      setWalletAddress(walletAddress)
    }
  
    let d = getTransactions(walletAddress , role)
    d.then((res:any)=>{  
      setTransactions(res.all_transactions)
    })
    const g = getBalance(walletAddress)
    g.then((res:any)=>{  
      setBalances(res.balances)
    })
    if (x === 'ifp') {
      getAccount(walletAddress).then(response=>{
        // console.log(response, "get account api")
        setIFPData(response)
        setRole("ifp");
        push('/ifps/dashboard')
      })
    }
    else if (x === 'user') {
      setRole("user");
    }
  }, [])



  return (
    <div className="parent md:h-full md:grid md:grid-cols-8 overflow-hidden">
      <Header />
      <main className="main bg-[#F2F2F2] md:col-span-6">
        <div className='md:z-[100] md:h-full w-full bg-[#F2F2F2] md:-ml-12 md:rounded-l-3xl -pr-12'>
          <TopBar username={name} role={role}/>
          <div className="p-4 md:p-8 md:pr-0 h-full min-h-[90vh]">
            <p className="font-thin text-xl md:text-2xl mb-2 md:mb-8">{title}</p>
            {text && <p className="font-thin text-[#818181] text-xs md:text-sm mb-2 md:mt-[-1.5rem]">{text}</p>}
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

Mainboard.getLayout = (page) => <Layout>{page}</Layout>;

export default React.memo(Mainboard);
