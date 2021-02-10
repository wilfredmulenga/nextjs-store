import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import ContactUs from "../../components/ContactUs";
import Footer from "../../components/Footer";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { METALLIC_SUNBURST } from "../../src/colors";
import { Product, BaseCurrency, CurrencyRates, State } from "../../src/types";
import ProductItem from "../../components/ProductItem";

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
  noProductWrapper: {
    paddingLeft: "24px",
  },
}));

interface Props {
  posts: Array<Product>;
  currencyRates: CurrencyRates;
  baseCurrency: BaseCurrency;
}
const ProductPage: React.FC<Props> = ({
  posts,
  currencyRates,
  baseCurrency,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const { id: productId } = router.query;

  const selectedProduct =
    posts && posts.find((product) => product.id === Number(productId));

  if (!selectedProduct)
    return (
      <div className={classes.root}>
        <Navbar />
        <div className={classes.noProductWrapper}>
          <p>Product not found.</p>
          <Link href="/">
            <Button className={classes.button}>Return</Button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className={classes.root}>
      <Navbar />
      <ProductItem
        product={selectedProduct}
        currencyRates={currencyRates}
        baseCurrency={baseCurrency}
        customStyles
      />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default connect((state: State) => state)(ProductPage);
