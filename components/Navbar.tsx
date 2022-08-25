import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../contexts";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { AppBar, Toolbar, Select, MenuItem } from "@material-ui/core";
import { BaseCurrency } from "../src/types";
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
  baseCurrency: BaseCurrency;
}

const Navbar: React.FC<Props> = ({ baseCurrency = "USD" }) => {
  const classes = useStyles();
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { isAuthenticated } = useAuth();

  const handleClose = () => {
    if (isAuthenticated) {
      // TODO: logout
    } else {
      router.push("/login");
    }
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.root} color="transparent">
        <Toolbar variant="dense">
          <Link href="/">
            <p className={classes.brand}>Yuki</p>
          </Link>
          <Select
            defaultValue={baseCurrency}
            name="currency"
            onChange={() => {}}
          >
            <MenuItem value="JPY">JPY ¥</MenuItem>
            <MenuItem value="USD">USD $</MenuItem>
            <MenuItem value="GBP">GBP £</MenuItem>
            <MenuItem value="EUR">EUR €</MenuItem>
          </Select>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {isAuthenticated ? "Logout" : "Login"}
              </MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
