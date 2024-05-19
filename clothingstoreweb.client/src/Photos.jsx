import React, { useState, useEffect } from 'react';

function Photos() {
    const [photos, setPhotos] = useState([]);
    const [photoUrl, setPhotoUrl] = useState('');
    const [editPhotoId, setEditPhotoId] = useState(null);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        const response = await fetch('https://localhost:7122/api/Photos');
        const data = await response.json();
        setPhotos(data);
    };

    const addPhoto = async () => {
        const response = await fetch('https://localhost:7122/api/Photos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ photoUrl })
        });
        if (response.ok) {
            fetchPhotos();
            setPhotoUrl('');
        }
    };

    const deletePhoto = async (id) => {
        const response = await fetch(`https://localhost:7122/api/Photos/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchPhotos();
        }
    };

    const startEditPhoto = (id, url) => {
        setEditPhotoId(id);
        setPhotoUrl(url);
    };

    const editPhoto = async () => {
        const response = await fetch(`https://localhost:7122/api/Photos/${editPhotoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: editPhotoId, photoUrl })
        });
        if (response.ok) {
            fetchPhotos();
            setEditPhotoId(null);
            setPhotoUrl('');
        }
    };

    return (
        <div>
            <h1>Photos</h1>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Photo Url</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {photos.map(photo => (
                        <tr key={photo.id}>
                            <td>{photo.id}</td>
                            <td>{photo.photoUrl}</td>
                            <td>
                                <button onClick={() => deletePhoto(photo.id)}>Delete</button>
                                <button onClick={() => startEditPhoto(photo.id, photo.photoUrl)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>{editPhotoId ? 'Edit Photo' : 'Add Photo'}</h2>
                <input
                    type="text"
                    value={photoUrl}
                    onChange={e => setPhotoUrl(e.target.value)}
                    placeholder="Photo Url"
                />
                <button onClick={editPhotoId ? editPhoto : addPhoto}>
                    {editPhotoId ? 'Save' : 'Add'}
                </button>
                {editPhotoId && <button onClick={() => { setEditPhotoId(null); setPhotoUrl(''); }}>Cancel</button>}
            </div>
        </div>
    );
}

export default Photos;
