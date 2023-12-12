import React, { useContext } from 'react'
import './CartItems.css';
import remove_icon from '../assets/cart_cross_icon.png'
import { ShopContext } from '../../context/ShopContext'
const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext)
    return (
        <div className='cartItems'>
            <div className="cartItems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartItems-format cartItems-format-main">
                                <img src={e.image} alt="" className="cartIcon-product-icon" />
                                <p>{e.name}</p>
                                <p>{e.new_price}</p>
                                <button className="cartItems-quantity">{cartItems[e.id]}</button>
                                <p>{e.new_price * cartItems[e.id]}</p>
                                <img
                                    className='cartIcon-remove-icon'
                                    src={remove_icon}
                                    onClick={() => { removeFromCart(e.id) }}
                                    alt=""
                                />
                            </div>
                        </div>
                    );
                }
                return null;
            })}

            <div className="cartItems-down">
                <div className="cartItems-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartItems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartItems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartItems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                    </div>
                    <button>Proceed to Checkout</button>
                </div>
                <div className="cartItems-promocode">
                    <p>If you have promo code, enter it here</p>
                    <div className="cartItems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems 
