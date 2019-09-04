import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    accept: false,
    message: "",

    errors: {
      username: false,
      email: false,
      password: false,
      accept: false
    }
  };

  messages = {
    username_incorect:
      "Nazwa musi zawierać minimum 3 znaki i nie może zawierać spacji",
    email_incorect: "Brak @ w emailu",
    password_incorect: "Hasło musi mieć minimum 8 znaków",
    accept_incorect: "Potwierdź zgoda"
  };

  handleChanege = e => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "password" || type === "email") {
      const value = e.target.value;

      this.setState({
        [name]: value
      });
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked
      });
    }
    console.log(type);
  };

  handleSubmit = e => {
    e.preventDefault();
    const validation = this.formValidation();
    console.log(validation);
    console.log("działa submite");
    if (validation.correct) {
      this.setState({
        username: "",
        email: "",
        password: "",
        accept: false,
        message: "Formularz został wysłany",

        errors: {
          username: false,
          email: false,
          password: false,
          accept: false
        }
      });
      console.log("formm wysłany ");
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          password: !validation.password,
          accept: !validation.accept
        }
      });
    }
  };

  formValidation = () => {
    //true - ok
    // false - nie ok
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;

    if (
      this.state.username.length >= 3 &&
      this.state.username.indexOf(" ") === -1
    ) {
      username = true;
    }

    if (this.state.email.indexOf("@") !== -1) {
      email = true;
    }
    if (this.state.password.length > 8) {
      password = true;
    }
    if (this.state.accept) {
      accept = true;
    }
    if (username && email && password && accept) {
      correct = true;
    }
    return {
      username,
      email,
      password,
      accept,
      correct
    };
  };
  componentDidUpdate() {
    if (this.state.message !== "") {
      setTimeout(
        () =>
          this.setState({
            message: ""
          }),
        3000
      );
    }
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">
            Twoje imie
            <input
              type="text"
              id="user"
              name="username"
              value={this.state.username}
              onChange={this.handleChanege}
            ></input>
            {this.state.errors.username && (
              <span>{this.messages.username_incorect}</span>
            )}
          </label>

          <label htmlFor="email">
            Twoje adres e mail
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChanege}
            ></input>
            {this.state.errors.email && (
              <span>{this.messages.email_incorect}</span>
            )}
          </label>

          <label htmlFor="password">
            Twoje hasło
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChanege}
            ></input>
            {this.state.errors.password && (
              <span>{this.messages.password_incorect}</span>
            )}
          </label>

          <label htmlFor="accept">
            <input
              type="checkbox"
              id="accept"
              name="accept"
              value={this.state.accept}
              checked={this.state.accept}
              onChange={this.handleChanege}
            />
            wyrażam zgodę XYZ
            {this.state.errors.accept && (
              <span>{this.messages.accept_incorect}</span>
            )}
          </label>
          <button>Zapisz się </button>
        </form>
        {this.state.message && <h2>{this.state.message}</h2>}
      </div>
    );
  }
}

export default App;
