import React, {useState, useEffect} from 'react';
import Layout from '@/components/layout/Layout';
import type { NextPageWithLayout } from "../../pages/_app";
import Image from 'next/image';
import WhiteModal from '@/components/modal/whitemodal';
import { Dialog } from '@headlessui/react';
import { HiOutlineArrowSmLeft} from 'react-icons/hi';
import {FiCopy} from 'react-icons/fi';
import Conversion from '../../../public/images/conversion_ifp.png';
import CountdownTimer from '@/components/balance/timer';
import { currencyFormatter } from '@/pages/common/balanceboard';
import { useUser } from '@/store/user';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useRouter } from 'next/router';

type ConversionModalProps = {
  timer?: number;
  isOpen: boolean;
  NGN?: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const copyToClipboard = (text: string)=>{
  navigator.clipboard.writeText(text);
}


const ConversionModal: NextPageWithLayout<ConversionModalProps> = ({
  timer, 
  isOpen, 
  NGN=[],
  setModalOpen
}) => {
  const { walletAddress, getWithdrawalIntent, role, setRole, getTransactions, setTransactions, onboardIFP, getTransactionStatus} =useUser();
  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [next, setNext] = useState(1);
  const [conversionData, setConversionData] = useState(null)
  const [paymentMsg, setPaymentMsg] = useState("")
  const [assetError, setAssetError] = useState([])
  const [form, setForm] = useState({
    email: '',
    phone:'',
    account_number: '',
    account_name: '',
    bank_name: '',
    address: walletAddress
  });
  const [userTxStatus, setUserTxStatus] = useState({}) //not in use yet

  const [copyData, setCopyData] = useState({
    staking_address: 'Copy',
    staking_asset_issuer:'Copy',
    memo:'Copy',
    NGNALLOW: 'Copy',
    NGNLICENSE: 'Copy',
    NGN: 'Copy'
  });
  
  const {push} = useRouter();
  const mappable = [
    {
      id: 1,
      type:"text",
      name:"account_number",
      placeholder:"Account Number",
      value: form.account_number,
    },
    {
      id: 2,
      type:"text",
      name:"account_name",
      placeholder:"Account Name",
      value:form.account_name
    },
    {
      id: 3,
      type:"text",
      name:"bank_name",
      placeholder:"Bank Name",
      value:form.bank_name
    },
    
    {
      id: 4,
      type:"text",
      name:"phone",
      placeholder:"Phone Number",
      value:form.phone
    },
    {
      id: 5,
      type:"email",
      name:"email",
      placeholder:"Email Address",
      value:form.email
    }
]

const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any)=>{
  setForm({
    ...form,
    [e.target.name]: e.target.value
  })
}
const handleCloseModal = ()=>{
  setNext(1)
  setModalOpen(false)
  setError("")
  setIsLoading(false)
  let d = getTransactions(walletAddress , role)
  d.then((res:any)=>{  
    setTransactions(res.all_transactions)
  })
}


const handleTooltip = (id:string)=>{
  setCopyData({
    ...copyData,
    [id]: "Copied!"
  })
  setTimeout(() => {
    setCopyData({
      ...copyData,
      [id]: "Copy!"
    })
  }, 2000);
}

const handleConfirmation=()=>{
  // open up a loader here
  setPaymentMsg("Checking...")

  let transactionStatus = getTransactionStatus(conversionData?.memo)
  transactionStatus.then((res: any) => {
    console.log("response from server about transaction", res)
    //handle switching user to an IFP account
    if (res.status === "successful") {
      setUserTxStatus(res)
      localStorage.setItem("userType", "ifp")
      setRole("ifp")
      push('/ifps/dashboard')
      // window.location.href = "/ifps/dashboard";
      //this should refresh and load user as an IFP

    }
    else {
      setUserTxStatus(res)
      //pass
    }
  })

  setPaymentMsg(userTxStatus['msg'])
}
const handleOnboarding =()=>{
  setIsLoading(true)
  let g = onboardIFP(form)
  g.then(res=>{
    setIsLoading(false)
    if (res?.error){
      setAssetError(res?.assets)
      if (typeof res?.error === "string") {
        setError(res?.error)
        // console.log(res)
      }
      else{
        setError("Oops! something went wrong")
      }
    }
    else{
      // console.log(res)
      setConversionData(res)
      setNext(3)
      setPaymentMsg(res?.msg)
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
          <p className='font-thin text-xs'>Become an IFP</p>
          <HiOutlineArrowSmLeft size={25} className=" absolute left-4 text-black mb-4 cursor-pointer" onClick={handleCloseModal}/>
        </div>
        <div className="w-full p-3 flex flex-row justify-center items-center mt-4 bg-brand_primary_blue rounded-lg">
          <Image 
            src={Conversion}
            alt="logo_name_c"
            className="w-[70%]"
          />
        </div>
        {next === 1 && <p className="text-[#818181] my-4 font-thin text-center md:text-xs text-[0.7rem]">
            IFPs are Independent Fiat Providers that are authorized to hold fiat in their bank accounts and process transactions having staked a certain number of tokens with the protocol
          </p>}
          {next === 2 && <p className="text-[#818181] my-4 font-thin text-center md:text-xs text-[0.7rem]">
          Please confirm the details inputted for your deposit below.
          </p>}
          {next === 3 && <p className="text-[#818181] my-4 font-thin text-center md:text-xs text-[0.7rem]">
          Please confirm the details inputted for your deposit below.
          </p>}
      </Dialog.Title>
      {error !== "" && <p className="text-xs rounded  my-2 p-2 text-center bg-[#FBE1E1] text-[#E50808]">{error}</p>}
      {error === "your address must add trustline to the following assets"&& assetError?.length >0 &&
        assetError?.map(({code, issuer})=>{
          return (
            <div key={code} className="flex flex-row justify-between items-center px-2 rounded bg-[#FBE1E1] w-full">
              <p className=" text-[0.65rem] font-thin text-[#E50808]">{code}:</p>
              <input
                type="text" 
                value={issuer}
                disabled={true}
                className="bg-transparent border-1  border-[#EDEDED] text-[#E50808] w-full md:w-[85%] text-[0.65rem]  font-thin rounded"
              />
              <FiCopy id={code} data-tooltip-content={copyData?.[code]} 
                  onClick={()=>{
                    copyToClipboard(issuer)
                    handleTooltip(code)
                  }} 
                  className="mr-1 text-[#E50808]"/>
                  <ReactTooltip anchorId={code} />
              </div>
          )
        })
      }
      <div className="flex flex-col items-center gap-4 mt-4  w-[100%]">
        { next ===  1 && mappable.map(({type, placeholder,name, value, id})=>{
          return (
            <div key={id} className="w-[100%] relative ">
            <input
              key={id} 
              type={type} 
              name={name}
              placeholder={placeholder}
              value={value}
              maxLength={name === "account_number" ? 10 : 100}
              onChange={handleChange}
              className="bg-transparent border-1 h-[45px] border-[#EDEDED] text-black w-full md:w-[85%] text-xs  font-thin rounded"
            />
            
            </div>
          )
        })
 
      }
      {next == 2 && 
        <>
        <div className="border-[1px] border-[#F2F2F2] rounded-xl w-full p-4">
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Account Name</p>
            <p className=" text-xs font-medium ">{form?.account_name}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Account Number</p>
            <p className=" text-xs font-medium text-[#414141]">{form?.account_number}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Phone Number</p>
            <p className=" text-xs font-medium">{form.phone}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Email Address</p>
            <p className=" text-xs font-medium ">{form?.email}</p>
          </div>
        </div>
        </>
      }
      

      {next !== 3 &&
        <>
        <button 
        className={`${form.account_name === '' || form.account_number === '' || form.account_number.length < 10 || form.phone === '' || form.email === '' ? "bg-gray-300 text-black" :"bg-brand_primary_green mt-4 text-white"} rounded px-4 py-2 text-xs`}
        disabled={form.account_name === '' || form.account_number === '' || form.account_number.length < 10 || form.phone === '' || form.email === '' ? true: false}
        onClick={()=>{
          if (next === 1){
            setNext(2)
          }
          else if (next === 2) {handleOnboarding()}
        }}
        >
          {next === 1 && "Proceed"}
          {next === 2 && !isLoading && "Continue"}
          {next === 2 && isLoading && "Confirming..."}
        </button>
      
        </>
      }

      {next == 3 && 
        <>
        {paymentMsg !== "" && 
        <p className="text-xs my-2 bg-[#E4F8EC] text-[#818181] p-2 rounded">{paymentMsg}</p>
        }
        
        <div className="border-[1px] border-[#F2F2F2] rounded-xl w-full p-4">
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Staking Address</p>
            <p className=" text-xs font-medium flex flex-row items-center">
              <FiCopy id="staking_address" data-tooltip-content={copyData?.staking_address} 
                onClick={()=>{
                  copyToClipboard(conversionData?.staking_address)
                  handleTooltip("staking_address")
                }} 
                className="mr-1"/>
              {conversionData?.staking_address?.substring(0, 5)}...{conversionData?.staking_address?.substring(conversionData?.staking_address?.length - 4)}
            </p>
            <ReactTooltip anchorId="staking_address" />
            
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Asset Details (Issuer)</p>
            <p className=" text-xs font-medium flex flex-row items-center">
              <FiCopy id="staking_asset_issuer" data-tooltip-content={copyData?.staking_asset_issuer} className="mr-1" 
                onClick={()=>{
                  copyToClipboard(conversionData?.staking_asset_issuer)
                  handleTooltip("staking_asset_issuer")
                }}
              />
              {conversionData?.staking_asset_issuer?.substring(0, 5)}...{conversionData?.staking_asset_issuer?.substring(conversionData?.staking_asset_issuer?.length - 4)}
            </p>
            <ReactTooltip anchorId="staking_asset_issuer" />
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Asset Code</p>
            <p className=" text-xs font-medium flex flex-row items-center"> 
              {conversionData?.staking_asset_code}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Memo</p>
            <p className=" text-xs font-medium flex flex-row items-center"> 
              <FiCopy id="memo" data-tooltip-content={copyData?.memo} className="mr-1" 
                onClick={()=>{
                  copyToClipboard(conversionData?.memo)
                  handleTooltip("memo")
                }}
              />
              {conversionData?.memo}
            </p>
            <ReactTooltip anchorId="memo" />
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Depositing Address</p>
            <p className=" text-xs font-medium ">{conversionData?.user_details?.blockchainAddress?.substring(0, 5)}...{conversionData?.user_details?.blockchainAddress?.substring(conversionData?.user_details?.blockchainAddress?.length - 4)}</p>
            
          </div>
        </div>
        {paymentMsg !== "You will be onboard shortly after confirmation!" &&
        <div className="flex flex-row justify-center items-center my-1">
            <button 
              className="bg-brand_primary_green mt-2 ml-2 rounded px-4 py-2 text-xs text-white"
              onClick={handleConfirmation}
            >
              Confirm Payment
            </button>
        </div>
        }
        </>
      }

      </div>
    </WhiteModal>
  );
}

ConversionModal.getLayout = (page) => <Layout>{page}</Layout>;

export default ConversionModal;
