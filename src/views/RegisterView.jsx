import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const navigate = useNavigate();

    await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        navigate("/");
      });
  };

  return (
    <main>
      <div className="container">
        <h1>Hello, world</h1>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required="required"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              Register
            </button>

            <Link to={"/"} className="btn btn-secondary">
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default RegisterView;
