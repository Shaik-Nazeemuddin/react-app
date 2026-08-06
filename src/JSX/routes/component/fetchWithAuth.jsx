// utils/fetchWithAuth.jsx
export async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            return res; // ✅ success
        }

        // Handle specific status codes
        if (res.status === 401 || res.status === 403) {
            console.warn("Auth error: clearing token");
            localStorage.removeItem("token");
            // Optionally redirect to login page
            // window.location.href = "/login";
        }

        // Throw for caller to handle if needed
        throw new Error(`Request failed with status ${res.status}`);
    } catch (err) {
        console.error("Network error:", err);
        throw err; // rethrow so caller can handle
    }
}

export default fetchWithAuth

export async function fetchTodos() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!res.ok) {
            throw new Error("API Error Something went wrong");
        }
        return await res.json();
    } catch (err) {
        (err.message)
    }
}
