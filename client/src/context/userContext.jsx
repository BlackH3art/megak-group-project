import React, { useEffect, useState } from 'react';

export const UserContext = React.createContext();


const testTasks = [
  { _id: "1", task: "zjeść trampki", isDone: true },
  { _id: "2", task: "zjeść pomidorki", isDone: false },
  { _id: "3", task: "ugotować papugę", isDone: true },
  { _id: "4", task: "maszerować kombinezony", isDone: true },
];
const testUser = { _id: "1", email: "stefan@stefek.pl", tasks: testTasks};


export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  console.log(user);

  useEffect(() => {

  }, []);

  
  return (
    <UserContext.Provider value={{
      user,
      setUser,
      tasks,
      setTasks
    }}>
      {children}
    </UserContext.Provider>
  )
}