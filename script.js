document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.reset();
    });
    openForm();
    closeForm();
    toggleMenu();
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

