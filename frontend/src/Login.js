import React from 'react';
import "./Login.css";

const Login = () => {
  return (
    <>
      <div className='loginpageContainer'>
          <div className='logininfoContainer'>
              <p>Email :</p>
              <input />
              <p>Password :</p>
              <input />
              <button>Login</button>
          </div>
      </div>
    </>
  )
}

export default Login