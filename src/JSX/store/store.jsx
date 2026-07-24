import { useReducer  } from 'react';
import AppStateContext from './AppStateContext';
import AppDispatchContext from './AppDispatchContext';
import initialState from './initialState';
import AppReducer from './AppReducer';


// export const AppStateContext = createContext();
// export const AppDispatchContext = createContext();

// export const initialState = {
//   count: 0,
//   user: null,
// };

// export const appReducer = (state, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return { ...state, count: state.count + 1 };
//     case 'DECREMENT':
//       return { ...state, count: state.count - 1 };
//     case 'SET_USER':
//       return { ...state, user: action.payload };
//     default:
//       return state;
//   }
// }

const  AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export default AppProvider;

