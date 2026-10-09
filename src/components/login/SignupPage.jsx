import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useFcm } from "../../context/FcmProvider.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumber } from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import FormInput from "../common/form-input";
import PhoneInput from "../common/phone-number-input";
import FormSelect from "../common/FormSelect";
import Button from "../common/button";
import { signupSchema } from "../../validations/signupSchema.js";
import FORM_KEYS from "../../constants/constants.js";
import en from "../../locales/en.json";
import { ALLOWED_COUNTRIES, DEFAULT_COUNTRY, LOGO } from "../../lib/config.js";
import { signUp } from "../../service/profile.js";
import { USER_DASHBOARD } from "../../constants/routes";

// Optional: extract signup copy from locales
const t = en.signup;

const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "regular", label: "Regular User" },
];

export const SignupPage = ({ setOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const { token } = useFcm();
  const { login } = useAuth();
  const navigate = useNavigate();

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

    const phoneNumber = values.phone ? parsePhoneNumber(values.phone) : undefined;

    const payload = {
      ...values,
      countryCode: phoneNumber?.country,
      countryCallingCode: phoneNumber?.countryCallingCode,
      formattedPhone: phoneNumber?.nationalNumber,
      deviceToken: token || "",
    };

    try {
      const responseData = await signUp(payload);
      const responseUser = responseData?.user || responseData?.data?.user || responseData?.data;
      const responseToken = responseData?.accessToken || responseData?.data?.accessToken;
      const responseRefreshToken = responseData?.refreshToken || responseData?.data?.refreshToken;

      login(responseUser, responseToken, responseRefreshToken);
      setSubmitSuccess(t?.success?.accountCreated || "Account created successfully.");
      reset();
      setOpen(false);
      navigate(USER_DASHBOARD);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to create account. Please try again later.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-0 items-center justify-center bg-bg-primary px-2">
      <div className="mx-auto w-full max-w-[600px] px-4">
        <div className="rounded-[12px] bg-white p-8 shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]">
          <div className="mb-8 text-center">
            {LOGO && (
              <div className="mb-5">
                <img
                  src={LOGO}
                  alt="Application Logo"
                  className="mx-auto h-auto max-w-[150px]"
                />
              </div>
            )}
            <h5 className="mt-[5px] mb-2.5 text-xl font-semibold text-text-primary">
              {t?.title}
            </h5>
            {t?.subtitle && (
              <p className="mt-2 text-sm text-text-secondary">{t.subtitle}</p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                name={FORM_KEYS.FIRST_NAME}
                control={control}
                label={t?.labels?.firstName || "First Name"}
                error={errors[FORM_KEYS.FIRST_NAME]}
                tabIndex={1}
              />

              <FormInput
                name={FORM_KEYS.LAST_NAME}
                control={control}
                label={t?.labels?.lastName || "Last Name"}
                error={errors[FORM_KEYS.LAST_NAME]}
                tabIndex={2}
              />

              <div className="sm:col-span-2">
                <FormInput
                  name={FORM_KEYS.USER_NAME}
                  control={control}
                  label={t?.labels?.userName || "Username"}
                  error={errors[FORM_KEYS.USER_NAME]}
                  tabIndex={3}
                />
              </div>

              <div className="sm:col-span-2">
                <FormInput
                  name={FORM_KEYS.EMAIL}
                  control={control}
                  label={t?.labels?.email || "Email"}
                  error={errors[FORM_KEYS.EMAIL]}
                  type="email"
                  tabIndex={4}
                />
              </div>

              <div className="sm:col-span-2">
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
              </div>

              <div className="sm:col-span-2">
                <FormInput
                  name={FORM_KEYS.PASSWORD}
                  control={control}
                  label={t?.labels?.password || "Password"}
                  error={errors[FORM_KEYS.PASSWORD]}
                  type="password"
                />
              </div>

              <div className="sm:col-span-2">
                <FormSelect
                  name={FORM_KEYS.ROLE}
                  control={control}
                  label="Role"
                  error={errors[FORM_KEYS.ROLE]}
                  options={roleOptions}
                  tabIndex={6}
                />
              </div>
            </div>

            {submitError && (
              <div className="mt-4">
                <p className="text-sm text-error">{submitError}</p>
              </div>
            )}

            {submitSuccess && (
              <div className="mt-4">
                <p className="text-sm text-success-dark">{submitSuccess}</p>
              </div>
            )}

            <div className="mt-6">
              <Button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="w-full rounded-lg"
              >
                {isSubmitting ? (
                  <Loader2 size={20} className="animate-spin text-white" />
                ) : (
                  t?.labels?.submit || "Sign Up"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
