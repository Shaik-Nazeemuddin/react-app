import { useEffect } from 'react';
import close from '../../assets/delete.png';
//import { MdDeleteForever } from 'react-icons/md';
import { SquarePen } from "lucide-react";

const ShowTask = ({ tasks, removeTask, editTask, showText, onLoopComplete }) => {

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      onLoopComplete();
    }
  }, [tasks, onLoopComplete]);

  return (
    <div className="tasks">
      {tasks.map((task, index) => {
        return (
          <div key={index} >
            <b>{task?.taskName}{(showText === 'api') ? '-API-Task' : '-Task'}</b>
            <div> 
               { (showText === 'api') && <img src={close} alt="" id={index} onClick={removeTask} />}
               { (showText !== 'api') && <><SquarePen size={30} onClick={() => editTask({ target: { id: index } })} style={{ marginRight: '10px', cursor: 'pointer', color: '#6cac00' }} /><img src={close} alt="" id={index} onClick={removeTask} /></>}
            </div>
          </div>
        );
      })}
    </div>
  )
}
{/* <span><MdDeleteForever id={index} onClick={removeTask} style={{ color: 'red', backgroundColor: 'white', width: '35px', height: '35px', display: 'block', }} /></span>*/ }
export default ShowTask