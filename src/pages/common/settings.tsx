
import React, {useEffect,useState} from 'react';

import Layout from '@/components/layout/Layout';
import type { NextPageWithLayout } from "../_app";
import { useUser } from "../../store/user";
import SettingsCard from '@/components/settings/card';
import {MdModeEditOutline} from 'react-icons/md'
type SettingProps = {
  children?: any;
}

        
const profileArr =[
    {
        id: 1,
        type:"text",
        name:"firstname",
        placeholder:"First Name",
    },
    {
        id: 2,
        type:"text",
        name:"lastname",
        placeholder:"Last Name",
    },
    {
      id: 3,
      type:"text",
      name:"email",
      placeholder:"Email Address",
    },
    {
      id: 4,
      type:"text",
      name:"billingAddress",
      placeholder:"Fiat Account Number",
    },
    {
      id: 5,
      type:"text",
      name:"bank",
      placeholder:"Fiat Bank Name",
    },
    {
      id: 6,
      type:"text",
      name:"phone",
      placeholder:"Phone Number",
    },
]
const walletArr =[
    {
        id: 1,
        type:"text",
        name:"vendor",
        placeholder:"Wallet Vendor Name",
    },
    {
        id: 2,
        type:"text",
        name:"address",
        placeholder:"Wallet Address",
    },
  {
      id: 3,
      type:"text",
      name:"ifp_id",
      placeholder:"IFP Account ID",
  },
]

const Settingboard: NextPageWithLayout<SettingProps> = ({children}) => {
    
  return (

    <div className="md:relative">
        {/* <button  className="fixed md:absolute bottom-[5vh] md:top-[-70px] right-12 md:right-0 bg-brand_primary_green flex flex-col justify-center items-center w-[35px] h-[35px] md:w-[auto] md:h-[50px] md:px-8 md:rounded-lg rounded-full shadow-xl">
          <MdModeEditOutline  className="text-white md:hidden" size={20}/>
          <span className="font-thin text-sx hidden md:flex text-white">Edit</span>
        </button> */}
        <SettingsCard 
            headerText="Profile Details"
            arr={profileArr}
        />
        <SettingsCard 
            headerText="Wallet Details"
            arr={walletArr}
        />
    </div>
  );
};

Settingboard.getLayout = (page) => <Layout>{page}</Layout>;

export default Settingboard;
