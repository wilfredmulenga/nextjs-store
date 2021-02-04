import React from "react";
import Image from "next/image";
import { convertPrice } from "../helpers";
import { makeStyles } from "@material-ui/styles";
import { Product, CurrencyRates, BaseCurrency } from "../src/types";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

interface Props {
  product: Product;
  currencyRates: CurrencyRates;
  baseCurrency: BaseCurrency;
}

const ProductCard: React.FC<Props> = ({
  product,
  currencyRates,
  baseCurrency,
}) => {
  const classes = useStyles();
  const { image: imageUrl, title, price } = product;
  return (
    <div className={classes.root}>
      <div>
        <Image src={imageUrl} alt={title} width="400" height="300" />
      </div>
      <div>
        <p>{title}</p>
        <p>{convertPrice({ price, currencyRates, baseCurrency })}</p>
      </div>
    </div>
  );
};

export default ProductCard;
