import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "../../hooks";

type Product = {
  category: string;
  description: string;
  id: string;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
};

const initialValue = {
  products: [],
};

const ProductsContext = createContext(initialValue);

const useProducts = () => useContext(ProductsContext);

const ProductsContextProvider: React.FC = ({ children }) => {
  const fetcher = useFetch();
  const [products, setProducts] = useState<Product[]>(initialValue.products);

  const getProducts = async () => {
    try {
      const res = await fetcher.get({
        url: "/products",
      });
      setProducts(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const context = {
    products,
  };

  return (
    <ProductsContext.Provider value={context}>
      {children}
    </ProductsContext.Provider>
  );
};

export { useProducts, ProductsContextProvider };
