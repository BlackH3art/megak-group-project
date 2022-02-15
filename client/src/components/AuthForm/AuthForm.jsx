import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as api from '../../api/index';

import { UserContext } from '../../context/userContext';

const AuthForm = ({ signIn }) => {

  const [signingData, setSigningData] = useState({ login: "", password: "" });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = signIn ? await api.signIn(signingData) : await api.signUp(signingData);
      
      setUser(user);

      navigate('/user');

    } catch (error) {
      console.error(error);
    }
  }

  
  const handleChange = (e) => {
    setSigningData({
      ...signingData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <div className="h-full flex justify-center items-center bg-green-100">

        <div className="bg-white flex flex-col items-center h-[300px] w-[400px]">

          <h1 className="text-2xl text-center pt-10 pb-5">
            {signIn ? "Logowanie" : "Rejestracja"}
          </h1>

          <div className="flex flex-col w-[80%] bg-red-200" onSubmit={handleSubmit}>
            <form className="flex flex-col">
              <label>
                Login:
                <input className="rounded-full border-2 border-indigo-600 pl-5 m-2" name="login" type="text" onChange={handleChange} />
              </label>

              <label>
                Hasło:
                <input className="rounded-full border-2 border-indigo-600 pl-5 m-2" name="password" type="password" onChange={handleChange} />
              </label>

              <button className="rounded-5 border-2 border-indigo-600 mt-5" type="submit">
                {signIn ? "Zaloguj się" : "Zarejestruj się"}
              </button>
            </form>
          </div>

        </div>
        
      </div>
    </>
  )
}

export default AuthForm;