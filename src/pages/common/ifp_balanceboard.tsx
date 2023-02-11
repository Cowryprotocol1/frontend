
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Text from '@/components/text';
import Layout from '@/components/layout/Layout';
import type { NextPageWithLayout } from "../_app";
import { useUser } from "../../store/user";
import {  RiBankFill } from 'react-icons/ri';
import {  BsFillEyeFill, BsFillEyeSlashFill }  from 'react-icons/bs';
import BImage from '../../../public/images/balance_ifp.png';
import DepositModal from '@/components/balance/depositModal';
import WithdrawModal from '@/components/balance/withdrawModal';

type IFPBalanceboardProps = {
  children?: any;
}

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NGN',
});

const IFPBalanceboard: NextPageWithLayout<IFPBalanceboardProps> = ({children}) => {
  const headerText: string = "Account Balance Details";
  const balanceText: string = "NGN Balance";
  const balanceTextLicense: string = "NGNLICENSE Balance";
  const balanceTextAllow: string = "NGNALLOW Balance";
  const {balances, depositOpen, setDepositOpen, withdrawOpen, setWithdrawOpen, IFPData} =useUser();

  const [view, setView] = useState(true)

 
  
  // console.log(balances)
  const NGN = useMemo(() => balances?.filter((bal:any)=> bal.asset_code === "NGN"), [balances]) 
  const NGNALLOW = useMemo(() => balances?.filter((bal)=> bal.asset_code === "NGNALLOW"), [balances])
  const NGNLICENSE = useMemo(() => balances?.filter((bal)=> bal.asset_code === "NGNLICENSE"), [balances])
  
  return (
    <div className="relative w-full h-[auto] mb-6 rounded-xl bg-white shadow-[0px_1px_0px_rgba(0,0,0,0.1)]">
      <Image src={BImage} alt="bal_image" className="w-[15%] mb-4 right-0 absolute" />
      <div className="py-4 px-6">
        <div className="flex flex-row gap-10 items-center">
          <Text className="font-thin text-sm">{headerText} {view ? <BsFillEyeSlashFill className='text-[#D4D4D4] inline-block ml-2' size={20} onClick={()=>setView(false)}/>:<BsFillEyeFill className='text-[#D4D4D4] inline-block ml-2' size={20} onClick={()=>setView(true)}/>}</Text>
          <button 
              className="bg-brand_primary_blue rounded-lg h-10 text-white hidden md:flex flex-row justify-between items-center px-8 text-sm"
              onClick={()=>setWithdrawOpen(true)}
            >Withdraw</button>
            <button 
              className="bg-brand_primary_blue rounded-lg h-10 text-white hidden md:flex flex-row justify-between items-center px-8 text-sm "
              onClick={()=>setDepositOpen(true)}
            >Deposit</button>
        </div>
        <div className="flex my-4 md:mt-10 flex-col md:flex-row items-center justify-center md:justify-start md:gap-10">
          {/* NGN */}
          <div className="flex flex-row items-center mb-2 md:mb-0 w-full md:w-[auto]">
            <div className="w-[40px] h-[40px] rounded-lg bg-[#E7EAEC] mr-2 flex  flex-col justify-center items-center">
              <RiBankFill  size={25} className=" text-brand_primary_blue"/>
            </div>
            <div>
              {NGN?.length > 0 ? 
              <Text className="font-bold text-lg">{view ? currencyFormatter.format(NGN[0]?.balance) : "******"}</Text>
              :
              <Text className="font-bold text-lg">{view ? "₦ 0.00" : "******"}</Text>
              }
              <Text className="font-thin text-sm text-[#818181]">{balanceText}</Text>
            </div>
          </div>
          {/* NGNALLOW */}
          <div className="flex flex-row items-center mb-2 md:mb-0 w-full md:w-[auto]">
            <div className="w-[40px] h-[40px] rounded-lg bg-[#E7EAEC] mr-2 flex  flex-col justify-center items-center">
              <RiBankFill  size={25} className=" text-brand_primary_blue"/>
            </div>
            <div>
              {NGNALLOW.length > 0 ? 
              <Text className="font-bold text-lg">{view ? currencyFormatter.format(NGNALLOW[0]?.balance) : "******"}</Text>
              :
              <Text className="font-bold text-lg">{view ? "₦ 0.00" : "******"}</Text>
              }
              <Text className="font-thin text-sm text-[#818181]">{balanceTextAllow}</Text>
            </div>
          </div>
          {/* NGNLICENSE */}
          <div className="flex flex-row items-center w-full md:w-[auto]">
            <div className="w-[40px] h-[40px] rounded-lg bg-[#E7EAEC] mr-2 flex  flex-col justify-center items-center">
              <RiBankFill  size={25} className=" text-brand_primary_blue"/>
            </div>
            <div>
              {NGNLICENSE.length > 0 ? 
              <Text className="font-bold text-lg">{view ? currencyFormatter.format(NGNLICENSE[0]?.balance) : "******"}</Text>
              :
              <Text className="font-bold text-lg">{view ? "₦ 0.00" : "******"}</Text>
              }
              <Text className="font-thin text-sm text-[#818181]">{balanceTextLicense}</Text>
            </div>
          </div>
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

IFPBalanceboard.getLayout = (page) => <Layout>{page}</Layout>;

export default React.memo(IFPBalanceboard);
