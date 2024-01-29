import React, { useState } from "react";

import { Link, redirect, useNavigate } from "react-router-dom";

function WelcomeView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        localStorage.setItem("token", res.data.token);
        navigate("/home");
      });
  };

  return (
    <main>
      <div className="container">
        <h1>Hello, world</h1>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              required="required"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required="required"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Login
            </button>

            <Link to={"/register"} className="btn btn-secondary">
              Register
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default WelcomeView;
