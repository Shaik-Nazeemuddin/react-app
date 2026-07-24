import React from 'react';

const DisplayD = ({ countValue: count }) => {

    return (
        <div className='custom-component'>
            <h3>ChildDisplayD Component </h3>
            count is :{count}
        </div>
    );
}

export default DisplayD;
