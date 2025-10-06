import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
interface User {
  userId: string;
  userRole: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthenticationProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
  const login = (user: User, token: string) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user)); 
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <AuthenticationContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
