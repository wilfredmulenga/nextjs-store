import React from "react";
import { connect } from "react-redux";
import { wrapper } from "../components/store";
import Navbar from "../components/Navbar";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import ProductItem from "../components/ProductItem";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { METALLIC_SUNBURST } from "../src/colors";
import {
  Product,
  CurrencyRates,
  BaseCurrency,
  State,
  FETCH_POSTS,
  FETCH_CURRENCY_RATES,
} from "../src/types";

interface Props {
  posts: Array<Product>;
  currencyRates: CurrencyRates;
  baseCurrency: BaseCurrency;
}

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
}));
const Home: React.FC<Props> = ({ posts, currencyRates, baseCurrency }) => {
  const classes = useStyles();
  const mensClothing =
    posts && posts.filter((product) => product.category === "men clothing");

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.titleWrapper}>
        <Typography variant="h5">Unleash</Typography>
        <p className={classes.title}>Extravagent</p>
        <p>Find your inner self</p>
      </div>
      <div>
        {posts &&
          posts.map((product, index) => {
            return (
              <ProductItem
                key={index}
                product={product}
                currencyRates={currencyRates}
                baseCurrency={baseCurrency}
                customStyles={classes.truncateDescription}
                allowReverse
                showButton
                truncateDescription
              />
            );
          })}
      </div>
      {/* Men's clothing I want a three-part grid like this: https://furniture.superfast.shop/ */}
      {/* TODO: need to use grid columns */}
      {/* {mensClothing && (
        <div className={classes.gridContainer}>
          <div className={classes["card-1"]}>
            <ProductCard
              product={mensClothing[3]}
              currencyRates={currencyRates}
              baseCurrency={baseCurrency}
            />
          </div>
          <div className={classes["card-2"]}>
            <ProductCard
              product={mensClothing[1]}
              currencyRates={currencyRates}
              baseCurrency={baseCurrency}
            />
          </div>
          <div className={classes["card-3"]}>
            <ProductCard
              product={mensClothing[2]}
              currencyRates={currencyRates}
              baseCurrency={baseCurrency}
            />
          </div>
        </div>
      )} */}
      <ContactUs />
      <Footer />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products?limit=10");
      const posts = await res.json();
      const fetchCurrencyRates = await fetch(
        "https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP,JPY"
      );
      const currencyRates = await fetchCurrencyRates.json();
      store.dispatch({ type: FETCH_POSTS, payload: posts });
      store.dispatch({
        type: FETCH_CURRENCY_RATES,
        payload: currencyRates.rates,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export default connect((state: State) => state)(Home);
