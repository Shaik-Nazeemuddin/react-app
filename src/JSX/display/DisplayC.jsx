import React, { useContext } from 'react';
import DisplayD from './DisplayD';
//import { Logged } from '../useContext/LoggedContextProvider';
import LoggedContext from '../useContext/LoggedContext';

const DisplayC = (props) => {
    const { bcount: count, bmsg: msg } = props;
    const logged = useContext(LoggedContext);

    return (
        <div className='custom-component'>
            <h3>ChildDisplayC prop </h3>
            {Object.entries(props).map(([key, value], index) => (
                <p key={index}>{(typeof value !== 'function') && <span>{index}) {key} - {value}</span>}</p>
            ))}
            {/* -- refering properties with new names count and msg --  */}
            {count} - {msg} - <br /><br />
            {Object.entries(logged).map(([key,value],index) => (<span key={index}>{key} - {value} </span>) )}<br/>
            <button type="button" className="btn btn-info" count={props.bcount} cmsg={props.bmsg} onClick={props.onChandleClick}> Trigger Parent Event </button>
            <DisplayD countValue = {count} />
        </div>
    )
}

export default DisplayC;
