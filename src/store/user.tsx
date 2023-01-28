import React, { createContext, useContext, useEffect,useState } from "react";

import { User } from "@/constant/dummydata";

import { redirectUrl } from '@/pages';

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
  initialUserStatus: any;
  initialUserWithWalletStatus: any;
  walletAddress: "";
  setWalletAddress: React.Dispatch<React.SetStateAction<any>>;
  walletVendor: "";
  setWalletVendor: React.Dispatch<React.SetStateAction<any>>;
  IFPData: any; 
  setIFPData:React.Dispatch<React.SetStateAction<any>>;
  logout: boolean;
  setLogout:  React.Dispatch<React.SetStateAction<boolean>>;
  toggleLogoutMode: any;
  handleLogin: any;
  getTransactions: any;
  getBalance: any;
  getDepositIntent: any;
  getAccount: any;
  getWithdrawalIntent: any;
  onboardIFP:any;
  postPaymentConfirmation: any;
  role: string;

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
};

const UserContext = createContext<UserContextProps>({
  userData: User[0] || null,
  setUserData: () => null,
  initialUserStatus: ()=> null,
  initialUserWithWalletStatus:()=> null,
  handleLogin:() => null,
  logout: null ,
  setLogout: ()=> null,
  toggleLogoutMode: ()=>null,
  getTransactions: ()=>null,
  getBalance: ()=>null,
  getWithdrawalIntent:()=>null,
  onboardIFP:()=>null,
  role: "",
  getDepositIntentIFP:()=>null,

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
  setIFPData:()=>null,
  getAccount:()=>null,
});




const initialUserStatus = () => {
  if (typeof window === "undefined") return;
  const user = localStorage.getItem("userType") 
  if (user === "user") {
    return User[0]
  }
  else if (user === "ifp") {
    return User[1]
  }

}

const initialUserWithWalletStatus = (data: string) => {
  if (typeof window === "undefined") return;
  // const user = localStorage.getItem("userType") 
  const userData = localStorage.getItem("userData")
   
  if ( userData !== null && JSON.parse(userData).role === "user") {
    // console.log(userData,"see me user")
    return JSON.parse(userData)
  }
  else if (userData !== null && JSON.parse(userData).role === "ifp") {
    // console.log("see me ifp")
    return JSON.parse(userData)
  }
  else{
    // get user role status from cowryprotocol backend
    
    let isBackend = false
    if (isBackend) {
      if (JSON.parse(userData).role === "user") {
        // User Data 

        // localStorage.setItem("userType", user);
        // localStorage.setItem("userData", JSON.stringify(User[0]))
        // setUserData(User[0]);
        // push("/users/dashboard");
      }
      else if (JSON.parse(userData).role === "user") {
        // localStorage.setItem("userData", JSON.stringify(User[1]))
        // setUserData(User[1]);
        // push("/ifps/dashboard");
      }
    }
    else{
      // console.log("see me genere")
      // localStorage.setItem("userType", user);
      // localStorage.setItem("userData", JSON.stringify(User[0]))
      return null
    }
    
  }
  

}
const initialRoleStatus = () => {
  if (typeof window === "undefined") return;
  const role = localStorage.getItem("userType") 
  return role

}


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: data is expected to obtained from api endpoint
  const [userData, setUserData] = useState(initialUserWithWalletStatus);
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

  const handleLogin = () => {
    const walletAdd = localStorage.getItem("walletAddress")
    let x = localStorage.getItem("userType") 
    if ( walletAdd === null && walletAddress !== null) {
      localStorage.setItem("walletAddress", walletAddress)
    }
      getAccount(walletAdd).then(response=>{
        
      if (response.status === "successful") {
        setIFPData(response)
        if (x == null) {
          localStorage.setItem("userType", "ifp") 
        }
        else{
          setRole("ifp")
        }
        
        window.location.href = "/ifps/dashboard";
        return response;
      }
      else  {
        console.log(response, "rsdecs")
        if (x == null) {
          localStorage.setItem("userType", "user") 
        }
        else{
          setRole("user") 
        }
        
        window.location.href = "/users/dashboard";
      }
    })
  };
 
  useEffect(() => {
    initialUserWithWalletStatus
  }, [userData])

  // useEffect(() => {
  //   getAccount().then(response=>console.log(response, "wdfdwgdf"))
  // }, [])
  

  useEffect(() => {
    console.log(role)
    let x = localStorage.getItem("userType") 
    // console.log(walletAddress)
    getAccount(walletAddress).then(response=>{
      console.log(response, "reres")
      // to revert to User

      // if (response.status === "successful") {
      //   if (x !== null && x === "ifp") {
      //     localStorage.setItem("userType", "user") 
      //     console.log("You are now an IFP")
      //     setRole("user")
      //     window.location.href = "/users/dashboard";
      //   }
      // }
      
      if (response.status === "successful") {
        setIFPData(response)
        if (x !== null && x === "user") {
          localStorage.setItem("userType", "ifp") 
          console.log("You are now an IFP")
          setRole("ifp")
          window.location.href = "/ifps/dashboard";
        }
      }
    })
  }, [])
  

  
  return (
    <UserContext.Provider value={{
      userData, 
      setUserData, 
      initialUserStatus,
      handleLogin,
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

      role,
      initialUserWithWalletStatus,
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
      getDepositIntentIFP 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
