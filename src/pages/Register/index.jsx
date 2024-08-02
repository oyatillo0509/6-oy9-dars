import React, { useRef } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  function validate() {
    if (usernameRef.current.value.length < 3) {
      alert("Username isn't valid");
      usernameRef.current.style.outlineColor = "red";
      usernameRef.current.focus();
      return false;
    }
    if (!emailRef.current.value.includes("@")) {
      alert("Email isn't valid");
      emailRef.current.style.outlineColor = "red";
      emailRef.current.focus();
      return false;
    }
    if (passwordRef.current.value.length < 3) {
      alert("Password isn't valid");
      passwordRef.current.style.outlineColor = "red";
      passwordRef.current.focus();
      return false;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Passwords do not match");
      confirmPasswordRef.current.style.outlineColor = "red";
      confirmPasswordRef.current.focus();
      return false;
    }

    return true;
  }

  function handleRegister(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    let user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch(`https://auth-rg69.onrender.com/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        if (data.message === "User already exists.") {
          alert(data.message);
          usernameRef.current.value = "";
          emailRef.current.value = "";
          usernameRef.current.focus();
          return;
        }

        if (data.message === "Registration successful!") {
          alert(data.message);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error); 
      });
  }

  return (
    <div>
      <form
        autoComplete="off"
        className={styles.form}
        onSubmit={handleRegister}
      >
        <h1>Register</h1>
        <input
          type="text"
          name="username"
          id="username"
          ref={usernameRef}
          placeholder="Enter username..."
        />
        <input
          type="email"
          name="email"
          id="email"
          ref={emailRef}
          placeholder="Enter email..."
        />
        <input
          autoComplete="off"
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          placeholder="Enter password..."
        />
        <input
          autoComplete="off"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          ref={confirmPasswordRef}
          placeholder="Confirm password..."
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
