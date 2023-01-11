import React, { useState } from 'react';
import PaymentCard from '@/components/paymentCard';
import Mainboard from '@/pages/common/mainboard';
import  { HiPlusSm } from 'react-icons/hi';
import WhiteModal from '@/components/modal/whitemodal';
import { Dialog } from '@headlessui/react';
import { SlClose } from 'react-icons/sl';

function Payment() {
  const paymentData = {
    title: "Payment Method"
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleAddPayment = ()=>{
    setModalType("add")
    setModalOpen(true)
  }
  const handleCloseModal = ()=>{
    setModalType("")
    setModalOpen(false)
  }
  const handleRemovePayment = ()=>{
    setModalType("remove")
    setModalOpen(true)
  }
  return (
    <div>
      <Mainboard title={paymentData.title}>
        <div className="md:relative">
        <button onClick={handleAddPayment} className="fixed md:absolute bottom-[5vh] md:top-[-70px] right-12 md:right-0 bg-brand_primary_green flex flex-col justify-center items-center w-[35px] h-[35px] md:w-[auto] md:h-[50px] md:px-8 md:rounded-lg rounded-full shadow-xl">
          <HiPlusSm className="text-white md:hidden" size={25}/>
          <span className="font-thin text-sx hidden md:flex text-white">Add Payment Details</span>
        </button>
        <PaymentCard handleRemovePayment={handleRemovePayment}/>
        </div>

        
      </Mainboard>
      <WhiteModal isOpen={modalOpen} setIsOpen={()=>{
      setModalOpen(false)
    }}>
      <Dialog.Title
        as="h3"
        className="text-center text-lg font-medium leading-6 "
      >
        <div className="w-full flex flex-row ">
          <p className='font-thin text-xs'>{modalType === "add" ? "Add Payment Method": "Remove Payment Method"}</p>
          <SlClose size={25} className=" absolute right-4 text-black mb-4 cursor-pointer" onClick={handleCloseModal}/>
        </div>
      
      </Dialog.Title>

      <div className="flex flex-row justify-evenly items-center my-4 w-[100%]">
        <button className=" font-thin hover:bg-brand_tertiary_grey bg-brand_primary_green text-white_day py-2 px-8 rounded-sm" onClick={() => setModalOpen(false)}>
          Withdraw
        </button>
        <button className=" font-thin hover:bg-brand_tertiary_grey bg-brand_primary_green text-white_day py-2 px-8 rounded-sm" onClick={() => setModalOpen(false)}>
          Deposit
        </button>

      </div>
    </WhiteModal>
    </div>
  );
}

export default Payment;