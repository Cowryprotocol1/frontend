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

  logout: boolean;
  setLogout:  React.Dispatch<React.SetStateAction<boolean>>;
  toggleLogoutMode: any;
  handleLogin: any;
  getTransactions: any;
  getBalance: any;

  role: string;

  transactions: any; 
  setTransactions: React.Dispatch<React.SetStateAction<any>>;
  setBalances:React.Dispatch<React.SetStateAction<any>>;
  balances: any;
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

  role: "",

  walletAddress: "",
  setWalletAddress: () => null,
  
  transactions: null,
  setTransactions: ()=> null,
  balances: null,
  setBalances: ()=> null
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
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState([]);



  const toggleLogoutMode = () => {
    if (logout !== null) {
      setLogout(true);
      localStorage.removeItem("logout")
      localStorage.removeItem("walletAddress")
      window.location.href = "/";
    } 
    return logout;
  
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

  const getAccount = async (x)=> {
    try {
      const response = await fetch(`${url}/accounts?account_id=${walletAddress}`)
      if (response.status === 200) {
        const json = await response.json();
        if (json.error) {
            throw new Error(json.error);
        }
        if (x == null) {
          localStorage.setItem("userType", "user") 
        }
        setRole("ifp")
        window.location.href = "/ifps/dashboard";
        return json;
      }
      else if (response.status === 404) {
        if (x == null) {
          localStorage.setItem("userType", "user") 
        }
        setRole("user")  
        window.location.href = "/users/dashboard";
      }
      
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
    getAccount(x)
  };
  useEffect(() => {
    initialUserWithWalletStatus
  }, [userData])

  // useEffect(() => {
  //   console.log(transactions)
  //   // getBalance().then(res=>console.log(res.balances))
  // }, [transactions])
  

  
  return (
    <UserContext.Provider value={{
      userData, 
      setUserData, 
      initialUserStatus,
      handleLogin,
      walletAddress, 
      setWalletAddress, 
      logout,
      setLogout,
      toggleLogoutMode,
      getTransactions,
      getBalance,

      role,
      initialUserWithWalletStatus,
      transactions,
      setTransactions,
      balances,
      setBalances
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
