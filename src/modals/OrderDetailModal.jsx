import React from 'react';

const OrderDetailModal = ({show, onClose, order}) => {
    if(!show){
        return null;
    }
  return (
    <div className='modal'>
        <div className='modal-content'>
            <div className='modal-header'>
                <h2 className='modal-title'>{order.id}</h2>
            </div>
            <div className='modal-body'>
                <p>{order.status}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
  )
}

export default OrderDetailModal