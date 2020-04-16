import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [errors, setError] = useState(false);

  async function getLogin(url, data) {
    setIsLoading(true);
    // Default options are marked with *
    let Response = await fetch(url, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Accept: "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return Response.json();
    // parses JSON response into native JavaScript objects
  }

  const validateForm = () => {
    let fields = {
      email: email,
      password: password,
    };
    let errors = {};
    let formIsValid = true;
    console.log(email);
    console.log(password);

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "This is a required Field";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /(?=^.{5,30}$)(([a-zA-Z\d*]).{5,30})+(\.?)([a-zA-Z\d*])*@{1}([a-zA-z\d*])+(\.){1}([a-zA-Z\d*]){2,}/
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "This is a required Field";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*((?=.*[A-Z]).{6,50}).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    setError(errors);
    return formIsValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let url = "http://www.mocky.io/v2/5e975ab23000006500b6de19";
    let loginData = {
      email: email,
      password: password,
    };
    if (validateForm()) {
      getLogin(url, loginData)
        .then((data) => {
          console.log(data);
          if (data.result === "success") {
            setError(false);
            setIsLoading(false);
            setHelperText("Login Successfully");
          }
        })
        .catch((error) => {
          console.log("error", error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleFormSubmit} className="login-screen">
            <div className="login-segments">
              <div className="top" style={{ color: "black", fontSize: 20 }}>
                HealthfyMe
              </div>
              <h2 className="top" style={{ color: "black", fontSize: 20 }}>
                Sign In
              </h2>
              <div className="top" style={{ color: "black", fontSize: 14 }}>
                Use your Healthfy Account
              </div>
            </div>
            <div className="login-segments">
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="input-login"
                type="email"
                placeholder="Enter Your  Email"
              ></input>
              <div className="errorMsg">{errors.email}</div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="input-login"
                type="password"
                placeholder="Enter Your Password"
              ></input>
              <div className="errorMsg">{errors.password}</div>
            </div>
            <button disabled={isLoading} type="submit" className="login-button">
              LOGIN
            </button>
          </form>
        )}
      </header>
    </div>
  );
}

export default App;
