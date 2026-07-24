import { useReducer } from 'react';
import Increment from './Increment';
import Decrement from './Decrement';
import Reset from './Reset';

export const ACTIONS = {
    INCREMENT: 'increase',
    DECREMENT: 'decrease',
    RESET: 'initial'
}

export const initialState = { count: 0 };

export const reducer = (state: { count: number; }, action: { type: any; }) => {
    switch (action.type) {
        case ACTIONS.INCREMENT: 
            return { count: state.count + 1};
        case ACTIONS.DECREMENT:
            return { count: state.count - 1};
        case ACTIONS.RESET:
            return initialState;
        default:
            return state;
    }
}

const IncrementDecrement = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const increment = () => {
        dispatch({ type: ACTIONS.INCREMENT });
    }

    const decrement = () => {
        dispatch({ type: ACTIONS.DECREMENT });
    }

    const reset = () => {
        dispatch({ type: ACTIONS.RESET });
    }

    return (
        <div className='custom-component'>
            <h2> Use Reducer </h2>
            <p>Value = {state.count}</p>
            <Increment handleIncrementClick={increment}/>
            <Decrement handleDecrementClick={decrement}/>
            <Reset handleResetClick={reset}/>
        </div>
    )
}

export default IncrementDecrement;