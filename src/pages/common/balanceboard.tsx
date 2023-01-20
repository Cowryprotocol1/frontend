
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
import {  BsFillEyeFill, BsFillEyeSlashFill }  from 'react-icons/bs';
import BImage from '../../../public/images/balance_image.png';
type BalanceboardProps = {
  children?: any;
}

const Balanceboard: NextPageWithLayout<BalanceboardProps> = ({children}) => {
  const headerText: string = "Account Balance Details";
  const balanceText: string = "Cowry Balance";
  const [view, setView] = useState(true)

  const {balances} =useUser();
  const NGN = balances?.filter((bal)=> bal.asset_code === "NGN")
  const NGNALLOW = balances?.filter((bal)=> bal.asset_code === "NGNALLOW")
  const NGNLICENSE = balances?.filter((bal)=> bal.asset_code === "NGNLICENSE")
  const USDC = balances?.filter((bal)=> bal.asset_code === "USDC")
  const XLM = balances?.filter((bal)=> bal.asset_type === "native")

  return (
    <div className="relative w-full md:w-[65%]  h-[auto] mb-6 rounded-xl bg-white shadow-[0px_1px_0px_rgba(0,0,0,0.1)]">
      <Image src={BImage} alt="bal_image" className="w-[18%] right-0 absolute" />
      <div className="py-4 px-6">
        <Text className="font-thin text-sm">{headerText} {view ? <BsFillEyeSlashFill className='text-[#D4D4D4] inline-block ml-2' size={20} onClick={()=>setView(false)}/>:<BsFillEyeFill className='text-[#D4D4D4] inline-block ml-2' size={20} onClick={()=>setView(true)}/>}</Text>
        <div className="flex my-4 md:mt-16 flex-row items-center justify-center md:justify-between">
          <div className="flex flex-row items-center">
            <div className="w-[40px] h-[40px] rounded-lg bg-[#E9FAF0] mr-2 flex  flex-col justify-center items-center">
              <RiBankFill  size={25} className=" text-brand_primary_green"/>
            </div>
            <div>
              {NGN.length > 0 ? 
              <Text className="font-bold text-xl">{view ? "₦"+ parseFloat(NGN[0]?.balance).toFixed(2) : "******"}</Text>
              :
              USDC.length > 0 ? 
              <Text className="font-bold text-xl">{view ? "USDC "+parseFloat(USDC[0]?.balance).toFixed(2) : "******"}</Text>
              : 
              <Text className="font-bold text-xl">{view ? "XLM "+ parseFloat(XLM[0]?.balance).toFixed(2) : "******"}</Text>
              }
              <Text className="font-thin text-sm text-[#818181]">{balanceText}</Text>
            </div>
          </div>
          <button className="bg-brand_primary_green rounded-lg h-10 text-white hidden md:flex flex-row justify-between items-center px-8 text-sm">Withdraw</button>
          <button className="bg-brand_primary_green rounded-lg h-10 text-white hidden md:flex flex-row justify-between items-center px-8 text-sm ">Deposit</button>
        </div>
      </div>
    </div>
  );
};

Balanceboard.getLayout = (page) => <Layout>{page}</Layout>;

export default Balanceboard;
