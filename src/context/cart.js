import { createContext, useState } from 'react';

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [value, setValue] = useState('hola');

  const newValue = () => {
    setValue('oka');
  };

  return (
    <CartContext.Provider value={{ value, newValue }}>
      {children}
    </CartContext.Provider>
  );
};
export { CartContext, CartContextProvider };
