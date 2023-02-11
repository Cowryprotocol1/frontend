
import React, {useEffect,useState} from 'react';
import Image from 'next/image';
import Text from '@/components/text';
import Header from '@/components/layout/IFPHeader';
import Layout from '@/components/layout/Layout';
import TopBar from '@/components/layout/TopBar';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from "../_app";
import { useUser } from "../../store/user";
import {  RiBankFill } from 'react-icons/ri';
import BImage from '../../../public/images/balance_image.png'
import Donut from '@/components/donut';
import { MdOutlineDonutLarge } from 'react-icons/md';

type TransactionboardProps = {
  children?: any;
}

const Transactionboard: NextPageWithLayout<TransactionboardProps> = ({children}) => {
  const headerText: string = "Transaction Overview";
  const {transactions} = useUser();
  const total: number = transactions?.filter((txn)=> txn).length
  // console.log(transactions)
  
  return (
    <div className="w-full md:w-[30%] mb-6 h-[auto] rounded-xl bg-white shadow-[0px_1px_0px_rgba(0,0,0,0.1)]">
      {transactions?.length > 0 ? 
      <>
        <div className="flex flex-row justify-center px-10">
          <Text className='font-thin pt-4 text-xs'>{headerText} ({total})</Text>
        </div>
        <Donut />
      </>
     :
     <div className="flex flex-col justify-center items-center py-20">
        <MdOutlineDonutLarge size={40} className="mb-4 text-[#818181]"/>
        <p className="font-thin text-[#818181] text-xs">There are no transactions yet!</p>
    </div>
    }
    </div>
  
  );
};

Transactionboard.getLayout = (page) => <Layout>{page}</Layout>;

export default Transactionboard;
