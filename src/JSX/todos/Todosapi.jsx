import { useEffect, useState } from 'react';
import AddTask from './AddTask';
import ShowTask from './ShowTask';
import { useNavigate } from 'react-router-dom';

const Todosapi = () => {
    //const todoUrl = 'http://localhost:4000/todo';
    const todoUrl = 'https://node-app-production-8f02.up.railway.app/todo';
    const [tasks, setTasks] = useState([]);
    const [dataProcessed, setDataProcessed] = useState(false);
    const [apiText] = useState('api')
    const navigate = useNavigate();

    // const getTodoData = async () => {
    //     const res = await fetch(todoUrl);
    //     const data = await res.json();
    //     setTasks(data);
    // }

    // useEffect(() => {
    //     getTodoData();
    // }, [])

    const fetchData = async () => {
        try {
            const response = await fetch(todoUrl);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLoopComplete = () => {
        setDataProcessed(true);
        console.log('Loop completed in ShowTaskComponent! from TODOS-API');
    };

    const handleRemove = async (e) => {
        const itemId = parseInt(e.target.id);
        console.log(itemId)
        try {
            const response = await fetch(`${todoUrl}/${itemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            //setTasks(tasks?.filter((task, index) => index !== itemId));
            //console.log('Item deleted successfully!');
            fetchData(); // Re-fetch data to update the list

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleAdd = async (e) => {
        if (e.key === 'Enter' && e.target.value !== "") {
            const task = e.target.value.trim().toLowerCase();
            e.target.value = "";
            e.target.focus();
            const addTask = { taskName: task };
            const todoIndex = tasks.findIndex((todo) => (task).includes(todo.taskName));
            console.log(todoIndex);
            if (todoIndex !== -1) {
                tasks[todoIndex] = { ...addTask };
                setTasks([...tasks]);
            } else {
                await fetch(`${todoUrl}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addTask)
                })
                    .then(response => response.json())
                    .then(result => {
                        console.log('Success:', result);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                fetchData(); // Re-fetch data to update the list

            }
        }
    };


    return (
        <div className="custom-component">
            <h2>API Task List</h2>
            <AddTask addTask={handleAdd} />
            <ShowTask tasks={tasks} removeTask={handleRemove} showText={apiText} onLoopComplete={handleLoopComplete} />
            {dataProcessed && <button className="btn btn-info" onClick={() => { navigate('/todos') }}>Todos</button>}
        </div>
    )
}

export default Todosapi

