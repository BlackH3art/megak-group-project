

const ListElement = ({ item, index }) => {

  return (
    <li className="w-full md:w-[600px] h-10 items-center shadow-md bg-white flex justify-between mb-2">
      
      <div className="pl-4">
        {index + 1}
      </div>

      <div className="w-full ml-4">
        {item.task}
      </div>

      <div>
        toolbar
      </div>
    </li>
  )
}

export default ListElement;