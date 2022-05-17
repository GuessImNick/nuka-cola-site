import React, { useState } from "react";

const OrderContainer = ({ order, products, showDetail, selectOrder }) => {
  const productNameHelper = (productId) => {
    return products.find((product) => {
      return product.id === productId;
    });
  };

  const dateHelper = (epochTime) => {
    const myDate = new Date(epochTime);

    const myDateString = `${
      myDate.getMonth() + 1
    }/${myDate.getDate()}/${myDate.getFullYear()}`;
    return myDateString;
  };

  return (
    <>
      <h2>Order #: {order.id}</h2>
      <div className="order-products">
        {/* Add User info section that only shows up for the admins, Company name, address, phone number... etc */}
        <ul>
          {order.orderedProducts.map((product) => {
            return (
              <li key={`${order.id}--${product.productId}`}>
                "{productNameHelper(product.productId)?.productName}" - Qty:{" "}
                {product.productQuantity}
              </li>
            );
          })}
        </ul>
        <ul>
          <li> Orderd On: {dateHelper(order.orderPlacedDate)}</li>
          <li>
            {order.status === "Completed" 
              ? "Delivered On" : order.status === "Cancelled" ||
              order.status === "Denied" ? "Cancelled/Denied On"
              : "Expected Delivery:"}{" "}
            {dateHelper(order.expectedReceivedDate)}
          </li>
          <li>
            Status: {order.status}{" "}
            <button
              onClick={() => {
                showDetail()
                selectOrder(order)
              }}
            >
              &#9432;
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OrderContainer;
