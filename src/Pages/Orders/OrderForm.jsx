import React, { useState } from "react";
import { API_CALLS } from "../../Data Acess/API_CALLS";

const OrderForm = ({ products, user, shoppingCart, setShoppingCart }) => {
  

  const productNameHelper = (productId) => {
    return products.find((product) => {
      return product.id === productId;
    });
  };

  const addToCart = (productId) => {
    const qty = parseInt(
      document.getElementById(`product--${productId}`).value
    );
    const existsInCart = shoppingCart.find((data) => productId === data.productId)
    if (qty) {
      if(existsInCart) {
        const index = shoppingCart.findIndex((data) => productId === data.productId)
        const oldCart = [...shoppingCart]
        oldCart[index].productQuantity += qty
        setShoppingCart(oldCart)
        document.getElementById(`product--${productId}`).value = 0;
      } else if(!existsInCart) {
        const newItem = {
            productId: productId,
            productQuantity: qty,
          };
    
          setShoppingCart((prev) => {
              return [...prev, newItem];
          });
          document.getElementById(`product--${productId}`).value = 0;
      }
    }
  };

  const removeFromCart = (index) => {
    const oldCart = [...shoppingCart]
    oldCart.splice(index, 1)
    setShoppingCart(oldCart)
    console.log(shoppingCart)
  }

  const submitOrder = () => {
    if(shoppingCart.length > 0) {
        API_CALLS.postNewOrder(shoppingCart, user)
        setShoppingCart([])
    }
  }

  return (
    <div className="order-form-container">
      <form className="order-form">
        {products.map((product) => {
          return (
            <div
              className="order-form-product"
              key={`orderForm--${product.id}`}
            >
              {product.productName}
              <div className="order-form-btn">
                <input
                  type="number"
                  min="0"
                  max="99"
                  onKeyDown={() => false}
                  placeholder="0"
                  id={`product--${product.id}`}
                />
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product.id);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </form>
      <div className="shopping-cart">
        <h1>Shopping Cart</h1>
        <div className="shopping-cart-container">
            <ul>
            {shoppingCart.map((item, index) => {
                return <li key={index}>"{productNameHelper(item.productId).productName}" - QTY: {item.productQuantity} <button className='btn' onClick={() => removeFromCart(index)} >X</button></li>
            })}
            </ul>
            
        </div>
        <button className="btn" onClick={() => submitOrder()}>Submit Order</button>
      </div>
    </div>
  );
};

export default OrderForm;
