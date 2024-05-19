import React, { useState, useEffect } from 'react';

function Materials() {
    const [materials, setMaterials] = useState([]);
    const [materialName, setMaterialName] = useState('');
    const [editMaterialId, setEditMaterialId] = useState(null);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        const response = await fetch('https://localhost:7122/api/Materials');
        const data = await response.json();
        setMaterials(data);
    };

    const addMaterial = async () => {
        const response = await fetch('https://localhost:7122/api/Materials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ materialName })  // змінено тут
        });
        if (response.ok) {
            fetchMaterials();
            setMaterialName('');
        }
    };

    const deleteMaterial = async (id) => {
        const response = await fetch(`https://localhost:7122/api/Materials/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchMaterials();
        }
    };

    const startEditMaterial = (id, name) => {
        setEditMaterialId(id);
        setMaterialName(name);
    };

    const editMaterial = async () => {
        const response = await fetch(`https://localhost:7122/api/Materials/${editMaterialId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: editMaterialId, materialName })  // змінено тут
        });
        if (response.ok) {
            fetchMaterials();
            setEditMaterialId(null);
            setMaterialName('');
        }
    };

    return (
        <div>
            <h1>Materials</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Material Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map(material => (
                        <tr key={material.id}>
                            <td>{material.id}</td>
                            <td>{material.materialName}</td>  {/* змінено тут */}
                            <td>
                                <button onClick={() => deleteMaterial(material.id)}>Delete</button>
                                <button onClick={() => startEditMaterial(material.id, material.materialName)}>Edit</button>  {/* змінено тут */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>{editMaterialId ? 'Edit Material' : 'Add Material'}</h2>
                <input
                    type="text"
                    value={materialName}
                    onChange={e => setMaterialName(e.target.value)}
                    placeholder="Material Name"
                />
                <button onClick={editMaterialId ? editMaterial : addMaterial}>
                    {editMaterialId ? 'Save' : 'Add'}
                </button>
                {editMaterialId && <button onClick={() => { setEditMaterialId(null); setMaterialName(''); }}>Cancel</button>}
            </div>
        </div>
    );
}

export default Materials;
