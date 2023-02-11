import React, { useState, useCallback } from 'react';
import PaymentCard from '@/components/paymentCard';
import Mainboard from '@/pages/common/mainboardUser';
import  { HiPlusSm } from 'react-icons/hi';
import WhiteModal from '@/components/modal/whitemodal';
import { Dialog } from '@headlessui/react';
import { HiOutlineArrowSmLeft} from 'react-icons/hi';
import Image from 'next/image';
import { MdDeleteSweep } from 'react-icons/md';
import AddPayment from '../../../public/images/add_payment.png';

function Payment() {
  const paymentData = {
    title: "Payment Method"
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [accountID, setAccountID] = useState("");
  const [form, setForm] = useState({
    account:'',
    name:'',
    bank:''
  });

  const mappable = [
    {
        id: 1,
        type:"text",
        name:"account",
        placeholder:"Account Number",
        value:form.account
    },
    {
        id: 2,
        type:"text",
        name:"name",
        placeholder:"Bank Account holder name",
        value:form.name
    },
    {
      id: 3,
      type:"text",
      name:"bank",
      placeholder:"Bank Name",
      value:form.bank
  },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleAdd = ()=>{
    console.log(form, "send (add) to be")
  }
  const handleRemove = ()=>{
    console.log(accountID, "send(remove) to be")
  }

  const handleAddPayment = ()=>{
    setModalType("add")
    setModalOpen(true)
  }
  const handleCloseModal = ()=>{
    setModalType("")
    setModalOpen(false)
  }
  const handleRemovePayment = useCallback(
    () => {
        setModalType("remove")
        setModalOpen(true)
    },
    [],
  )
  
  return (
    <div>
      <Mainboard title={paymentData.title}>
        <div className="md:relative">
        <button onClick={handleAddPayment} className="fixed md:absolute bottom-[5vh] md:top-[-70px] right-12 md:right-0 bg-brand_primary_green flex flex-col justify-center items-center w-[35px] h-[35px] md:w-[auto] md:h-[50px] md:px-8 md:rounded-lg rounded-full shadow-xl">
          <HiPlusSm className="text-white md:hidden" size={25}/>
          <span className="font-thin text-sx hidden md:flex text-white">Add Payment Details</span>
        </button>
        <PaymentCard handleRemovePayment={handleRemovePayment} setAccountID={setAccountID}/>
        </div>

        
      </Mainboard>
      <WhiteModal isOpen={modalOpen} setIsOpen={()=>{
        setModalOpen(true)
      }}>
      <Dialog.Title
        as="h3"
        className="text-center text-lg font-medium leading-6 md:w-[85%]"
      >
        <div className="w-full flex flex-row justify-center items-center">
          <p className='font-thin text-xs'>{modalType === "add" ? "Add Payment Method": "Remove Payment Method"}</p>
          <HiOutlineArrowSmLeft size={25} className=" absolute left-4 text-black mb-4 cursor-pointer" onClick={handleCloseModal}/>
        </div>
        <div className={`w-full p-2 pl-3 flex flex-row mt-4 ${modalType === "add" ? "bg-brand_primary_blue": "bg-white justify-center items-center"} rounded-lg`}>
        {modalType === "add" &&
          <div className="flex text-sm flex-col justify-start">
            <p className="text-white font-thin mb-2 text-left">Add Payment Method</p>
            <p className="text-white font-thin text-left md:text-xs text-[0.7rem]">Please kindly fill in the required details below to add a new payment method.</p>
          </div>
          }
          {modalType === "add" ? 
          <Image 
            src={AddPayment}
            alt="logo_name_c"
            className="w-[65px] md:w-[90px]"
          />
          :
          <MdDeleteSweep size={50} className="text-[#F18383]"/>
          }
        </div>
      </Dialog.Title>

      <div className="flex flex-col items-center gap-4 my-4 w-[100%]">
        {modalType === "add" ? mappable.map(({type, placeholder,name, value, id})=>{
          return (
            <input
              key={id} 
              type={type} 
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              className="bg-transparent border-1 h-[45px] border-[#EDEDED] w-full md:w-[85%] text-xs font-thin rounded"
            />
          )
        })
        :
        <p className="text-[#818181] font-thin">Are you sure you want to remove this payment method ({accountID}) from your account?</p>
      }

        <button 
          className="bg-brand_primary_green mt-4 rounded-lg p-4 text-white"
          onClick={modalType === "add" ? handleAdd: handleRemove}
          >
            {modalType === "add" ? "Add Account": "Confirm"}
          </button>

      </div>
    </WhiteModal>
    </div>
  );
}

export default Payment;