import React from 'react';
import Layout from '@/components/layout/Layout';
import { IoHeadset } from 'react-icons/io5';
import type { NextPageWithLayout } from "../../pages/_app";

type DiscordProps = {
  link: string;
}

const Discord: NextPageWithLayout<DiscordProps> = ({link}) => {

  return (
    <div className="hidden md:flex md:flex-col justify-center items-center border-dotted border-2 p-8 mb-8 h-[25vh] rounded-xl w-[80%] ml-4">
        <a href={link} target="_blank" className="w-full h-full bg-filter rounded-xl flex-col flex items-center justify-center">
        <p className="text-white text-sm">Live</p>
        <p className="text-white text-sm">Support</p>
        <span className="h-[40px] mt-2 w-[40px] rounded-full flex-col flex items-center justify-center bg-white"><IoHeadset className="text-[#2EC363] text-[20px]"/></span>
        </a>
    </div>
  );
}

Discord.getLayout = (page) => <Layout>{page}</Layout>;

export default React.memo(Discord);
