import React from 'react'
import AdminOrders from './AdminOrders'
import NoUser from './NoUser'
import UserOrders from './UserOrders'

const Orders = ({user}) => {

  if(!user) {
    return <NoUser />
  } else if (user.isAdmin === true){
    return <AdminOrders />
  } else if(user.isAdmin === false) {
    return <UserOrders user={user} />
  }

}

export default Orders