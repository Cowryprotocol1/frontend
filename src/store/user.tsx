import React, { createContext, useContext, useEffect,useState, useCallback } from "react";

import { User } from "@/constant/dummydata";


const url = `https://cowryprotocol.io`;
const stellar_url = ` https://horizon-testnet.stellar.org`



export type UserProp = {
  id: number;
  name: string;
  image: string;
  wallet_address: string;
  role: "user" | "ifp";
  joined: Date;
};

export type UserContextProps = {
  userData: UserProp | null;
  setUserData: React.Dispatch<React.SetStateAction<UserProp>>;
  walletAddress: "";
  setWalletAddress: React.Dispatch<React.SetStateAction<any>>;
  walletVendor: "";
  setWalletVendor: React.Dispatch<React.SetStateAction<any>>;
  IFPData: any; 
  setIFPData:React.Dispatch<React.SetStateAction<any>>;
  logout: boolean;
  setLogout:  React.Dispatch<React.SetStateAction<boolean>>;
  toggleLogoutMode: any;
  getTransactions: any;
  getBalance: any;
  getDepositIntent: any;
  getAccount: any;
  getWithdrawalIntent: any;
  onboardIFP:any;
  postPaymentConfirmation: any;
  role: string;
  getTransactionStatus: any;
  signXDR: any;
  

  getDepositIntentIFP: any;
  transactions: any; 
  setTransactions: React.Dispatch<React.SetStateAction<any>>;
  setBalances:React.Dispatch<React.SetStateAction<any>>;
  balances: any;
  depositOpen:any;
  setDepositOpen:React.Dispatch<React.SetStateAction<boolean>>;
  withdrawOpen:any;
  setWithdrawOpen: React.Dispatch<React.SetStateAction<boolean>>;
  conversionOpen:any;
  setConversionOpen:React.Dispatch<React.SetStateAction<boolean>>;
  setRole:React.Dispatch<React.SetStateAction<string>>;

};

const UserContext = createContext<UserContextProps>({
  userData: User[0] || null,
  setUserData: () => null,

  logout: null ,
  setLogout: ()=> null,
  toggleLogoutMode: ()=>null,
  getTransactions: ()=>null,
  getBalance: ()=>null,
  getWithdrawalIntent:()=>null,
  onboardIFP:()=>null,
  role: "",
  getDepositIntentIFP:()=>null,
  getTransactionStatus:()=>null,
  signXDR:()=> null,

  walletAddress: "",
  setWalletAddress: () => null,
  walletVendor: "",
  setWalletVendor: () => null,

  transactions: null,
  setTransactions: ()=> null,
  balances: null,
  setBalances: ()=> null,
  getDepositIntent: ()=> null,
  depositOpen: null,
  setDepositOpen:()=>null,
  withdrawOpen: null,
  setWithdrawOpen: ()=>null,
  postPaymentConfirmation:()=>null,
  conversionOpen:null,
  setConversionOpen: ()=>null,
  IFPData: null, 
  setRole:()=>null,
  setIFPData:()=>null,
  getAccount:()=>null,
});



