
import React, {useEffect,useState} from 'react';
import Layout from '@/components/layout/Layout';
import { useUser } from '@/store/user';
import type { NextPageWithLayout } from '@/pages/_app';

type SettingsCardProps = {
  headerText:string;
  arr: {
    id: number,
    type: string,
    name: string,
    placeholder:string,
}[];
  children?: any;
}

const SettingsCard: NextPageWithLayout<SettingsCardProps> = ({headerText,arr,children}) => {
    const {walletAddress, IFPData} = useUser();

    const [form, setForm] = useState({
        email: '',
        firstname:'',
        lastname:'',
        billingAddress:'',
        vendor:'',
        address:'',
        bank:'',
        phone:'',
        ifp_id:''
    });

    useEffect(() => {
        // console.log(IFPData, "IFPData")
      setForm({
        email: IFPData?.ifp_email_addr,
        firstname:'',
        lastname:'',
        bank: IFPData?.ifp_acct_name,
        phone:IFPData?.ifp_phone_name,
        billingAddress:'',
        ifp_id:IFPData?.account_id,
        vendor:localStorage.getItem("vendor"),
        address:IFPData?.ifp_block_addr,
      })
    }, [])
    

  return (
    <div className="w-full h-[auto] p-4 md:p-8 my-6 flex flex-col rounded-xl bg-white  shadow-[0px_1px_0px_rgba(0,0,0,0.1)]">
        <p>{headerText}</p>
        <div className="grid md:grid-cols-2 gap-4 my-4">
            {arr.map(({type, placeholder,name, id})=>{
                return(
                  <div key={id} className="w-[100%] relative ">
                    <input
                        key={id} 
                        type={type} 
                        name={name}
                        placeholder={placeholder}
                        value={form?.[name]}
                        disabled={true}
                        className="bg-transparent border-1 h-[45px] border-[#EDEDED] text-black w-full md:w-[100%] text-xs  font-thin rounded"
                    />
                    <p className="text-[9px] text-[#414141] absolute top-[-0.5rem] md:top-[-0.7rem] px-1 left-2 md:left-4 bg-white">{placeholder}</p>
                    </div>
                    
                )
            })}
        </div>
    </div>
  );
};

SettingsCard.getLayout = (page) => <Layout>{page}</Layout>;

export default SettingsCard;
