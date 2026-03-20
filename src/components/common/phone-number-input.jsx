import React from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"
import "react-phone-number-input/style.css";

const PhoneInput = ({
  name,
  control,
  label = "Phone Number",
  defaultValue = "",
  rules = {}, // Added for easy validation pass-through
  ...props
}) => {
  return (
      <PhoneInputWithCountry
        name={name}
        defaultValue={defaultValue}
        control={control}
        limitMaxLength={true}
        rules={rules}
        {...props}
        label={label}
      />
  );
};

export default PhoneInput;
