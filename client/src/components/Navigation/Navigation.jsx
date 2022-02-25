import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

import * as api from '../../api/index';

const Navigation = () => {

  const { user, setUser } = useContext(UserContext);

  const logOut = () => {
    setUser(null);
  }

  const deleteAccount = async () => {

    await api.deleteUser(user._id);
    setUser(null);

  } 

  return (
    <>
      <nav className="flex justify-center w-full h-20 shadow-md bg-red-100">

        <div className="flex justify-between items-center w-full md:w-[70%] bg-blue-300">
          
          <Link to="/">
            <button className="pt-2 pb-2 pr-5 pl-5 rounded-full border-2 border-indigo-600 mr-5">strona główna</button>
          </Link>

          { user ? (
            <div className='flex items-center'>
              <p className='mr-5'>{user.email}</p>
              <button className="pt-2 pb-2 pr-5 pl-5 rounded-full border-2 border-indigo-600" onClick={logOut}>wyloguj</button>
              <button className="pt-2 pb-2 pr-5 pl-5 rounded-full border-2 border-indigo-600 ml-5" onClick={deleteAccount}>usuń użytkownika</button>
              
            </div>
          ) : (
            <div>
              <Link to="/auth/sign-in">
                <button className="pt-2 pb-2 pr-5 pl-5 rounded-full border-2 border-indigo-600 mr-5">zaloguj</button>
              </Link>

              <Link to="/auth/sign-up">
                <button className="pt-2 pb-2 pr-5 pl-5 rounded-full border-2 border-indigo-600">zarejestruj</button>
              </Link>
            </div>
          )}
          
        </div>

      </nav>
    </>
  )
}

export default Navigation;
