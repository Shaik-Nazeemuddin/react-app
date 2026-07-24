import { useNavigate } from "react-router-dom"

const Contact = () => {
  const navigation = useNavigate(); 
  return (
    <div>
        <h1>Contact </h1>
        <button type="button" className="btn btn-info btn-space" onClick={() => navigation('form')}> Contact Form</button>
        <button type="button" className="btn btn-info" onClick={() => navigation('info')}> Contact Info</button>
    </div>
  )
}

export default Contact