import {useState} from 'react';
import LoggedContext from './LoggedContext';
//export const Logged = createContext();

const LoggedContextProvider = ({children}) => {
    const [user] = useState({id:1,name:'Humaira',designation:'senior software'});

    return(
        <LoggedContext.Provider value={user}>
            {children}
        </LoggedContext.Provider>
    )
}

export default LoggedContextProvider;
