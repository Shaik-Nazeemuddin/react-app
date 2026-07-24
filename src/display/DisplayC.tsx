import  { useContext } from 'react';
import DisplayD from './DisplayD';
import { Logged } from '../useContext/LoggedContextProvider';

const DisplayC = (props:any) => {
    const { bcount: count, bmsg: msg } = props;
    const logged = useContext(Logged);

    return (
        <div className='custom-component'>
            <h3>ChildDisplayC prop </h3>
            {Object.entries(props).map(([key, value], index) => (
                <p key={index}>{(typeof value !== 'function') && <span>{index}) {key} - </span>}</p>
            ))}
            {/* -- refering properties with new names count and msg --  */}
            {count} - {msg} - <br /><br />
            {Object.entries(logged).map(([key],index) => (<span key={index}>{key} -  </span>) )}<br/>
            <button type="button" className="btn btn-info"  onClick={props.onChandleClick}> Trigger Parent Event </button>
            <DisplayD countValue = {count} />
        </div>
    )
}

export default DisplayC;
