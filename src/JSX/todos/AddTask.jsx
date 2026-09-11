import { Edit } from 'lucide-react';
import { useState,useEffect } from 'react';
const AddTask = ({ addTask,editTask }) => {

  const [newItemValue, setNewItemValue] = useState('');
  const [eTask,setETask] = useState("");

  useEffect(() => {
    setNewItemValue(editTask?.taskName);
    setETask(editTask);
  },[editTask])


  return (
    <div className="task-form ">
      <input
        type="text"
        name="tasks"
        id="tasks"
        placeholder="Enter new task"
        value={newItemValue}
        onChange={(e) => {
          setNewItemValue(e.target.value);
        }}
        onKeyUp={(e)=>{
          if (e.key === 'Enter' && e.target.value !== "" ) { 
            if(eTask?.id !== undefined && eTask?.id !== null && eTask?.id !== "") {
              addTask({ target: { id: eTask?.id , taskName: e.target.value.trim().toLowerCase() } });
            } else { 
              addTask({target : { taskName:e.target.value.trim().toLowerCase()}}) 
            }
            setNewItemValue("");
            setETask("");
          } 
        }}
      />
      {/* <form onSubmit={addTask} className="inputForm">
          <input type="text" placeholder="Enter new task" />
          <button type="button" className="btn btn-info">Add Task</button>
      </form> */}
    </div>
  )
}

export default AddTask