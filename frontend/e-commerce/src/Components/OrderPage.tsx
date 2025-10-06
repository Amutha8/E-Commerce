import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  address: string;
  status: string;
  createdAt: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const userId = 'YOUR_USER_ID'; 

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`/orders/user/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 rounded shadow">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>
            <div className="mt-2">
              <strong>Items:</strong>
              <ul className="ml-4 list-disc">
                {order.items.map((item) => (
                  <li key={item.productId}>
                    {item.name} x {item.quantity} = ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
