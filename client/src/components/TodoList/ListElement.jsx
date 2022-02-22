import { useContext } from 'react';

import { AiOutlineDelete } from 'react-icons/ai';
import { UserContext } from '../../context/userContext';

import * as api from '../../api';

const ListElement = ({ item, index, userID, id }) => {

  const { setTasks } = useContext(UserContext);

  const updateTasks = async () => {
    const tasks = await api.getTasks(userID);
    setTasks(tasks);
  }

  const handleChange = async () => {
    await api.updateTask(userID, id, {...item, isDone: !item.isDone });

    updateTasks();
  }

  const handleDelete = async () => {
    await api.deleteTask(userID, id);

    updateTasks();
  }

  return (
    <li className={`w-full md:w-[600px] h-10 items-center shadow-md bg-white flex justify-between mb-2 ${item.isDone ? 'text-gray-300' : ''}`}>
      
      <div className="pl-4">
        {index + 1}
      </div>

      <div className="w-full ml-4">
        {item.task}
      </div>

      <div className='flex items-center'>
        <input type="checkbox" checked={item.isDone} onChange={handleChange} />
        <button className='px-2 hover:text-red-500 text-black' onClick={handleDelete}>
          <AiOutlineDelete size={25}/>
        </button>
      </div>
    </li>
  )
}

export default ListElement;