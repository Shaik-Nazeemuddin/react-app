import {useRef } from 'react';
import FancyInput from './FancyInput';

const Fancy = () => {
    const fancyInputRef = useRef<any>(null);

    const handleFocus = () => {
        fancyInputRef.current.focus();
    }

    const handleClear = () => {
        fancyInputRef.current.clear();
    }

    return(
        <div className='custom-component'>
            <FancyInput ref={fancyInputRef } /> <br /><br />
            <button type="button" className='btn btn-info btn-space' onClick={handleFocus}>Focus</button>
            <button type="button" className='btn btn-info' onClick={handleClear}>Clear</button>
        </div>
    )
}

export default Fancy;