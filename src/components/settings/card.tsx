
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
    const {walletAddress} = useUser();
    const [form, setForm] = useState({
        email: '',
        firstname:'',
        lastname:'',
        billingAddress:'',
        vendor:'',
        address:''
    });

    useEffect(() => {
        console.log(localStorage.getItem("vendor"))
      setForm({
        email: '',
        firstname:'',
        lastname:'',
        billingAddress:'',
        vendor:localStorage.getItem("vendor"),
        address:walletAddress  
      })
    }, [])
    
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any)=>{
    //     setForm({
    //       ...form,
    //       [e.target.name]: e.target.value
    //     })
    //   }
  return (
    <div className="w-full h-[auto] p-4 md:p-8 my-6 flex flex-col rounded-xl bg-white  shadow-[0px_1px_0px_rgba(0,0,0,0.1)]">
        <p>{headerText}</p>
        <div className="grid md:grid-cols-2 gap-4 my-4">
            {arr.map(({type, placeholder,name, id})=>{
                return(
                    <input
                        key={id} 
                        type={type} 
                        name={name}
                        placeholder={placeholder}
                        value={form?.[name]}
                        disabled={true}
                        // onChange={handleChange}
                        className="bg-transparent border-1 h-[45px] border-[#EDEDED] text-black w-full md:w-[100%] text-xs  font-thin rounded"
                    />
                )
            })}
        </div>
    </div>
  );
};

SettingsCard.getLayout = (page) => <Layout>{page}</Layout>;

export default SettingsCard;
