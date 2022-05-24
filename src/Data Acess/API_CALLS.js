export const API_CALLS = {
  fetchUserOrders: async (user) => {
    const res = await fetch("http://localhost:8088/orders");
    const res1 = await res.json();
    const userOrders = await res1.filter((data) => data.userId === user.id);
    return userOrders;
  },

  fetchOrders: async () => {
    const res = await fetch("http://localhost:8088/orders");
    const res1 = await res.json();
    return res1;
  },

  postNewOrder: async (shoppingCart, user) => {
    const newDate = new Date();
    const orderTimeStamp = newDate.getTime()
    const newOrder = {
      userId: user.id,
      orderedProducts: shoppingCart,
      orderPlacedDate: orderTimeStamp,
      expectedReceivedDate: null,
      status: "Pending",
    };

     await fetch("http://localhost:8088/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });

  },

  fetchProducts: async () => {
    const res = await fetch("http://localhost:8088/products");
    const res1 = await res.json();
    const products = res1;
    return products;
  },

  updateOrder: async (orderId, updatedOrder) => {
     await fetch(`http://localhost:8088/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder)
    })
  },

  fetchUsers: async () => {
    const res = await fetch("http://localhost:8088/users");
    const res1 = await res.json();
    return res1;
  }
};
