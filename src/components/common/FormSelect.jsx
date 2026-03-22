// src/components/common/FormSelect.jsx
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

const FormSelect = ({
  name,
  control,
  label,
  error,
  options,
  defaultValue = "",
  ...selectProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl fullWidth error={!!error} size="small">
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} {...selectProps}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default FormSelect;