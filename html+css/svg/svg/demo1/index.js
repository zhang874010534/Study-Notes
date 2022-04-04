var button=document.querySelector('.upload-button')

button.addEventListener('click',()=>{

  button.classList.replace('uploaded','uploading')
  setTimeout(() => {
    
    button.classList.replace('uploading','uploaded')
  }, 5000);
})