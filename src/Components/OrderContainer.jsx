import React, { useState } from "react";

const OrderContainer = ({
  order,
  products,
  showDetail,
  selectOrder,
  user,
  allUsers,
}) => {
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

  const userAddressHelper = (userId) => {
    const orderUser = allUsers.find((user) => user.id === userId);
    const address = orderUser?.companyStreetAddress;
    const addressString = (
      <p>
        {orderUser?.companyName}
        <br />
        {address?.street}
        <br />
        {address?.city} {address?.state}
        <br /> {address?.zip}
      </p>
    );

    return addressString;
  };

  return (
    <>
      <h2 className="order-container-header">Order #: {order.id}</h2>
      <div className="order-products">
        {user.isAdmin ? (
          <div className="user-order-info">
            <h3>Company Info</h3>
            {userAddressHelper(order.userId)}
          </div>
        ) : null}
        <ul>
          <li>
            <h3>Ordered Products</h3>
          </li>
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
          {order.status === "Pending" ? null : (
            <li>
              {order.status === "Completed"
                ? "Delivered On"
                : order.status === "Cancelled" || order.status === "Denied"
                ? "Cancelled/Denied On"
                : "Expected Delivery:"}{" "}
              {dateHelper(order.expectedReceivedDate)}
            </li>
          )}
          <li>
            Status: {order.status}{" "}
            <button
              onClick={() => {
                showDetail();
                selectOrder(order);
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
