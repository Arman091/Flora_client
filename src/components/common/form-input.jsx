// src/components/common/FormInput.jsx
import React, { useId } from "react";
import { Controller } from "react-hook-form";

const FormInput = ({
  name,
  control,
  label,
  error,
  defaultValue = "",
  placeholder = "",
  ...inputProps
}) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className="relative w-full">
         <label
            htmlFor={inputId}
            className="text-text-label text-sm "
          >
            {label}
          </label>
          <input
            {...field}
            {...inputProps}
            id={inputId}
            placeholder={placeholder || " "}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`peer h-field w-full rounded border bg-white px-2.5 pb-1.5 pt-2 text-sm text-text-primary outline-none transition-colors ${
              error
                ? "border-error focus:border-error"
                : "border-border-primary focus:border-focus"
            }`}
          />
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

export default FormInput;
