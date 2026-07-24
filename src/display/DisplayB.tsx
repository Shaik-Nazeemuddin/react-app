import { useContext } from 'react';
import DisplayC from './DisplayC';
import LoginContext from '../useContext/LoginContext';

const DisplayB = (props :any) => {
    const { count, msg } = props;
    const login = useContext(LoginContext);

    return (
        <div className='custom-component'>
            <h3>ChildDisplayB prop </h3>
            {count} - {msg} - {login} <br /><br />
            <button type="button" className="btn btn-info"  onClick={props.onBhandleClick}>Trigger Parent Event</button>
            <DisplayC bcount={count} bmsg={props.msg} onChandleClick={props.onBhandleClick} />
        </div>
    );
}

export default DisplayB;
