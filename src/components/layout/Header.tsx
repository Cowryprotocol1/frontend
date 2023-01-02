
import Image from 'next/image';
import Link from 'next/link';
import React, {useEffect,useState } from 'react';

import Avatar from '@/components/icons/avatar';
import MobileHeader from '@/components/layout/HeaderMobile';
import HeaderButton from '@/components/links/Headerbutton';
import Text from '@/components/text';

import { useUser } from '@/store/user';

import Logo from '../../../public/images/logo_name.png'
import LogoWhite from '../../../public/images/logo_name_white.png'
import PassBg from '../../../public/images/pass_back.png'
import { useRouter } from 'next/router';
export default function Header() {
  const [user, setUser] = useState({})
  const [walletAddress, setWalletAddress] = useState("")
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [route, setRoute] = useState("")
  const { userData,  toggleLogoutMode } = useUser();

  const { push } = useRouter();
  useEffect(() => {
    if (userData && typeof userData === 'object') {
      
      if (userData) {
        setName(userData?.name)
        setImage(userData?.image)
        if (userData?.role === "user") {
          setRoute("users")
        }
        else if (userData?.role === "ifp") {
          setRoute("ifps")
        }
        
        setWalletAddress(userData?.wallet_address)
        setUser(userData)
        
      }
    }
  }, [userData])

  const handleLogOut = ()=>{
    
    const logout = toggleLogoutMode();
    console.log(logout, "logout")
    if (logout) {
      push('/')
    }
  }
  const links = [
    { id: 1, href: `/${route}/dashboard`, label: 'Dashboard' },
    { id: 2, href: `/${route}/payment`, label: 'Payment Method'},
    { id: 3, href: `/${route}/settings`, label: 'Settings' },
  ];
  return (
    <>
    {route === "users" &&
    <section className={`bg-brand_primary_blue hidden md:block sidebar md:pl-8 md:pr-12  md:col-span-2`}>
      <Image src={Logo}className="mb-8 mt-8 pr-8" alt="Logo" onClick={handleLogOut}/>
      <div className="relative w-full">
        <Image src={PassBg} alt="passbg" className="absolute top-0 right-12"/>
         <Avatar src={image} alt={name} width={70} height={70} className="img-circle mt-10 -ml-12" editBg="bg-brand_primary_green"/>
        <Text avatar="avatar_name">{name}</Text>
        <Text avatar="wallet_address">{walletAddress?.substring(0, 4)+"..."+ walletAddress?.substring(5, 9)}</Text>

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
    </section>
    }
    {route === "ifps" &&
    <section className={`bg-brand_primary_green hidden md:block sidebar md:pl-8 md:pr-12  md:col-span-2`}>
      <Image src={LogoWhite}className="mb-8 mt-8 pr-8" alt="Logo" onClick={handleLogOut}/>
      <div className="relative w-full">
        <Image src={PassBg} alt="passbg" className="absolute top-0 right-12"/>
         <Avatar src={image} alt={name} width={70} height={70} className="img-circle mt-10 -ml-12" editBg="bg-brand_primary_blue"/>
        <Text avatar="avatar_name">{name}</Text>
        <Text avatar="wallet_address">{walletAddress?.substring(0, 4)+"..."+ walletAddress?.substring(5, 9)}</Text>

        <ul className='flex items-center flex-col justify-center mt-10'>
           {links.map(({ id, href, label }) => (
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
    </section>
    }
    <MobileHeader image={image} alt={image} route={route} handleLogOut={handleLogOut}/>
    </>
  );
}
