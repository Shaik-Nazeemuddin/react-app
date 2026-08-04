import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigation = useNavigate();
  return (
    <div>
      <h1>Contact </h1>
      <button type="button" className="btn btn-info btn-space" onClick={() => navigation('/contact')}> Contact Form</button>
      <button type="button" className="btn btn-info" onClick={() => navigation('/contact/info')}> Contact Info</button>
    </div>
  )
}

export default Contact