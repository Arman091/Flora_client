import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useId } from "react";
import { login as loginUser } from "../../service/profile";
import SignupPage from "./SignupPage";
import { useAuth } from "../../context/AuthProvider";
import Button from "../common/button";

const StandardField = ({ label, name, onChange }) => {
  const inputId = useId();
  return (
    <div className="relative w-full">
      <input
        id={inputId}
        name={name}
        onChange={onChange}
        placeholder=" "
        className="peer h-field w-full border-0 border-b border-border-primary bg-transparent px-2.5 pb-1.5 pt-5 text-sm text-text-primary outline-none focus:border-focus"
      />
      <label
        htmlFor={inputId}
        className="pointer-events-none absolute left-2 top-1.5 text-xs text-text-label transition-all peer-placeholder-shown:top-[12px] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-focus peer-[:not(:placeholder-shown)]:top-[-5px] peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
};

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
      const responseRefreshToken =
        responseData?.refreshToken || responseData?.data?.refreshToken;

      setAuthLogin(responseUser, responseToken, responseRefreshToken);
      setError(false);
      handleClose();
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-[1300] rounded-[12px]">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-8">
        <DialogPanel className="flex max-h-[calc(100%-4rem)] w-[80vh] max-w-[600px] flex-col bg-white py-10">
          <DialogTitle className="sr-only">Login</DialogTitle>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="flex">
            {account.view === "login" ? (
              <div className="flex w-full flex-col bg-white px-[35px] py-[25px]">
                <StandardField
                  label="Enter Your Email"
                  name="email"
                  onChange={(e) => onValueChange(e)}
                />

                {error && (
                  <p className="mt-[5px] text-xs font-semibold leading-none text-error">
                    Please enter valid email or Password
                  </p>
                )}

                <div className="mt-[35px]">
                  <StandardField
                    label="Enter Your Password"
                    name="password"
                    onChange={(e) => onValueChange(e)}
                  />
                </div>
                <p className="mt-1.5 text-xs">
                  Agree Floral Cart's Terms And Conditions?
                </p>
                <Button
                  onClick={() => LoginHandle()}
                  className="mt-1.5 mb-2.5 h-[30px] rounded-[31px]"
                >
                  Login
                </Button>
                <p className="text-center">OR</p>
                <Button className="mt-1.5 h-[30px] rounded-[31px]">
                  Request OTP
                </Button>
                <button
                  type="button"
                  onClick={(e) => toggleLogin(e)}
                  className="mt-1.5 cursor-pointer text-sm text-blue underline"
                >
                  <span className="mt-5 block text-center">
                    New user? Create an account
                  </span>
                </button>
              </div>
            ) : (
              <div>
                <SignupPage open={open} setOpen={setOpen} />
                <p className="mt-5 text-center">
                  OR
                  <button
                    type="button"
                    onClick={(e) => toggleSignup(e)}
                    className="mt-1.5 w-full block cursor-pointer text-center text-sm text-blue underline"
                  >
                    Already have an account? Login
                  </button>
                </p>
              </div>
            )}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
export default LoginDialog;
