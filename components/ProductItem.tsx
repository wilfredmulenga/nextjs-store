import React from "react";
import Image from "next/image";
import Link from "next/link";
import { convertPrice } from "../helpers";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import { PURE_WHITE, METALLIC_SUNBURST } from "../src/colors";
import { Product, CurrencyRates, BaseCurrency } from "../src/types";

interface Props {
  product: Product;
  currencyRates: CurrencyRates;
  baseCurrency: BaseCurrency;
  customStyles?: boolean;
  allowReverse?: boolean;
  showButton?: boolean;
  truncateDescription?: boolean;
}

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "100px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
  },
  buttonWrapper: {
    display: "flex",
    paddingBottom: "10px",
  },
  truncateDescription: {
    fontSize: "0.9rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 5,
    "-webkit-box-orient": "vertical",
  },
  customStyles: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "space-around",
    paddingLeft: "10px",
    paddingRight: "10px",
    backgroundColor: PURE_WHITE,
    paddingTop: "60px",
    paddingBottom: "60px",
    marginBottom: "240px",
  },
}));

const ProductItem: React.FC<Props> = ({
  product,
  currencyRates,
  baseCurrency,
  customStyles = false,
  allowReverse = false,
  showButton = false,
  truncateDescription = false,
}) => {
  const classes = useStyles();
  // const product2 = [
  //   {
  //     id: 1,
  //     title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  //     price: 109.95,
  //     description:
  //       'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  //     category: "men's clothing",
  //     imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  //     rating: {
  //       rate: 3.9,
  //       count: 120,
  //     },
  //   },
  // ]

  if (!product) return <></>;

  const { image: imageUrl, description, price, title, id } = product;

  return (
    <Grid
      container
      spacing={2}
      direction={id % 2 === 0 && allowReverse ? "row-reverse" : "row"}
      className={customStyles ? classes.customStyles : classes.root}
    >
      <Grid item lg={5} md={5} sm={5} xs={12}>
        <Image
          src={imageUrl || ""}
          alt={title}
          width="400"
          height="300"
          priority
        />
      </Grid>
      <Grid item lg={4} md={4} sm={5} xs={12} className={classes.textWrapper}>
        <div>
          <p className={classes.title}>{title}</p>
          <p
            className={
              truncateDescription
                ? classes.truncateDescription
                : classes.description
            }
          >
            {description}
          </p>
        </div>
        <div className={classes.buttonWrapper}>
          <p className={classes.price}>
            {convertPrice({ price, currencyRates, baseCurrency })}
          </p>
          {showButton && (
            <Link href={`/product/${id}`}>
              <Button style={{ color: METALLIC_SUNBURST }} color="primary">
                View more
              </Button>
            </Link>
          )}
          <Button>Add to cart</Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProductItem;
