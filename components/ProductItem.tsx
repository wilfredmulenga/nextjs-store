import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { convertPrice } from "../helpers";
import { useAuth } from "../contexts";
import { useProducts } from "../contexts";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Grid, Button } from "@material-ui/core";
import { PURE_WHITE, METALLIC_SUNBURST, BACKGROUND_WHITE } from "../src/colors";
import { Product, CurrencyRates, BaseCurrency } from "../src/types";

interface Props {
  product: Product;
  currencyRates: CurrencyRates;
  baseCurrency: BaseCurrency;
  customStyles?: boolean;
  allowReverse?: boolean;
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
    paddingTop: "20px",
    paddingBottom: "20px",
    cursor: "pointer",
    backgroundColor: PURE_WHITE,
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
  button: {
    color: METALLIC_SUNBURST,
    backgroundColor: BACKGROUND_WHITE,
  },
}));

const ProductItem: React.FC<Props> = ({
  product,
  currencyRates,
  baseCurrency,
  customStyles = false,
  allowReverse = false,
  truncateDescription = false,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { addOrder } = useProducts();
  const { id: productId } = router.query;
  const { isAuthenticated, user } = useAuth();
  if (!product) return <></>;

  const addToCart = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const payload = { ...product, userId: user.uid };
    await addOrder(payload);
  };

  const { image: imageUrl, description, price, title, id } = product;

  return (
    <Link href={`/product/${id}`}>
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
            {productId && isAuthenticated && (
              <Button className={classes.button} onClick={addToCart}>
                <ShoppingCartIcon />
                Add to cart
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </Link>
  );
};

export default ProductItem;
