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
  const [dataProcessed, setDataProcessed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTasks(todos)
  }, []);

  const handleLoopComplete = () => {
    setDataProcessed(true);
    console.log('Loop completed in ShowTaskComponent! from TODOS');
  };

  const handleRemove = (e) => {
    // const selectedTask = e.target.textContent;
    // const updatedTasks = tasks?.filter( task => task.taskName !== selectedTask);
    const selectedIndex = parseInt(e.target.id);
    const updatedTasks = tasks?.filter((task, index) => index !== selectedIndex);
    setTasks(updatedTasks);
  }

  const handleAdd = (e) => {
    if (e.key === 'Enter' && e.target.value !== "") {
      const taskName = e.target.value.trim().toLowerCase();
      e.target.value = "";
      e.target.focus();
      const addTask = { taskName: taskName };
      const todoIndex = tasks.findIndex((todo) => (taskName).includes(todo.taskName));
      if (todoIndex === -1) {
        setTasks([...tasks, addTask]);
      } else {
        tasks[todoIndex] = [...addTask];
        setTasks([...tasks]);
      }
    }
  }

  return (
    <div className="custom-component">
      <h2>Task List</h2>
      <AddTask addTask={handleAdd} />
      <ShowTask tasks={tasks} removeTask={handleRemove} onLoopComplete={handleLoopComplete} />
      {dataProcessed && <button className="btn btn-info" onClick={() => { navigate('api') }}>Todos ( API )</button>}
    </div>
  )
}

export default Todos