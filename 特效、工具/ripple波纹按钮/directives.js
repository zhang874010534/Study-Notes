export default {
    install(Vue) {
        Vue.directive('ripple',{
            inserted:function(el){
              el.classList.add('my-ripple');
              el.onclick = function(e){
                let bounding = el.getBoundingClientRect();
                let x = e.clientX - bounding.left;
                let y = e.clientY - bounding.top;
                let ripple = document.createElement("span");
                ripple.classList.add('ripple-span')
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                this.appendChild(ripple);
                setTimeout(() => {
                  this.removeChild(ripple);
                }, 600);
              }
              
            }
          })
    }
}