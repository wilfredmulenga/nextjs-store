import { ConvertPrice } from "../src/types";

export const convertPrice = ({
  price,
  rates,
  baseCurrency,
}: ConvertPrice): string => {
  let convertedPrice;
  switch (baseCurrency) {
    case "USD":
      convertedPrice = "$" + price.toFixed(2);
      break;
    case "JPY":
      convertedPrice = "¥" + (price * rates.JPY).toFixed(2);
      break;
    case "GBP":
      convertedPrice = "£" + (price * rates.GBP).toFixed(2);
      break;
    case "EUR":
      convertedPrice = "€" + (price * rates.EUR).toFixed(2);
      break;
    default:
      convertedPrice = "$" + price.toFixed(2);
      break;
  }
  return convertedPrice;
};
