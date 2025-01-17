import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/admin/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/admin/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchProducts();
    fetchOrders();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Panel</h1>

      {/* Product Management */}
      <section>
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => deleteProduct(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Order Management */}
      <section>
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId?.name}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
                <td>
                  <button>Update Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPanel;
