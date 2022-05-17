import React, { useEffect, useState } from "react";
import OrderContainer from "../../Components/OrderContainer";
import { API_CALLS } from "../../Data Acess/API_CALLS";
import OrderDetailModal from "../../modals/OrderDetailModal";
import OrderForm from "./OrderForm";

const UserOrders = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [orderDetailModalShow, setOrderDetailModalShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    API_CALLS.fetchUserOrders(user).then((res) => setOrders(res));
    API_CALLS.fetchProducts().then((res) => setProducts(res));
  }, [shoppingCart, selectedOrder]);

  useEffect(() => {
    const currentActiveOrders = orders.filter((order) => {
      return order.status === "Pending" || order.status === "Shipped";
    });
    setActiveOrders(currentActiveOrders);
  }, [orders]);

  useEffect(() => {
    const currentCompletedOrders = orders.filter((order) => {
      return (
        order.status === "Completed" ||
        order.status === "Cancelled" ||
        order.status === "Denied"
      );
    });

    setCompletedOrders(currentCompletedOrders);
  }, [orders]);

  const activeOrderListItems = activeOrders.map((order) => (
    <div key={order.id} className="order-container">
      <OrderContainer
        order={order}
        products={products}
        showDetail={() => setOrderDetailModalShow(true)}
        selectOrder={setSelectedOrder}
      />
    </div>
  ));

  const completedOrderListItems = completedOrders.map((order) => (
    <div key={order.id} className="order-container">
      <OrderContainer
        order={order}
        products={products}
        showDetail={() => setOrderDetailModalShow(true)}
        selectOrder={setSelectedOrder}
      />
    </div>
  ))

  return (
    <div className="orders-content">
      <div className="place-order-container card order-card">
        <h1>Place An Order</h1>
        <OrderForm
          products={products}
          user={user}
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
        />
      </div>
      <div className="active-orders card order-card">
        <h1>Active Orders</h1>
        <div className="active-order-list">{activeOrderListItems}</div>
      </div>
      <div className="completed-orders card order-card">
        <h1>Completed Orders</h1>
        <div className="completed-order-list">
          {completedOrderListItems}
        </div>
      </div>
      <OrderDetailModal
        show={orderDetailModalShow}
        onClose={() => setOrderDetailModalShow(false)}
        selectedOrder={selectedOrder}
        resetOrderState={setSelectedOrder}
        products={products}
      />
    </div>
  );
};

export default UserOrders;
