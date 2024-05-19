import React, { useState, useEffect } from 'react';

function Colors() {
    const [colors, setColors] = useState([]);
    const [colorName, setColorName] = useState('');
    const [editColorId, setEditColorId] = useState(null);

    useEffect(() => {
        fetchColors();
    }, []);

    const fetchColors = async () => {
        const response = await fetch('https://localhost:7122/api/Colors');
        const data = await response.json();
        setColors(data);
    };

    const addColor = async () => {
        const response = await fetch('https://localhost:7122/api/Colors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ colorName })
        });
        if (response.ok) {
            fetchColors();
            setColorName('');
        }
    };

    const deleteColor = async (id) => {
        const response = await fetch(`https://localhost:7122/api/Colors/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchColors();
        }
    };

    const startEditColor = (id, name) => {
        setEditColorId(id);
        setColorName(name);
    };

    const editColor = async () => {
        const response = await fetch(`https://localhost:7122/api/Colors/${editColorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: editColorId, colorName })
        });
        if (response.ok) {
            fetchColors();
            setEditColorId(null);
            setColorName('');
        }
    };

    return (
        <div>
            <h1>Colors</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Color Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {colors.map(color => (
                        <tr key={color.id}>
                            <td>{color.id}</td>
                            <td>{color.colorName}</td>
                            <td>
                                <button onClick={() => deleteColor(color.id)}>Delete</button>
                                <button onClick={() => startEditColor(color.id, color.colorName)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>{editColorId ? 'Edit Color' : 'Add Color'}</h2>
                <input
                    type="text"
                    value={colorName}
                    onChange={e => setColorName(e.target.value)}
                    placeholder="Color Name"
                />
                <button onClick={editColorId ? editColor : addColor}>
                    {editColorId ? 'Save' : 'Add'}
                </button>
                {editColorId && <button onClick={() => { setEditColorId(null); setColorName(''); }}>Cancel</button>}
            </div>
        </div>
    );
}

export default Colors;
