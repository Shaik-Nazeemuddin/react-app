import React,{ useState,useRef,useImperativeHandle } from 'react';

const FancyInput = ({ref}) => {
    const[input,SetInput] = useState('');
    const inputRef = useRef(null);

    useImperativeHandle(ref,() => ({
            focus: () => {
                inputRef.current.focus();
            },
            clear : () => {
                inputRef.current.value = "";
            }
    }));
    return(
        <input 
        type="text"
        value={input}
        onChange={(e) => SetInput(e.target.value)}
        ref={inputRef} 
    />
  )
}

export default FancyInput;