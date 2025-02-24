import './note-item.js';


class NoteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set notes(data) {
        this._notes = data;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    height: 55vh;
                    overflow: scroll;
                }
            </style>
            <div class="container"></div>
        `;

        const container = this.shadowRoot.querySelector('.container');

        if (this.notes) {
            this._notes.forEach(note => {
                const noteElement = document.createElement('note-item');
                noteElement.note = note;
                container.appendChild(noteElement);
            });
        } else {
            const emptyMessage = document.createElement('div');
            emptyMessage.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            `;
            emptyMessage.textContent = 'Catatan masih kosong.';
            container.appendChild(emptyMessage);
        }
    }
}

customElements.define('note-list', NoteList);
