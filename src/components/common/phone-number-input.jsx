import React from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import styled from "@emotion/styled";

const StyledPhoneInput = styled(PhoneInputWithCountry)(({ theme }) => ({
  "--border-primary": "#0000003B",

  display: "flex",
  alignItems: "center",
  border: "1px solid var(--border-primary)",
  borderRadius: "4px",
  overflow: "hidden",
  height: "100%",

  "&.PhoneInput--disabled": {
    opacity: 0.7,
    cursor: "not-allowed",
  },

  "& .PhoneInputCountry": {
    backgroundColor: "transparent",
    padding: "0 8px",
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid var(--border-primary)",
  },

  "& .PhoneInputCountryIcon": {
    width: "24px",
    height: "18px",
    boxShadow: "0 0 0 1px var(--PhoneInputCountryFlag-borderColor)",
    borderRadius: "2px",
  },

  "& .PhoneInputCountrySelectArrow": {
    color: "var(--PhoneInputCountrySelectArrow-color)",
    opacity: "var(--PhoneInputCountrySelectArrow-opacity, 0.5)",
    marginLeft: "12px",
  },

  "& .PhoneInputInput": {
    flex: 1,
    minWidth: 0,
    border: "none",
    outline: "none",
    fontSize: "1rem",
    padding: "8px",
    background: "transparent",
    color: "inherit",
    fontFamily: "inherit",
    height: "100%",
    boxSizing: "border-box",
  },
}));

const PhoneInput = ({
  name,
  control,
  label = "Phone Number",
  defaultValue = "",
  rules = {},
  ...props
}) => {
  return (
    <div className="phone-input-wrapper">
      <StyledPhoneInput
        name={name}
        defaultValue={defaultValue}
        control={control}
        limitMaxLength={true}
        rules={rules}
        {...props}
      />
    </div>
  );
};

export default PhoneInput;
