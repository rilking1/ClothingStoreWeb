import React, { useState, useEffect } from 'react';

function Clients() {
    const [clients, setClients] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [clientPhotoId, setClientPhotoId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [editClientId, setEditClientId] = useState(null);

    useEffect(() => {
        fetchClients();
        fetchPhotos();
    }, []);

    const fetchClients = async () => {
        const response = await fetch('https://localhost:7122/api/Clients');
        const data = await response.json();
        setClients(data);
    };

    const fetchPhotos = async () => {
        const response = await fetch('https://localhost:7122/api/Photos');
        const data = await response.json();
        setPhotos(data);
    };

    const addClient = async () => {
        const response = await fetch('https://localhost:7122/api/Clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clientPhotoId, firstName, lastName })
        });
        if (response.ok) {
            fetchClients();
            resetForm();
        }
    };

    const deleteClient = async (id) => {
        const response = await fetch(`https://localhost:7122/api/Clients/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchClients();
        }
    };

    const startEditClient = (client) => {
        setEditClientId(client.id);
        setClientPhotoId(client.clientPhotoId);
        setFirstName(client.firstName);
        setLastName(client.lastName);
    };

    const editClient = async () => {
        const response = await fetch(`https://localhost:7122/api/Clients/${editClientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: editClientId, clientPhotoId, firstName, lastName })
        });
        if (response.ok) {
            fetchClients();
            resetForm();
        }
    };

    const resetForm = () => {
        setEditClientId(null);
        setClientPhotoId('');
        setFirstName('');
        setLastName('');
    };

    return (
        <div>
            <h1>Clients</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client Photo</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.photo ? <img src={client.photo.photoUrl} alt="Client Photo" width="50" /> : 'No Photo'}</td>
                            <td>{client.firstName}</td>
                            <td>{client.lastName}</td>
                            <td>
                                <button onClick={() => deleteClient(client.id)}>Delete</button>
                                <button onClick={() => startEditClient(client)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>{editClientId ? 'Edit Client' : 'Add Client'}</h2>
                <select value={clientPhotoId} onChange={e => setClientPhotoId(e.target.value)}>
                    <option value="">Select Photo</option>
                    {photos.map(photo => (
                        <option key={photo.id} value={photo.id}>
                            {photo.photoUrl}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Last Name"
                />
                <button onClick={editClientId ? editClient : addClient}>
                    {editClientId ? 'Save' : 'Add'}
                </button>
                {editClientId && <button onClick={resetForm}>Cancel</button>}
            </div>
        </div>
    );
}

export default Clients;
