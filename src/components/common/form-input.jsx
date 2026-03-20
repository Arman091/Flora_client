// src/components/common/FormInput.jsx
import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

const FormInput = ({
  name,
  control,
  label,
  error,
  defaultValue = "",
  ...textFieldProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          error={!!error}
          helperText={error?.message || ""}
          variant="outlined"
          size="small"
          {...textFieldProps}
        />
      )}
    />
  );
};

export default FormInput;