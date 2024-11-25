 
import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Product {
  _id: string;
  price: number;
  name: string;
  image: string;
  description: string;
  category: string;
}

interface CartItems {
  [key: string]: number;
}

export interface StoreContextProps {
  url: string;
  cartItems: CartItems;
  setItems: React.Dispatch<React.SetStateAction<CartItems>>;
  addToCart: (itemId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  showlogin: boolean;
  setShowlogin: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  list: Product[];
  setList: React.Dispatch<React.SetStateAction<Product[]>>;
   gettotolCartItem: () => number;
  discount: () => string;
  setDis: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const StoreContext = createContext<StoreContextProps | undefined>(undefined);

interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const [showlogin, setShowlogin] = useState(false);
  const [token, setToken] = useState('');
  const [list, setList] = useState<Product[]>([]);
  const [cartItems, setItems] = useState<CartItems>({});
  const url = `https://snkerbackend.onrender.com`;

  const [dis, setDis] = useState<string | undefined>();

  const discount = () => {
    let totalAmount = gettotolCartItem() + 200;
    if (dis === "NEW20") {
      totalAmount = Math.floor(totalAmount * 0.8);
    }
    return totalAmount.toFixed(2);
  };

  const addToCart = async (itemId: string) => {
    if (!cartItems[itemId]) {
      setItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/createorder", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId: string) => {
    setItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/shoes/list`);
      if (response.data) {
        setList(response.data.allShoes);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const gettotolCartItem = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const loadCartData = async (token: string) => {
    const response = await axios.post(url + "/api/cart/getcart", {}, { headers: { token } });
    setItems(response.data.cartData);
  };

  useEffect(() => {
    const getList = async () => {
      await fetchData();
      gettotolCartItem();
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    getList();
  }, []);

  const contextValue: StoreContextProps = {
    url, cartItems, setItems, addToCart, removeFromCart, showlogin, setShowlogin, token, setToken,
    list, setList, gettotolCartItem, discount, setDis
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

export const useStore = () => useContext(StoreContext);