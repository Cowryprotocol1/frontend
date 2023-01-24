import { useRouter } from "next/router";
import React from 'react';
import { RiBankFill, RiSettings5Fill, RiLogoutCircleLine, RiBankCardFill } from 'react-icons/ri';
import { RxDashboard, RxPlusCircled  } from 'react-icons/rx';
type HeaderButtonProps = {
  href: string;
  text: string;
  activeBg: string;
  activeText: string;
  inactiveBg: string;
  onClick?: any;
  setConversionOpen?: any;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ href, text, activeBg, activeText, inactiveBg, onClick, setConversionOpen }) => {
  const { pathname, push } = useRouter();
  
  const handleLink = (link: string) => {
    push(link);
  };

  const classname = href === pathname.split("/users/").pop() || href === pathname.split("/ifps/").pop() ? 
  `${activeBg} rounded-l-lg w-full h-12 ${activeText} flex flex-row text-sm items-center pl-8 my-3` : 
  `${inactiveBg} rounded-l-lg w-full h-12 text-white flex flex-row items-center pl-8 my-3 text-sm`;

  return (
    <button 
      onClick={()=>{
        text === "Logout" ? onClick(): text === "Become an IFP" ? setConversionOpen(true): handleLink(href)
    }}  
      className={classname}
    >
      {text === "Dashboard" && <RxDashboard  size={25} className="mr-4"/>}
      {text === "Payment" && <RiBankFill  size={25} className="mr-4"/>}
      {text === "Settings" &&  <RiSettings5Fill  size={25} className="mr-4"/>}
      {text === "Become an IFP" && <RxPlusCircled  size={25} className="mr-2"/>}
      {text === "Top up" && <RiBankCardFill  size={25} className="mr-2"/>}
      {text === "Logout" && <RiLogoutCircleLine  size={25} className="mr-2"/>}
      {text}
    </button>
  )
}

export default HeaderButton;