// src/components/common/FormSelect.jsx
import React, { useId } from "react";
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
  const selectId = useId();
  const errorId = `${selectId}-error`;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className="w-full">
          <label
            htmlFor={selectId}
            className="mb-1 block text-sm text-text-label"
          >
            {label}
          </label>
          <select
            {...field}
            {...selectProps}
            id={selectId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`h-field w-full rounded border bg-white px-2.5 text-sm text-text-primary outline-none ${
              error
                ? "border-error"
                : "border-border-primary focus:border-focus"
            }`}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && (
            <p
              id={errorId}
              className="mt-1 ml-1.5 text-xs font-semibold text-error"
            >
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default FormSelect;
