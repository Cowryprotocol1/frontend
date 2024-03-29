import Image from 'next/image';
import React, { useEffect,useState } from 'react';
import { SlClose } from 'react-icons/sl';
import Hamburger from '../../../public/images/hamburger_grey.png'
import HeaderButton from '@/components/links/Headerbutton';
import Avatar from '../icons/avatar';
import Text from '../text';
import PassBg from '../../../public/images/pass_back.png'
import { useUser } from '@/store/user';


type MobileHeaderProps = {
  alt: string;
  image: string;
  route: string;
  walletAddress: string;
  handleLogOut: any;
}

function MobileHeader({ alt, image, route, handleLogOut, walletAddress }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  
  const [label, setLabel] = useState("")
  const [labelRoute, setLabelRoute] = useState("")

  const toggleModal = () => { 
    setIsOpen(!isOpen); 
  }
  const { userData, role, conversionOpen, setConversionOpen } = useUser();
  useEffect(() => {
    if (userData && typeof userData === 'object') {
      if (userData) {
        // if (userData.role === "user"){
        //   setLabel("Become an IFP")
        //   setLabelRoute("join_ifp")
      
        // } else if (userData.role === "ifp"){
        //   setLabel("Top up")
        //   setLabelRoute("top_up")
        // }
      }
    }
    if (role !== null) {
      if (role === "user"){
        setLabel("Become an IFP")
        setLabelRoute("join_ifp")
    
      } else if (role === "ifp"){
        setLabel("Top up")
        setLabelRoute("top_up")
      }
    }
  }, [userData, role])

// console.log(label)
  const links = [
    { id: 1, href: `/${route}/dashboard`, label: 'Dashboard' },
    { id: 2, href: `/${route}/payment`, label: 'Payment'},
    { id: 3, href: `/${route}/settings`, label: 'Settings' },
    { id: 4, href: `/${route}/${labelRoute}`, label: label },
    { id: 5, href: "#", label: 'Logout'},
  ];
  return (
    <header className="md:hidden xs:bg-white_day xs:flex flex-row justify-between p-3 lg:hiden shadow-[0px_1px_4px_rgba(0,0,0,0.5)]">
      {/* <CgMenuLeftAlt size={25} onClick={toggleModal}/> */}
      <Image 
        src={Hamburger}
        alt="hamburger"
        width={25}
        className="h-[25px]"
        onClick={toggleModal}
        />
      <div className="md:hidden xs:flex flex-row justify-around">
      <img
        src={image}
        alt={alt}
        width={32}
        height={32}
        className="img-circle"
      />
      </div>
      {isOpen && route === "users" && ( 
        <div className={`fixed top-0 left-0 bg-brand_primary_blue w-2/3 h-fit p-4 z-10`}> 
        <SlClose size={25} className="text-white_day mb-4" onClick={toggleModal}/>
        <Image src={PassBg} alt="passbg" className="absolute top-16 right-16"/>
         <Avatar src={image} alt="avatar" width={70} height={70} className="img-circle mt-10 -ml-12" editBg="bg-brand_primary_green"/>
        <Text avatar="avatar_name">{""}</Text>
        <Text avatar="wallet_address">{walletAddress?.substring(0, 5)}...{walletAddress?.substring(walletAddress?.length - 4)}</Text>

        <ul className='flex items-center flex-col justify-center'>
          {links.map(({ id, href, label }) => (
            <HeaderButton 
            setConversionOpen={setConversionOpen}
            key={id}
              href={href} 
              text={label} 
              activeBg="bg-brand_primary_green"
              activeText="text-white"
              inactiveBg="bg-[#0D2A3B]"
              onClick={handleLogOut}
            />
          ))}
        </ul> 
      </div> 
      )} 
      {isOpen && route === "ifps" && ( 
        <div className={`fixed top-0 left-0 bg-brand_primary_green w-2/3 h-fit p-4 z-10`}> 
        <SlClose size={25} className="text-white_day mb-4" onClick={toggleModal}/>
        <ul className='flex items-center flex-col justify-center'>
          {links.filter((link)=>link.label !=="Payment" && link.label !=="Top up").map(({ id, href, label }) => (
            <HeaderButton 
            key={id}
              href={href} 
              text={label} 
              activeBg="bg-white_day"
              activeText="text-brand_primary_blue"
              inactiveBg="bg-[#26C965]"
              onClick={handleLogOut}
            />
          ))}
        </ul> 
      </div> 
      )} 
    </header>
  );
}

export default React.memo(MobileHeader);