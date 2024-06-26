import React, { useContext } from 'react'
import {CartModalItem} from '../components'
import './CartModal.scss'
import { DataContext } from '../context/DataProvider'
import Link from 'next/link'

const CartModal = ({cartData}) => {
  const _cartData = cartData
  const subTotal = cartData?.reduce((total, item) => {
    return total += parseInt(item.qty)*parseInt(item.product.price)
  }, 0) || 0
  
  return (
    <div className="cart-modal-wapper">
      <div className="items">
        {_cartData?.map((item, ind) => 
          <CartModalItem
            key={ind}
            productThumb = {item.product.thumbs[0]}
            productName = {item.product.name}
            qty = {item.qty}
            productPrice = {item.product.price}
          />
        )}
      </div>
      <div className="subtotal">
        <span>Subtotal: </span>
        <span>{subTotal?.toFixed(2) + '$'}</span>
      </div>
      <div className="btns">
        <Link href='/cart'>
          <button>View Cart</button>
        </Link>
        <Link href='/checkout'>
          <button>Check Out</button>
        </Link>
      </div>
    </div>
  )
}

export default CartModal
