import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { RICH_BLACK_FOGRA, METALLIC_SUNBURST } from "../src/colors";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
    backgroundColor: RICH_BLACK_FOGRA,
    height: "80px",
  },
  social: {
    color: METALLIC_SUNBURST,
  },
  brand: {
    color: METALLIC_SUNBURST,
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));
const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Link href="/">
          <p className={classes.brand}>Yuki</p>
        </Link>
      </div>
      <div>
        <p className={classes.social}>Facebook | Twitter | Instagram</p>
      </div>
    </div>
  );
};

export default Footer;
