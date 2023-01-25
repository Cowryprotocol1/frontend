
import React, { useState } from 'react';
import Image from 'next/image';
import Text from '@/components/text';
import Layout from '@/components/layout/Layout';
import type { NextPageWithLayout } from "../_app";
import { useUser } from "../../store/user";
import {  RiBankFill } from 'react-icons/ri';
import {  BsFillEyeFill, BsFillEyeSlashFill }  from 'react-icons/bs';
import BImage from '../../../public/images/balance_image.png';
import DepositModal from '@/components/balance/depositModal';
import WithdrawModal from '@/components/balance/withdrawModal';

type BalanceboardProps = {
  children?: any;
}

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NGN',
});

const Balanceboard: NextPageWithLayout<BalanceboardProps> = ({children}) => {
  const headerText: string = "Account Balance Details";
  const balanceText: string = "Cowry Balance";
  const {balances, depositOpen, setDepositOpen, withdrawOpen, setWithdrawOpen} =useUser();

  const [view, setView] = useState(true)


  const NGN = balances?.filter((bal)=> bal.asset_code === "NGN")
  // const USDC = balances?.filter((bal)=> bal.asset_code === "USDC")
  // const XLM = balances?.filter((bal)=> bal.asset_type === "native")
  
  return (
    <div className="relative w-full md:w-[65%]  h-[auto] mb-6 rounded-xl bg-white shadow-[0px_1px_0px_rgba(0,0,0,0.1)]">
      <Image src={BImage} alt="bal_image" className="w-[15%] mb-4 right-0 absolute" />
      <div className="py-4 px-6">
        <Text className="font-thin text-sm">{headerText} {view ? <BsFillEyeSlashFill className='text-[#D4D4D4] inline-block ml-2' size={20} onClick={()=>setView(false)}/>:<BsFillEyeFill className='text-[#D4D4D4] inline-block ml-2' size={20} onClick={()=>setView(true)}/>}</Text>
        <div className="flex my-4 md:mt-20 flex-row items-center justify-center md:justify-between">
          <div className="flex flex-row items-center">
            <div className="w-[40px] h-[40px] rounded-lg bg-[#E9FAF0] mr-2 flex  flex-col justify-center items-center">
              <RiBankFill  size={25} className=" text-brand_primary_green"/>
            </div>
            <div>
              {NGN.length > 0 ? 
              <Text className="font-bold text-xl">{view ? currencyFormatter.format(NGN[0]?.balance) : "******"}</Text>
              :
              <Text className="font-bold text-xl">{view ? "₦ 0.00" : "******"}</Text>
              }
              <Text className="font-thin text-sm text-[#818181]">{balanceText}</Text>
            </div>
          </div>
          <button 
            className="bg-brand_primary_green rounded-lg h-10 text-white hidden md:flex flex-row justify-between items-center px-8 text-sm"
            onClick={()=>setWithdrawOpen(true)}
          >Withdraw</button>
          <button 
            className="bg-brand_primary_green rounded-lg h-10 text-white hidden md:flex flex-row justify-between items-center px-8 text-sm "
            onClick={()=>setDepositOpen(true)}
          >Deposit</button>
        </div>
      </div>
      <DepositModal 
        timer={5}
        isOpen={depositOpen}
        NGN={NGN}
        setModalOpen={setDepositOpen}
      />
      <WithdrawModal 
        timer={10}
        isOpen={withdrawOpen}
        NGN={NGN}
        setModalOpen={setWithdrawOpen}
      />
    </div>
  );
};

Balanceboard.getLayout = (page) => <Layout>{page}</Layout>;

export default Balanceboard;
