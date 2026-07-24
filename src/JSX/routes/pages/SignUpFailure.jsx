import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const SignUpFailure = () => {
    const redirect = useNavigate();
    const [message, setMessage] = useState('Wait redirecting to Sign Up !');

    useEffect(() => {
        const timerId = setTimeout(() => {
            setMessage('');
            redirect("/registration/signup");
        }, 3000);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return (
        <div className="custom-component ">
            <h2>SignUp Failure</h2>
            <p>"Something went wrong during registration. Please try again later."</p>
            {message && <p className="redirectmsg">{message}</p>}
        </div>
    )
}

export default SignUpFailure;