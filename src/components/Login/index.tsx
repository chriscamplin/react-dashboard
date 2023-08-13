import React, { Component } from "react";
import { Button, Form, Input, Label, Row } from "reactstrap";
import "./styles.css";

interface ILoginState {
  username: string;
  password: string;
  submitEnabled: boolean;
}

export default class Login extends Component<{}, ILoginState> {
  state = {
    username: "",
    password: "",
    submitEnabled: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log("handleChange", name, value);

    if (!name || !value) return;
    this.setState(
      (prevState) => ({
        ...prevState,
        [name]: value,
      }),
      this.setSubmitEnabled
    );
  };

  setSubmitEnabled() {
    this.setState({
      submitEnabled:
        this.state.username.length > 0 && this.state.password.length > 0,
    });
  }

  handleSubmit = () => {
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      console.log("handleSubmit", this.state.username, this.state.password);

      this.setState({ submitEnabled: false });
    }
  };

  render() {
    return (
      <div className="container flex-layout">
        <h1>Login</h1>
        <p>Welcome user</p>
        <div className="row">
          <div className="flex-layout">
            <Form
              action="/dashboard"
              onSubmit={this.handleSubmit}
              className="flex-layout"
            >
              <Row>
                <div className="grid-layout">
                  <Label for="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="Enter your username"
                  />
                </div>
                <div className="grid-layout">
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Enter your password"
                  />
                </div>
              </Row>
              <Button type="submit" disabled={!this.state.submitEnabled}>
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
