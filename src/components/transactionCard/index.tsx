
import React, {useEffect,useState} from 'react';
import Layout from '@/components/layout/Layout';
import { HiArrowDownCircle, HiArrowUpCircle } from 'react-icons/hi2'
import type { NextPageWithLayout } from '@/pages/_app';
import { useUser } from '@/store/user';
import { BsJournalBookmark } from 'react-icons/bs';
import WhiteModal from '@/components/modal/whitemodal';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import Logo from '../../../public/images/logo_c.png'
type TransactionCardProps = {
  children?: any;
}

const TransactionCard: NextPageWithLayout<TransactionCardProps> = ({children}) => {
  const headerText: string = "Transaction Overview";
  const balanceText: string = "147";
  const [modalData, setModalData] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(false);
  const {transactions} = useUser();
//   console.log(transactions, "trans")
    const handleTxnModal = (id:any)=>{
        const txn = transactions.filter((txn:any)=>txn.id === id)
        setModalData(txn)
        setModalOpen(true)
    }
    
  return (
    <div className="md:container md:mx-auto pb-4 overflow-auto h-[40vh]">
        {transactions?.length > 0 ? 
        <table className="table-auto w-full hidden md:inline-table text-left">
            <thead>
            <tr className="bg-[#F9F9F9] text-xs">
                <th className="px-4 py-2 font-thin text-[#818181]">Txn ID</th>
                <th className="px-4 py-2 font-thin text-[#818181]">Description</th>
                <th className="px-4 py-2 font-thin text-[#818181]">Amount</th>
                <th className="px-4 py-2 font-thin text-[#818181]">Transaction Time</th>
                <th className="px-4 py-2 font-thin text-[#818181]">Status</th>
                
            </tr>
            </thead>
            <tbody>
                {transactions?.map(({id, transaction_amount, transaction_narration, transaction_status, transaction_type})=>{
                    return (
                        <tr className="text-xs cursor-pointer" key={id} onClick={()=>handleTxnModal(id)}>
                            <td className="px-4 py-2 font-thin text-[#818181]">{id}</td>
                            <td className="px-4 py-2 font-thin flex items-center">
                            {transaction_type === "deposit" ? 
                                <HiArrowUpCircle className=" text-brand_primary_green mr-1" size={20}/> : 
                                <HiArrowDownCircle className=" text-[#E50808] mr-1" size={20}/>
                            }
                                
                                {transaction_narration}
                            </td>
                            <td className={`px-4 py-2 font-thin ${transaction_type === "deposit" ? "text-brand_primary_green" : "text-[#E50808]"} `}>{transaction_type === "deposit" ? "+" : "-"}N{transaction_amount}</td>
                            <td className="px-4 py-2 font-thin">09:07:12 AM | 19-12-2022</td>
                            <td className="px-4 py-2 font-thin">
                                {transaction_status === "completed" && 
                                <span className='p-2 text-[#21C460] bg-[#E4F8EC] rounded-sm text-xs'>{transaction_status}</span>
                                }
                                {transaction_status === "pending" && 
                                <span className='p-2 text-[#EBA352] bg-[#FCF4EA] rounded-sm text-xs'>{transaction_status}</span>
                                }
                                {transaction_status === "failed" && 
                                <span className='p-2 text-[#E50808] bg-[#FBE1E1] rounded-sm text-xs'>{transaction_status}</span>
                                }
                                {transaction_status === "processing" && 
                                <span className='p-2 text-[#42ADE2] bg-[#E8F5FB] rounded-sm text-xs'>{transaction_status}</span>
                                }
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        :
        <div className="flex flex-col justify-center items-center py-20">
            <BsJournalBookmark size={50} className="mb-4 text-[#818181]"/>
            <p className="font-thin text-[#818181]">There are no transactions yet!</p>
        </div>
        
        }
        {/* mobile table */}
        <div className='w-full px-4 md:hidden overflow-auto h-[45vh]'>
            {transactions?.map(({id, transaction_amount, transaction_narration, transaction_status, transaction_type})=>{
                return (
                    <div key={id} onClick={()=>handleTxnModal(id)} className="cursor-pointer my-2">
                    <div className='flex flex-row justify-between items-center '>
                        <p className="text-xs py-1 font-thin">{transaction_narration}</p>
                        <p className={`text-xs py-1 font-thin ${transaction_type === "deposit" ? "text-brand_primary_green" : "text-[#E50808]"}`}>{transaction_type === "deposit" ? "+" : "-"}N{parseFloat(transaction_amount).toFixed(2)}</p>
                    </div>
                    <div className='flex flex-row justify-between items-center '>
                    {transaction_status === "completed" && 
                        <span className='py-1 px-2 text-[#21C460] bg-[#E4F8EC] rounded-sm text-[10px]'>{transaction_status}</span>
                    }
                    {transaction_status === "pending" && 
                        <span className='py-1 px-2 text-[#EBA352] bg-[#FCF4EA] rounded-sm text-[10px]'>{transaction_status}</span>
                    }
                    {transaction_status === "failed" && 
                    <span className='py-1 px-2 text-[#E50808] bg-[#FBE1E1] rounded-sm text-[10px]'>{transaction_status}</span>
                    }
                    {transaction_status === "processing" && 
                    <span className='py-1 px-2 text-[#42ADE2] bg-[#E8F5FB] rounded-sm text-[10px]'>{transaction_status}</span>
                    }
                        <p className="text-[10px] py-1 font-thin text-[#818181]">09:07:12 AM | 19-12-2022</p>
                    </div>
                    </div>
                )
            })}
        </div>
        
    <WhiteModal isOpen={modalOpen} setIsOpen={()=>{
      setModalOpen(false)
    }}>
      <Dialog.Title
        as="h3"
        className="text-center text-lg font-medium leading-6 mb-6"
      >
       <p className="font-thin text-sm">Transaction Details</p>
      </Dialog.Title>
      <>
      <div className="relative w-3/4 mt-8 flex flex-row justify-center  h-[auto] pb-6 mb-6 rounded-xl bg-white drop-shadow-2xl">
        <Image src={Logo} alt="logo" className='w-[15%] absolute top-[-3vh] '/>

        <div className='mt-8'>
            <p className="font-thin text-sm text-[#818181]">You {modalData[0]?.transaction_type === "deposit" ? "Bought": "Sold"}</p>
            <p className={`font-medium text-2xl ${modalData[0]?.transaction_type === "deposit" ? "text-brand_primary_green": "text-[#E50808]"} `}>{parseFloat(modalData[0]?.transaction_amount).toFixed(2)} <span className="font-thin text-[#818181]">NGN</span></p>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-row md:w-3/5  justify-center md:m-[auto]">
            <p 
                className={`cursor-pointer md:w-1/2 py-1 px-4 md:px-0 text-[9px] ${!user ? "bg-brand_primary_blue text-white":"bg-[#EDF0F1] text-[#818181]"}`}
                onClick={()=>setUser(false)}
            >Transaction Information</p>
            <p 
                className={`cursor-pointer md:w-1/2 py-1 px-4 md:px-0 text-[9px] ${user ? "bg-brand_primary_blue text-white":"bg-[#EDF0F1] text-[#818181]"}`}
                onClick={()=>setUser(true)}
            >User Information</p>
        </div>
        <div>
            {!user ? 
            <div>
                <div className="flex flex-row justify-between items-center mt-4">
                    <div>
                        <p className="text-xs font-thin">09:07:12 AM</p>
                        <p className="text-xs font-thin text-[#818181]">Transaction Time</p>
                    </div>
                    <div>
                        <p className="text-xs font-thin">{modalData[0]?.transaction_narration}</p>
                        <p className="text-xs font-thin text-[#818181]">Description</p>
                    </div>
                    <div>
                    {modalData[0]?.transaction_status === "completed" && 
                        <span className='py-1 px-2 text-[#21C460] bg-[#E4F8EC] rounded-sm text-[10px]'>{modalData[0]?.transaction_status}</span>
                    }
                    {modalData[0]?.transaction_status === "pending" && 
                        <span className='py-1 px-2 text-[#EBA352] bg-[#FCF4EA] rounded-sm text-[10px]'>{modalData[0]?.transaction_status}</span>
                    }
                    {modalData[0]?.transaction_status === "failed" && 
                    <span className='py-1 px-2 text-[#E50808] bg-[#FBE1E1] rounded-sm text-[10px]'>{modalData[0]?.transaction_status}</span>
                    }
                    {modalData[0]?.transaction_status === "processing" && 
                    <span className='py-1 px-2 text-[#42ADE2] bg-[#E8F5FB] rounded-sm text-[10px]'>{modalData[0]?.transaction_status}</span>
                    }
                        <p className="text-xs font-thin text-[#818181]">Status</p>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-4">
                    <div>
                        <p className="text-xs font-thin">19-12-2022</p>
                        <p className="text-xs font-thin text-[#818181]">Transaction Date</p>
                    </div>
                    <div>
                        <p className="text-xs font-thin">{modalData[0]?.id}</p>
                        <p className="text-xs font-thin text-[#818181]">Transaction ID</p>
                    </div>
                    <div>
                        <p className={`text-xs py-1 font-thin ${modalData[0]?.transaction_type === "deposit" ? "text-brand_primary_green" : "text-[#E50808]"}`}>{modalData[0]?.transaction_type === "deposit" ? "+" : "-"}N{parseFloat(modalData[0]?.transaction_amount).toFixed(2)}</p>
                        <p className="text-xs font-thin text-[#818181]">Transaction Amount</p>
                    </div>
                </div>
            </div>
            :
            <div>
                <div className="flex flex-row justify-between items-center mt-4">
                    <div>
                        <p className="text-xs font-thin">User</p>
                        <p className="text-xs font-thin text-[#818181]">Name</p>
                    </div>
                    <div>
                        <p className="text-xs font-thin text-[#21C460] underline">
                            {modalData[0]?.users_address.substring(0, 5)}...{modalData[0]?.users_address.substring(modalData[0]?.users_address.length - 4)}
                            </p>
                        <p className="text-xs font-thin text-[#818181]">Wallet Address</p>
                    </div>
                    <div>
                        <p className="text-xs font-thin">
                            {modalData[0]?.merchant[0].substring(0, 3)}...{modalData[0]?.merchant[0].substring(modalData[0]?.merchant[0]?.length - 4)}
                            </p>
                        <p className="text-xs font-thin text-[#818181]">Merchant</p>
                    </div>
                    
                </div>
                <div className="flex flex-row justify-between items-center mt-4">
                    <div>
                        <p className="text-xs font-thin">{modalData[0]?.user_email || "*******"}</p>
                        <p className="text-xs font-thin text-[#818181]">Email</p>
                    </div>
                    <div>
                        <p className="text-xs font-thin text-[#21C460] underline">{modalData[0]?.user_bank_account || "*******"}</p>
                        <p className="text-xs font-thin text-[#818181]">Fiat Account Number</p>
                    </div>
                    <div>
                        <p className="text-xs font-thin">{modalData[0]?.user_bank_name || "*******"}</p>
                        <p className="text-xs font-thin text-[#818181]">Bank</p>
                    </div>
                </div>
            </div>
            }
        </div>
      </div>
      </>
      {/* {console.log(modalData)} */}
    </WhiteModal>

    </div>
  );
};

TransactionCard.getLayout = (page) => <Layout>{page}</Layout>;

export default TransactionCard;
