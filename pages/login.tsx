import React, { useState } from "react";
import type { NextPage } from "next";
import { Input } from "../components/base";
import { useAuth } from "../contexts";
import { makeStyles } from "@material-ui/styles";
import Container from "@mui/material/Container";
import { PURE_WHITE, METALLIC_SUNBURST, RICH_BLACK_FOGRA } from "../src/colors";

const Login: NextPage = () => {
  type InitialState = {
    email: string;
    password: string;
  };

  const initialState: InitialState = {
    email: "",
    password: "",
    errorMessage: "",
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
      errorMessage: "",
    }));
  };

  const onSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const { email, password } = values;
    if (!email || !password) {
      setValues((state) => ({
        ...state,
        errorMessage: "Please input all fields",
      }));
      return;
    }

    try {
      await login({ email, password });
    } catch (error) {
      setValues((state) => ({
        ...state,
        errorMessage: "Please check your credentials and try again.",
      }));
    }
  };

  const useStyles = makeStyles(() => ({
    root: {
      width: "100%",
      display: "flex",
      marginTop: "10%",
    },
    box: {
      backgroundColor: METALLIC_SUNBURST,
      height: "40vh",
      paddingLeft: "10%",
      paddingRight: "10%",
      textAlign: "center",
    },
    input: {
      marginTop: "3%",
      height: "30px",
    },
    inputWrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    button: {
      width: "fit-content",
      marginTop: "10%",
      height: "42px",
      width: "80px",
      borderRadius: "5px",
      backgroundColor: PURE_WHITE,
      textColor: METALLIC_SUNBURST,
    },
    title: {
      fontSize: "28px",
      color: PURE_WHITE,
    },
    errorMessage: {
      color: RICH_BLACK_FOGRA,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <div className={classes.box}>
          <h1 className={classes.title}>Login</h1>
          <form className={classes.form} onSubmit={onSubmit}>
            <div className={classes.inputWrapper}>
              <Input
                id="email"
                name="email"
                placeholder="email"
                styles={classes.input}
                onChange={onChange}
                type="email"
                value={values.email}
              />
              <Input
                id="password"
                name="password"
                styles={classes.input}
                placeholder="password"
                onChange={onChange}
                type="password"
                value={values.password}
              />
            </div>
            <button className={classes.button} type="submit">
              Submit
            </button>
            {values.errorMessage && (
              <p className={classes.errorMessage}>{values.errorMessage}</p>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
