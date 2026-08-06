import React from 'react';
import DisplayChild from './DisplayChild';

const DisplayParent = () => {
    const [childData, setChildData] = React.useState(null);

    const Increment = () => {
        childData?.handleIncrement();
    }

    const Decrement = () => {
        childData?.handleDecrement();
    }

    const Reset = () => {
        childData?.handleReset();
    }

    return (
        <div className='custom-component'>
            <h2>Send Child - Parent </h2>
            <p style={{ fontWeight: 'bold' }}>( send all data[states,functions] of child to parent )</p>
            <div style={{ marginBottom: '20px' }}>
                {childData && (
                    <div>
                        <p>Child Count in Parent: {childData && childData?.count.value}</p>
                    </div>
                )}
                <button type='button' className="btn btn-info btn-space btn-top-bottom" onClick={Increment} >Child Increment</button>
                <button type='button' className="btn btn-info btn-space btn-top-bottom" onClick={Decrement} disabled={childData && childData.count.value === 0}>Child Decrement</button>
                <button type='button' className="btn btn-info btn-top-bottom" onClick={Reset} >Child Reset</button>
            </div>
            <DisplayChild generateAPI={setChildData} />
        </div>
    )
}

export default DisplayParent