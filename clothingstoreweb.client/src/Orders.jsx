import React, { useState, useEffect } from 'react';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [productId, setProductId] = useState('');
    const [costs, setCosts] = useState('');
    const [quantity, setQuantity] = useState('');
    const [status, setStatus] = useState('');
    const [editOrderId, setEditOrderId] = useState(null);

    useEffect(() => {
        fetchOrders();
        fetchClients();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        const response = await fetch('https://localhost:7122/api/Orders');
        const data = await response.json();
        setOrders(data);
    };

    const fetchClients = async () => {
        const response = await fetch('https://localhost:7122/api/Clients');
        const data = await response.json();
        setClients(data);
    };

    const fetchProducts = async () => {
        const response = await fetch('https://localhost:7122/api/Products');
        const data = await response.json();
        setProducts(data);
    };

    const addOrder = async () => {
        const response = await fetch('https://localhost:7122/api/Orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerId, productId, costs, quantity, status })
        });
        if (response.ok) {
            fetchOrders();
            resetForm();
        }
    };

    const deleteOrder = async (id) => {
        const response = await fetch(`https://localhost:7122/api/Orders/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchOrders();
        }
    };

    const startEditOrder = (order) => {
        setEditOrderId(order.id);
        setCustomerId(order.customerId);
        setProductId(order.productId);
        setCosts(order.costs);
        setQuantity(order.quantity);
        setStatus(order.status);
    };

    const editOrder = async () => {
        const response = await fetch(`https://localhost:7122/api/Orders/${editOrderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: editOrderId, customerId, productId, costs, quantity, status })
        });
        if (response.ok) {
            fetchOrders();
            resetForm();
        }
    };

    const resetForm = () => {
        setEditOrderId(null);
        setCustomerId('');
        setProductId('');
        setCosts('');
        setQuantity('');
        setStatus('');
    };

    return (
        <div>
            <h1>Orders</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Costs</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.client ? `${order.client.firstName} ${order.client.lastName}` : 'No Customer'}</td>
                            <td>{order.products ? order.products.name : 'No Product'}</td>
                            <td>{order.costs}</td>
                            <td>{order.quantity}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => deleteOrder(order.id)}>Delete</button>
                                <button onClick={() => startEditOrder(order)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>{editOrderId ? 'Edit Order' : 'Add Order'}</h2>
                <select value={customerId} onChange={e => setCustomerId(e.target.value)}>
                    <option value="">Select Customer</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>
                            {client.firstName} {client.lastName}
                        </option>
                    ))}
                </select>
                <select value={productId} onChange={e => setProductId(e.target.value)}>
                    <option value="">Select Product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    value={costs}
                    onChange={e => setCosts(e.target.value)}
                    placeholder="Costs"
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    placeholder="Quantity"
                />
                <input
                    type="text"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    placeholder="Status"
                />
                <button onClick={editOrderId ? editOrder : addOrder}>
                    {editOrderId ? 'Save' : 'Add'}
                </button>
                {editOrderId && <button onClick={resetForm}>Cancel</button>}
            </div>
        </div>
    );
}

export default Orders;
