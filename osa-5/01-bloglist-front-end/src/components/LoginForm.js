import React from 'react';

const LoginForm = ({ handleLogin, username, handleNameChange, password, handlePwdChange }) => {
  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleNameChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePwdChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm
