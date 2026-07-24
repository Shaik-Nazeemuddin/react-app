import React from 'react';

const Reset = ({handleResetClick}) => {
  
  return(
    <>  
      <button type="text" className="btn btn-info btn-space" onClick={handleResetClick}>Reset</button>
    </>
  )
}

export default Reset;