import React, { createContext, useContext, useEffect,useState } from "react";

import { User } from "@/constant/dummydata";

import { redirectUrl } from '@/pages';

const url = `https://cowryprotocol.io`;

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

  role: string;
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

  role: "",

  walletAddress: "",
  setWalletAddress: () => null,

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
      console.log("see me genere")
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

  const toggleLogoutMode = () => {
    if (logout !== null) {
      setLogout(true);
      localStorage.removeItem("logout")
      // setUserData(initialUserWithWalletStatus);
      localStorage.removeItem("walletAddress")
      window.location.href = "/";
    } 
    return logout;
  
  };
  const handleLogin = () => {
    console.log(walletAddress,"hi login handle function")
    const walletAdd = localStorage.getItem("walletAddress")
    let x = localStorage.getItem("userType") 
  if ( walletAdd === null && walletAddress !== null) {
    // console.log(userData,"see me user")
    localStorage.setItem("walletAddress", walletAddress)
  }
    fetch(`${url}/accounts?account_id=${walletAddress}`)
      .then(response => response.json())
      .then(response => {
          console.log(response, "response")
          if (response.status === "fail") {
            
            if (x == null) {
              localStorage.setItem("userType", "user") 
            }
            
            setRole("user")
            window.location.href = "/users/dashboard";
            
          }
          else{
            if (x == null) {
              localStorage.setItem("userType", "user") 
            }
            setRole("ifp")
            window.location.href = "/ifps/dashboard";
            
          }
      })
      .catch(err => {
        console.error(err) 
      });

  
  };
  useEffect(() => {
    initialUserWithWalletStatus
  }, [userData])
  
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

      role,
      initialUserWithWalletStatus,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