const initialRoleStatus = () => {
  if (typeof window === "undefined") return;
  const role = localStorage.getItem("userType") 
  return role

}


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: data is expected to obtained from api endpoint
  const [userData, setUserData] = useState(null);
  const [logout, setLogout] = useState(false)
  const [role, setRole] = useState(initialRoleStatus)
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletVendor, setWalletVendor] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState([]);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [conversionOpen, setConversionOpen] = useState(false)
  const [IFPData, setIFPData] = useState(null)

  const toggleLogoutMode = () => {
    if (logout !== null) {
      setLogout(true);
      localStorage.removeItem("logout")
      localStorage.removeItem("userType")
      localStorage.removeItem("walletAddress")
      window.location.href = "/";
    } 
    return logout;
  
  };

  const getDepositIntent = async (data: any)=> {
    let rData = {
      amount: parseFloat(data.amount),
      blockchainAddress: data.address,
      bankType: data.bank,
      narration: data.description
    }
    // console.log(JSON.stringify(rData))
    try {
      const response = await fetch(`${url}/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rData),
      })
      let res = response.json()
      return res
    } catch (error) {
      throw error;
    }
  };
  const postPaymentConfirmation = async (data: any)=> {
    // console.log(JSON.stringify(data))
    try {
      const response = await fetch(`${url}/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let res = response.json()
      return res
    } catch (error) {
      throw error;
    }
  };
  
  const onboardIFP = async (data: any)=> {
    let wData = {
      blockchainAddress: walletAddress,
      bankName: data.bank_name,
      bankAccount: data.account_number,
      email: data.email,
      phoneNumber: data.phone,
    }
    // console.log(wData)
    try {
      const response = await fetch(`${url}/onboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wData),
      })
      let res = response.json()
      return res
    } catch (error) {
      throw error;
    }
  };

  const getDepositIntentIFP = async (txn_id: string)=> {
    let wData = {
      merchant_pubKey: walletAddress,
      transaction_Id: txn_id,
      merchant_id: IFPData?.account_id,

    }
    // console.log(wData)
    try {
      const response = await fetch(`${url}/merchants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wData),
      })
      let res = response.json()
      return res
    } catch (error) {
      throw error;
    }
  };


  const getWithdrawalIntent = async (data: any)=> {
    let wData = {
      amount: parseFloat(data.amount),
      blockchain_address: data.address,
      bank_name: data.bank,
      account_number: data.account_number,
      name_on_acct: data.account_name,
      phone_number: data.phone,
      transaction_narration: data.description
    }
    // console.log(wData)
    try {
      const response = await fetch(`${url}/withdrawal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wData),
      })
      let res = response.json()
      return res
    } catch (error) {
      throw error;
    }
  };
  
  const getTransactions = async (address: string, role: string)=> {
    try {
      const response = await fetch(`${url}/merchants?public_key=${address}&query_type=${role}`)
      let res = response.json()
      return res
    } catch (error) {
      throw error;
    }
  };
  const getBalance = async (address: string)=> {
    try {
      const response = await fetch(`${stellar_url}/accounts/${address}`)
      let res = response.json()
      return res
    } catch (error) {
      throw error;
    }
  };

  const getAccount = async (address: string)=> {
    try {
      const response = await fetch(`${url}/accounts?account_id=${address}`)
      let res = response.json()
      return res
      
    } catch (error) {
      throw error;
    }
  };


  

  const signXDR = async (signed_xdr: string) => {
    // console.log(transactionId)
    let xdrData = {
      signed_xdr: signed_xdr,
     
    }
    // console.log(transactionData)
    try {
      const response = await fetch(`${url}/submit_xdr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(xdrData),
      })
      let res = response.json()
      console.log(res)
      return res

    } catch (error) {
      console.log(error)
      throw error;
    }
  };
 
  
const getTransactionStatus = async (transactionId: string) => {
    // console.log(transactionId)
    let transactionData = {
      transactionId: transactionId,
     
    }
    // console.log(transactionData)
    try {
      const response = await fetch(`${url}/transactionStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      })
      let res = response.json()
      // console.log(res)
      return res

    } catch (error) {
      console.log(error)
      throw error;
    }
  };
  
  return (
    <UserContext.Provider value={{
      userData, 
      setUserData, 

      walletAddress, 
      setWalletAddress, 
      walletVendor, 
      setWalletVendor, 
      logout,
      setLogout,
      toggleLogoutMode,
      getTransactions,
      getBalance,
      onboardIFP,
      signXDR,
      role,
      setRole,
      transactions,
      setTransactions,
      balances,
      setBalances,
      getDepositIntent,
      getWithdrawalIntent,
      depositOpen,
      setDepositOpen,
      withdrawOpen,
      setWithdrawOpen,
      postPaymentConfirmation,
      conversionOpen,
      setConversionOpen,
      IFPData,
      setIFPData,
      getAccount,
      getDepositIntentIFP,
      getTransactionStatus,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
