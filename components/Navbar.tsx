import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../contexts";
import { useProducts } from "../contexts";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import CartBadge from "./base/CartBadge/CartBadge";
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
  cartBadge: {
    paddingLeft: "22px",
    paddingRight: "22px",
  },
}));

interface Props {
  baseCurrency: BaseCurrency;
}

const Navbar: React.FC<Props> = () => {
  const classes = useStyles();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const { orderCount, baseCurrency, changeBaseCurrency } = useProducts();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    if (isAuthenticated) {
      logout();
    } else {
      router.push("/login");
    }
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
            defaultValue={"USD"}
            name="currency"
            onChange={(event) => changeBaseCurrency(event.target.value)}
          >
            <MenuItem value="JPY">JPY ¥</MenuItem>
            <MenuItem value="USD">USD $</MenuItem>
            <MenuItem value="GBP">GBP £</MenuItem>
            <MenuItem value="EUR">EUR €</MenuItem>
          </Select>
          <div
            className={classes.cartBadge}
            onClick={() => {
              router.push("/cart");
            }}
          >
            <CartBadge count={orderCount} />
          </div>
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
              <MenuItem onClick={handleLogin}>
                {isAuthenticated ? "Logout" : "Login"}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
