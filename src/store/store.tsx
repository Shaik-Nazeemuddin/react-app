import  { createContext , useReducer  } from 'react';

export const AppStateContext = createContext<any>(undefined);
export const AppDispatchContext  = createContext<any>(undefined);

export const initialState = {
  count: 0,
  user: null,
};

export const appReducer = (state:any, action:any) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const  AppProvider = ({ children }:any) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export default AppProvider;

