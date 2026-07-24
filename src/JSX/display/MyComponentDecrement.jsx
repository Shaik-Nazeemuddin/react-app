
const MyComponentDecrement = ({handleDecrement}) => {

  return (
    <div className='custom-component'>
        <p>MyComponent Decrement</p>
      <button type='button' className="btn btn-info btn-space" onClick={handleDecrement}>Decrement</button>
    </div>
  );
}

export default MyComponentDecrement;
