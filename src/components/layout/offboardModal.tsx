import React, {useState} from 'react';
import Layout from '@/components/layout/Layout';
import type { NextPageWithLayout } from "../../pages/_app";
import Image from 'next/image';
import WhiteModal from '@/components/modal/whitemodal';
import { Dialog } from '@headlessui/react';
import Conversion from '../../../public/images/conversion_ifp.png';
import { useUser } from '@/store/user';
import 'react-tooltip/dist/react-tooltip.css';
import { useRouter } from 'next/router';
import {IoIosCloseCircleOutline} from 'react-icons/io';
import walletConnectAll from '@/store/wallet_connect';

type OffBoardModalProps = {
  isOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const copyToClipboard = (text: string)=>{
  navigator.clipboard.writeText(text);
}


const OffBoardModal: NextPageWithLayout<OffBoardModalProps> = ({
  isOpen, 
  setModalOpen
}) => {
  const { walletAddress,role, signXDR, setRole, getTransactions, setTransactions, offboardIFP} =useUser();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [offboardingData, setOffboardingData] = useState(null)


  
  const {push} = useRouter();
  
  const handleCloseModal = ()=>{
    setModalOpen(false)
    setError("")
    setOffboardingData(null)
    setIsLoading(false)
    let d = getTransactions(walletAddress , role)
    d.then((res:any)=>{  
      setTransactions(res.all_transactions)
    })
  }


  const handleSignOffboardingIFP =async ()=>{
    setIsLoading(true)
    const wallet = localStorage.getItem("vendor")

    const kit = await walletConnectAll(wallet)
    
    const {signedXDR} = await kit.sign({
        xdr: offboardingData?.raw_xdr,
        publicKey: walletAddress
    })
    
    if (signedXDR !== null){
        signXDR(signedXDR).then(res=>{
            if (res?.transaction_response?.memo){
              offboardingData("You have been offboarded successfully. You will be redirect in 2 seconds.")
              setTimeout(() => {
                localStorage.setItem("userType", "user") 
                setRole("user")
                push('/users/dashboard')
              }, 2000);
            }
        })

    }
  }


  const handleOffboarding =()=>{
    setIsLoading(true)
    let g = offboardIFP()
    g.then(res=>{
      console.log(res)
      setIsLoading(false)
      if (res?.error){
        if (typeof res?.error === "string") {
          setError(res?.error)
          
        }
        else{
          setError("Oops! something went wrong")
        }
      }
      else{

        setOffboardingData(res)
      }
    })
  }

  return (
    <WhiteModal isOpen={isOpen} setIsOpen={()=>{
        setModalOpen(true)
      }}>
      <Dialog.Title
        as="h3"
        className="text-center text-lg font-medium leading-6 md:w-[85%]"
      >
        <div className="w-full flex flex-row justify-center items-center">
          <p className='font-thin text-xs'>Offboarding as an IFP</p>
          <IoIosCloseCircleOutline size={25} className=" absolute right-4 text-black mb-4 cursor-pointer" onClick={handleCloseModal}/>
        </div>
        <div className="w-full p-3 flex flex-row justify-center items-center mt-4 bg-brand_primary_blue rounded-lg">
          <Image 
            src={Conversion}
            alt="logo_name_c"
            className="w-[70%]"
          />
        </div>
        <p className="text-[#818181] my-4 font-thin text-center md:text-xs text-[0.7rem]">
          Please confirm you no longer hold any user funds in your account, if you do you wont be able to Off board.
          </p>
        <p className="text-[#818181] my-4 font-thin text-center md:text-xs text-[0.7rem]">
          Please also confirm you want to leave Cowry protocol. You will no longer enjoy the benefits associated with being an IFP.
        </p>
        
      </Dialog.Title>
      {error !== "" && <p className="text-xs rounded  my-2 p-2 text-center bg-[#FCF4EA] text-[#818181]">{error}</p>}

      <div className="flex flex-col items-center gap-4 mt-4  w-[100%]">
        {offboardingData === null && error === "" &&
          <button 
            className="bg-gray-300 mt-4 text-black rounded px-4 py-2 text-xs"
            onClick={handleOffboarding}
            >
              Remove me from the Protocol
          </button>
        }
        {offboardingData !== null && 
        <>
          <p className="text-xs my-4 bg-[#E4F8EC] text-[#818181] p-2 rounded">{offboardingData?.message || offboardingData}</p>
          <div className="w-[100%] relative mt-4"> 
              <textarea
                  disabled
                  className={`bg-transparent border-1 border-[#EDEDED] text-black w-full md:w-[85%] text-xs  font-thin rounded`}
                  rows={2}
                  value={offboardingData?.raw_xdr}
              />
              <p className="text-[9px] text-[#414141] absolute top-[-0.5rem] md:top-[-0.7rem] px-1 left-4 md:left-12 bg-white">Transaction Hash</p>
          </div>
          <button 
              className="mt-6 rounded-lg bg-brand_primary_blue py-4 px-8 text-xs text-white"
              onClick={handleSignOffboardingIFP}
          >
              {isLoading ? "Signing Transaction..." : "Sign Transaction to Offboard "}
          </button> 
        </>
        }
      </div>
    </WhiteModal>
  );
};

OffBoardModal.getLayout = (page) => <Layout>{page}</Layout>;

export default React.memo(OffBoardModal);
