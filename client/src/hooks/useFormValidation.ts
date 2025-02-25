import { useState, useCallback } from "react";

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    custom?: (value: unknown) => boolean;
    message?: string;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation<T extends Record<string, unknown>>(
  initialState: T,
  validationRules: ValidationRules
) {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = useCallback(
    (data: T): boolean => {
      const newErrors: ValidationErrors = {};
      let isValid = true;

      (Object.keys(validationRules) as Array<keyof T>).forEach((key) => {
        const value = data[key];
        const rules = validationRules[key as string];

        if (!rules) return;

        if (rules.required && !value) {
          newErrors[key as string] = rules.message || "This field is required";
          isValid = false;
        } else if (value) {
          if (rules.pattern && !rules.pattern.test(String(value))) {
            newErrors[key as string] =
              rules.message || "This field has an invalid format";
            isValid = false;
          }

          if (rules.minLength && String(value).length < rules.minLength) {
            newErrors[key as string] =
              rules.message ||
              `This field must be at least ${rules.minLength} characters`;
            isValid = false;
          }

          if (rules.maxLength && String(value).length > rules.maxLength) {
            newErrors[key as string] =
              rules.message ||
              `This field must be no more than ${rules.maxLength} characters`;
            isValid = false;
          }

          if (rules.min !== undefined && Number(value) < rules.min) {
            newErrors[key as string] =
              rules.message || `Value must be at least ${rules.min}`;
            isValid = false;
          }

          if (rules.max !== undefined && Number(value) > rules.max) {
            newErrors[key as string] =
              rules.message || `Value must be no more than ${rules.max}`;
            isValid = false;
          }

          if (rules.custom && !rules.custom(value)) {
            newErrors[key as string] =
              rules.message || "This field has an invalid value";
            isValid = false;
          }
        }
      });

      setErrors(newErrors);
      return isValid;
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (key: keyof T, value: T[keyof T]) => {
      setFormData((prev) => {
        const newData = { ...prev, [key]: value };
        validate(newData);
        return newData;
      });
    },
    [validate]
  );

  return {
    formData,
    errors,
    handleChange,
    validate: () => validate(formData),
    setFormData,
  };
}
