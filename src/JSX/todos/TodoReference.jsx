// ParentComponent.js
import { useState, useEffect } from 'react';

//function ParentComponent() {
function TodoReference() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        // Fetch data from your API
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
        setLoading(false);
    };

    useEffect(() => {
        fetchData(); // Initial fetch
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleAddItem = async (newItem) => {
        // POST new item
        await fetch('/api/data', { method: 'POST', body: JSON.stringify(newItem) });
        fetchData(); // Re-fetch data to update the list
    };

    const handleDeleteItem = async (id) => {
        // DELETE item
        await fetch(`/api/data/${id}`, { method: 'DELETE' });
        fetchData(); // Re-fetch data to update the list
    };

    return (
        <div>
            <h1>Parent Component</h1>
            {loading && <ChildComponent data={data} onDelete={handleDeleteItem} />}
            <button onClick={handleAddItem}>Add Item</button>
        </div>
    );
}

// ChildComponent.js

function ChildComponent({ data, onDelete }) {
    return (
        <div>
            <h2>Child Component</h2>
            {data.map((item) => (
                <div key={item.id}>
                    {item.name}
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default TodoReference;