import { useContext, useState } from 'react';
import DisplayF from './DisplayF';
import LoginContext from '../useContext/LoginContext';

const DisplayE = ({ onSendData, onParentMethodCall, name = 'Default Name' }) => {
    const childData = 'Nazeemuddin';
    const [data, setData] = useState({counter: 0,name: 'Example'});
    const login = useContext(LoginContext);

    const handleClick = () => {
        onSendData(childData);

        if (typeof onParentMethodCall === 'function') {
            onParentMethodCall();
        }

        setData(prev => ({
            ...prev,
            counter: prev.counter + 1
        }));
    }

    return (
        <div className='custom-component'>
            <h3>ChildsDisplayE Component </h3>
            <p>{name} {JSON.stringify(data, null, 2)} {'LoginContext - Mr: '+ login}</p>
            <button type='button' className="btn btn-info" onClick={handleClick}>Send Childs Data & Invoke parents Method</button>
            <DisplayF />
        </div>
    );
}

export default DisplayE;
