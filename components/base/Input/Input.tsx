import React from "react";

type Props = {
  maxLength?: number;
  minLength?: number;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type: "text" | "url" | "email" | "tel" | "password";
  value?: string;
  styles: Record<string, unknown>;
};

const Input: React.FC<Props> = ({
  maxLength,
  minLength,
  name,
  onBlur,
  onChange,
  placeholder,
  required = false,
  type,
  value,
  styles,
}) => (
  <input
    id={name}
    className={styles}
    minLength={minLength}
    maxLength={maxLength}
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    type={type}
    value={value}
  />
);

export default Input;
