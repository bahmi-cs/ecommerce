import { createContext, useState } from 'react';

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  let [value, setValue] = useState([]);

  const newValue = (data) => {
    setValue(data);
  };

  return (
    <CartContext.Provider value={{ value, newValue }}>
      {children}
    </CartContext.Provider>
  );
};
export { CartContext, CartContextProvider };
