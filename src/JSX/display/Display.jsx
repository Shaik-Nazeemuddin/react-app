import { useState } from 'react';
import DisplayB from './DisplayB';
import DisplayE from './DisplayE';
import arham from '../../assets/Arham.png';
import LoginContextProvider from '../useContext/LoginContextProvider';
import MyComponent from './MyComponent';

const Display = () => {
  const [countValue, setCountValue] = useState(0);
  const [parentsData, setParentsData] = useState('');
  const [message, setMessage] = useState('Component Default Msg');

  const styles = {
    main: {
      padding: '20px',
    },
    title: {
      color: '#00b8c0'
    },
  };

  const user = {
    name: 'Muhammed Arham',
    imageUrl: arham,
    imageSize: 90,
  };

  const incrementCount = () => {
    setCountValue(countValue + 1);
  }

  const decrementCount = () => {
    setCountValue(countValue - 1);
  }

  const initializeCount = () => {
    setCountValue(0);
  }

  const isInitializeButtonDisabled = () => {
    return countValue === 0;
  };

  const isDecrementButtonDisabled = () => {
    return (countValue === 0) ? true : false;
  };

  const handleClick = () => {
    if (message === 'Component Default Msg') {
      setMessage('Component Modified Msg')
    } else {
      setMessage('Component Default Msg')
    }

  }

  const handleChildData = (datafromChild) => {
    setParentsData(datafromChild);

  }

  const parentMethodCall = () => {

  }

  return (
    <div className='custom-component'  >
      <div className="centeralign panel panel-info">
        <div className="panel-heading">
          <p className="panel-title">{user.name}</p>
        </div>
        <div className="panel-body">
          <img src={user.imageUrl} width={user.imageSize} />
        </div>
      </div>
      <div>
        <h1 style={styles.title}>Hello, {user.name} ! </h1>
        <h2>Parent Component </h2>
        <p>Count {countValue}  {countValue === 0 ? ' ButtonDisabled' : ' ButtonEnabled'}</p>
        <p>Parent {message}</p>
        <p>Childs Data in Parent - {parentsData ? parentsData : 'no data'}</p>
        <button type="button" className="btn btn-info" onClick={incrementCount}>
          Incrementcount
        </button><br /><br />
        <button type="button" className="btn btn-info" onClick={decrementCount} disabled={isDecrementButtonDisabled()}>
          Decrementcount
        </button><br /><br />
        <button type="button" className="btn btn-info" onClick={initializeCount} disabled={isInitializeButtonDisabled()}>
          Initializecount
        </button><br /><br />
        <B count={countValue} msg={message} onBhandleClick={handleClick} />
        <C count={countValue} msg={message} onChandleClick={handleClick} />
        <LoginContextProvider>
          <DisplayE message={message} onSendData={handleChildData} onParentMethodCall={parentMethodCall} />
          <DisplayB count={countValue} msg={message} onBhandleClick={handleClick} />
        </LoginContextProvider>
        <MyComponent />
      </div>
    </div>
  )
}

const B = (props) => {


  return (
    <div>
      <h2>ChildB Components prop </h2>
      {Object.entries(props).map(([key, value], index) => {
        if (typeof value !== 'function') {
          return <p key={index + 1}>  {index + 1}) {key} = {value} </p>;
        }
      })}

      {Object.entries(props).map(([key, value], index) => (
        <p key={index + 1}>{(typeof value !== 'function') && <span> {index + 1}) {key} = {value}</span>}</p>
      ))}

      <button type="button" className="btn btn-info" bcount={props.value} onClick={props.onBhandleClick}>Trigger Parent Event</button>

    </div>
  );
}

const C = (props) => {



  return (
    <div>
      <h2>ChildC Components prop </h2>

      {Object.entries(props).map(([key, value], index) => {
        if (typeof value !== 'function') {
          return <p key={index + 1}>{index + 1}) {key} = {value} </p>;
        }
      })}
      <button type="button" className="btn btn-info" count={props.bcount} cmsg={props.bmsg} onClick={props.onChandleClick}> Trigger Parent Event </button>
    </div>
  )
}

export default Display;
