// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';

import Display from './display/Display';
import Messenger from './messenger/Messenger';
import LoggedContextProvider from './useContext/LoggedContextProvider';
import IncrementDecrement from './useReducer/IncrementDecrement';
import AppProvider from './store/store';
import MyComponent from './display/MyComponent';
import Fancy from './useImperative/Fancy';

const App =() => {
  return (
    <AppProvider>
        <LoggedContextProvider>
          <Display />
        </LoggedContextProvider>
        <Messenger />
        <IncrementDecrement/>
        <MyComponent/>
        <Fancy />
    </AppProvider>
  )
}

export default App;
