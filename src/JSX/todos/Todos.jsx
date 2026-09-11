import { useEffect, useState } from 'react';
import AddTask from './AddTask';
import ShowTask from './ShowTask';
import { useNavigate } from 'react-router-dom';

const todos = [
  {
    taskName: "signin",
  },
  {
    taskName: "signout",
  },
  {
    taskName: "signup",
  },
  {
    taskName: "forgetpassword",
  }
]

const Todos = () => {
  const [tasks, setTasks] = useState([todos]);
  const [editTask, setEditTask] = useState({id:null, taskName: ''});
  const [dataProcessed, setDataProcessed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTasks(todos)
  }, []);

  const handleLoopComplete = () => {
    setDataProcessed(true);

  };

  const handleRemove = (e) => {
    // const selectedTask = e.target.textContent;
    // const updatedTasks = tasks?.filter( task => task.taskName !== selectedTask);
    const selectedIndex = parseInt(e.target.id);
    const updatedTasks = tasks?.filter((task, index) => index !== selectedIndex);
    setTasks(updatedTasks);
  }

  const handleAdd = (e) => {
    if(e.target.taskName !== undefined && e.target.taskName !== "" ) {
      if(e.target.id !== undefined && e.target.id !== null && e.target.id !== "") {
        const taskName = e.target.taskName.trim().toLowerCase();
        tasks[e.target.id] = {taskName: taskName};
        setTasks([...tasks]);
      } else {
        const taskName = e.target.taskName.trim().toLowerCase();
        const addTask = { taskName: taskName };
        const todoIndex = tasks.findIndex((todo) => (taskName).includes(todo.taskName));
        if (todoIndex === -1) {
          setTasks([...tasks, addTask]);
        } else {
          tasks[todoIndex] = addTask;
          setTasks([...tasks]);
        }
      }
    }
  }

  const handleEditTask = (e) => {
    const selectedIndex = parseInt(e.target.id);
    const selectedTask = tasks[selectedIndex];
    setEditTask({id: selectedIndex, taskName: selectedTask.taskName});
  };


  return (
    <div className="custom-component">
      <h2>Task List</h2>
      <AddTask addTask={handleAdd} editTask={editTask} />
      <ShowTask tasks={tasks} removeTask={handleRemove}  editTask={handleEditTask} onLoopComplete={handleLoopComplete} />
      {dataProcessed && <button className="btn btn-info" onClick={() => { navigate('api') }}>Todos ( API )</button>}
    </div>
  )
}

export default Todos