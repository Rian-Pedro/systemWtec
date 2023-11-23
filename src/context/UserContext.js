import { createContext } from "react";

const UserContext = createContext(null)

const UserContextProvider = ({ children }) => {
  return (
    <UserContext.Provider value={"teste"}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider