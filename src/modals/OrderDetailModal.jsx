import React, { useState } from "react";
import { API_CALLS } from "../Data Acess/API_CALLS";

const OrderDetailModal = ({
  show,
  onClose,
  selectedOrder,
  resetOrderState,
  products,
}) => {
  const [updateStatus, setUpdateStatus] = useState(false);
  const currentDate = new Date();
  const orderObj = { ...selectedOrder };

  const productNameHelper = (productId) => {
    return products.find((product) => {
      return product.id === productId;
    });
  };

  const cancelOrder = () => {
    orderObj.status = "Cancelled";
    orderObj.expectedReceivedDate = currentDate
    API_CALLS.updateOrder(selectedOrder.id, orderObj);
    onClose();
    resetOrderState({});
  };

  if (!show) {
    return null;
  }
  if (updateStatus === false) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Order #{selectedOrder?.id}</h2>
          </div>
          <div className="modal-body">
            <h2>Ordered Products</h2>
            <ul>
              {selectedOrder.orderedProducts.map((product) => {
                return (
                  <li>
                    {productNameHelper(product.productId)?.productName} -{" "}
                    {product.productQuantity}
                  </li>
                );
              })}
            </ul>
            <div className="orderModal-btn-group">
              {currentDate.getTime() >
                selectedOrder.orderPlacedDate + 86400000 ||
              selectedOrder.status === "Cancelled" ||
              selectedOrder.status === "Completed" ||
              selectedOrder.status === "Denied" ? null : (
                <button
                  onClick={() => {
                    setUpdateStatus(true);
                  }}
                >
                  Edit Order
                </button>
              )}
              <button
                onClick={() => {
                  onClose();
                  resetOrderState({});
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (updateStatus === true) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Update Order #{selectedOrder?.id}</h2>
          </div>
          <div className="modal-body">
            <div className="orderModal-btn-group">
              <button
                onClick={() => {
                  cancelOrder();
                }}
              >
                Cancel Order
              </button>
              <button
                onClick={() => {
                  setUpdateStatus(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default OrderDetailModal;
