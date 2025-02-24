import gsap from 'gsap';
import Swal from 'sweetalert2';

class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    background: #f9f9f9;
                    padding: 15px;
                    border-radius: 5px;
                }
                input, textarea {
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                button {
                    background: blue;
                    color: white;
                    padding: 10px;
                    border: none;
                    cursor: pointer;
                }
            </style>
            <form id="note-form">
                <input id="title" type="text" placeholder="Judul" />
                <textarea id="body" placeholder="Isi catatan"></textarea>
                <button type="submit">Tambah</button>
            </form>
        `;

        this.shadowRoot.querySelector('#note-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const title = this.shadowRoot.querySelector('#title').value.trim();
            const body = this.shadowRoot.querySelector('#body').value.trim();

            if (!title || !body) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Judul dan isi catatan tidak boleh kosong!',
                });
                return;
            }

            this.dispatchEvent(new CustomEvent('add-note', {
                detail: { title, body },
                bubbles: true,
                composed: true
            }));

            this.shadowRoot.querySelector('#note-form').reset();

            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Catatan berhasil ditambahkan.',
            });
        });
    }
}

if (!customElements.get("note-form")) {
    customElements.define("note-form", NoteForm);
}

