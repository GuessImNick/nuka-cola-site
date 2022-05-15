import React from 'react';

const RegisterModal = ({show, onClose}) => {
    if(!show){
        return null;
    }
  return (
    <div className='modal'>
        <div className='modal-content'>
            <div className='modal-header'>
                <h2 className='modal-title'>Register</h2>
            </div>
            <div className='modal-body'>
                <p>Register Forms</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
  )
}

export default RegisterModal