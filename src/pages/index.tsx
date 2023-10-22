import Image from 'next/image';
import { useRouter } from "next/router";
import React, {useEffect} from 'react';
import { SlClose } from 'react-icons/sl';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import { Dialog } from "@headlessui/react";
import { useUser } from '@/store/user';
import Text from '@/components/text';
import LogoName from '../../public/images/logo_name.png';
import LogoC from '../../public/images/logo_c.png';
import Hamburger from '../../public/images/hamburger_green.png';
import { useState } from 'react';
import Modal from '@/components/modal';
// import { WalletType, StellarWalletsKit } from 'stellar-wallets-kit';
import { WalletType, StellarWalletsKit } from 'stellarKit'
import Spinner from '@/components/layout/Spinner';
import { SiHiveBlockchain } from 'react-icons/si';

import walletConnectAll from '@/store/wallet_connect';

export const redirectUrl = (url: string)=>{
  const { push } = useRouter();
  push(url);
}

function HomePage() {
  const [availableVendors, setAvailableVendors] = useState(null)
  const {setWalletAddress, getAccount, setRole} = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [modalList, setModalList] = useState(false);
  const [error, setError]= useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [close, setClose] = useState("hidden");


  const handleCloseModal = () => {
    setModalList(true)
    setModalOpen(false)
    setShowFirstModal(false)
    
    // 
    
  };
  async function handleSelectedWallet(type: string){
    localStorage.setItem("vendor", type) 
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
        break;
      case "WALLET_CONNECT":
        x = WalletType.WALLET_CONNECT
        break;
      case "FREIGHTER":
        x = WalletType.FREIGHTER
        break;
    }
    let newKit = await walletConnectAll(x)

    try {

      await newKit.setWallet(x) //not sure this is needed again
      await newKit.getPublicKey()
      .then(res=>
        localStorage.setItem("walletAddress", res) 
        // localStorage.setItem("walletAddress", "GBZGNJFRXS2AQ6GQ2QNSRFTA54W6Z36KMTKSJ35GEWBXH4RWJLULLBVH") 
        )
      .then(res=>{
        getAccount(localStorage.getItem("walletAddress")).then(response=>{
          if (response.status === "successful") {
            localStorage.setItem("userType", "ifp") 
            window.location.href = "/ifps/dashboard";

          }
          else  {
            localStorage.setItem("userType", "user") 
            setRole("user")
            window.location.href = "/users/dashboard";
          }
        })
      })
      
    } catch (e) {
      console.log(e);
      setError("Oops! an error occured.")
      setTimeout(() => {
        setIsLoading(false)
        setError("")
      }, 3000);
    }
    
  }
  async function getWalletList() {
    try {
      const vendors = await StellarWalletsKit.getSupportedWallets();
      setAvailableVendors(vendors);
      return vendors;
    } catch (e) {
      console.log(e);
      setError("Oops! an error occured.")
      setTimeout(() => {
        setIsLoading(false)
        setError("")
      }, 3000);
    }
  }

  // useEffect( () => {
  //   if (localStorage.getItem("userType") === 'user'){
  //     window.location.pathname ='/users/dashboard'
  //   }
  //   else if (localStorage.getItem("userType") === 'ifp') {
  //     window.location.pathname ='/ifps/dashboard'
  //   }
  //   else{
  //     getWalletList();
  //   }
    
  // }, []);
  

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
              <a className="text-white my-2 mx-8 py-2 px-6 font-thin hover:bg-white hover:text-[#21C460] cursor-pointer bg-[#21C460] rounded-sm"
                onClick={() => {
                  // setModalOpen(true)
                  // setShowFirstModal(true) 
                  // setModalList(false)
                }}
              >Get Started
              </a>
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
              {/* The Fastest peer-to-peer Decentralized protocol for creation of a digital currency. */}
              Decentralized protocol for Fiat on and Off ramp
            </p>
            <p className='text-[#D4D4D4] text-[14px] lg:text-[20px] font-thin leading-10'>
              Enjoy seamless, efficient financial services to send and receive fund from any part of the world.
            </p>
            <a 
              className="text-white cursor-pointer hover:bg-white hover:text-[#21C460] py-4 px-8 lg:px-10 lg:py-2 mt-10 font-thin bg-[#21C460] rounded-sm"
              onClick={() => {
                // setModalOpen(true)
                // setShowFirstModal(true) 
                // setModalList(false)
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
                  {isLoading ? <Text className='font-thin'>{error !== "" ? error: "Connecting ..."}</Text> :
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
                availableVendors.map(({name, type}, index)=>{
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


            <footer className='absolute bottom-2 text-white'>
              © {new Date().getFullYear()} @{' '}
              <UnderlineLink href='https://cowryprotocol.io/'>
                cowry protocol
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default React.memo(HomePage);