import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const SignUp = () => {
    const redirect = useNavigate();
    const [error, setError] = useState("");

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        password: '',
        repassword: '',
        mobile: '',
        gender: ''
    });

    const signInSuccess = () => {
        redirect('/registration/success')
    }

    const signUpFailure = () => {
        redirect('/registration/signupfailure')
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
        setError(""); // clear error msg while typing
    }

    const handleInputFocus = (e) => {
        // (e.target.value === "") ? e.target.classList.add('error') : e.target.classList.remove('error');
        e.target.classList.toggle("error", e.target.value.trim() === "");
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // const formData = {
        //     firstName,
        //     lastName,
        //     email,
        //     password,
        //     repassword,
        //     mobile,
        //     gender,
        // };

        const isFormEmpty = Object.values(user).some(field => field.trim() === '');

        if (isFormEmpty) {
            setError("All fields are required");
            return;
        }

        if (user.password !== user.repassword) {
            setError("Password and Re-type Password must be same");
            return;
        }

        await fetch("http://localhost:3000/submitform", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            //.then(response => response.text())
            .then(async response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        const message = await response.text();
                        setError(message);
                        return { error: true, message };
                        // throw new Error("Bad Request: Please check your input data.");
                    }
                    return Promise.reject(new Error(`HTTP error! Status: ${response.status}`));
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return await response.text();
            })
            .then(result => {
                // console.log('Success:', result);
                if (result && result.error) {
                    return;
                }

                setUser({
                    firstName: '',
                    lastName: '',
                    email: '',
                    designation: '',
                    password: '',
                    repassword: '',
                    mobile: '',
                    gender: ''
                })
                setError("");
                signInSuccess();
            })
            .catch(error => {
                signUpFailure();
                console.error('Error:', error);
            });
        // try {
        //     const response = await fetch('"http://localhost:3000/submitform', {
        //         method: 'POST', // Specify the method
        //         headers: {
        //             'Content-Type': 'application/json', // Indicate JSON data is sent
        //         },
        //         body: JSON.stringify(user), // Convert the JS object to a JSON string
        //     });

        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }

        //     const result = await response.text();
        //     console.log('Success:', result);
        //     alert('Form submitted successfully!');
        // } catch (error) {
        //     console.error('Error:', error);
        //     alert('Failed to submit form.');
        // }

    }



    return (
        <div className="custom-component">
            <h2>SignUp Form</h2>
            <div>User Details : {user.firstName} {user.lastName} {user.email}  {user.mobile} {user.gender}</div>
            <form onSubmit={handleFormSubmit} className="main signup" autoComplete="off">
                <h3>User SignUp</h3>
                <p style={{ position: "relative", marginBottom: "30px" }}>Enter below details for User Registration  {error && <span style={{ color: "#e63946", fontWeight: "bold", position: "absolute", textAlign: "center", bottom: "-30px", display: "block", width: "100%" }}>( {error} )</span>} </p>

                <div className="form-feilds-container">
                    <div className="form-feilds">
                        <label htmlFor="firstName">First Name* :</label>
                        <input type="text" id="firstName" name="firstName" onBlur={handleInputFocus} value={user.firstName} onChange={handleInputChange} className={error && !user.firstName ? "error" : ""} />
                    </div>
                    <div className="form-feilds">
                        <label htmlFor="lastName">Last Name* :</label>
                        <input type="text" id="lastName" name="lastName" onBlur={handleInputFocus} value={user.lastName} onChange={handleInputChange} className={error && !user.lastName ? "error" : ""} />
                    </div>
                </div>
                <div className="form-feilds-container">
                    <div className="form-feilds">
                        <label htmlFor="email">Email* :</label>
                        <input type="email" id="email" name="email" onBlur={handleInputFocus} value={user.email} onChange={handleInputChange} className={error && !user.email ? "error" : ""} />
                    </div>
                    <div className="form-feilds">
                        <label htmlFor="designation">Designation* :</label>
                        <input type="text" id="designation" name="designation" onBlur={handleInputFocus} value={user.designation} onChange={handleInputChange} className={error && !user.designation ? "error" : ""} />
                    </div>
                </div>
                <div className="form-feilds-container">
                    <div className="form-feilds">
                        <label htmlFor="password">Password* :</label>
                        <input type="password" id="password" name="password"
                            pattern="^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])\S{8,}$"
                            title="Password must contain at least one number, 
                                one alphabet, one symbol, and be at 
                                least 8 characters long" value={user.password} onBlur={handleInputFocus} onChange={handleInputChange} className={error && !user.password ? "error" : ""} />
                    </div>
                    <div className="form-feilds">
                        <label htmlFor="repassword">Re-type Password* :</label>
                        <input type="password" id="repassword" name="repassword" className={error && !user.repassword ? "error" : ""} value={user.repassword} onBlur={handleInputFocus} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-feilds-container">
                    <div className="form-feilds">
                        <label htmlFor="mobile">Contact* :</label>
                        <input type="text" id="mobile" name="mobile" value={user.mobile} maxLength="10" onBlur={handleInputFocus} onChange={handleInputChange} className={error && !user.mobile ? "error" : ""} />
                    </div>
                    <div className="form-feilds">
                        <label htmlFor="gender">Gender* :</label>
                        <select id="gender" name="gender" value={user.gender} onBlur={handleInputFocus} onChange={handleInputChange} className={error && !user.gender ? "error" : ""}>
                            <option value="">
                                Select Gender
                            </option>
                            <option value="male">
                                Male
                            </option>
                            <option value="female">
                                Female
                            </option>
                            <option value="other">
                                Other
                            </option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-info" type="submit">
                    Submit
                </button>
            </form>
            <div>
                <button className="btn btn-info" onClick={() => redirect('/registration')}>SignIn Page </button>
                <button className="btn btn-info" onClick={() => redirect('/registration/fetch')}>Fetch Page </button>
            </div>
        </div>
    )

}

export default SignUp;