import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Typography } from "@mui/material";
import AlertDialog from "./AlertDialog";
import Button from "@mui/material/Button";

const RegisterForm = () => {
  const [enteredLogin, setEnteredLogin] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRepeatedPassword, setEnteredRepeatedPassword] = useState("");
  const [enteredLoginIsValid, setEnteredLoginIsValid] = useState(false);
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false);
  const [enteredRepeatedPasswordIsValid, setEnteredRepeatedPasswordIsValid] =
    useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);
  const [isPasswordMatching, setIsPasswordMatching] = useState(false);
  const [name, setName] = useState("");

  const enteredLoginChangeHandler = (event) => {
    setEnteredLogin(event.target.value);
    setEnteredLoginIsValid(enteredLogin.trim() !== "");
  };

  const enteredPasswordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setEnteredPasswordIsValid(enteredPassword.trim() !== "");
  };

  const enteredPasswordRepeatedChangeHandler = (event) => {
    setEnteredRepeatedPassword(event.target.value);
    setEnteredRepeatedPasswordIsValid(enteredRepeatedPassword.trim() !== "");
  };

  const loginInputBlurHandler = (event) => {
    setEnteredLoginIsValid(event.target.value.trim() !== "");
  };

  const passwordInputBlurHandler = (event) => {
    setEnteredPasswordIsValid(event.target.value.trim() !== "");
  };

  const passwordRepeatedInputBlurHandler = (event) => {
    setEnteredRepeatedPasswordIsValid(
      event.target.value.trim() !== "" &&
        enteredRepeatedPassword === enteredPassword
    );
  };



  const checkInputs = () => {
    setEnteredLoginIsValid(enteredLogin.trim() !== "");
    setEnteredPasswordIsValid(enteredPassword.trim() !== "");
    setIsPasswordMatching(
      enteredPassword === enteredRepeatedPassword &&
        enteredRepeatedPasswordIsValid &&
        enteredPasswordIsValid
    );
    setFormIsValid(enteredLoginIsValid && isPasswordMatching);
  };

  const clearInputs = () => {
    setEnteredLogin("");
    setEnteredPassword("");
    setEnteredRepeatedPassword("");
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault(); //to prevent sending HTTP request instantly, page would be reloaded
    checkInputs();

    if (formIsValid) {
      console.log(enteredLogin)
      console.log(enteredPassword)
      fetch("http://localhost:8080/api/register", {
        method: "POST",
        body: JSON.stringify({
          username: enteredLogin,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          setIsSuccess(true);
          setName(enteredLogin);
        } else {
          setIsSuccess(false);
        }
      });
    }
    setShowDialog(true);
    clearInputs();
  };

  return (
    <Container>
      <Row>
        <Typography variant="h3" marginTop="5%">
          Welcome to this register page!
        </Typography>
      </Row>
      <Row>
        <Col>
          <Typography variant="h5" marginTop={5}>
            To register the new user successfully your credentials should meet
            criteria like that:
          </Typography>
          <Typography variant="body1" marginTop={4} paragraph={true}>
            The username field accepts alpha-numeric values only.
          </Typography>
          <Typography variant="body1" paragraph={true}>
            The username length is no less than 5 characters.
          </Typography>
          <Typography variant="body1" paragraph={true}>
            The username is not already registered.
          </Typography>
          <Typography variant="body1" paragraph={true}>
            The password has a minimum length of 8 characters and contains at
            least 1 number, 1 uppercase, and 1 lowercase character.
          </Typography>
        </Col>
        <Col>
          <div className="formBackground">
            <Form className="formWidth" onSubmit={formSubmissionHandler}>
              <Form.Group className="mb-3" controlId="formBasicNickName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  size="sm"
                  type="NickName"
                  placeholder="Please insert Username"
                  onChange={enteredLoginChangeHandler}
                  onBlur={loginInputBlurHandler}
                  value={enteredLogin}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  placeholder="Please insert password"
                  onChange={enteredPasswordChangeHandler}
                  onBlur={passwordInputBlurHandler}
                  value={enteredPassword}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPasswordRepeated"
              >
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  placeholder="Repeat password"
                  onChange={enteredPasswordRepeatedChangeHandler}
                  onBlur={passwordRepeatedInputBlurHandler}
                  value={enteredRepeatedPassword}
                />
              </Form.Group>
              <Button
                variant="contained"
                type="submit"
                style={{
                  width: "100%",
                  background: "#6aa84f",
                  textColor: "#ffffff",
                }}
              >
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      <Row>
        <Typography variant="body2" marginTop={20} marginBottom={5}>
          Copyright: Damian Trybuszek
        </Typography>
      </Row>

      {showDialog && (
        <AlertDialog
          name={name}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          isSuccess={isSuccess}
        />
      )}
    </Container>
  );
};

export default RegisterForm;
