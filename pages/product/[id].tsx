import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import ContactUs from "../../components/ContactUs";
import Footer from "../../components/Footer";
import { convertPrice } from "../../helpers";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PURE_WHITE } from "../../src/colors";
import { Product, BaseCurrency, CurrencyRates, State } from "../../src/types";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: "1000px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
    "& img": {
      width: "400px",
      height: "300px",
      objectFit: "fill",
      backgroundColor: PURE_WHITE,
      borderRadius: "5px",
      padding: "10px",
    },
  },
  detailsWrapper: {
    marginLeft: "40px",
    width: "400px",
    paddingRight: "10px",
  },
  title: {
    marginTop: 0,
    marginBottom: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  price: {
    marginTop: 0,
    marginBottom: 0,
    marginRight: "2rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  description: {
    fontSize: "0.9rem",
    paddingRight: "20px",
  },
  buttonWrapper: {
    display: "flex",
    paddingBottom: "10px",
  },
  main: {
    paddingTop: "40px",
    paddingBottom: "40px",
    marginBottom: "60px",
    backgroundColor: PURE_WHITE,
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
      <div>
        <Navbar />
        <p>Product not found.</p>
      </div>
    );

  const { title, price, description, image: imageUrl } = selectedProduct;
  return (
    <div className={classes.root}>
      <Navbar />
      <Grid container justify="center" className={classes.main}>
        <Grid className={classes.imageWrapper} sm={12}>
          <Image src={imageUrl} alt={title} width="400" height="300" />
        </Grid>
        <div className={classes.detailsWrapper}>
          <p className={classes.title}>{title}</p>
          <p className={classes.description}>{description}</p>
          <p className={classes.price}>
            {convertPrice({ price, currencyRates, baseCurrency })}
          </p>
        </div>
      </Grid>
      <ContactUs />
      <Footer />
    </div>
  );
};

export default connect((state: State) => state)(ProductPage);
