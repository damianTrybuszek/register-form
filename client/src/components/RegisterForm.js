import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Typography } from "@mui/material";
import AlertDialog from "./AlertDialog";
import Button from "@mui/material/Button";

const RegisterForm = () => {
  let navigate = useNavigate();

  const [enteredLogin, setEnteredLogin] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRepeatedPassword, setEnteredRepeatedPassword] = useState("");
  const [areTermsAccepted, setTermsAccepted] = useState(false);
  const [enteredLoginIsValid, setEnteredLoginIsValid] = useState(false);
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false);
  const [enteredRepeatedPasswordIsValid, setEnteredRepeatedPasswordIsValid] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isPasswordMatching, setIsPasswordMatching] = useState(false);

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
  }

  const loginInputBlurHandler = (event) => {
    setEnteredLoginIsValid(event.target.value.trim() !== "");
  };

  const passwordInputBlurHandler = (event) => {
    setEnteredPasswordIsValid(event.target.value.trim() !== "");
  }

  const passwordRepeatedInputBlurHandler = (event) => {
    setEnteredRepeatedPasswordIsValid(event.target.value.trim() !== "" && enteredRepeatedPassword === enteredPassword);

  };

  const termsChangeHandler = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const checkInputs = () => {
    setEnteredLoginIsValid(enteredLogin.trim() !== "");
    setEnteredPasswordIsValid(enteredPassword.trim() !== "");
    setIsPasswordMatching(enteredPassword === enteredRepeatedPassword && enteredRepeatedPasswordIsValid && enteredPasswordIsValid);
    setFormIsValid(enteredLoginIsValid && isPasswordMatching);
  }

  const clearInputs = () => {
      setEnteredLogin("");
      setEnteredPassword("");
      setEnteredRepeatedPassword("");
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault(); //to prevent sending HTTP request instantly, page would be reloaded
    checkInputs()

    if (formIsValid) {
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
          navigate("/");
        }
      });
    }
    setShowDialog(true);
    // TODO: Upewnij się, że na pewno chcesz czyścić inputy po wprowadzeniu błędnych danych. UXowo to może być wkurwiające
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

          <Typography variant="h5" paragraph={true}>
            Terms of registration:
          </Typography>
          <Typography variant="body1" paragraph={true}>
            Your username and password which will be encrypted will be stored in
            the database related to this site. Be aware about your sensitive
            data.
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
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="I accept the terms of registration."
                  onChange={termsChangeHandler}
                  value={areTermsAccepted}
                />
              </Form.Group>
              <Button variant="contained" type="submit" style={{width:'100%', background: "#6aa84f",
                textColor: "#ffffff"}}>Register</Button>
            </Form>
          </div>
        </Col>
      </Row>
      <Row>
        <Typography variant="body2" marginTop={20} marginBottom={5}>
          Copyright: Damian Trybuszek
        </Typography>
      </Row>

    {showDialog &&
        <AlertDialog name={enteredLogin} showDialog={showDialog} setShowDialog={setShowDialog}/>
    }

    </Container>

  );
}

export default RegisterForm;
