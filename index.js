let data = {
    title: '',
    year: 0,
    category: '',
    rating: '',
};

const updateData = () => {
    data = {
        title: document.getElementById('title').value,
        year: document.getElementById('year').value,
        category: document.getElementById('category').value,
        rating: document.querySelector('input[name="fb"]:checked').value,
    };
};

// Creating objects:

const createItem = () => {
    const id = new Date().getTime();
    const item =
        `<tr id="${id}">
            <td>${data.title}</td>
            <td>${data.year}</td>
            <td>${data.category}</td>
            <td>${data.rating}</td>
            <td>
                <button class="btn-trash" data-id="${id}">
                    Excluir
                </button>
            </td>
        </tr>`;

    localStorage.setItem(id, JSON.stringify(data));
    return item;
};

// Validation:

const register = () => {
    if (data.title == '' || data.year == 0 || data.category == '' || data.rating == '') {
        alert('Preencha todos os campos!');
    } else {
        document.getElementById('list-film').insertAdjacentHTML('beforeend', createItem());
        data = {};
    }
};

// Removing items:

document.addEventListener('click', (e) => {
    const listClass = Array.prototype.slice.call(e.target.classList);

    if (e.target && listClass.includes('btn-trash')) {
        const response = confirm('Deseja realmente excluir o filme?');

        if (response) {
            const id = e.target.dataset.id;
            document.getElementById(id).remove();
            localStorage.removeItem(id);
        }
    }
});

// Recovering the objects from localStorage:

for (let i = 0; i < localStorage.length; i++) {
    document.getElementById('list-film').insertAdjacentHTML('beforeend',
        `<tr id="${localStorage.key(i)}">
            <td>${JSON.parse(localStorage.getItem(localStorage.key(i))).title}</td>
            <td>${JSON.parse(localStorage.getItem(localStorage.key(i))).year}</td>
            <td>${JSON.parse(localStorage.getItem(localStorage.key(i))).category}</td>
            <td>${JSON.parse(localStorage.getItem(localStorage.key(i))).rating}</td>
            <td>
                <button class="btn-trash" data-id="${localStorage.key(i)}">
                    Excluir
                </button>
            </td>
        </tr>`
    );
};