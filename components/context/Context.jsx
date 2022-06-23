import React, { useState, useEffect, createContext } from "react";

const AppContext = createContext();

const Context = ({ children }) => {
  const [token, setToken] = useState("");

  const colores = [
    "bg-primary",
    "bg-secondary",
    "bg-decorator",
    "bg-blue-700",
    "bg-indigo-500",
    "bg-violet-700",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-600",
    "bg-sky-500",
    "bg-cyan-500",
    "bg-teal-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-amber-500",
    "bg-orange-500",
    "bg-red-600",
    "bg-stone-900",
    "bg-neutral-800",
    "bg-zinc-700",
    "bg-gray-800",
    "bg-slate-900",
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    "bg-gradient-to-r from-cyan-500 to-blue-500",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, colores }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return React.useContext(AppContext);
}

export default Context;
