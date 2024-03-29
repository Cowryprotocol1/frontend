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
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import {IoIosCloseCircleOutline} from 'react-icons/io';
type WithdrawModalProps = {
  timer: number;
  isOpen: boolean;
  NGN: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const copyToClipboard = (text: string)=>{
  navigator.clipboard.writeText(text);
}


const WithdrawModal: NextPageWithLayout<WithdrawModalProps> = ({
  timer, 
  isOpen, 
  NGN,
  setModalOpen
}) => {
  const {walletAddress, getWithdrawalIntent, role,getBalance, setBalances, getTransactions, setTransactions, getTransactionStatus} =useUser();
  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [next, setNext] = useState(1);
  const [withdrawData, setWithdrawData] = useState(null)
  const [paymentMsg, setPaymentMsg] = useState("")
  const [errorAsset, setErrorAsset] = useState([])
  const [form, setForm] = useState({
    address: walletAddress,
    amount:'',
    bank:'',
    description:'',
    account_number: '',
    account_name: '',
    phone: ''
  });

  const [copyData, setCopyData] = useState({
    blockchain_address: 'Copy',
    deposit_asset_issuer:'Copy',
    memo:'Copy',
    NGNALLOW: 'Copy',
    NGNLICENSE: 'Copy',
    NGN: 'Copy'
  });
  

  const mappable = [
    {
        id: 1,
        type:"text",
        name:"amount",
        placeholder:"Withdraw Amount",
        value: form.amount,
        test_id: "form"
    },
    {
        id: 2,
        type:"text",
        name:"bank",
        placeholder:"Bank Name",
        value:form.bank,
        test_id: "form"
    },
    
    {
      id: 3,
      type:"text",
      name:"description",
      placeholder:"Transaction Description",
      value:form.description,
      test_id: "form"
    },
    {
      id: 4,
      type:"text",
      name:"account_number",
      placeholder:"Account Number",
      value:form.account_number,
      test_id: "form"
    },
    {
      id: 5,
      type:"text",
      name:"account_name",
      placeholder:"Account Name",
      value:form.account_name,
      test_id: "form"
    },
    {
      id: 6,
      type:"text",
      name:"phone",
      placeholder:"Phone Number",
      value:form.phone,
      test_id: "form"
    },
]

const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any)=>{
  setForm({
    ...form,
    [e.target.name]: e.target.value
  })
}
const handleBack = ()=>{
  if (next === 1){
    setModalOpen(false)
    setError("")
    setIsLoading(false)
  }
  else if (next === 2){
    setError("")
    setIsLoading(false)
    setNext(1)
  }
  else if (next === 3){
    setError("")
    setIsLoading(false)
    setNext(2)
  }
  
  
}

const handleCloseModal = ()=>{
  
  setNext(1)
  setModalOpen(false)
  setError("")
  setIsLoading(false)
  getTransactions(walletAddress , role).then((res:any)=>{  
    setTransactions(res.all_transactions)
  })
  getBalance(walletAddress).then((res:any)=>{  
    setBalances(res.balances)
    })
}


useEffect(() => {
  setForm({
    ...form,
    address:walletAddress
  })
}, [walletAddress])

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
  let transactionStatus = getTransactionStatus(withdrawData?.memo)
  transactionStatus.then((res: any) => {
    // console.log("response from server about transaction", res)
    //handle switching user to an IFP account
    if (res.status === "success") {
      setPaymentMsg(res.msg)
    }
    else {
      setPaymentMsg(res.msg)
      //pass
    }
  })
  
}
const handleWithdrawIntent =()=>{
  let g = getWithdrawalIntent(form)
  g.then(res=>{
    setIsLoading(false)
    if (res?.error){
      if (typeof res?.error === "string") {
        setError(res?.error)
        // console.log(res)
      }
      if (res?.assets){
        setErrorAsset(res?.assets)
      }
    }
    else{
      // console.log(res)
      setWithdrawData(res)
      setNext(3)
      setPaymentMsg(res?.message)
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
          <p className='font-thin text-xs'>Withdraw</p>
          <HiOutlineArrowSmLeft size={25} className=" absolute left-4 text-black mb-4 cursor-pointer" onClick={handleBack}/>
          <IoIosCloseCircleOutline size={25} className=" absolute right-4 text-black mb-4 cursor-pointer" onClick={handleCloseModal}/>
        </div>
        <div className="w-full p-3 flex flex-row mt-4 bg-brand_primary_blue rounded-lg">

          <div className="flex text-sm flex-col justify-start">
            <p className="text-white font-thin mb-2 text-left">Request Withdraw</p>
            <p className="text-white font-thin text-left md:text-xs text-[0.7rem]">
              {next === 1 && "You can withdraw from your cowry account by paying into the wallet details given below."}
              {next === 2  && "Please confirm withdrawal details below."}
              {next === 3  && "Please confirm withdrawal details below."}
            </p>
          </div>
          <Image 
            src={Deposit}
            alt="logo_name_c"
            className="w-[65px] md:w-[90px]"
          />
        </div>
      </Dialog.Title>
      {error !== "" && <p className="text-xs rounded  my-2 p-2 text-center bg-[#FCF4EA] text-[#818181]">{error}</p>}
      {errorAsset?.length >0 &&
        errorAsset?.map(({code, issuer})=>{
          return (
            <div key={code} className="flex flex-row justify-between items-center px-2 rounded bg-[#FCF4EA] w-full">
              <p className=" text-[0.65rem] font-thin text-[#818181]">{code}:</p>
              <input
                type="text" 
                value={issuer}
                disabled={true}
                className="bg-transparent border-1  border-[#FCF4EA] text-[#818181] w-full md:w-[85%] text-[0.65rem]  font-thin rounded"
              />
              <FiCopy id={code} data-tooltip-content={copyData?.[code]} 
                  onClick={()=>{
                    copyToClipboard(issuer)
                    handleTooltip(code)
                  }} 
                  className="mr-1 text-[#818181]"/>
                  <ReactTooltip anchorId={code} />
              </div>
          )
        })
      }
      <div className="flex flex-col items-center gap-4 mt-4  w-[100%]">
        { next ===  1 && mappable.map(({type, placeholder,name, value, id, test_id})=>{
          return (
            <div key={id} className="w-[100%] relative ">
            <input
              key={id} 
              type={type} 
              name={name}
              data-testid={test_id}
              placeholder={placeholder}
              value={value || ''}
              maxLength={name === "account_number" ? 10 : 100}
              onChange={handleChange}
              className={`bg-transparent border-1 h-[45px] ${name ==="amount" && NGN?.length > 0 && parseFloat(NGN[0]?.balance) < parseFloat(form.amount)? "focus:border-[#E50808] border-[#E50808]" : "border-[#EDEDED]"} text-black w-full md:w-[85%] text-xs  font-thin rounded`}
            />
            <p className="text-[9px] text-[#414141] absolute top-[-0.5rem] md:top-[-0.7rem] px-1 left-4 md:left-12 bg-white">{placeholder}</p>
            {name === "amount" &&
            <p className="text-[9px] text-[#414141]  px-1 text-right mr-8 mb-[-1rem] bg-white">
              Wallet balance:{NGN?.length > 0 ? <span className="text-brand_primary_green">
              {currencyFormatter.format(NGN[0]?.balance)}
              </span>
            :" ₦0.00"}</p>
            }
            </div>
          )
        })
 
      }
      {next == 2 && 
        <>
        <div className="border-[1px] border-[#F2F2F2] rounded-xl w-full p-4">
          
          <div className="flex flex-row justify-between items-center my-2" data-testid="form_two">
            <p className=" text-xs font-thin text-[#414141]">Transaction Amount</p>
            <p className=" text-xs font-thin">{currencyFormatter.format(parseFloat(form?.amount)|| 0.00)}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-2" data-testid="form_two">
            <p className=" text-xs font-thin text-[#414141]">Transaction fees</p>
            <p className=" text-xs font-thin">{currencyFormatter.format(200)}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-2" data-testid="form_two">
            <p className=" text-xs font-thin text-[#414141]">Total Withrawable</p>
            <p className=" text-xs font-medium">{currencyFormatter.format(parseFloat(form?.amount) + 200)}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-2" data-testid="form_two">
            <p className=" text-xs font-thin text-[#414141]">Account Number</p>
            <p className=" text-xs font-medium text-brand_primary_green">{form?.account_number}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-2" data-testid="form_two">
            <p className=" text-xs font-thin text-[#414141]">Account Name</p>
            <p className=" text-xs font-medium ">{form?.account_name}</p>
          </div>
          <div className="flex flex-row justify-between items-center my-2" data-testid="form_two">
            <p className=" text-xs font-thin text-[#414141]">Description</p>
            <p className=" text-xs font-medium ">{form?.description}</p>
          </div>
        </div>
        </>
      }
      

      {next !== 3 &&
        <>
        <button 
        data-testid="submit_btn"
        className={`${NGN?.length > 0 && parseFloat(NGN[0]?.balance) < parseFloat(form.amount) || form.bank === '' || form.account_name === '' || form.account_number === '' || form.account_number.length < 10 || form.phone === '' || form.description === '' || form.amount === '' ? "bg-gray-300 text-black" :"bg-brand_primary_green mt-4 text-white"} rounded px-4 py-2 text-xs`}
        disabled={NGN?.length > 0 && parseFloat(NGN[0]?.balance) < parseFloat(form.amount) || form.bank === '' || form.account_name === '' || form.account_number === '' || form.account_number.length < 10 || form.phone === '' || form.description === '' || form.amount === '' ? true: false}
        onClick={()=>{
          if (next === 1){
            setNext(2)
          }
          else if (next === 2) {handleWithdrawIntent()}
        }}
        >
          {next === 1 && "Withdraw"}
          {next === 2 && !isLoading && "Confirm Withdrawal"}
          {next === 2 && isLoading && "Confirming..."}
        </button>
        {NGN?.length > 0 && parseFloat(NGN[0]?.balance) >= parseFloat(form.amount) &&
        <p className="font-thin text-xs text-[#818181]">You will receive <span className="text-brand_primary_green">{currencyFormatter.format(parseFloat(form.amount))}</span> into your fiat account </p>
        }
        </>
      }

      {next == 3 && 
        <>
        <p className="text-xs my-2 bg-[#E4F8EC] text-[#818181] p-2 rounded">{paymentMsg !== "" && paymentMsg}</p>
        <div className="border-[1px] border-[#F2F2F2] rounded-xl w-full p-4">
        {paymentMsg === "" &&
            <p className="text-xs my-2 bg-[#E4F8EC] text-[#818181] p-2 rounded">{withdrawData?.message}</p>
          }
          <div className="flex flex-col justify-center items-center my-1">
            <p className=" text-xs font-thin text-[#414141]">Total Withdrawable Amount</p>
            <p className=" text-lg font-medium">{currencyFormatter.format((withdrawData?.user_details?.expected_amount_with_fee || 0))}</p>
            <div className="flex flex-row justify-center items-center">
              <p className=" mr-2 font-thin text-[9px] text-[#818181]">Amount: <span className="text-brand_primary_green">{currencyFormatter.format((withdrawData?.user_details?.amount || 0))}</span></p> 
              <span className="text-[#818181] text-xs">|</span>
              <p className=" ml-2 font-thin text-[9px] text-[#818181]">Transaction fee: <span className="text-brand_primary_green">{currencyFormatter.format(withdrawData?.user_details?.expected_amount_with_fee - withdrawData?.user_details?.amount || 0)}</span></p>
            </div>

          </div>
   
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Withdrawal Address</p>
            <p className=" text-xs font-medium flex flex-row items-center">
              <FiCopy id="blockchain_address" data-tooltip-content={copyData?.blockchain_address} 
                onClick={()=>{
                  copyToClipboard(withdrawData?.blockchain_address)
                  handleTooltip("blockchain_address")
                }} 
                className="mr-1"/>
              {withdrawData?.blockchain_address?.substring(0, 5)}...{withdrawData?.blockchain_address?.substring(withdrawData?.blockchain_address?.length - 4)}
            </p>
            <ReactTooltip anchorId="blockchain_address" />
            
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Asset Details (Issuer)</p>
            <p className=" text-xs font-medium flex flex-row items-center">
              <FiCopy id="deposit_asset_issuer" data-tooltip-content={copyData?.deposit_asset_issuer} className="mr-1" 
                onClick={()=>{
                  copyToClipboard(withdrawData?.deposit_asset_issuer)
                  handleTooltip("deposit_asset_issuer")
                }}
              />
              {withdrawData?.deposit_asset_issuer?.substring(0, 5)}...{withdrawData?.deposit_asset_issuer?.substring(withdrawData?.deposit_asset_issuer?.length - 4)}
            </p>
            <ReactTooltip anchorId="deposit_asset_issuer" />
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Asset Code</p>
            <p className=" text-xs font-medium flex flex-row items-center"> 
              {withdrawData?.deposit_asset_code}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Memo</p>
            <p className=" text-xs font-medium flex flex-row items-center"> 
              <FiCopy id="memo" data-tooltip-content={copyData?.memo} className="mr-1" 
                onClick={()=>{
                  copyToClipboard(withdrawData?.memo)
                  handleTooltip("memo")
                }}
              />
              {withdrawData?.memo}
            </p>
            <ReactTooltip anchorId="memo" />
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <p className=" text-xs font-thin text-[#414141]">Depositing Address</p>
            <p className=" text-xs font-medium ">{withdrawData?.user_details?.blockchain_address?.substring(0, 5)}...{withdrawData?.user_details?.blockchain_address.substring(withdrawData?.user_details?.blockchain_address?.length - 4)}</p>
            
          </div>
        </div>
        <div className="flex flex-row justify-between items-center my-1">
          {isExpired ? 
          <p className="font-thin text-xs text-red-400">Oops! You have to try again</p>
          :
          paymentMsg !== "we are updating your balance right away" &&
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
          {paymentMsg !== "we are updating your balance right away" && !isExpired &&
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

WithdrawModal.getLayout = (page) => <Layout>{page}</Layout>;

export default WithdrawModal;
