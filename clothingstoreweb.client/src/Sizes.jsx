import React, { useState, useEffect } from 'react';

function Sizes() {
    const [sizes, setSizes] = useState([]);
    const [sizeName, setSizeName] = useState('');
    const [editSizeId, setEditSizeId] = useState(null);

    useEffect(() => {
        fetchSizes();
    }, []);

    const fetchSizes = async () => {
        const response = await fetch('https://localhost:7122/api/Sizes');
        const data = await response.json();
        setSizes(data);
    };

    const addSize = async () => {
        const response = await fetch('https://localhost:7122/api/Sizes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sizeName })
        });
        if (response.ok) {
            fetchSizes();
            setSizeName('');
        }
    };

    const deleteSize = async (id) => {
        const response = await fetch(`https://localhost:7122/api/Sizes/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchSizes();
        }
    };

    const startEditSize = (id, name) => {
        setEditSizeId(id);
        setSizeName(name);
    };

    const editSize = async () => {
        const response = await fetch(`https://localhost:7122/api/Sizes/${editSizeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: editSizeId, sizeName })
        });
        if (response.ok) {
            fetchSizes();
            setEditSizeId(null);
            setSizeName('');
        }
    };

    return (
        <div>
            <h1>Sizes</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Size Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sizes.map(size => (
                        <tr key={size.id}>
                            <td>{size.id}</td>
                            <td>{size.sizeName}</td>
                            <td>
                                <button onClick={() => deleteSize(size.id)}>Delete</button>
                                <button onClick={() => startEditSize(size.id, size.sizeName)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>{editSizeId ? 'Edit Size' : 'Add Size'}</h2>
                <input
                    type="text"
                    value={sizeName}
                    onChange={e => setSizeName(e.target.value)}
                    placeholder="Size Name"
                />
                <button onClick={editSizeId ? editSize : addSize}>
                    {editSizeId ? 'Save' : 'Add'}
                </button>
                {editSizeId && <button onClick={() => { setEditSizeId(null); setSizeName(''); }}>Cancel</button>}
            </div>
        </div>
    );
}

export default Sizes;
