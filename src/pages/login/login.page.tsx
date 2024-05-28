import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { ApolloError, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

import "./login.style.css";
import { LOGIN_MUTATION } from "../../api";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    variables: { email, password },
  });

  const navigate = useNavigate();
  const { useSignIn } = useAuth();

  return (
    <div className="auth-container">
      <h3>Login</h3>
      <div className="auth-img-box">
        <img src="/auth-user.png" alt="Auth user image" />
      </div>
      {error !== "" && (
        <div className="error-msg">
          <p>{error}</p>
        </div>
      )}
      <form action="#" className="auth-form">
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
        <div className="login-row">
          <div>
            <label htmlFor="remember-me">remember me</label>
            <input type="checkbox" name="" id="remember-me" />
          </div>
          <div>
            <a href="#">Forgot Password?</a>
          </div>
        </div>
        <div className="login-btn-box">
          <a
            href="#"
            className="login-btn"
            onClick={(e) => {
              e.preventDefault();
              setError("");
              login({ variables: { email, password } })
                .then((data) => {
                  console.log(data.data.login);
                  localStorage.setItem(
                    "auth-token",
                    JSON.stringify({ token: data.data.login.token })
                  );
                  setEmail("");
                  setPassword("");
                  useSignIn(data.data.login.token);
                  navigate("/", { replace: true });
                })
                .catch((err: ApolloError) => {
                  console.log(err.graphQLErrors);
                  setError(err.message);
                });
            }}
          >
            {loading ? (
              <ClipLoader loading={loading} color="fff" size={25} />
            ) : (
              <p>Login</p>
            )}
          </a>
        </div>
      </form>
      <p className="cta">
        First time? <a href="/register">Register Now!</a>
      </p>
    </div>
  );
}
