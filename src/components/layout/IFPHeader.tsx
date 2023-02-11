import Image from 'next/image';
import React, {useEffect,useState } from 'react';
import Discord from './Discord';
import Avatar from '@/components/icons/avatar';
import MobileHeader from '@/components/layout/HeaderMobile';
import HeaderButton from '@/components/links/Headerbutton';
import Text from '@/components/text';

import { useUser } from '@/store/user';

import LogoWhite from '../../../public/images/logo_name_white.png'
import PassBg from '../../../public/images/pass_back.png'

const discordLink = "https://discord.gg/KKUvH4qM";
function Header() {
  const [walletAddress, setWalletAddress] = useState("")
  const [route, setRoute] = useState("")
  const [avatar, setAvatar] = useState("")
  const { role, toggleLogoutMode } = useUser();
  

  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress")
    setWalletAddress(walletAddress)
    setAvatar(`https://id.lobstr.co/${walletAddress}.png`)
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
    <section className="min-h-[100vh] h-full bg-brand_primary_green hidden md:block sidebar md:pl-8 md:pr-12  md:col-span-2">
      <Image src={LogoWhite}className="mb-8 mt-8 pr-8" alt="Logo" />
      <div className="relative w-full">
        <Image src={PassBg} alt="passbg" className="absolute top-0 right-12"/>
         <Avatar src={avatar} alt="avatar" width={70} height={70} className="img-circle mt-10 -ml-12" editBg="bg-brand_primary_blue"/>
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
    <MobileHeader walletAddress={walletAddress} image={avatar} alt="avatar" route={route} handleLogOut={toggleLogoutMode}/>
    </>
  );
}

export default React.memo(Header);
