import gsap from 'gsap';
import Swal from 'sweetalert2';


class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set note(data) {
        this._note = data;
        this.render();
    }

    connectedCallback() {
        gsap.from(this, { opacity: 0, y: 20, duration: 0.5 });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .note {
                    padding: 10px;
                    border: 1px solid #ddd;
                    margin: 5px;
                    border-radius: 5px;
                    background: white;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .delete-btn {
                    background: #B03C3F;
                    color: white;
                    padding: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    border: none;
                    border-radius: 5px;
                }
            </style>
            <div class="note">
                <div>
                    <h3>${this._note.title}</h3>
                    <p>${this._note.body}</p>
                </div>
                <button class="delete-btn">Hapus</button>
            </div>
        `;

        this.shadowRoot.querySelector('.delete-btn').addEventListener('click', async () => {
            const confirmation = await Swal.fire({
                title: 'Yakin ingin menghapus?',
                text: 'Catatan ini akan dihapus secara permanen!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal',
            });
        
            if (confirmation.isConfirmed) {
                this.dispatchEvent(new CustomEvent('delete-note', {
                    detail: this._note.id,
                    bubbles: true,
                    composed: true
                }));
            }
        });
        
    }
}

customElements.define('note-item', NoteItem);
