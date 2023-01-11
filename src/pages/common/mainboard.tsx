
import React, {useEffect,useState} from 'react';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import TopBar from '@/components/layout/TopBar';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from "../_app";
import { useUser } from "../../store/user";

type MainboardProps = {
  title: string;
  children?: any;
}

const Mainboard: NextPageWithLayout<MainboardProps> = ({title, children}) => {

  const [name, setName] = useState("")
  const { toggleLogoutMode, role } = useUser();

  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress")
    if (walletAddress === null) {
      toggleLogoutMode()
    }
  }, [])
  

  return (
    <div className="parent md:h-full md:grid md:grid-cols-8 overflow-hidden">
      <Header />
      <main className="main bg-[#F2F2F2] md:col-span-6">
        <div className='md:z-[100] md:h-full w-full bg-[#F2F2F2] md:-ml-12 md:rounded-l-3xl -pr-12'>
          <TopBar username={name} role={role}/>
          <div className="p-4 md:p-8 md:pr-0 h-full min-h-[90vh]">
            <p className="font-thin text-xl md:text-2xl mb-2 md:mb-8">{title}</p>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

Mainboard.getLayout = (page) => <Layout>{page}</Layout>;

export default Mainboard;
