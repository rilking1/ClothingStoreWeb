import React, { useState, useEffect } from 'react';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await fetch('https://localhost:7122/api/Categories');
        const data = await response.json();
        setCategories(data);
    };

    const addCategory = async () => {
        const response = await fetch('https://localhost:7122/api/Categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryName })
        });
        if (response.ok) {
            fetchCategories();
            resetForm();
        }
    };

    const deleteCategory = async (id) => {
        const response = await fetch(`https://localhost:7122/api/Categories/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchCategories();
        }
    };

    const startEditCategory = (category) => {
        setEditCategoryId(category.id);
        setCategoryName(category.categoryName);
    };

    const editCategory = async () => {
        const response = await fetch(`https://localhost:7122/api/Categories/${editCategoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: editCategoryId, categoryName })
        });
        if (response.ok) {
            fetchCategories();
            resetForm();
        }
    };

    const resetForm = () => {
        setEditCategoryId(null);
        setCategoryName('');
    };

    return (
        <div>
            <h1>Categories</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.categoryName}</td>
                            <td>
                                <button onClick={() => deleteCategory(category.id)}>Delete</button>
                                <button onClick={() => startEditCategory(category)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>{editCategoryId ? 'Edit Category' : 'Add Category'}</h2>
                <input
                    type="text"
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                    placeholder="Category Name"
                />
                <button onClick={editCategoryId ? editCategory : addCategory}>
                    {editCategoryId ? 'Save' : 'Add'}
                </button>
                {editCategoryId && <button onClick={resetForm}>Cancel</button>}
            </div>
        </div>
    );
}

export default Categories;
