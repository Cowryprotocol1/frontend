
import React, {useEffect,useState} from 'react';
import Layout from '@/components/layout/Layout';
import { HiArrowDownCircle } from 'react-icons/hi2'
import type { NextPageWithLayout } from '@/pages/_app';

type TransactionCardProps = {
  amount: string;
  children?: any;
}

const TransactionCard: NextPageWithLayout<TransactionCardProps> = ({amount, children}) => {
  const headerText: string = "Transaction Overview";
  const balanceText: string = "147";
  return (
    <div className="md:container md:mx-auto pb-4">
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
            <tr className="text-xs">
                <td className="px-4 py-2 font-thin">fe3...44x</td>
                <td className="px-4 py-2 font-thin flex items-center"><HiArrowDownCircle className='text-brand_primary_green mr-1' size={20}/>First investment...</td>
                <td className="px-4 py-2 font-thin text-brand_primary_green">+N234,000</td>
                <td className="px-4 py-2 font-thin">09:07:12 AM | 19-12-2022</td>
                <td className="px-4 py-2 font-thin"><span className='p-2 text-[#42ADE2] bg-[#E8F5FB] rounded-sm text-xs'>Processing</span></td>
            </tr>
            <tr className="text-xs">
                <td className="px-4 py-2 font-thin">fe3...44x</td>
                <td className="px-4 py-2 font-thin flex items-center"><HiArrowDownCircle className='text-[#E50808] mr-1' size={20}/>First investment...</td>
                <td className="px-4 py-2 font-thin text-[#E50808]">-N234,000</td>
                <td className="px-4 py-2 font-thin">09:07:12 AM | 19-12-2022</td>
                <td className="px-4 py-2 font-thin"><span className='p-2 text-[#E50808] bg-[#FBE1E1] rounded-sm text-xs'>Failed</span></td>
            </tr>
            <tr className="text-xs">
                <td className="px-4 py-2 font-thin">fe3...44x</td>
                <td className="px-4 py-2 font-thin flex items-center"><HiArrowDownCircle className='text-brand_primary_green mr-1' size={20}/>First investment...</td>
                <td className="px-4 py-2 font-thin text-brand_primary_green">+N234,000</td>
                <td className="px-4 py-2 font-thin">09:07:12 AM | 19-12-2022</td>
                <td className="px-4 py-2 font-thin"><span className='p-2 text-[#EBA352] bg-[#FCF4EA] rounded-sm text-xs'>Pending</span></td>
            </tr>
            <tr className="text-xs">
                <td className="px-4 py-2 font-thin">fe3...44x</td>
                <td className="px-4 py-2 font-thin flex items-center"><HiArrowDownCircle className='text-brand_primary_green mr-1' size={20}/>First investment...</td>
                <td className="px-4 py-2 font-thin text-brand_primary_green">+N234,000</td>
                <td className="px-4 py-2 font-thin">09:07:12 AM | 19-12-2022</td>
                <td className="px-4 py-2 font-thin"><span className='p-2 text-[#21C460] bg-[#E4F8EC] rounded-sm text-xs'>Completed</span></td>
            </tr>
            </tbody>
        </table>

        {/* mobile table */}
        <div className='w-full px-4 md:hidden'>
            <>
            <div className='flex flex-row justify-between items-center '>
                <p className="text-xs py-1 font-thin">First investment...</p>
                <p className="text-xs py-1 font-thin text-brand_primary_green">+N345,000</p>
            </div>
            <div className='flex flex-row justify-between items-center '>
                <span className='py-1 px-2 text-[#EBA352] bg-[#FCF4EA] rounded-sm text-[10px]'>Pending</span>
                <p className="text-[10px] py-1 font-thin text-[#818181]">09:07:12 AM | 19-12-2022</p>
            </div>
            </>
            <>
            <div className='flex flex-row justify-between items-center '>
                <p className="text-xs py-1 font-thin">First investment...</p>
                <p className="text-xs py-1 font-thin text-brand_primary_green">+N345,000</p>
            </div>
            <div className='flex flex-row justify-between items-center '>
                <span className='py-1 px-2 text-[#E50808] bg-[#FBE1E1] rounded-sm text-[10px]'>Failed</span>
                <p className="text-[10px] py-1 font-thin text-[#818181]">09:07:12 AM | 19-12-2022</p>
            </div>
            </>
            <>
            <div className='flex flex-row justify-between items-center '>
                <p className="text-xs py-1 font-thin">First investment...</p>
                <p className="text-xs py-1 font-thin text-brand_primary_green">+N345,000</p>
            </div>
            <div className='flex flex-row justify-between items-center '>
                <span className='py-1 px-2 text-[#21C460] bg-[#E4F8EC] rounded-sm text-[10px]'>Completed</span>
                <p className="text-[10px] py-1 font-thin text-[#818181]">09:07:12 AM | 19-12-2022</p>
            </div>
            </>
            <>
            <div className='flex flex-row justify-between items-center '>
                <p className="text-xs py-1 font-thin">First investment...</p>
                <p className="text-xs py-1 font-thin text-brand_primary_green">+N345,000</p>
            </div>
            <div className='flex flex-row justify-between items-center '>
                <span className='py-1 px-2 text-[#42ADE2] bg-[#E8F5FB] rounded-sm text-[10px]'>Processing</span>
                <p className="text-[10px] py-1 font-thin text-[#818181]">09:07:12 AM | 19-12-2022</p>
            </div>
            </>
        </div>

    </div>
  );
};

TransactionCard.getLayout = (page) => <Layout>{page}</Layout>;

export default TransactionCard;
