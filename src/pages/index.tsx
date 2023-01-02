import Image from 'next/image';
import { useRouter } from "next/router";
import React from 'react';

import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

import { useUser } from '@/store/user';

import { User } from "@/constant/dummydata";

import Logo from '../../public/images/large-og.png';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
// import Vercel from '~/svg/Vercel.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const {setUserData} = useUser();
  const { push } = useRouter();

  const handleUser = (user: string)=>{
    localStorage.setItem("userType", user);
    if (user === "user") {
      
      localStorage.setItem("userData", JSON.stringify(User[0]))
      setUserData(User[0]);
      push("/users/dashboard");
    }
    else if (user === "ifp") {
      localStorage.setItem("userData", JSON.stringify(User[1]))
      setUserData(User[1]);
      push("/ifps/dashboard");
    }
  }

  
  return (
    <Layout>
      <Seo templateTitle='| Home' />
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <Image 
              src={Logo}
              alt="cowry_logo"
              className="w-48"
            />
            <h1 className='mt-4 text-primary-green'>
              Decentralization + Permisionless + Trustless
            </h1>
            <p className='mt-2 text-sm text-gray-800'>
              a truly peer-to-peer platform that is censorship resistant, readily available, trusted, convenient to use for on-and-off ramp {' '}
            </p>

            <button className='mt-6 bg-brand_primary_blue p-4 text-white_day' onClick={()=>{handleUser("user")}}>Get Started User</button>
            <button className='mt-6 bg-brand_primary_green p-4' onClick={()=>{handleUser("ifp")}}>Get Started IFP</button>
            {/* <ButtonLink className='mt-6' href='/users/dashboard' variant='dark'>
              Get Started User
            </ButtonLink>
            <ButtonLink className='mt-6' href='/ifps/dashboard' variant='dark'>
              Get Started IFP
            </ButtonLink> */}


            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} @{' '}
              <UnderlineLink href='https://github.com/Cowryprotocol'>
                cowry protocol inc
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
