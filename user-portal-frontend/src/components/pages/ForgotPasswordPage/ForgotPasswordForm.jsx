import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../ForgotPasswordForm/ForgotPasswordForm.css"

const ForgotPasswordForm = () => {
  const [mailerState, setMailerState] = useState({
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const handleChange = (e) => {
    setMailerState({ ...mailerState, [e.target.name]: e.target.value });
  };

  console.log(mailerState);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!mailerState.email.trim()) {
        alert('Please enter a registered email.');
      } else if (!isValidEmail(mailerState.email)) {
        alert('Please enter a valid email address.');
      } else {
        console.log('sdfsdf');
        const response = await axios.post("http://localhost:5000/api/v1/pwd/request-reset", { email: mailerState.email });

        if (response.status === 200) {
          // Email exists, clear the error message
          setErrorMessage("");
          alert("Email has been sent to your email address");
        } else if (response.status === 404) {
          // Email does not exist, show the error message
          setErrorMessage('Email does not exist');
        } else {
          // Handle other response statuses as needed
          console.log("Unexpected response status:", response.status);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 200) {
        alert("Email has been sent to your email address");
      } else if (error.response && error.response.status === 404) {
        setErrorMessage('*Email does not exist');
      } else {
        // Handle other response statuses as needed
        console.log("Unexpected response status:", error.response.status);
      }
      console.error('An Error occurred: ', error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className='Forgot-form-container'>
      <div className="Forgot-form">
        Enter your registered email:
        <div className="Forgot-input-group">
        <input type="email" name='email' onChange={handleChange} value={mailerState.email} />
        <button className='Forgot-Button' type="submit" value="Submit" onClick={handleClick} >Reset</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
      <div Forgot-sign>
        <Link to='/PasswordChange'>another page</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;