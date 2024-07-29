import React, { useState } from "react"
import { useCreate, useDelete, useFetch, useUpdate } from "./APICALL"


const url = "http://localhost:8080/v1/api/contest/"

const Use = () => {
    const { data, loading, fetchError, ReFetch } = useFetch(url)
    const { updateError, UpdateData } = useUpdate(url)
    const { deleteError, DeleteData } = useDelete("http://localhost:8080/v1/api/contest")
    const { createError, CreateData } = useCreate(url)


    const [newData, setNewData] = useState({});
    const [updatedData, setUpdatedData] = useState({});
    const [idToDelete, setIdToDelete] = useState('');

    const handleCreate = () => {
        CreateData(newData);
        setNewData({}); // Clear the new data after creating
    };

    const handleUpdate = (id) => {
        UpdateData(id, updatedData);
        setUpdatedData({}); // Clear the updated data after updating
    };

    const handleDelete = (id) => {
        DeleteData(id);
        setIdToDelete(''); // Clear the id to delete after deleting
    };


    return (
        <div>
            <button onClick={ReFetch} disabled={loading}>
                Fetch Data
            </button>
            {loading && <p>Loading...</p>}
            {/* {fetchError && <p>Error: </p>} */}
            <ul>
                {data.map(item => (
                    <ul key={item.id}>
                        <li>{item.id}</li>
                        <li >{item.name}</li>
                        <li>{item.description}</li>
                        <button onClick={handleCreate}>
                            Create Data
                        </button>
                        <button onClick={() => handleUpdate(item.id)}>
                            Update Data
                        </button>
                        <button onClick={() => handleDelete(item.id)}>
                            Delete Data
                        </button>
                    </ul>

                ))}
            </ul>

            <input
                type="text"
                value={newData.name || ''}
                onChange={(e) => setNewData({ name: e.target.value })}
            />
            <button onClick={handleCreate}>
                Create Data
            </button>
            {createError && <p>Error: in Create </p>}

            <input
                type="text"
                value={updatedData.name || ''}
                onChange={(e) => setUpdatedData({ name: e.target.value })}
            />
            <button onClick={() => handleUpdate(1)}>
                Update Data
            </button>
            {updateError && <p>Error: Update</p>}
        </div>
    );

}

export default Use;