import React, { useState, useEffect } from 'react';

function Products() {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [sizeId, setSizeId] = useState('');
    const [colorId, setColorId] = useState('');
    const [materialId, setMaterialId] = useState('');
    const [photoId, setPhotoId] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [editProductId, setEditProductId] = useState(null);

    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchSizes();
        fetchColors();
        fetchMaterials();
        fetchPhotos();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch('https://localhost:7122/api/Products');
        const data = await response.json();
        setProducts(data);
    };

    const fetchCategories = async () => {
        const response = await fetch('https://localhost:7122/api/Categories');
        const data = await response.json();
        setCategories(data);
    };

    const fetchSizes = async () => {
        const response = await fetch('https://localhost:7122/api/Sizes');
        const data = await response.json();
        setSizes(data);
    };

    const fetchColors = async () => {
        const response = await fetch('https://localhost:7122/api/Colors');
        const data = await response.json();
        setColors(data);
    };

    const fetchMaterials = async () => {
        const response = await fetch('https://localhost:7122/api/Materials');
        const data = await response.json();
        setMaterials(data);
    };

    const fetchPhotos = async () => {
        const response = await fetch('https://localhost:7122/api/Photos');
        const data = await response.json();
        setPhotos(data);
    };

    const addProduct = async () => {
        const response = await fetch('https://localhost:7122/api/Products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productName, description, categoryId, price, sizeId, colorId, materialId, photoId, productQuantity })
        });
        if (response.ok) {
            fetchProducts();
            resetForm();
        }
    };

    const deleteProduct = async (id) => {
        const response = await fetch(`https://localhost:7122/api/Products/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchProducts();
        }
    };

    const startEditProduct = (product) => {
        setEditProductId(product.id);
        setProductName(product.productName);
        setDescription(product.description);
        setCategoryId(product.categoryId);
        setPrice(product.price);
        setSizeId(product.sizeId);
        setColorId(product.colorId);
        setMaterialId(product.materialId);
        setPhotoId(product.photoId);
        setProductQuantity(product.productQuantity);
    };

    const editProduct = async () => {
        const response = await fetch(`https://localhost:7122/api/Products/${editProductId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: editProductId, productName, description, categoryId, price, sizeId, colorId, materialId, photoId, productQuantity })
        });
        if (response.ok) {
            fetchProducts();
            resetForm();
        }
    };

    const resetForm = () => {
        setEditProductId(null);
        setProductName('');
        setDescription('');
        setCategoryId('');
        setPrice('');
        setSizeId('');
        setColorId('');
        setMaterialId('');
        setPhotoId('');
        setProductQuantity('');
    };

    return (
        <div>
            <h1>Products</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Category Id</th>
                        <th>Price</th>
                        <th>Size Id</th>
                        <th>Color Id</th>
                        <th>Material Id</th>
                        <th>Photo Id</th>
                        <th>Product Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.productName}</td>
                            <td>{product.description}</td>
                            <td>{product.categoryId}</td>
                            <td>{product.price}</td>
                            <td>{product.sizeId}</td>
                            <td>{product.colorId}</td>
                            <td>{product.materialId}</td>
                            <td>{product.photoId}</td>
                            <td>{product.productQuantity}</td>
                            <td>
                                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                                <button onClick={() => startEditProduct(product)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>{editProductId ? 'Edit Product' : 'Add Product'}</h2>
                <input
                    type="text"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="Product Name"
                />
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Price"
                />
                <select value={sizeId} onChange={e => setSizeId(e.target.value)}>
                    <option value="">Select Size</option>
                    {sizes.map(size => (
                        <option key={size.id} value={size.id}>
                            {size.sizeName}
                        </option>
                    ))}
                </select>
                <select value={colorId} onChange={e => setColorId(e.target.value)}>
                    <option value="">Select Color</option>
                    {colors.map(color => (
                        <option key={color.id} value={color.id}>
                            {color.colorName}
                        </option>
                    ))}
                </select>
                <select value={materialId} onChange={e => setMaterialId(e.target.value)}>
                    <option value="">Select Material</option>
                    {materials.map(material => (
                        <option key={material.id} value={material.id}>
                            {material.materialName}
                        </option>
                    ))}
                </select>
                <select value={photoId} onChange={e => setPhotoId(e.target.value)}>
                    <option value="">Select Photo</option>
                    {photos.map(photo => (
                        <option key={photo.id} value={photo.id}>
                            {photo.photoUrl}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={productQuantity}
                    onChange={e => setProductQuantity(e.target.value)}
                    placeholder="Product Quantity"
                />
                <button onClick={editProductId ? editProduct : addProduct}>
                    {editProductId ? 'Save' : 'Add'}
                </button>
                {editProductId && <button onClick={resetForm}>Cancel</button>}
            </div>
        </div>
    );
}

export default Products;
