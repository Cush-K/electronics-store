//Make sure the script only loads after all the content has loaded
document.addEventListener('DOMContentLoaded', () => {

    //Adds an event listener to the search form
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

    //Adds an event listener to the uploads form
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


//toggle between showing and hiding the upload form
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

//The GET functionality to render items on the DOM from the JSON
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

       //Creates the edit button
        const editBtn = document.createElement('button');
        editBtn.classList.add("edit-btn")
        editBtn.textContent = "EDIT";
        editBtn.addEventListener('click', () => editItems(item, productDiv))
        productDiv.appendChild(editBtn);

        //Creates the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "DELETE";
        deleteBtn.addEventListener('click', () => deleteItems(item.id));
        productDiv.appendChild(deleteBtn);


        content.appendChild(productDiv);
    });
}

//The POST funtion for Creating items into the JSON using the upload form
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
        console.log(data);
        devices();
    })
    .catch(error => {
        console.error('Error:', error)
    });
}

//The DELETE function to destroy records from the JSON
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

//Creates the Edit form
function editItems(item, productDiv){
    const editForm = document.createElement('form');
    editForm.classList.add("edit-form")
    editForm.innerHTML = `  <label for="itemID">Item ID</label>
                            <input type="text" value=${item.id} id="editItemID" required />

                            <label for="itemName">Item Name</label>
                            <input type="text" value=${item.title} id="editItemName" required />

                            <label for="itemImage">Link to Image</label>
                            <input type="text" value=${item.image} id="editItemImage" required />

                            <label for="itemPrice">Price</label>
                            <input type="text" value=${item.price} id="editItemPrice" required />

                            <label for="quantity">Quantity</label>
                            <input type="text" value=${item.quantity} id="editItemQuantity" required />

                            <nav class="buttons">
                            <input type="submit" value="SAVE" />
                            <button type="button" class="cancelEditBtn">CANCEL</button>
                            </nav>`
    
    productDiv.appendChild(editForm);
    
    editForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const deviceObjEdit = {
            id:document.querySelector('#editItemID').value,
            title:document.querySelector('#editItemName').value,
            image:document.querySelector('#editItemImage').value,
            price:document.querySelector('#editItemPrice').value,
            quantity:document.querySelector('#editItemQuantity').value
        }
      
        //The PUT function to update items in the JSON usin the edit form
        fetch(`http://localhost:3000/items/${item.id}`, {
            method: 'PUT',
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(deviceObjEdit)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                devices();
            })
            .catch(error => {
                console.error('Error:', error)
            });
});

//Adds event listener to the cancel button of the edit form
    const cancelEditBtn = editForm.querySelector('.cancelEditBtn');
    cancelEditBtn.addEventListener('click', () => {
        editForm.remove();
    });

    productDiv.appendChild(editForm);

}