import  { useContext, use } from 'react';
//import { AppStateContext, AppDispatchContext } from '../store/store';
import MyComponentIncrement from './MyComponentIncrement';
import MyComponentDecrement from './MyComponentDecrement';
import AppStateContext from '../store/AppStateContext';
import AppDispatchContext from '../store/AppDispatchContext';

const MyComponent = () => {
  const state = useContext(AppStateContext);
  // const dispatch = useContext(AppDispatchContext);
  // const state = use(AppStateContext);
  const dispatch = use(AppDispatchContext);

  const handleIncrement = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const handleDecrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  const handleSetUser = () => {
    dispatch({ type: 'SET_USER', payload: { name: 'John Doe' } });
  };

  return (
    <div className='custom-component'>
      <h2>MyComponent Reducer</h2>
      <p>{JSON.stringify(state, null, 2)}</p>
      <p>Count: {state.count}</p>
      <p>User: {state.user ? state.user.name : 'Guest'}</p>
      <MyComponentIncrement handleIncrement = { handleIncrement }/>
      <MyComponentDecrement handleDecrement = { handleDecrement }/>
      <button type='button' className="btn btn-info btn-space" onClick={handleIncrement}>Increment</button>
      <button type='button' className="btn btn-info btn-space" onClick={handleDecrement}>Decrement</button>
      <button type='button' className="btn btn-info"onClick={handleSetUser}>Set User</button>
    </div>
  );
}

export default MyComponent;