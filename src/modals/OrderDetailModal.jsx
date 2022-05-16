import React, { useState } from "react";
import OrderForm from "../Pages/Orders/OrderForm";

const OrderDetailModal = ({
  show,
  onClose,
  selectedOrder,
  resetOrderState,
}) => {
  const [updateStatus, setUpdateStatus] = useState(false);
  const currentDate = new Date();

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
            <p>{selectedOrder?.status}</p>
            <div className="orderModal-btn-group">
              {currentDate.getTime() >
              selectedOrder.orderPlacedDate + 86400000 ? null : (
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
              <button onClick={() => {}}>Submit Update</button>
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
