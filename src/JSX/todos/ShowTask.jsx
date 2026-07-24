import { useEffect } from 'react';
import close from '../../assets/delete.png';
//import { MdDeleteForever } from 'react-icons/md';

const ShowTask = ({ tasks, removeTask, showText, onLoopComplete }) => {

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      onLoopComplete();
    }
  }, [tasks, onLoopComplete]);

  return (
    <div className="tasks">
      {tasks.map((task, index) => {
        return (<div key={index} ><b>{task?.taskName}{(showText === 'api') ? '-API-Task' : '-Task'}</b><img src={close} alt="" id={index} onClick={removeTask} /> </div>);
      })}
    </div>
  )
}
{/* <span><MdDeleteForever id={index} onClick={removeTask} style={{ color: 'red', backgroundColor: 'white', width: '35px', height: '35px', display: 'block', }} /></span>*/ }
export default ShowTask