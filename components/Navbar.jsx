import React from 'react';
import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  // get Context variables from StateContext
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href = "/">Books For Bucks</Link>
      </p>

      {/* add cart icon and function to show cart on click */}
      <button className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}

    </div>
  )
}

export default Navbar