import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "../../hooks";
import { useAuth } from "../../contexts";

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

type Order = {
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
  userId: string;
};

const initialValue = {
  products: [],
  orders: [],
  orderCount: 0,
};

const ProductsContext = createContext(initialValue);

const useProducts = () => useContext(ProductsContext);

const ProductsContextProvider: React.FC = ({ children }) => {
  const fetcher = useFetch();
  const { isAuthenticated, user } = useAuth();

  const [products, setProducts] = useState<Product[]>(initialValue.products);
  const [orders, setOrders] = useState<Order[]>(initialValue.orders);
  const [orderCount, setOrderCount] = useState(initialValue.orderCount);

  const getProducts = async () => {
    try {
      const res = await fetcher.get({
        url: "/products",
      });
      if (res) {
        setProducts(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addOrder = async (body) => {
    try {
      await fetcher.post({
        url: "/order",
        body,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await getOrders(user.uid);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async (userId) => {
    try {
      const res = await fetcher.get({
        url: `/orders?userId=${userId}`,
      });
      if (res) {
        setOrders(Object.values(res));
        setOrderCount(Object.values(res).length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(async () => {
    if (isAuthenticated) {
      await getOrders(user.uid);
    }
  }, [isAuthenticated, user]);

  const context = {
    products,
    addOrder,
    orders,
    orderCount,
    getOrders,
  };

  return (
    <ProductsContext.Provider value={context}>
      {children}
    </ProductsContext.Provider>
  );
};

export { useProducts, ProductsContextProvider };
