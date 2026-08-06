import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const redirect = useNavigate();
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    message: ''
  });

  const onSuccess = () => {
    redirect('/contact')
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  const handleInputFocus = (e) => {
    e.target.classList.toggle("error", e.target.value.trim() === "");
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isFormEmpty = Object.values(formData).some(field => field.trim() === '');

    if (isFormEmpty) {
      setError("All fields are required");
      return;
    }

    await fetch("https://node-app-production-8f02.up.railway.app/contactform", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(async response => {
        if (!response.ok) {
          if (response.status === 400) {
            const message = await response.text();
            setError(message);
            return { error: true, message };
          }
          return Promise.reject(new Error(`HTTP error! Status: ${response.status}`));

        }
        setStatus("Form submitted successfully!");
        return await response.text();
      })
      .then(result => {
        if (result && result.error) {
          return;
        }

        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          mobile: '',
          message: ''
        })
        setError("");
        setTimeout(() => { setStatus(""); }, 3000);
        onSuccess();
      })
      .catch(error => {
        //signUpFailure();
        console.error('Error:', error);
      });


  }

  return (
    <div className="custom-component">
      <h2>Get in touch</h2>
      <div>Contact Details : {formData.firstname} {formData.lastname} {formData.email}  {formData.mobile} {formData.message}</div>
      <form onSubmit={handleFormSubmit} className="main signup" autoComplete="off">
        <h3>Contact Form</h3>
        <p style={{ position: "relative", marginBottom: "30px" }}>We'd love to hear from you. Please fill out this form.  {error && <span style={{ color: "#e63946", fontWeight: "bold", position: "absolute", textAlign: "center", bottom: "-30px", display: "block", width: "100%" }}>( {error} )</span>}
          {status && <span style={{ color: "#2a9d8f", fontWeight: "bold", position: "absolute", textAlign: "center", bottom: "-30px", display: "block", width: "100%" }}>( {status} )</span>}
        </p>
        <div className="form-feilds-container">
          <div className="form-feilds">
            <label htmlFor="firstname">First Name* :</label>
            <input type="text" id="firstname" name="firstname" onBlur={handleInputFocus} value={formData.firstname} onChange={handleInputChange} className={error && !formData.firstname ? "error" : ""} />
          </div>
          <div className="form-feilds">
            <label htmlFor="lastname">Last Name* :</label>
            <input type="text" id="lastname" name="lastname" onBlur={handleInputFocus} value={formData.lastname} onChange={handleInputChange} className={error && !formData.lastname ? "error" : ""} />
          </div>
        </div>
        <div className="form-feilds-container">
          <div className="form-feilds">
            <label htmlFor="email">Email* :</label>
            <input type="email" id="email" name="email" onBlur={handleInputFocus} value={formData.email} onChange={handleInputChange} className={error && !formData.email ? "error" : ""} />
          </div>
          <div className="form-feilds">
            <label htmlFor="mobile">Contact* :</label>
            <input type="text" id="mobile" name="mobile" value={formData.mobile} maxLength="10" onBlur={handleInputFocus} onChange={handleInputChange} className={error && !formData.mobile ? "error" : ""} />
          </div>
        </div>

        <div className="form-feilds">
          <label htmlFor="message">Message* :</label>
          <textarea id="message" name="message" value={formData.message} onBlur={handleInputFocus} onChange={handleInputChange} className={error && !formData.message ? "error" : ""} />
        </div>
        <button className="btn btn-info" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default ContactForm;