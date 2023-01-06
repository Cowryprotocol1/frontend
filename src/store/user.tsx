import React, { createContext, useContext, useEffect,useState } from "react";

import { User } from "@/constant/dummydata";

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
  
  logout: boolean;
  setLogout:  React.Dispatch<React.SetStateAction<boolean>>;
  toggleLogoutMode: any;

  role: string;
  initialRoleStatus: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextProps>({
  userData: User[0] || null,
  setUserData: () => null,
  initialUserStatus: ()=> null,
  initialUserWithWalletStatus:()=> null,

  logout: null ,
  setLogout: ()=> null,
  toggleLogoutMode: ()=>null,

  role: "",
  initialRoleStatus: ()=> null,

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

const initialUserWithWalletStatus = () => {
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
    let isBackend = false;
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
      localStorage.setItem("userData", JSON.stringify(User[0]))
      return User[0]
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
//  console.log(JSON.parse(localStorage.getItem("userData")), "xdsds")
  const toggleLogoutMode = () => {
    if (logout !== null) {
      setLogout(true);
      localStorage.removeItem("logout")
      setUserData(initialUserWithWalletStatus);
      localStorage.removeItem("userData")
    } 
    return logout;
  
  };
  useEffect(() => {
    initialUserWithWalletStatus
  }, [userData])
  
  return (
    <UserContext.Provider value={{
      userData, 
      setUserData, 
      initialUserStatus,
 
      logout,
      setLogout,
      toggleLogoutMode,

      role,
      initialRoleStatus,
      initialUserWithWalletStatus
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
