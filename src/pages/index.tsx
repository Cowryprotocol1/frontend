import Image from 'next/image';
import { useRouter } from "next/router";
import React, {useEffect} from 'react';
import { SlClose } from 'react-icons/sl';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import { Dialog, Menu } from "@headlessui/react";
import { useUser } from '@/store/user';
import Text from '@/components/text';
import LogoName from '../../public/images/logo_name.png';
import LogoC from '../../public/images/logo_c.png';
import Hamburger from '../../public/images/hamburger_green.png';
import { User } from "@/constant/dummydata";
import { kit } from '@/store/wallet_connect';
import Logo from '../../public/images/large-og.png';
import { useState } from 'react';
import Modal from '@/components/modal';
import { WalletType } from 'stellar-wallets-kit';
import { HiArrowRightCircle } from 'react-icons/hi2';
import Spinner from '@/components/layout/Spinner';
import { SiHiveBlockchain } from 'react-icons/si';
export default function HomePage() {
  const {setUserData, initialUserWithWalletStatus, userData} = useUser();
  const [availableWallets, setAvailableWallets] = useState(null)
  const [modalOpen, setModalOpen] = useState(false);
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [modalList, setModalList] = useState(false);
  const [publicKey, setPublicKey] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [close, setClose] = useState("hidden");
  const [wallet, setWallet] = useState(null)

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

  const handleUserWithWallet = ()=>{
    console.log(userData)
    if (userData?.wallet_address !== publicKey) {
      setUserData({
        ...userData,
        wallet_address: publicKey
      })
    }

    if (userData !== null && publicKey) {
      if (userData.role === "user") {
        setTimeout(() => {
          push("/users/dashboard");
          setIsLoading(false)
        }, 5000);
      }
      else if (userData.role === "ifp") {
        setTimeout(() => {
          push("/ifps/dashboard");
          setIsLoading(false)
        }, 3000);
        
      }
  
    }
    else{
      initialUserWithWalletStatus();
      setIsLoading(false)
    }
  }

  
  const handleCloseModal = () => {
    setModalList(true)
    setModalOpen(false)
    setShowFirstModal(false)
    
    // 
    
  };
  async function handleSelectedWallet(type: string){
    let x;
    switch (type) {
      case "XBULL":
        x = WalletType.XBULL
        break;
      case "ALBEDO":
        x = WalletType.ALBEDO
        break;
      case "RABET":
        x = WalletType.RABET
      case "WALLET_CONNECT":
        x = WalletType.WALLET_CONNECT
      case "FREIGHTER":
        x = WalletType.FREIGHTER
      break;
      default:
        x = WalletType.FREIGHTER
        break;
    }
    try {
      await kit.setWallet(x)
      const publicKeye = await kit.getPublicKey()
      setPublicKey(publicKeye);
      
      // if (publicKey !== null) {
      //   initialUserWithWalletStatus();
      //   setTimeout(() => {
      //     handleUserWithWallet();
      //   }, 3000);
        
      // }
      
      // return publicKeye;
      
    } catch (e) {
      console.log(e);
    }
    
  }
  async function getWalletList() {
    try {
      const wallets = await kit.getSupportedWallets();
      setAvailableWallets(wallets);
      return wallets;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect( () => {
    getWalletList();
  }, []);
  
  useEffect( () => {
    // initialUserWithWalletStatus();
    handleUserWithWallet();
    console.log(publicKey, "publick")
  }, [publicKey]);

  return (
    <Layout>
      <Seo templateTitle='| Home' />
      <Seo />

      <main>
        <section className='bg-home lg:px-16 px-4 min-h-screen'>
          <div className="flex items-center flex-shrink-0 justify-between py-4 lg:p-0">
            <a href="#" className="font-semibold text-xl tracking-tight cursor-pointer">
              <Image 
              src={LogoName}
              alt="logo_name"
              className="hidden lg:block"
              width={200}
              />
              <Image 
              src={LogoC}
              alt="logo_name_c"
              className="block lg:hidden"
              width={50}
              />
            </a>
            <div className={`${close} lg:flex absolute bg-[#21C460] top-0 lg:bg-transparent right-0 lg:relative flex-col lg:flex-row justify-between items-center`}>
            <SlClose size={25} className="text-white_day m-4 lg:hidden" onClick={()=>{setClose("hidden")}}/>
              <a className="text-white my-2 mx-8 lg:m-8 font-thin cursor-pointer hover:text-[#21C460]">About us</a>
              <a className="text-white my-2 mx-8 lg:m-8 font-thin cursor-pointer hover:text-[#21C460]">How it works</a>
              <a className="text-white my-2 mx-8 lg:m-8 font-thin cursor-pointer hover:text-[#21C460]">FAQs</a>
              <a className="text-white my-2 mx-8 py-2 px-6 font-thin hover:bg-white hover:text-[#21C460] cursor-pointer bg-[#21C460] rounded-sm">Get Started</a>
            </div>
            <div className="block lg:hidden cursor-pointer">
              <Image 
                src={Hamburger}
                alt="hamburger"
                className=""
                width={25}
                onClick={()=>{setClose("flex")}}
                />
          </div>
          </div>

          
          <div className='layout flex flex-col items-center justify-center text-center h-[80vh] lg:h-[60vh]'>
            <p className='text-white text-[24px] lg:text-[36px] font-medium leading-10'>
              The Fastest peer-to-peer Decentralized protocol for creation of a digital currency.
            </p>
            <p className='text-[#D4D4D4] text-[14px] lg:text-[20px] font-thin leading-10'>
              Enjoy seamless, efficient financial services to send and receive fund from any part of the world.
            </p>
            <a 
              className="text-white cursor-pointer hover:bg-white hover:text-[#21C460] py-4 px-8 lg:px-10 lg:py-2 mt-10 font-thin bg-[#21C460] rounded-sm"
              onClick={() => {
                setModalOpen(true)
                setShowFirstModal(true) 
                setModalList(false)
              }}
              >
              Get Started
            </a>
            <Modal isOpen={modalOpen} setIsOpen={()=>{
              setModalOpen(true)
              setShowFirstModal(true)
            }}>
              <Dialog.Title
                as="h3"
                className="text-center text-lg font-medium leading-6 dark:text-white_day"
              >
                {modalList ?
                <div className="w-full flex flex-row ">
                  {isLoading ? <Text className='font-thin'>Connecting ...</Text> :
                  <>
                  <Text className='font-thin'>Wallet List</Text>
                  <SlClose size={25} className=" absolute right-4 text-white_day mb-4 cursor-pointer" onClick={handleCloseModal}/>
                  </>
                }
                  
                </div>
                
                :
                showFirstModal &&
                <Text className='font-thin'>You are about to connect your wallet. By doing so, you acknowledge you understand that there may be risks associated with this process. Are you sure you want to continue?</Text>
                }
              </Dialog.Title>

              {isLoading ? 
              <Spinner />
              
              :
              <div className="mt-10 w-full flex flex-col justify-center gap-5">
                {modalList ?
                availableWallets.map(({name, type}, index)=>{
                  return (
                    <button key={index} className=' bg-brand_background py-4 w-full px-10 text-white_night flex flex-row justify-center items-center hover:bg-brand_tertiary_grey' onClick={()=>{
                      handleSelectedWallet(type)
                      setIsLoading(true)
                    }}>
                      <SiHiveBlockchain size={30}  className="absolute left-20"/> 
                      {name}
                    </button>
                  )
                })
                : showFirstModal &&
                <>
                <button className=" font-thin hover:bg-brand_tertiary_grey bg-brand_primary_green text-white_day py-2 px-8 rounded-sm" onClick={() => setModalList(true)}>
                  Confirm
                </button>

                <button className="font-thin hover:bg-brand_tertiary_grey bg-red-400 text-white_day py-2 px-8 rounded-sm"  onClick={() => {
                  setModalOpen(false)
                }}>
                  Cancel
                </button>
                </>
                }
              </div>
              }
            </Modal>


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
