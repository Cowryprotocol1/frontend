import React, {useState, useEffect} from 'react';
import Layout from '@/components/layout/Layout';
import type { NextPageWithLayout } from "../../pages/_app";
import Image from 'next/image';
import WhiteModal from '@/components/modal/whitemodal';
import { Dialog } from '@headlessui/react';
import { HiOutlineArrowSmLeft} from 'react-icons/hi';
import {FiCopy} from 'react-icons/fi';
import Deposit from '../../../public/images/deposit.png';
import CountdownTimer from '@/components/balance/timer';
import { currencyFormatter } from '@/pages/common/balanceboard';
import { useUser } from '@/store/user';
import { copyToClipboard } from './withdrawModal';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip'

type DepositModalProps = {
  timer: number;
  isOpen: boolean;
  NGN: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const DepositModal: NextPageWithLayout<DepositModalProps> = ({
  timer, 
  isOpen, 
  NGN,
  setModalOpen
}) => {

  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [next, setNext] = useState(1);
  const [depositData, setDepositData] = useState(null)
  
  const [paymentMsg, setPaymentMsg] = useState("")
  // const [depositData, setDepositData] = useState({
  //   message: "Send funds to account below with the following details, the correct amount to send is 100200.0, please include your narration when making deposit in from your bank account",
  //   memo: "4b86d2fdd6fb0da7e681",
  //   amount: 100000,
  //   fee: "200",
  //   amount_to_pay: 100200,
  //   narration: "Test IFP first auth testt",
  //   bank_name: "TestBank 2nd",
  //   account_number: "2222222222",
  //   phoneNumber: "2222222222",
  //   eta: "5 minutes"
  // });
  const [form, setForm] = useState({
    address: '',
    amount:'',
    bank:'',
    description:''
  });
  const {walletAddress, getDepositIntent, postPaymentConfirmation} =useUser();
  const [copyData, setCopyData] = useState({
    account_number: 'Copy',
  });
  const mappable = [
    {
        id: 1,
        type:"text",
        name:"address",
        placeholder:"Wallet Address",
        value: form.address,
    },
    {
        id: 2,
        type:"text",
        name:"amount",
        placeholder:"Deposit Amount",
        value:form.amount
    },
    {
      id: 3,
      type:"text",
      name:"bank",
      placeholder:"Deposit Bank Name",
      value:form.bank
    },
    {
      id: 4,
      type:"text",
      name:"description",
      placeholder:"Transaction Description",
      value:form.description
  },
]

const handleTooltip = (id:string)=>{
  setCopyData({
    ...copyData,
    [id]: "Copied!"
  })
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any)=>{
  setForm({
    ...form,
    [e.target.name]: e.target.value
  })
}
const handleConfirmation=()=>{
  const data = {
    bank_name: depositData?.bank_name,
    amount: depositData?.amount_to_pay.toString(),
    account_number:depositData?.account_number,
    phone_number:depositData?.phoneNumber,
    blockchain_address: walletAddress,
    transaction_narration:depositData?.narration,
    memo:depositData?.memo
  }
  // console.log(data, "payment details")
  let z = postPaymentConfirmation(data)
  z.then(res=>{
    console.log(res, "payment confirmation")
    if (res?.error){
      if (typeof res?.error === "string") {
        setError("Oops! something went wrong")
        console.log(res)
      }
    }
    else{
      setPaymentMsg(res?.message)
    }
  })
}

const handleDepositIntent = ()=>{
  setIsLoading(true)
  let g = getDepositIntent(form)
  g.then(res=>{
    setIsLoading(false)
    if (res?.error){
      if (typeof res?.error === "string") {
        setError("Oops! something went wrong")
        console.log(res)
      }
    }
    else{
      // console.log(res)
      setDepositData(res)
      setNext(3)
    }
  })
}
const handleCloseModal = ()=>{
  setNext(1)
  setModalOpen(false)
  setError("")
  setIsLoading(false)
}
useEffect(() => {
  setForm({
    ...form,
    address:walletAddress
  })
}, [walletAddress])

  return (
    <WhiteModal isOpen={isOpen} setIsOpen={()=>{
        setModalOpen(true)
      }}>
      <Dialog.Title
        as="h3"
        className="text-center text-lg font-medium leading-6 md:w-[85%]"
      >
        <div className="w-full flex flex-row justify-center items-center">
          <p className='font-thin text-xs'>Deposit</p>
          <HiOutlineArrowSmLeft size={25} className=" absolute left-4 text-black mb-4 cursor-pointer" onClick={handleCloseModal}/>
        </div>
        <div className="w-full p-3 flex flex-row mt-4 bg-brand_primary_blue rounded-lg">

          <div className="flex text-sm flex-col justify-start">
            <p className="text-white font-thin mb-2 text-left">Make Deposit</p>
            <p className="text-white font-thin text-left md:text-xs text-[0.7rem]">
              {next === 1 && "Please kindly fill in the necessary details for your deposit below."}
              {next === 2 && "Please confirm the details inputted for your deposit below."}
              {next === 3 && "You can buy your cowry token by depositing into the IFP account below."}
            </p>
          </div>
          <Image 
            src={Deposit}
            alt="logo_name_c"
            className="w-[65px] md:w-[90px]"
          />
        </div>
      </Dialog.Title>
      {error !== "" && <p className="text-xs rounded  my-2 p-1 text-center bg-[#FBE1E1] text-[#E50808]">{error}</p>}
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
              onChange={handleChange}
              className={`bg-transparent border-1 h-[45px] ${name ==="amount" && parseFloat(form.amount) < 1000 ? "focus:border-[#E50808] border-[#E50808]" : "border-[#EDEDED]"} text-black w-full md:w-[85%] text-xs  font-thin rounded`}
            />
            <p className="text-[9px] text-[#414141] absolute top-[-0.5rem] md:top-[-0.7rem] px-1 left-4 md:left-12 bg-white">{placeholder}</p>
            {name === "amount" && parseInt(form.amount) < 1000 &&
            <p className="text-[9px] px-1 text-right mr-8 mb-[-1rem] bg-white text-[#E50808]">
              Sorry! you have to enter amount no less than {currencyFormatter.format(1000)}
            </p>
            }
            </div>
          )
        })
 
      }
      {next == 2 && 
        <>
        <div className="border-[1px] border-[#F2F2F2] rounded-xl w-full p-4">
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Transaction Amount</p>
            <p className=" text-xs font-thin">{currencyFormatter.format(parseFloat(form?.amount)|| 0.00)}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Address to Credit</p>
            <p className=" text-xs font-thin text-brand_primary_green">{walletAddress.substring(0, 5)}...{walletAddress.substring(walletAddress.length - 4)}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Paying Bank</p>
            <p className=" text-xs font-thin ">{form?.bank}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Description</p>
            <p className=" text-xs font-thin ">{form?.description}</p>
          </div>
        </div>
        <p className="font-thin text-xs text-[#818181]">
        Your deposit in Fiat currency will be exchanged for CowryProtocol stable token at a 1:1 ratio.
        </p>
        </>
      }
      

      {next !== 3 &&
        <>
        <button 
        className={`${parseInt(form.amount) < 1000 || form.amount == '' || form.bank == '' || form.description == '' ? "bg-[#818181]": "bg-brand_primary_green"}  mt-4 rounded px-4 py-2 text-xs text-white`}
        disabled={parseInt(form.amount) < 1000 || form.amount == '' || form.bank == '' || form.description == '' ? true: false}
        onClick={()=>{
          if (next === 1){
            setNext(2)
          }
          else if (next === 2) {handleDepositIntent()}
        }}
        >
          {next === 1 && "Proceed"}
          {next === 2 && !isLoading && "Confirm Deposit"}
          {next === 2 && isLoading && "Confirming..."}
        </button>
        {parseFloat(NGN[0]?.balance) >= parseFloat(form.amount) &&
        <p className="font-thin text-xs text-[#818181]">You will receive <span className="text-brand_primary_green">{currencyFormatter.format(parseFloat(form.amount))}</span> in your cowry protocol account </p>
        }
        </>
      }

      {next == 3 && 
        <>
        <p className="text-xs my-2 bg-[#E4F8EC] text-[#818181] p-2 rounded">{paymentMsg !== "" && paymentMsg}</p>
        <div className="border-[1px] border-[#F2F2F2] rounded-xl w-full p-4">
          {paymentMsg === "" && 
            <p className="text-xs my-2 bg-[#E4F8EC] text-[#818181] p-2 rounded">{depositData?.message}</p>
          }
          <div className="flex flex-col justify-center items-center my-1">
            <p className=" text-xs font-thin text-[#414141]">Transaction Amount</p>
            <p className=" text-lg font-medium">{currencyFormatter.format((depositData?.amount))}</p>
            <p className="font-thin text-[9px] text-[#818181]">Transaction fee: <span className="text-brand_primary_green">{currencyFormatter.format((parseFloat(depositData?.fee)))}</span></p>
          </div>
          <div className="flex flex-row justify-between items-center my-1">
            <p className=" text-xs font-thin text-[#414141]">IFP Account No</p>
            <p className=" text-xs font-medium flex flex-row items-center">
              <FiCopy id="account_number" data-tooltip-content={copyData.account_number}  className="mr-1" 
              onClick={()=>{
                copyToClipboard(depositData.account_number)
                handleTooltip("account_number")
              }}/>
              {depositData.account_number}
            </p>
            <ReactTooltip anchorId="account_number" />
          </div>
          <div className="flex flex-row justify-between items-center my-1">
            <p className=" text-xs font-thin text-[#414141]">Memo</p>
            <p className=" text-xs font-medium">{depositData.memo}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-1">
            <p className=" text-xs font-thin text-[#414141]">Description/Narration</p>
            <p className=" text-xs font-medium ">{depositData.narration}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-1">
            <p className=" text-xs font-thin text-[#414141]">Bank Name</p>
            <p className=" text-xs font-medium ">{depositData.bank_name}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-1">
            <p className=" text-xs font-thin text-[#414141]">Provider Number</p>
            <p className=" text-xs font-medium ">{depositData.phoneNumber}</p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center my-1">
          {isExpired ? 
          <p className="font-thin text-xs text-red-400">Oops! You have to try again</p>
          :
            paymentMsg === "" &&
            <>
              <button 
              className="border-brand_primary_green border mt-2 mr-2 rounded px-4 py-2 text-xs text-brand_primary_green"
              onClick={()=>null}
            >
              Report Problem
            </button>
            <button 
              className="bg-brand_primary_green mt-2 ml-2 rounded px-4 py-2 text-xs text-white"
              onClick={handleConfirmation}
            >
              Payment Made
            </button>
            </>
            
          }
        </div>
        {paymentMsg === "" &&
        <div className="flex flex-col justify-center items-center mt-2">
          <CountdownTimer  timer={timer} setIsExpired={setIsExpired}/>
          <p className="font-thin text-[9px] text-[#818181]">Transaction ETA</p>
        </div>
        }
        </>
      }

      </div>
    </WhiteModal>
  );
}

DepositModal.getLayout = (page) => <Layout>{page}</Layout>;

export default DepositModal;