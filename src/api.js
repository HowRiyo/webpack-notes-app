// src/api.js
const BASE_URL = 'https://notes-api.dicoding.dev/v2';

// Fetch all notes
export async function getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    const data = await response.json();
    return data.data;
}

// Add a new note
export async function addNote(title, body) {
    const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
    });
    return response.json();
}

// Delete a note
export async function deleteNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}
