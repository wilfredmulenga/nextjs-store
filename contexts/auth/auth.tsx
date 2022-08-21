import React, { createContext, useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "../../firebase";
import { useRouter } from "next/router";

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
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialValue.isAuthenticated
  );
  const [user, setUser] = useState(initialValue.user);
  const router = useRouter();

  const login = async (credentials) => {
    const auth = getAuth();
    console.log("function called");
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
        //TODO: can display error to user
      });

    return isAuthenticated;
  };

  const context = {
    login,
    user,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export { useAuth, AuthContextProvider };
