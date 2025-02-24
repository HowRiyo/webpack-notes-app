import './note-form.js';
import './note-list.js';
import { getNotes, addNote, deleteNote } from './api.js';
import showLoading from './loading.js';
import gsap from 'gsap';



document.addEventListener('DOMContentLoaded', async () => {
    const noteList = document.querySelector('note-list');
    const noteForm = document.querySelector('note-form');

    async function fetchAndDisplayNotes() {
        showLoading(true);
        const notes = await getNotes();
        showLoading(false);
        noteList.notes = notes;
    }

    noteForm.addEventListener('add-note', async (event) => {
        showLoading(true);
        await addNote(event.detail.title, event.detail.body);
        await fetchAndDisplayNotes();
        showLoading(false);
    });

    noteList.addEventListener('delete-note', async (event) => {
        showLoading(true);
        await deleteNote(event.detail);
        await fetchAndDisplayNotes();
        showLoading(false);
    });

    await fetchAndDisplayNotes();
});
