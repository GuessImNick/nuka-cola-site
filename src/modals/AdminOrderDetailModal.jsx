import React from "react";
import { API_CALLS } from "../Data Acess/API_CALLS";

const AdminOrderDetailModal = ({
  show,
  onClose,
  selectedOrder,
  resetOrderState,
}) => {
  const statusSelectOptions = [
    "Pending",
    "Shipped",
    "Cancelled",
    "Denied",
    "Completed",
  ];

  const updateOrder = () => {
    const oldOrder = { ...selectedOrder };
    const selectedStatus = document.querySelector("#statusSelect").value;
    const selectedDate = document.querySelector('#dateSelect')?.value;
    if(selectedOrder.status !== selectedStatus){
    oldOrder.status = selectedStatus
    if(selectedDate){
        oldOrder.expectedReceivedDate = new Date(selectedDate).getTime() + 42000000
    } 
    API_CALLS.updateOrder(selectedOrder.id, oldOrder).then(() => {
      onClose({});
      resetOrderState({});
    })} 
  };

  if (!show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Order#: {selectedOrder.id}</h2>
        </div>
        <div className="modal-body">
            {selectedOrder.status === "Pending" ? <p>Select expected delivery date</p> : <p>Select date delivered</p>}
            {selectedOrder.status === "Pending" || selectedOrder.status === "Shipped" ? <input type="date" id="dateSelect" /> : null}
          <select defaultValue={selectedOrder.status} id="statusSelect">
            {statusSelectOptions.map((options) => {
              return (
                <option key={options} value={options}>
                  {options}
                </option>
              );
            })}
          </select>
          <div className="btn-group">
            <button
              onClick={() => {
                updateOrder();
              }}
            >
              Update Order
            </button>
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
};

export default AdminOrderDetailModal;
