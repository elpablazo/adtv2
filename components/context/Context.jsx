import React, { createContext } from "react";
import { PrismaClient } from "@prisma/client";

const AppContext = createContext();

const Context = ({ children }) => {
  const prisma = new PrismaClient();

  return <AppContext.provider value={prisma}>{children}</AppContext.provider>;
};

export function useAppContext() {
  return React.useContext(AppContext);
}

export default AppContext;
