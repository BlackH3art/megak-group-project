import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import AuthForm from "./components/AuthForm/AuthForm";
import Navigation from "./components/Navigation/Navigation";
import Main from './components/Main/Main';
import TodoList from "./components/TodoList/TodoList";

import { UserContext } from "./context/userContext";


const App = () => {

  const { user } = useContext(UserContext);

  return (
    <Router>
      <div className="App h-[100vh] bg-red-100">

        <Navigation />

        <Routes>

          <Route exact path="/" element={<Main />} />

          <Route path="/auth/sign-in" element={<AuthForm signIn={true} />} />
          <Route path="/auth/sign-up" element={<AuthForm signIn={false} />} />

          <Route path="/user" element={user ? <TodoList /> : <Navigate to="/auth/sign-in" />} />

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>

      </div>
    </Router>
  )
}

export default App;
