import React from "react";
import {
  Dialog,
  Box,
  TextField,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { useState } from "react";
import { login as loginUser } from "../../service/profile";
import SignupPage from "./SignupPage";
import { useAuth } from "../../context/AuthProvider";
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
  &:hover {
    background-color: #6ba99a;
  };
`;
const OtpButton = styled(Button)`
  text-transform: none;
  background-color: #51875f;
  color: white;
  height: 30px;
  border-radius: 31px;
  margin-top: 6px;
  cursor: pointer;
  &:hover {
    background-color: #6ba99a;
  };
`;

const WraperLogin = styled(Box)`
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

const initialObjectLogin = {
  email: "",
  password: "",
};
const LoginDialog = ({ open, setOpen }) => {
  const [account, ToggleAccount] = useState(initialValue.login);
  const [loginForm, setLoginForm] = useState(initialObjectLogin);
  const { login: setAuthLogin } = useAuth();
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

  const onValueChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const LoginHandle = async () => {
    try {
      const responseData = await loginUser(loginForm);
      const responseUser =
        responseData?.user || responseData?.data?.user || responseData?.data;
      const responseToken =
        responseData?.accessToken || responseData?.data?.accessToken;

      setAuthLogin(responseUser, responseToken);
      setError(false);
      handleClose();
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} >
      <Component style={{ height :"fit-content", padding:"40px 0px",}} >
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
                <Typography style={{ textAlign: "center", marginTop: "20px" }}>
                New user? Create an account
                </Typography>
              </CreateAccount>
            </WraperLogin>
          ) : (
            <div>
             <SignupPage open={open} setOpen={setOpen} />
             <Typography style={{ textAlign: "center", marginTop: "20px" }}>OR
              <CreateAccount onClick={(e) => toggleSignup(e)}>
                Already have an account? Login
              </CreateAccount>
              </Typography>
            </div>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};
export default LoginDialog;
