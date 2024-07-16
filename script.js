document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#search')
    form.addEventListener('submit', (e) => {
        const input = document.querySelector('input#searchByID').value;
           
            fetch(`http://localhost:3000/items/${input}`)
            .then(res => res.json())
            .then(data => {
                rendering([data]);
            //     const image = document.querySelector('.image')
            //     const id = document.querySelector('.ID');
            //     const title = document.querySelector('.title');
            //     const price = document.querySelector('.price');
            //     const quantity = document.querySelector('.quantity');

            //     image.src = data.image;
            //     id.textContent = `Product ID: ${data.id}`;
            //     title.textContent = `Title: ${data.title}`;
            //     price.textContent = `Price: ${data.price}`;
            //     quantity.textContent = `${data.quantity} PIECES LEFT`;
            });
        e.preventDefault();
        form.reset();
    });

    const uploads = document.querySelector('.uploadForm')
    uploads.addEventListener('submit', (e) => {
        e.preventDefault();
        uploads.reset();
    });

    openForm();
    closeForm();
    toggleMenu();
    devices();
});

const openFormButton = document.querySelector('.openForm');
const closeFormButton = document.querySelector('.cancelBtn');
const formPopup = document.querySelector('#myForm');
const burger = document.querySelector('.burger-menu');
const menuItems = document.querySelectorAll('.menu')

function openForm() {
    openFormButton.addEventListener('click', () => {
        formPopup.style.display = 'flex';
    });
}

function closeForm() {
    closeFormButton.addEventListener('click', () => {
        formPopup.style.display = 'none';
    });
}

function toggleMenu() {
    burger.addEventListener('click', () => {
        menuItems.forEach(item => {
            if (item.style.display === 'flex') {
                item.style.display = 'none';
            } else {
                item.style.display = 'flex';
            }
        });
    });
}
function devices(){
    fetch("http://localhost:3000/items/")
    .then(res => res.json())
    .then(data => rendering(data));
}

function rendering(items) {
    const content = document.querySelector('.content');
    content.textContent = '';
    
    items.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const image = document.createElement('img');
        image.src = item.image;
        image.classList.add('image');

        const id = document.createElement('h1');
        id.textContent = `Product ID: ${item.id}`;
        id.classList.add('ID');

        const title = document.createElement('h3');
        title.textContent = `Title: ${item.title}`;
        title.classList.add('title');

        const price = document.createElement('p');
        price.textContent = `Price: ${item.price}`;
        price.classList.add('price');

        const quantity = document.createElement('p');
        quantity.textContent = `${item.quantity} PIECES LEFT`;
        quantity.classList.add('quantity');

        productDiv.appendChild(image);
        productDiv.appendChild(id);
        productDiv.appendChild(title);
        productDiv.appendChild(price);
        productDiv.appendChild(quantity);

        content.appendChild(productDiv);
    });
}
