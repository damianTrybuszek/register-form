import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container } from "react-bootstrap";
import RegisterButton from "./RegisterButton";
import { Col, Row } from "react-bootstrap";
import { Typography } from "@mui/material";
import { responsiveProperty } from "@mui/material/styles/cssUtils";
import AlertDialog from "./AlertDialog";

export default function RegisterForm() {
  const [enteredLogin, setEnteredLogin] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRepeatedPassword, setEnteredRepeatedPassword] = useState("");
  const [areTermsAccepted, setTermsAccepted] = useState(false);

  const [enteredLoginIsValid, setEnteredLoginIsValid] = useState(false);
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false);
  const [enteredRepeatedPasswordIsValid, setEnteredRepeatedPasswordIsValid] =
    useState(false);

    const [showDialog, setShowDialog] = useState(false);

  let navigate = useNavigate();
  let formIsValid = false;
  let isPasswordMatching = false;

  const enteredLoginChangeHandler = (event) => {
    setEnteredLogin(event.target.value);

    if (enteredLogin.trim() !== "") {
      setEnteredLoginIsValid(true);
      return;
    }
  };

  const enteredPasswordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    if (enteredPassword.trim() !== "") {
      setEnteredPasswordIsValid(true);
      return;
    }
  };

  const enteredPasswordRepeatedChangeHandler = (event) => {
    setEnteredRepeatedPassword(event.target.value);

    if (enteredRepeatedPassword.trim() !== "") {
      setEnteredRepeatedPasswordIsValid(true);
      return;
    }
  };

  const loginInputBlurHandler = (event) => {
    if (event.target.value.trim() === "") {
      setEnteredLoginIsValid(false);
    }
  };

  const passwordInputBlurHandler = (event) => {
    if (event.target.value.trim() === "") {
      setEnteredPasswordIsValid(false);
    }
  };

  const passwordRepeatedInputBlurHandler = (event) => {
    if (event.target.value.trim() === "") {
      setEnteredRepeatedPasswordIsValid(false);
    }
  };

  const submitHandler = () => {
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
          console.log(res);
          navigate("/");
        } else {
          setShowDialog(true)
          console.log(res.status);
        }
      });
    } else {
      console.log("error");
      
    }
  };

  const termsChangeHandler = () => {
    setTermsAccepted(!areTermsAccepted);
    console.log(areTermsAccepted);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault(); //to prevent sending HTTP request instantly, page would be reloaded

    if (enteredLogin.trim() === "") {
      setEnteredLoginIsValid(false);
      return;
    }

    setEnteredLoginIsValid(true);

    if (enteredPassword === "") {
      setEnteredPasswordIsValid(false);
      return;
    }

    if (
      enteredPassword == enteredRepeatedPassword &&
      enteredRepeatedPasswordIsValid &&
      enteredPasswordIsValid
    ) {
      isPasswordMatching = true;
    }

    if (enteredLoginIsValid && isPasswordMatching) {
      formIsValid = true;
      submitHandler();
    } else {
      console.log("error");
    }

    setEnteredLogin("");
    setEnteredPassword("");
    setEnteredRepeatedPassword("");
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
              <RegisterButton />
            </Form>
          </div>
        </Col>
      </Row>
      <Row>
        <Typography variant="body2" marginTop={20} marginBottom={5}>
          Copyright: Damian Trybuszek
        </Typography>
      </Row>

  {showDialog && <AlertDialog isSuccess={true} name={enteredLogin} setShowDialog/> }
      
    </Container>
    
  );
}
