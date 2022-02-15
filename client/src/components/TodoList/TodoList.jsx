import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";

import * as api from '../../api/index';

import ListElement from "./ListElement";

const TodoList = () => {

  const defaultAddTaskState = { userID: '', task: '', done: false};
  const [taskToDo, setTaskToDo] = useState(defaultAddTaskState);
  const { user } = useContext(UserContext);

  const mockdata = [
    { task: "zjeść trampki", done: true },
    { task: "zjeść pomidorki", done: false },
    { task: "ugotować papugę", done: true },
    { task: "maszerować kombinezony", done: true },
  ]

  const completedTasks = mockdata.filter(item => item.done === true);
  const notCompletedTasks = mockdata.filter(item => item.done === false);

  const handleChange = (e) => {
    setTaskToDo({
      userID: user.login,
      task: e.target.value,
      done: false 
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.addNewTask(taskToDo.userID, taskToDo);
      
      if (response) {
        setTaskToDo(defaultAddTaskState);
      }

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <div className="h-full flex flex-col items-center bg-green-100">


        <h1 className="text-2xl pt-10 pb-5">Co masz do zrobienia?</h1>
        <form className="flex justify-between w-full md:w-[600px] pb-10" onSubmit={handleSubmit}>
          <label className="flex items-center w-full">
            Zadanie:
            <input className="w-full rounded-full border-2 border-indigo-600 pt-2 pb-2 pr-5 pl-5 ml-5" name="task" type="text" onChange={handleChange} value={taskToDo.task} />
          </label>

          <button className="rounded-full border-2 border-indigo-600 pt-2 pb-2 pr-5 pl-5 ml-5">dodaj</button>
        </form>

        <h1 className="text-2xl pt-10">Do zrobienia:</h1>
        <div>
          <ul>
            {notCompletedTasks.map((item, index) => (
              <ListElement key={index} item={item} index={index} />
            ))}
          </ul>
        </div>

        <h1 className="text-2xl">Zrobione:</h1>
        <div>
          <ul>
            {completedTasks.map((item, index) => (
              <ListElement key={index} item={item} index={index} />
            ))}
          </ul>
        </div>


      </div>
    </>
  )
}

export default TodoList;