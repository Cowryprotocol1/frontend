
import React, {useEffect,useState} from 'react';
import Image from 'next/image';
import Text from '@/components/text';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import TopBar from '@/components/layout/TopBar';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from "../_app";
import { useUser } from "../../store/user";
import {  RiBankFill } from 'react-icons/ri';
import BImage from '../../../public/images/balance_image.png'
import Donut from '@/components/donut';
type TransactionboardProps = {
  amount: string;
  children?: any;
}

const Transactionboard: NextPageWithLayout<TransactionboardProps> = ({amount, children}) => {
  const headerText: string = "Transaction Overview";
  const balanceText: string = "147";
  return (
    <div className="w-full md:w-[30%] mb-6 h-[auto] rounded-xl bg-white shadow-[0px_1px_0px_rgba(0,0,0,0.1)]">
      <div className="flex flex-row justify-center px-10">
        <Text className='font-thin pt-4'>{headerText} ({balanceText})</Text>
        {/* <Text>{balanceText}</Text> */}
      </div>
     <Donut />
    </div>
  );
};

Transactionboard.getLayout = (page) => <Layout>{page}</Layout>;

export default Transactionboard;
