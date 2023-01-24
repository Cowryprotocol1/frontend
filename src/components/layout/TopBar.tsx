import React from 'react';
import { RxPlusCircled  } from 'react-icons/rx';

import Layout from '@/components/layout/Layout';
import { useUser } from '@/store/user';
import type { NextPageWithLayout } from "../../pages/_app";
import ConversionModal from './conversionModal';

type TopBarProps = {
  username: string;
  role: string;
}

const TopBar: NextPageWithLayout<TopBarProps> = ({username, role}) => {
const {conversionOpen, setConversionOpen} = useUser();
  return (
    <>
    <section className="hidden md:bg-white_day md:flex md:flex-row md:justify-between md:px-12 md:py-6 md:items-center md:shadow-[0px_1px_0px_rgba(0,0,0,0.1)] md:-mr-12 md:rounded-tl-3xl">
      <p> <span className="mr-1">&#128075; </span> Hi {username?.split(" ")[0]!}</p>
      {role === "ifp" ? null :
      // <button className="bg-brand_primary_green rounded-xl h-12 text-white flex flex-row justify-between items-center px-12 text-sm">Top Up</button> : 
      <button 
        className="bg-[#0D2A3B] rounded-xl h-12 text-white flex flex-row justify-between items-center px-4 text-sm"
        onClick={()=>setConversionOpen(true)}
      >
        <RxPlusCircled  size={25} className="mr-2"/> Become an IFP
      </button>
      }
    </section>
    <ConversionModal 
      isOpen={conversionOpen}
      setModalOpen={setConversionOpen}
    />
    </>
  );
}

TopBar.getLayout = (page) => <Layout>{page}</Layout>;

export default TopBar;
