import React, { useEffect, useState } from 'react';

export const UserContext = React.createContext();


export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {

  }, []);

  
  return (
    <UserContext.Provider value={{
      user,
      setUser

    }}>
      {children}
    </UserContext.Provider>
  )
}