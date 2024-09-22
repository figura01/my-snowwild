"use client"
import Cookies from "js-cookie";
import { createContext, useContext } from "react";

const defaultAuth = {
  user: {
    name: "toto",
    email: 'toto@eamil.com',
    role: "ADMIN"
  }
}

const AuthContext = createContext(defaultAuth);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={defaultAuth}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext); 