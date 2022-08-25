import React from "react";
import Navbar from "../components/Navbar";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import ProductItem from "../components/ProductItem";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { METALLIC_SUNBURST, RICH_BLACK_FOGRA } from "../src/colors";
import { useProducts } from "../contexts";
import { useAuth } from "../contexts";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: "1000px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "80px",
  },
  title: {
    fontSize: "4rem",
    color: METALLIC_SUNBURST,
    margin: "10px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gap: "0px 0px",
    gridTemplateAreas: `"card-1 card-1 card-2"
      "card-1 card-1 card-3"
      ". . ."`,
  },
  "card-1": {
    gridArea: "card-1",
  },
  "card-2": {
    gridArea: "card-2",
  },
  "card-3": {
    gridArea: "card-3",
  },
  subTitle: {
    textAlign: "center",
    fontSize: "1.75rem",
    color: RICH_BLACK_FOGRA,
    paddingBottom: "40px",
  },
  sectionWrapper: {
    paddingBottom: "40px",
  },
  firstSection: {
    paddingBottom: "20px",
  },
}));
const Home: React.FC<{}> = () => {
  const classes = useStyles();
  const { products } = useProducts();
  const { isAuthenticated } = useAuth;
  const mensClothingArr =
    products &&
    products.filter((product) => product.category === "men's clothing");

  const jeweleryArr =
    products && products.filter((product) => product.category === "jewelery");

  const electronicsArr =
    products &&
    products.filter((product) => product.category === "electronics");

  // TODO: move to the API
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

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.titleWrapper}>
        <Typography variant="h5"></Typography>
        <p className={classes.title}>Extravagant</p>
        <p>Find that sparkle</p>
      </div>
      <div className={classes.firstSection}>
        <ProductItem
          product={mensClothingArr[0]}
          currencyRates={currencyRates}
          baseCurrency={baseCurrency}
          allowReverse
          truncateDescription
          isAuthenticated={isAuthenticated}
        />
      </div>
      {/* Mens clothing */}
      <div className={classes.sectionWrapper}>
        <p className={classes.subTitle}>Mens clothing</p>
        {mensClothingArr.map((product, index) => {
          if (index === 0) return;
          return (
            <ProductItem
              key={index}
              product={product}
              currencyRates={currencyRates}
              baseCurrency={baseCurrency}
              allowReverse
              truncateDescription
              isAuthenticated={isAuthenticated}
            />
          );
        })}
      </div>
      {/* jewelry */}
      <div className={classes.sectionWrapper}>
        <p className={classes.subTitle}>Jewelry</p>
        {jeweleryArr.map((product, index) => {
          return (
            <ProductItem
              key={index}
              product={product}
              currencyRates={currencyRates}
              baseCurrency={baseCurrency}
              allowReverse
              truncateDescription
              isAuthenticated={isAuthenticated}
            />
          );
        })}
      </div>
      <div className={classes.sectionWrapper}>
        <p className={classes.subTitle}>Electronics</p>
        {electronicsArr.map((product, index) => {
          return (
            <ProductItem
              key={index}
              product={product}
              currencyRates={currencyRates}
              baseCurrency={baseCurrency}
              allowReverse
              truncateDescription
              isAuthenticated={isAuthenticated}
            />
          );
        })}
      </div>
      <ContactUs />
      <Footer />
    </div>
  );
};

// TODO: add products to server side props?

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store }) => {
//     try {
//       const res = await fetch("https://fakestoreapi.com/products?limit=10");
//       // const fetchCurrencyRates = await fetch(
//       //   "https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP,JPY"
//       // );
//       const currencyRates = {
//         rates: {
//           AUD: 1.566015,
//           CAD: 1.560132,
//           CHF: 1.154727,
//           CNY: 7.827874,
//           GBP: 0.882047,
//           JPY: 132.360679,
//           USD: 1.23396,
//         },
//       };
//       store.dispatch({ type: FETCH_POSTS, payload: posts });
//       store.dispatch({
//         type: FETCH_CURRENCY_RATES,
//         payload: currencyRates.rates,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export default Home;
