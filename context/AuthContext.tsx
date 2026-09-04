"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await apiClient.post("/auth/refresh");
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      setIsAuthenticated(false);
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
