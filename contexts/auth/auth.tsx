import React, { createContext, useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "../../firebase";
import { useRouter } from "next/router";
import { useFetch } from "../../hooks";

const initialValue = {
  login: async () => {},
  user: null,
  isAuthenticated: false,
};

type User = {
  email: string;
  userId: string;
};

type Credentials = {
  email: string;
  password: string;
};

type Auth = {
  login: (credentials: Credentials) => Promise<void>;
  user: User | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<Auth>(initialValue);

const useAuth = () => useContext(AuthContext);

const AuthContextProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const fetcher = useFetch();
  const auth = getAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(
    initialValue.isAuthenticated
  );
  const [user, setUser] = useState(initialValue.user);

  const login = async (credentials) => {
    const { email, password } = credentials;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const loggedInUser = userCredential.user;
        setUser(loggedInUser);
        setIsAuthenticated(true);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });

    return isAuthenticated;
  };

  const signup = async (credentials) => {
    try {
      const res = await fetcher.post({
        url: "/user",
        credentials,
      });

      setUser(res);
      setIsAuthenticated(true);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  const context = {
    login,
    logout,
    user,
    isAuthenticated,
    signup,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export { useAuth, AuthContextProvider };
