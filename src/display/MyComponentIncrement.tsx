
const MyComponentIncrement = ({handleIncrement} : any) => {

  return (
    <div className='custom-component'>
      <p>MyComponent Increment</p>
      <button type='button' className="btn btn-info btn-space" onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default MyComponentIncrement;
