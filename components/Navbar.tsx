import React, { Dispatch } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Select, MenuItem } from "@material-ui/core";
import { BaseCurrency, State, updateBaseCurrencyAction } from "../src/types";
import { METALLIC_SUNBURST } from "../src/colors";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "50px",
    boxShadow: "none",
  },
  brand: {
    flexGrow: 1,
    fontSize: "1.5rem",
    color: METALLIC_SUNBURST,
    cursor: "pointer",
    fontWeight: "bold",
  },
}));

interface Props {
  dispatch: Dispatch<updateBaseCurrencyAction>;
  baseCurrency: BaseCurrency;
}

const Navbar: React.FC<Props> = ({ dispatch, baseCurrency }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root} color="transparent">
      <Toolbar variant="dense">
        <Link href="/">
          <p className={classes.brand}>Yuki</p>
        </Link>
        <Select
          defaultValue={baseCurrency}
          name="currency"
          onChange={(event) => {
            const { value }: { value: unknown } = event.target;
            dispatch({
              type: "UPDATE_BASE_CURRENCY",
              payload: value,
            });
          }}
        >
          <MenuItem value="JPY">JPY ¥</MenuItem>
          <MenuItem value="USD">USD $</MenuItem>
          <MenuItem value="GBP">GBP £</MenuItem>
          <MenuItem value="EUR">EUR €</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  );
};

export default connect((state: State) => state)(Navbar);
