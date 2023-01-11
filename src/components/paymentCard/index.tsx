
import React, {useEffect,useState} from 'react';
import Layout from '@/components/layout/Layout';
import {  HiMinusCircle } from 'react-icons/hi2';
import { RiBankFill } from 'react-icons/ri';
import type { NextPageWithLayout } from '@/pages/_app';

type PaymentCardProps = {
  handleRemovePayment: any;
  children?: any;
}

const PaymentCard: NextPageWithLayout<PaymentCardProps> = ({handleRemovePayment, children}) => {
  const headerText: string = "Transaction Overview";
  const balanceText: string = "147";
  return (
    <div className="w-full h-[auto] p-4 mb-6 flex flex-row justify-between rounded-xl bg-white  shadow-[0px_1px_0px_rgba(0,0,0,0.1)]">
        <div className="w-[70%] flex flex-row">
        <span className="w-[50px] h-[50px] mr-4 bg-slate-500 rounded flex flex-col justify-center items-center">
            <RiBankFill className='text-white' size={30}/>
        </span>
        <div>
            <p className="font-thin text-sm">Guarantee Trust Bank</p>
            <p className="font-thin text-xs text-[#818181]">01****9033</p>
        </div>
        </div>
        <HiMinusCircle onClick={()=>handleRemovePayment()} className="text-[#818181] cursor-pointer md:hidden" size={20}/>
        <p className="text-sm text-[#DC1B1B] underline cursor-pointer hidden md:flex" onClick={()=>handleRemovePayment()} >Remove Account</p>
    </div>
  );
};

PaymentCard.getLayout = (page) => <Layout>{page}</Layout>;

export default PaymentCard;
