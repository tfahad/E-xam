import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../ForgotPasswordForm/ForgotPasswordForm.css"

const PasswordChange = () => {
  const [passwordState, setPasswordState] = useState({
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const {id, token} = useParams()

  const handleChange = (e) => {
    setPasswordState({ ...passwordState, [e.target.name]: e.target.value });
  };
 console.log(passwordState)
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (passwordState.password !== passwordState.confirmPassword) {
        alert('Passwords do not match.');
      } else {
        alert('Password updated successfully!');
        //  Make the API request with the password and confirmPassword
         await axios.post(`http://localhost:5000/api/v1/pwd/demo/${id}/${token}`, passwordState)
         .then(res => {
          if(res.data.Status === "Success"){
            navigate('/')
          }
         }).catch(err => console.log(err))
      }
    } catch (error) {
      console.error('An error occurred: ', error);
    }
  };

  return (
    <div className='PassWordChange-main'>
      <div className='pass-background'>
    <div className="PasswordChange-form-container">
      <div className="passwordchange-input-group">
        Enter your new password:
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={passwordState.password}
          placeholder="Password"
        />
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={passwordState.confirmPassword}
          placeholder="Confirm Password"
        />
        <button className='passWordChange-button' type="submit" onClick={handleClick} >Update</button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default PasswordChange;