
import React, {useEffect,useState} from 'react';
import Layout from '@/components/layout/Layout';
import { HiArrowDownCircle, HiArrowUpCircle } from 'react-icons/hi2'
import type { NextPageWithLayout } from '@/pages/_app';
import { useUser } from '@/store/user';
import { BsJournalBookmark } from 'react-icons/bs';
type TransactionCardProps = {
  children?: any;
}

const TransactionCard: NextPageWithLayout<TransactionCardProps> = ({children}) => {
  const headerText: string = "Transaction Overview";
  const balanceText: string = "147";
  const {transactions} = useUser();
//   console.log(transactions, "trans")

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
                        <tr className="text-xs" key={id}>
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
                    <>
                    <div className='flex flex-row justify-between items-center '>
                        <p className="text-xs py-1 font-thin">{transaction_narration}</p>
                        <p className={`text-xs py-1 font-thin ${transaction_type === "deposit" ? "text-brand_primary_green" : "text-[#E50808]"}`}>{transaction_type === "deposit" ? "+" : "-"}N{transaction_amount}</p>
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
                    </>
                )
            })}
        </div>

    </div>
  );
};

TransactionCard.getLayout = (page) => <Layout>{page}</Layout>;

export default TransactionCard;
