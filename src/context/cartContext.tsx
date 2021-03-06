import React, { useEffect, useState } from 'react'

import ItemTicket from '../dataTypes/items/itemTicket';
import ProductDetail from '../dataTypes/items/ProductDetail';
import { reconstructItems } from '../helpers/itemFactory';

const CartContext = React.createContext<{
    items: ItemTicket[],
    addItem(it: ItemTicket): void,
    deleteItem(it: ItemTicket): void, 
    deleteAllItems(): void, 
    isInCart(id: string, pd: ProductDetail): boolean,
    amountInCart(itemId: string): number,
    updateAmount(item: ItemTicket, newAmount: number): void,
    getNumberOfProducts(): number,
    getTotalCost(): number,
  }>

  //default values                                    
  ({items: [],
    addItem: (it:ItemTicket)=>{},
    deleteItem: (it:ItemTicket)=>{},
    deleteAllItems: () => {},
    isInCart: (id: string, pd: ProductDetail) => false,
    amountInCart: (itemId: string) => 0,
    updateAmount: (item: ItemTicket, newAmount: number) => 0,
    getNumberOfProducts: () => 0,
    getTotalCost: () => 0,
  });


const CartProvider: React.FC<{}> = ({children}) => {
  const localStorageKey = "cart-storage";
  const [cartItems, setCartItems] = useState<ItemTicket[]>([]);

  const setItemsLocalStorage = (items: ItemTicket[]) => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(items));
  }

  const getItemsLocalStorage = (): ItemTicket[] => {
    const retrievedItems: ItemTicket[] = JSON.parse(window.localStorage.getItem(localStorageKey)|| "[]");
    const resurrectedItems: ItemTicket[] = reconstructItems(retrievedItems);
    return resurrectedItems;
  }

  useEffect(() => {
    const storedItems: ItemTicket[] = getItemsLocalStorage();
    setCartItems(storedItems);
  }, [])

  const addItem = (newItem: ItemTicket): void => {
    if (cartItems.some(it => it.sameProductAs(newItem))) {
      throw new Error('Este item ya ha sido agregado previamente!');
    }
    else {
      let cartItemsAux = cartItems;
      cartItemsAux.push(newItem);
      setCartItems(cartItemsAux.slice());
      setItemsLocalStorage(cartItemsAux);
    }
  }

  const deleteItem = (deletedItem: ItemTicket): void => {
    const newCartItems = cartItems.filter((it: ItemTicket) => {
      return !(it.equals(deletedItem) && it.sameProductAs(deletedItem));
    })
    setCartItems(newCartItems);
    setItemsLocalStorage(newCartItems);
  }

  const deleteAllItems = (): void => {
    setCartItems([]);
    setItemsLocalStorage([]);
  }

  const isInCart = (itemId: string, productDetail: ProductDetail): boolean => {
    return cartItems.some((it) => it.id === itemId && it.sameDetails(productDetail));
  }

  const amountInCart = (itemId: string): number => {
    let res = 0;
    cartItems.forEach(it => {
      if (it.id === itemId) res += it.amount;
    })
    return res;
  }

  const updateAmount = (item: ItemTicket, newAmount: number) => {
    item.updateAmount(newAmount);
    setCartItems(cartItems.slice());
    setItemsLocalStorage(cartItems);
  }

  const getNumberOfProducts = (): number => {
    let amountItems = 0;
    cartItems.forEach(it => {amountItems += it.amount});
    return amountItems;
  }

  const getTotalCost = () => {
    let res = 0;
    cartItems.forEach((ci) => res += ci.amount*ci.price);
    return res;
  }

  return (
    <CartContext.Provider 
      value={{items: cartItems,
              addItem: addItem, 
              deleteItem:deleteItem,
              deleteAllItems: deleteAllItems, 
              isInCart: isInCart,
              amountInCart: amountInCart,
              updateAmount: updateAmount,
              getNumberOfProducts: getNumberOfProducts,
              getTotalCost: getTotalCost,
             }}>
      {children}
    </CartContext.Provider>
  )
}

export {CartProvider,CartContext}