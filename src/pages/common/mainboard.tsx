
import React, {useEffect,useState} from 'react';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import TopBar from '@/components/layout/TopBar';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from "../_app";
import { useUser } from "../../store/user";

type MainboardProps = {
  title: string;
}

const Mainboard: NextPageWithLayout<MainboardProps> = ({title}) => {

  const [name, setName] = useState("")
  const { userData, role, toggleLogoutMode } = useUser();

  const { push } = useRouter();
  useEffect(() => {
    if (userData && typeof userData === 'object') {
      if (userData && role !== null) {
        setName(userData?.name)
      }
      else if (userData && role === null) {
        const logout = toggleLogoutMode();
        console.log(logout, "logout")
        if (logout) {
          push('/')
        }
      }
    }
  }, [userData])
  

  return (
    <div className="parent md:h-screen md:grid md:grid-cols-8">
      <Header />
      <main className="main bg-brand-background md:col-span-6">
        <div className='md:z-[100] md:h-screen w-full bg-white_day md:-ml-12 md:rounded-l-3xl -pr-12'>
          <TopBar username={name} role={role}/>
          <h1>{title}</h1>
        </div>
      </main>
    </div>
  );
};

Mainboard.getLayout = (page) => <Layout>{page}</Layout>;

export default Mainboard;
