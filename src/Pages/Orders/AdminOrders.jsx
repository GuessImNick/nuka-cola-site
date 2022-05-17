import React, { useEffect, useState } from "react";
import OrderContainer from "../../Components/OrderContainer";
import { API_CALLS } from "../../Data Acess/API_CALLS";
import AdminOrderDetailModal from "../../modals/AdminOrderDetailModal";

const AdminOrders = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [shippedOrders, setShippedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [orderDetailModalShow, setOrderDetailModalShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    API_CALLS.fetchOrders().then((res) => setOrders(res));
    API_CALLS.fetchProducts().then((res) => setProducts(res));
  }, [selectedOrder]);

  useEffect(() => {
    const currentActiveOrders = orders.filter((order) => {
      return order.status === "Pending";
    });
    setActiveOrders(currentActiveOrders);
  }, [orders]);

  useEffect(() => {
    const currentShippedOrders = orders.filter((order) => {
      return order.status === "Shipped";
    });
    setShippedOrders(currentShippedOrders);
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

  const shippedOrderListItems = shippedOrders.map((order) => (
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
  ));

  return (
    <div className="orders-content">
      <div className="active-orders card order-card">
        <h1>Active Orders</h1>
        <div className="active-order-list">{activeOrderListItems}</div>
      </div>
      <div className="shipped-orders card order-card">
        <h1>Shipped Orders</h1>
        <div className="shipped-order-list">{shippedOrderListItems}</div>
      </div>
      <div className="completed-orders card order-card">
        <h1>Completed Orders</h1>
        <div className="completed-order-list">{completedOrderListItems}</div>
      </div>
      <AdminOrderDetailModal
        show={orderDetailModalShow}
        onClose={() => setOrderDetailModalShow(false)}
        selectedOrder={selectedOrder}
        resetOrderState={setSelectedOrder}
        products={products}
      />
    </div>
  );
};

export default AdminOrders;
