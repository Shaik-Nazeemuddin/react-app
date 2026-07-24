import  {useState} from 'react';
import LoginContext from './LoginContext';

const LoginContextProvider = ({children}) => {
    const [user] = useState('Shaik Nazeemuddin');

    return(
        <LoginContext.Provider value={user}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;