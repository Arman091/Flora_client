import React from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import "./phone-input.css";

const PhoneInput = ({
  name,
  control,
  label = "Phone Number",
  defaultValue = "",
  rules = {},
  error,
  ...props
}) => {
  return (
    <div
      className={`phone-input-wrapper${error ? " phone-input-wrapper--error" : ""}`}
    >
      <PhoneInputWithCountry
        name={name}
        defaultValue={defaultValue}
        control={control}
        limitMaxLength={true}
        rules={rules}
        {...props}
      />
      {error && (
        <p className="mt-1 ml-1.5 text-xs font-semibold text-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
