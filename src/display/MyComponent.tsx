import { useContext } from 'react';
import { AppStateContext, AppDispatchContext } from '../store/store';
import MyComponentIncrement from './MyComponentIncrement';
import MyComponentDecrement from './MyComponentDecrement';

const MyComponent = () => {
  const state : any = useContext(AppStateContext);
  const dispatch : any = useContext(AppDispatchContext);

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