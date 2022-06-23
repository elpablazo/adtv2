import React, { createContext, useState } from "react";

const AppContext = createContext();

export const Context = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <AppContext.provider value={{ token, setToken }}>
      {children}
    </AppContext.provider>
  );
};

export function useAppContext() {
  return React.useContext(AppContext);
}

export default AppContext;
