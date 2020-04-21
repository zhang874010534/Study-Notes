let nameEle=document.querySelector("#name")
let textEle=document.querySelector("#text")

let obj={}
Object.defineProperty(obj,'name',{
  get(){

  },
  set(newName){
    textEle.innerText=newName
  }
})

nameEle.addEventListener('keyup',()=>{
  obj.name=event.target.value
})