import React from 'react';
import { RxPlusCircled  } from 'react-icons/rx';

import Layout from '@/components/layout/Layout';

import type { NextPageWithLayout } from "../../pages/_app";

type TopBarProps = {
  username: string;
  role: string;
}

const TopBar: NextPageWithLayout<TopBarProps> = ({username, role}) => {

  return (
    <section className="hidden md:bg-white_day md:flex md:flex-row md:justify-between md:px-12 md:py-6 md:items-center md:shadow-[0px_1px_0px_rgba(0,0,0,0.1)] md:-mr-12 md:rounded-tl-3xl">
      <p> <span className="mr-1">&#128075; </span> Hi {username?.split(" ")[0]}!</p>
      {role === "ifp" ? 
      <button className="bg-[#0D2A3B] rounded-xl h-12 text-white flex flex-row justify-between items-center px-12 text-sm">Top Up</button> : 
      <button className="bg-[#0D2A3B] rounded-xl h-12 text-white flex flex-row justify-between items-center px-4 text-sm">
        <RxPlusCircled  size={25} className="mr-2"/> Become an IFP
      </button>
      }
    </section>
  );
}

TopBar.getLayout = (page) => <Layout>{page}</Layout>;

export default TopBar;
