import React from "react";
import { connect } from "react-redux";
import { wrapper } from "../components/store";
import Navbar from "../components/Navbar";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import ProductItem from "../components/ProductItem";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { METALLIC_SUNBURST, RICH_BLACK_FOGRA } from "../src/colors";
import {
  Product,
  CurrencyRates,
  BaseCurrency,
  State,
  FETCH_POSTS,
  FETCH_CURRENCY_RATES,
} from "../src/types";

const posts = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: {
      rate: 2.1,
      count: 430,
    },
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave ",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 3.9,
      count: 70,
    },
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 3,
      count: 400,
    },
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 1.9,
      count: 100,
    },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: {
      rate: 3.3,
      count: 203,
    },
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: {
      rate: 2.9,
      count: 470,
    },
  },
];

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
const Home: React.FC<Props> = ({ posts, currencyRates, baseCurrency }) => {
  const classes = useStyles();
  const mensClothingArr =
    posts && posts.filter((product) => product.category === "men's clothing");

  const jeweleryArr =
    posts && posts.filter((product) => product.category === "jewelery");

  const electronicsArr =
    posts && posts.filter((product) => product.category === "electronics");

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
          showButton
          truncateDescription
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
              showButton
              truncateDescription
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
              showButton
              truncateDescription
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
              showButton
              truncateDescription
            />
          );
        })}
      </div>
      <ContactUs />
      <Footer />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products?limit=10");
      // const fetchCurrencyRates = await fetch(
      //   "https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP,JPY"
      // );
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
