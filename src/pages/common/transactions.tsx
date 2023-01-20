
import React, {useEffect,useState} from 'react';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import TransactionCard from '@/components/transactionCard';
import type { NextPageWithLayout } from "../_app";
import  { RiRefreshLine } from 'react-icons/ri';
import WhiteModal from '@/components/modal/whitemodal';
import { Dialog } from '@headlessui/react';
import LogoC from '../../../public/images/logo_c.png';
import { useUser } from '@/store/user';

type TransactionProps = {
  isTxn: boolean;
  setIsTxn: any;
  children?: any;
}

const Transaction: NextPageWithLayout<TransactionProps> = ({setIsTxn, isTxn,children}) => {
  const headerText: string = "Recent Transactions";
  const nextText: string = "Click to Search";
  const {transactions} = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <div className="relative w-full mb-6 h-[auto] rounded-xl bg-white shadow-[0px_1px_0px_rgba(0,0,0,0.1)]">
      {transactions?.length > 0 &&
      <div className="p-4 flex flex-row items-center justify-between">
        <p className=' font-thin text-[#414141]'>{headerText}</p>
        {isTxn ? 
          <>
          <div className="flex justify-center md:justify-end">
            <div className="relative">
             
              <div className="absolute right-0 top-0 mt-2 mr-4">
                <svg
                  className="fill-current w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                  />
                </svg>
              </div>
              <input
                className="bg-white text-xs border-[#EDEDED] rounded-lg py-2 px-4 pr-8 focus:outline-none focus:shadow-outline w-full"
                type="text"
                placeholder="Quick Search"
              />
            </div>
          </div>
          <select className=" text-[#414141] text-xs block appearance-none w-1/5 bg-white border border-[#EDEDED] px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
            <option>All Transactions</option>
            <option>7 days</option>
            <option>30 days</option>
            <option>60 days</option>
          </select>
          </>
        :
          <p onClick={()=>setIsTxn(!isTxn)} className='font-thin text-[#414141] hidden cursor-pointer  md:block'>{nextText}</p>
        }
      </div>
       }
      <hr className="h-[2px] w-[100vw] md:hidden"/>
      <TransactionCard />
      <button onClick={()=>setModalOpen(true)} className=" md:hidden fixed bottom-[5vh] right-8 bg-brand_primary_green flex flex-col justify-center items-center w-[35px] h-[35px] rounded-full shadow-xl">
        <RiRefreshLine className="text-white" size={25}/>
      </button>
    </div>

    <WhiteModal isOpen={modalOpen} setIsOpen={()=>{
      setModalOpen(false)
    }}>
      <Dialog.Title
        as="h3"
        className="text-center text-lg font-medium leading-6 "
      >
        <Image 
          src={LogoC}
          className="m-auto mb-6"
          alt="logo_name_c"
          width={35}
          />
        <p className='font-thin'>Selection</p>
        <p className="font-thin text-xs text-[#818181]">What would you like to do?</p>
      </Dialog.Title>

      <div className="flex flex-row justify-evenly items-center my-4 w-[100%]">
        <button className=" font-thin hover:bg-brand_tertiary_grey bg-brand_primary_green text-white_day py-2 px-8 rounded-sm" onClick={() => setModalOpen(false)}>
          Withdraw
        </button>
        <button className=" font-thin hover:bg-brand_tertiary_grey bg-brand_primary_green text-white_day py-2 px-8 rounded-sm" onClick={() => setModalOpen(false)}>
          Deposit
        </button>

      </div>
    </WhiteModal>
    </>
  );
};

Transaction.getLayout = (page) => <Layout>{page}</Layout>;

export default Transaction;
