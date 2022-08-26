import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import ContactUs from "../../components/ContactUs";
import Footer from "../../components/Footer";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { METALLIC_SUNBURST } from "../../src/colors";
import { BaseCurrency, rates } from "../../src/types";
import ProductItem from "../../components/ProductItem";
import { useProducts } from "../../contexts";

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
  rates: rates;
  baseCurrency: BaseCurrency;
}
const ProductPage: React.FC<Props> = ({ rates, baseCurrency }) => {
  const router = useRouter();
  const classes = useStyles();
  const { products } = useProducts();
  const { id: productId } = router.query;

  const selectedProduct =
    products && products.find((product) => product.id === Number(productId));

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
        rates={rates}
        baseCurrency={baseCurrency}
        customStyles
      />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default ProductPage;
