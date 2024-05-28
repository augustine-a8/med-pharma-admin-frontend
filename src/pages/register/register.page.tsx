import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import "./register.style.css";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="auth-container">
      <h3>Register</h3>
      <div className="auth-img-box">
        <img src="/auth-user.png" alt="Auth user image" />
      </div>
      <form action="#" className="auth-form">
        <div className="input-box">
          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faLock} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="login-btn-box">
          <a href="#" className="login-btn">
            <p>Register</p>
          </a>
        </div>
      </form>
      <p className="cta">
        Already have an account? <a href="/login">Log In!</a>
      </p>
    </div>
  );
}
