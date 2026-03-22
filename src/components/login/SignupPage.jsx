import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { parsePhoneNumber, formatPhoneNumber } from "react-phone-number-input";

import FormInput from "../common/form-input";
import PhoneInput from "../common/phone-number-input";
import { signupSchema } from "../../validations/signupSchema.js";
import FORM_KEYS from "../../constants/constants.js";
import en from "../../locales/en.json";
import { ALLOWED_COUNTRIES, DEFAULT_COUNTRY, LOGO } from "../../lib/config.js";

// Optional: extract signup copy from locales
const t = en.signup;

export const SignupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });


  const onSubmit = async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    console.log(values,"values")

    const phoneNumber = values.phone ? parsePhoneNumber(values.phone) : undefined;

    const dataToSend = {
      ...values,
      countryCode: phoneNumber?.country,
      countryCallingCode: phoneNumber?.countryCallingCode,
      formattedPhone: phoneNumber?.nationalNumber,
    };

    console.log(dataToSend,"dataToSend")
    try {
      // Adjust URL to match your backend signup endpoint
      const response = await axios.post("/signup", dataToSend);

      if (response?.status >= 200 && response?.status < 300) {
        setSubmitSuccess(t?.success?.accountCreated || "Account created successfully.");
        reset();
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message ||
          "Unable to create account. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "var(--background-primary)",
        px: 2,
        py:0,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: "var(--color-white)",
          }}
        >
          <Box mb={3} textAlign="center">
            {LOGO && (
              <Box sx={{ mb: 2 }}>
                <img
                  src={LOGO}
                  alt="Application Logo"
                  style={{ maxWidth: "150px", height: "auto" }}
                />
              </Box>
            )}
            <Typography
              variant="h5"
              sx={{ color: "var(--color-text-primary)", fontWeight: 600, marginTop: "5px", marginBottom: "10px" }}
             >
              {t?.title}
            </Typography>
            {t?.subtitle && (
              <Typography
                variant="body2"
                sx={{ color: "var(--color-text-secondary)", mt: 1 }}
              >
                {t.subtitle}
              </Typography>
            )}
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormInput
                  name={FORM_KEYS.FIRST_NAME}
                  control={control}
                  label={t?.labels?.firstName || "First Name"}
                  error={errors[FORM_KEYS.FIRST_NAME]}
                  tabIndex={1}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormInput
                  name={FORM_KEYS.LAST_NAME}
                  control={control}
                  label={t?.labels?.lastName || "Last Name"}
                  error={errors[FORM_KEYS.LAST_NAME]}
                  tabIndex={2}
                />
              </Grid>

              <Grid item xs={12}>
                <FormInput
                  name={FORM_KEYS.USER_NAME}
                  control={control}
                  label={t?.labels?.userName || "Username"}
                  error={errors[FORM_KEYS.USER_NAME]}
                  tabIndex={3}
                />
              </Grid>

              <Grid item xs={12}>
                <FormInput
                  name={FORM_KEYS.EMAIL}
                  control={control}
                  label={t?.labels?.email || "Email"}
                  error={errors[FORM_KEYS.EMAIL]}
                  type="email"
                  tabIndex={4}
                />
              </Grid>

              <Grid item xs={12}>
                <PhoneInput
                  name={FORM_KEYS.PHONE}
                  control={control}
                  countries={ALLOWED_COUNTRIES}
                  label={t?.labels?.phone || "Phone Number"}
                  error={errors[FORM_KEYS.PHONE]}
                  international      
                  defaultCountry={DEFAULT_COUNTRY}
                  tabIndex={5}
                />
              </Grid>

              <Grid item xs={12}>
                <FormInput
                  name={FORM_KEYS.PASSWORD}
                  control={control}
                  label={t?.labels?.password || "Password"}
                  error={errors[FORM_KEYS.PASSWORD]}
                  type="password"
                />
              </Grid>
            </Grid>

            {submitError && (
              <Box mt={2}>
                <Typography
                  variant="body2"
                  sx={{ color: "#d32f2f" }}
                >
                  {submitError}
                </Typography>
              </Box>
            )}

            {submitSuccess && (
              <Box mt={2}>
                <Typography
                  variant="body2"
                  sx={{ color: "#2e7d32" }}
                >
                  {submitSuccess}
                </Typography>
              </Box>
            )}

            <Box mt={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  bgcolor: "#51875f",
                  "&:hover": {
                    bgcolor: "#6ba99a",
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} sx={{ color: "var(--color-white)" }} />
                ) : (
                  t?.labels?.submit || "Sign Up"
                )}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignupPage;

// Example of code-splitting with React.lazy (to be used where you register routes):
// const SignupPage = React.lazy(() => import("./components/login/SignupPage"));
// <Suspense fallback={<div>Loading...</div>}>
//   <SignupPage />
// </Suspense>
