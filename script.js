document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#search')
    form.addEventListener('submit', (e) => {
        const input = document.querySelector('input#searchByID').value;
           
            fetch(`http://localhost:3000/items/${input}`)
            .then(res => res.json())
            .then(data => {
                rendering([data]);
            });
        e.preventDefault();
        form.reset();
    });

    const uploads = document.querySelector('.uploadForm')
    uploads.addEventListener('submit', (e) => {
        e.preventDefault();
        let deviceObj = {
            id:document.querySelector('#itemID').value,
            title:document.querySelector('#itemName').value,
            image:document.querySelector('#itemImage').value,
            price:document.querySelector('#itemPrice').value,
            quantity:document.querySelector('#itemQuantity').value
        }
        uploadItems(deviceObj)
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
        title.textContent = item.title;
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

                
        const editBtn = document.createElement('button');
        editBtn.classList.add("edit-btn")
        editBtn.textContent = "EDIT";
        editBtn.addEventListener('click', () => editItems(item))
        productDiv.appendChild(editBtn);

        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "DELETE";
        deleteBtn.addEventListener('click', () => deleteItems(item.id));
        productDiv.appendChild(deleteBtn);


        content.appendChild(productDiv);
    });
}

function uploadItems(deviceObj){
     fetch("http://localhost:3000/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body:JSON.stringify(deviceObj),
     })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error)
    });
}
function deleteItems(id) {
    fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
            devices();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function editItems(item){
    const body = document.querySelector('#mainContainer')
    const editForm = document.createElement('form');
    editForm.classList.add("edit-form")
    editForm.innerHTML = `  <label for="itemID">Item ID</label>
                            <input type="text" value=${item.id} id="editItemID" required />

                            <label for="itemName">Item Name</label>
                            <input type="text" value=${item.title} id="editItemName" required />

                            <label for="itemImage">Link to Image</label>
                            <input type="text" placeholder="Image" id="editItemImage" required />

                            <label for="itemPrice">Price</label>
                            <input type="text" placeholder="Price" id="editItemPrice" required />

                            <label for="quantity">Quantity</label>
                            <input type="text" placeholder="quantity" id="editItemQuantity" required />

                            <input type="submit" name="post" id="edit" value="UPLOAD" />`
            console.log(editForm)
    body.appendChild(editForm);
    editForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        let deviceObj = {
            id:document.querySelector('#editItemID').value,
            title:document.querySelector('#editItemName').value,
            image:document.querySelector('#editItemImage').value,
            price:document.querySelector('#editItemPrice').value,
            quantity:document.querySelector('#editItemQuantity').value
        }
            editForm.style.display = "none"          
        
    
        fetch(`http://localhost:3000/items/${item.id}`, {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(deviceObj)
        })
        // .then(res => res.json())
        // .then
    })    



   
}