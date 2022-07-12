import React, { createContext,useContext, useState,useEffect } from "react"
import{toast} from 'react-hot-toast'

//creating Context to be used in the rest of the application
const Context = createContext();

export const StateContext = ({children})=> {
  // whether or not to show the cart
  const [showCart, setShowCart] = useState(false);
  // list of items in the cart
  const [cartItems, setCartItems] = useState([]);
  // total price of the cart
  const [totalPrice, setTotalPrice] = useState(0);
  // how many items are in the cart (total)
  const [totalQuantities, setTotalQuantities] = useState(0);
  // the quantity of items to add to the cart
  const [qty, setQty] = useState(1);

  // variables for finding the correct product in the cart (used for changing cart quantity)
  let foundProduct;
  let index;

  // fct to add a certain quantity of items to the cart
  const onAdd = (product, quantity) => {
    // first check if the product is already in the cart
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    // update the total cart price and quantity of items in the cart after adding this/these
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    //if item is already in the cart
    if(checkProductInCart) {  

      // set variable to update the quantity of this item in the cart
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,quantity : cartProduct.quantity + quantity
        }
      })
      // update cart items 
      setCartItems(updatedCartItems);
    } else { // if not in cart
      // add item to cart and update cart items
      product.quantity = quantity;
      setCartItems([...cartItems, {...product}]);
    }
    //notify of successful addition to cart
    if (qty == 1) {toast.success(`${qty} copy of ${product.name} added to the cart.`)}
    else {toast.success(`${qty} copies of ${product.name} added to the cart.`)};
    
  }

  const onRemove = (product) => {
    // get product
    foundProduct = cartItems.find((item) => item._id === product._id);
    //remove the item from the cart temporarily (so that when we reset, we don't add another cart item...)
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id,value) => {
    // get product
    foundProduct = cartItems.find((item) => item._id === id);
    // get index of product in cart
    index = cartItems.findIndex((product) => product._id === id);
    //remove the item from the cart temporarily (so that when we reset, we don't add another cart item...)
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') { 
      // updating the cart items by using the newCartItems and adding the foundProduct (item we are incrementing/decrementing)
      setCartItems([...newCartItems, {...foundProduct,quantity:foundProduct.quantity + 1}]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice+foundProduct.price);
      setTotalQuantities((prevTotalQuantities => prevTotalQuantities + 1))
    }else if (value === 'dec'){
      if (foundProduct.quantity > 1 ) {
        setCartItems([...newCartItems, {...foundProduct,quantity:foundProduct.quantity - 1}]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities => prevTotalQuantities - 1))
      }
      
    }
  }

  // increment quantity by 1
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  // deccrement quantity by 1 (cannot go below 1)
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  }

  // return Context variables for use in other parts of the program
  return (
      <Context.Provider
      value = {{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setTotalPrice,
        setCartItems,
        setTotalQuantities
      }}>
        {children}
      </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);