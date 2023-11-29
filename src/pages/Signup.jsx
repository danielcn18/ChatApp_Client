import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../util';

const Signup = ({ setUser }) => {
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "", 
    confirmPass: ""
  });

  const [err, setErr] = useState();

  const handleChange = (event) => {
    setUserForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr();

    if (userForm.password !== userForm.confirmPass) {
      return setErr("Passwords do not match");
    }

    await axios
      .post(`${baseURL}/auth/register`, {
        username: userForm.username,
        email: userForm.email,
        password: userForm.password
      }, { withCredentials: true })
      .then((res) => {
        if (res.data.user) setUser(res.data.user);
        else setErr(res.data.error);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }

  return (
    <div className="form-wrapper">
      <div className="container">
        <h1>Sign Up</h1>
        {err && <div className="err">
          <p>{err}</p>
        </div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={userForm.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userForm.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userForm.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="confirm Password"
            name="confirmPass"
            value={userForm.confirmPass}
            onChange={handleChange}
          />

          <button type="submit" className="btn">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;