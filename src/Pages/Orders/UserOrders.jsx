import React, { useEffect, useState } from "react";
import OrderContainer from "../../Components/OrderContainer";
import { API_CALLS } from "../../Data Acess/API_CALLS";
import OrderForm from "./OrderForm";

const UserOrders = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    API_CALLS.fetchUserOrders(user).then((res) => setOrders(res));
    API_CALLS.fetchProducts().then((res) => setProducts(res));
  }, [shoppingCart]);

  useEffect(() => {
    const currentActiveOrders = orders.filter((order) => {
      return order.status === "Pending" || order.status === "Shipped";
    });
    setActiveOrders(currentActiveOrders);
  }, [orders]);

  useEffect(() => {
    const currentCompletedOrders = orders.filter((order) => {
      return order.status === "Completed" || order.status === "Cancelled" || order.status === "Denied"
    });

    setCompletedOrders(currentCompletedOrders);
  }, [orders]);

  return (
    <div className="orders-content">
      <div className="place-order-container card order-card">
          <h1>Place An Order</h1>
          <OrderForm products={products} user={user} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
      </div>
      <div className="active-orders card order-card">
        <h1>Active Orders</h1>
        <div className="active-order-list">
          {activeOrders.map((order) => (
            <div key={order.id} className="order-container">
              <OrderContainer order={order} products={products} />
            </div>
          ))}
        </div>
      </div>
      <div className="completed-orders card order-card">
          <h1>Completed Orders</h1>
          <div className="completed-order-list">
          {completedOrders.map((order) => (
            <div key={order.id} className="order-container">
              <OrderContainer order={order} products={products} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;