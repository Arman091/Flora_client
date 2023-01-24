import React from "react";
import {
  Dialog,
  Box,
  TextField,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { useState, useContext } from "react";
import { authenticateLogin, authenticateSignUp } from "../../service/Api";
import { DataContext } from "../../context/DataProvider";
const Component = styled(Box)`
  height: 99vh;
  width: 80vh;
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background-color: #51875f;
  color: white;
  height: 30px;
  border-radius: 31px;
  margin-top: 6px;
  margin-bottom: 10px;
  cursor: pointer;
`;
const SignupButton = styled(Button)`
  text-transform: none;
  background-color:  #51875f;
  color: white;
  height: 30px;
  border-radius: 31px;
  margin-top: 6px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const OtpButton = styled(Button)`
  text-transform: none;
  background-color:  #51875f;
  color: white;
  height: 30px;
  border-radius: 31px;
  margin-top: 6px;
  cursor: pointer;
`;

const WraperLogin = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  width: 100%;
  background-color: white;
`;
const WraperSignup = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  width: 100%;
  background-color: white;
`;

const Text = styled(Typography)`
  font-size: 12px;
  margin-top: 6px;
`;

const CreateAccount = styled(Typography)`
  font-size: 14px;
  margin-top: 6px;
  text-decoration: underline;
  cursor: pointer;
  color: blue;
`;

const Error = styled(Typography)`
  color: red;
  font-size: 12px;
  line-height: 0;
  margin-top: 5px;
  font-weight: 600;
`;

const initialValue = {
  login: {
    view: "login",
  },
  signup: {
    view: "signup",
  },
};

const initialObject = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  phone: "",
  password: "",
};

const initialObjectLogin = {
  email: "",
  password: "",
};
const LoginDialog = ({ open, setOpen }) => {
  const [account, ToggleAccount] = useState(initialValue.login);
  const [signup, setSignup] = useState(initialObject);
  const [login, setlogin] = useState(initialObjectLogin);
  const { setAccountName,setLoggedIn } = useContext(DataContext);
  const [error, setError] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const toggleSignup = () => {
    ToggleAccount(initialValue.login);
  };
  const toggleLogin = () => {
    ToggleAccount(initialValue.signup);
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await authenticateSignUp(signup);

     if (!response) return;
    handleClose();
    setError(false);
    setAccountName(signup.firstName);
    setLoggedIn(true);
  };

  const onValueChange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const LoginHandle = async () => {
    let response = await authenticateLogin(login);
    console.log(response);
    if (response.status === 200) {
      handleClose();
      setError(false);
      setAccountName(response.data.data.firstName);
      setLoggedIn(true);
    } else {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} >
      <Component >
        <Box style={{ display: "flex", height: "100%" }}>
          {account.view === "login" ? (
            <WraperLogin>
              <TextField
                variant="standard"
                onChange={(e) => onValueChange(e)}
                label="Enter Your Email"
                name="email"
              />

              {error && <Error>Please enter valid email or Password</Error>}

              <TextField
                variant="standard"
                onChange={(e) => onValueChange(e)}
                label="Enter Your Password"
                name="password"
                style={{marginTop:"35px"}}
              />
              <Text>Agree Floral Cart's Terms And Conditions?</Text>
              <LoginButton onClick={() => LoginHandle()}>Login</LoginButton>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <OtpButton>Request OTP</OtpButton>
              <CreateAccount onClick={(e) => toggleLogin(e)}>
                New user? Create an account
              </CreateAccount>
            </WraperLogin>
          ) : (
            <WraperSignup>
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                label="Enter FirstName"
                name="firstName"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                label="Enter LastName"
                name="lastName"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                label="Enter UserName"
                name="userName"
              />
              <TextField
                type="email"
                variant="standard"
                onChange={(e) => onInputChange(e)}
                label="Enter Email"
                name="email"
              />
              <TextField
                type="number"
                variant="standard"
                onChange={(e) => onInputChange(e)}
                label="Enter Phone Number"
                name="phone"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                label="Enter Password"
                name="password"
              />
              <SignupButton onClick={() => signupUser()}>Continue</SignupButton>
              <CreateAccount onClick={(e) => toggleSignup(e)}>
                Have an Account? Click here to login
              </CreateAccount>
            </WraperSignup>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};
export default LoginDialog;
