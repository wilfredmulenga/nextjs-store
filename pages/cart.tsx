import React from "react";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Button } from "@material-ui/core";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import { useProducts } from "../contexts";
import { METALLIC_SUNBURST } from "../src/colors";
import { makeStyles } from "@material-ui/styles";

const Cart: NextPage = () => {
  const { orders } = useProducts();

  const currencyRates = {
    rates: {
      AUD: 1.566015,
      CAD: 1.560132,
      CHF: 1.154727,
      CNY: 7.827874,
      GBP: 0.882047,
      JPY: 132.360679,
      USD: 1.23396,
    },
  };

  const baseCurrency = "USD";

  const useStyles = makeStyles(() => ({
    root: {
      width: "100%",
      maxWidth: "1000px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    button: {
      color: METALLIC_SUNBURST,
    },
    noOrdersPlacedWrapper: {
      height: "60vh",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      {orders.length === 0 ? (
        <div className={classes.noOrdersPlacedWrapper}>
          <p>No orders placed yet,.</p>
          <Link href="/">
            <Button className={classes.button}>Return</Button>
          </Link>
        </div>
      ) : (
        orders.map((order, key) => {
          return (
            <CartItem
              key={key}
              order={order}
              currencyRates={currencyRates}
              baseCurrency={baseCurrency}
            />
          );
        })
      )}
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Cart;
