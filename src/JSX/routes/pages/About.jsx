import { useNavigate } from "react-router-dom";
// import { StepBack } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const About = () => {
  // const navigate = useNavigate();
  const [count, setCount] = useState(10);
  const timerIdRef = useRef(null);

  useEffect(() => {
    if (count === 0) return;
    timerIdRef.current = setInterval(() => {
      console.log(timerIdRef.current);
      setCount(prev => prev - 1);
    }, 3000);

    return () => clearInterval(timerIdRef.current); // Clean up on unmount
  }, [count]);

  const stopTimer = () => {
    clearInterval(timerIdRef.current);
  };



  return (
    <div>
      <h1>About Us</h1>
      <div className="custom-component">
        <h2>Our Story</h2>
        <p className="text-left extrapadding"><b>Node.js</b> and <b>React.js</b> are two powerful technologies widely used in the development of modern web applications.
          While both are based on JavaScript, they serve entirely different purposes and are used at different stages of the web development process.
          This article provides a detailed comparison between Node.js and React.js, highlighting their differences in various aspects such as usage, architecture, performance, and use cases.
        </p>
        <h2 id="purpose-and-usage">
          <span>Purpose and Usage</span>
        </h2>
        <h3 id="nodejs-1">
          <b>
            <strong>Node.js</strong>
          </b>
        </h3>
        <ul style={{ padding: 0 }}>
          <li value="1"><span>Designed for server-side development, allowing the creation of fast and scalable network applications.</span></li>
          <li value="2"><span>Enables developers to use JavaScript for both client-side and server-side scripting, unifying the development stack.</span></li>
          <li value="3"><span>Commonly used for building RESTful APIs, microservices, real-time applications, and server-side rendered applications.</span></li></ul>
        <h3 id="reactjs-1">
          <b>
            <strong>React.js</strong>
          </b>
        </h3>
        <ul style={{ padding: 0 }}>
          <li value="1"><span>Designed for building user interfaces, particularly single-page applications where you want a fast and responsive UI.</span></li>
          <li value="2"><span>Uses a virtual DOM to optimize rendering performance and provide a better user experience.</span></li>
          <li value="3"><span>Commonly used for creating reusable UI components and managing application state.</span></li>
        </ul>
        {/* <button type='button' className="btn btn-info" onClick={() => navigate('/', { replace: true })}>Back to Home <StepBack className="margin-left-5" /></button> */}
      </div>
      {<p>Count: {count} </p>}
      <button type="button" className="btn btn-info" onClick={stopTimer}>Stop Timer</button>
    </div>

  )
}

export default About