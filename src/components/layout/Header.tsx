
import Image from 'next/image';
import React, {useEffect,useState } from 'react';
import Discord from './Discord';
import Avatar from '@/components/icons/avatar';
import MobileHeader from '@/components/layout/HeaderMobile';
import HeaderButton from '@/components/links/Headerbutton';
import Text from '@/components/text';

import { useUser } from '@/store/user';

import Logo from '../../../public/images/logo_name.png'
import LogoWhite from '../../../public/images/logo_name_white.png'
import PassBg from '../../../public/images/pass_back.png'
import { useRouter } from 'next/router';

const discordLink = "https://discord.gg/KKUvH4qM";
export default function Header() {
  const [walletAddress, setWalletAddress] = useState("")
  const [route, setRoute] = useState("")
  const { role, toggleLogoutMode } = useUser();
  


  const { push } = useRouter();
  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress")
    setWalletAddress(walletAddress)
    if (role === "user") {
      setRoute("users")
    }
    else if (role === "ifp") {
      setRoute("ifps")
    }
  }, [role])

  const links = [
    { id: 1, href: `/${route}/dashboard`, label: 'Dashboard' },
    { id: 2, href: `/${route}/payment`, label: 'Payment'},
    { id: 3, href: `/${route}/settings`, label: 'Settings' },
  ];
  return (
    <>
    {route === "users" &&
    <section className="min-h-[100vh] h-full bg-brand_primary_blue hidden md:block sidebar md:pl-8 md:pr-12  md:col-span-2">
      <Image src={Logo}className="mb-8 mt-8 pr-8 cursor-pointer" alt="Logo" onClick={toggleLogoutMode}/>
      <div className="relative w-full lg:mb-6">
        <Image src={PassBg} alt="passbg" className="absolute top-0 right-12"/>
         <Avatar src="https://picsum.photos/200" alt="avatar" width={70} height={70} className="img-circle mt-10 -ml-12" editBg="bg-brand_primary_green"/>
        <Text avatar="avatar_name">{""}</Text>
        <Text avatar="wallet_address">{walletAddress.substring(0, 5)}...{walletAddress.substring(walletAddress.length - 4)}</Text>

        <ul className='flex items-center flex-col justify-center mt-10'>
           {links.map(({ id, href, label }) => (
            <HeaderButton 
              key={id}
              href={href} 
              text={label} 
              activeBg="bg-brand_primary_green"
              activeText="text-white"
              inactiveBg="bg-[#0D2A3B]"
            />
          ))}
        </ul>
      </div>
      <Discord link={discordLink}/>
    </section>
    }
    {route === "ifps" &&
    <section className={`min-h-[100vh] h-full bg-brand_primary_green hidden md:block sidebar md:pl-8 md:pr-12  md:col-span-2`}>
      <Image src={LogoWhite}className="mb-8 mt-8 pr-8 cursor-pointer" alt="Logo" onClick={toggleLogoutMode}/>
      <div className="relative w-full">
        <Image src={PassBg} alt="passbg" className="absolute top-0 right-12"/>
         <Avatar src="https://picsum.photos/200" alt="avatar" width={70} height={70} className="img-circle mt-10 -ml-12" editBg="bg-brand_primary_blue"/>
        <Text avatar="avatar_name">{""}</Text>
        <Text avatar="wallet_address">{walletAddress?.substring(0, 5)}...{walletAddress?.substring(walletAddress?.length - 4)}</Text>

        <ul className='flex items-center flex-col justify-center mt-10'>
           {links.filter((link)=>link.label !=="Payment").map(({ id, href, label }) => (
            <HeaderButton 
              key={id}
              href={href} 
              text={label} 
              activeBg="bg-white_day"
              activeText="text-brand_primary_blue"
              inactiveBg="bg-[#26C965]"
            />
          ))}
        </ul>
      </div>
      <Discord link={discordLink}/>
    </section>
    }
    <MobileHeader walletAddress={walletAddress} image="https://picsum.photos/200" alt="avatar" route={route} handleLogOut={toggleLogoutMode}/>
    </>
  );
}
