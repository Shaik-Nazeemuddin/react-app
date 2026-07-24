
const AddTask = ({ addTask }) => {

  return (
    <div className="task-form ">
      <input
        type="text"
        name="tasks"
        id="tasks"
        placeholder="Enter new task"
        onKeyUp={addTask}
      />
      {/* <form onSubmit={addTask} className="inputForm">
          <input type="text" placeholder="Enter new task" />
          <button type="button" className="btn btn-info">Add Task</button>
      </form> */}
    </div>
  )
}

export default AddTask