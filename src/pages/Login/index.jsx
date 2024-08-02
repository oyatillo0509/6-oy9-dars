import React, { useRef } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const usernameRef = useRef("");
  const passwordRef = useRef();
  const navigate = useNavigate();

  function validate(username, password) {
    if (username.current.value.length < 3) {
      alert("Username isn't valid");
      username.current.style.outlineColor = "red";
      username.current.focus();
      return false;
    }
    if (password.current.value.length < 3) {
      alert("Password isn't valid");
      password.current.style.outlineColor = "red";
      password.current.focus();
      return false;
    }

    return true;
  }

  function handleLogin(event) {
    event.preventDefault();

    const isValid = validate(usernameRef, passwordRef);
    if (!isValid) {
      return;
    }

    let user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    fetch(`https://auth-rg69.onrender.com/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.message === "Invalid Password!") {
          alert(data.message);
          passwordRef.current.value = "";
          passwordRef.current.focus();
          return;
        }

        if (data.message === "User Not found.") {
          alert(data.message);
          usernameRef.current.value = "";
          usernameRef.current.focus();
          return;
        }

        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  }

  function handleRegister() {
    navigate("/register");
  }

  return (
    <div>
      <form autoComplete="off" className={styles.form} onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          id="username"
          ref={usernameRef}
          placeholder="Enter username..."
        />
        <input
          autoComplete="off"
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          placeholder="Enter password..."
        />
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
