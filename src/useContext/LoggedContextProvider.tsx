import {createContext,useState} from 'react';
export const Logged = createContext<any>(undefined);

const LoggedContextProvider = ({children}:any) => {
    const [user] = useState({id:1,name:'Humaira',designation:'senior software'});

    return(
        <Logged.Provider value={user}>
            {children}
        </Logged.Provider>
    )
}

export default LoggedContextProvider;
