import React, { useState } from "react";
import type { NextPage } from "next";
import { Input } from "../components/base";
import { useAuth } from "../contexts";

const Login: NextPage = () => {
  type InitialState = {
    email: string;
    password: string;
  };

  const initialState: InitialState = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initialState);

  const { login } = useAuth();

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const field = event.target.name;
    setValues((state) => ({
      ...state,
      [field]: event.target.value,
    }));
  };

  const onSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    await login(values);
    console.log(await login(values));
    event?.preventDefault();
  };

  return (
    <div className="inline-grid">
      <h1 className="text-3xl font-bold underline">Login</h1>
      <form onSubmit={onSubmit}>
        <Input
          id="email"
          name="email"
          placeholder="email"
          onChange={onChange}
          type="text"
          value={values.email}
        />
        <Input
          id="password"
          name="password"
          placeholder="password"
          onChange={onChange}
          type="text"
          value={values.password}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
