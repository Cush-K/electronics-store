document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelectorAll('form');
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
    })

})

function openUploadBtn(){
   const open = document.querySelector('#myForm');
   open.addEventListener(`click`, ()=>{
    open.style.display = "block";
   })
}
function closeUploadForm(){
   const close = document.querySelector('#myForm');
   close.addEventListener('click', ()=>{
        close.style.display = "none"
   })
}