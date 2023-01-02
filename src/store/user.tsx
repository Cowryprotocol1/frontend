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
const initialRoleStatus = () => {
  if (typeof window === "undefined") return;
  const role = localStorage.getItem("userType") 
  return role

}





export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: data is expected to obtained from api endpoint
  const [userData, setUserData] = useState(initialUserStatus);
  const [logout, setLogout] = useState(false)
  const [role, setRole] = useState(initialRoleStatus)
 
  const toggleLogoutMode = () => {
    if (logout !== null) {
      setLogout(true);
      localStorage.removeItem("logout")
    } 
    return logout;
  
  };

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
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
