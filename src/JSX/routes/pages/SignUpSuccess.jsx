import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const SignUpSuccess = () => {
    const redirect = useNavigate();
    const [message, setMessage] = useState('Wait redirecting to Sign In !');

    useEffect(() => {
        const timerId = setTimeout(() => {
            setMessage('');
            redirect("/registration");
        }, 3000);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return (
        <div className="custom-component ">
            <h2>SignUp Success</h2>
            <p>"Welcome to the family! We're excited to have you. Look out for our welcome email!" </p>
            {message && <p className="redirectmsg">{message}</p>}
        </div>
    )
}

export default SignUpSuccess;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"

const SignUpSuccess1 = ({ serverResponse }) => {
    const redirect = useNavigate();
    const [message, setMessage] = useState('Wait redirecting to Sign In !');

    useEffect(() => {
        if (!serverResponse) return;

        setMessage(
            serverResponse.status === 'success'
                ? 'Wait redirecting to Home !'
                : 'Redirecting to SignUp page...'
        );

        const timerId = setTimeout(() => {
            setMessage('');
            if (serverResponse.status === 'success') {
                redirect('/registration');
            } else {
                setMessage('Failed to sign up. Redirecting to SignUp page...');
                redirect('/registration/signupfailure');
            }
        }, 3000);

        return () => clearTimeout(timerId);
    }, [serverResponse, redirect]);

    return (
        serverResponse?.status === 'success' ? (
            <div className="custom-component ">
                <h2>SignUp Success</h2>
                <p>"Welcome to the family! We're excited to have you. Look out for our welcome email!" </p>
                {message && <p className="redirectmsg">{message}</p>}
            </div>
        ) : (
            <div className="custom-component ">
                <h2>SignUp Failure</h2>
                <p>"Something went wrong during registration. Please try again later."</p>
                {message && <p className="redirectmsg">{message}</p>}
            </div>
        )
    )
}

export { SignUpSuccess1 };