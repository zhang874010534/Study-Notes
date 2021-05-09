export function move(e){
  let dom=e.target
  //阻止默认事件的方法,如果不阻止默认事件onmouseup会无法触发
  e.preventDefault();
  let disX = e.clientX - dom.offsetLeft;
  let disY = e.clientY - dom.offsetTop;
  document.onmousemove=function (e) {
    //因为img居中对齐，所以还要减去目标元素距离body的偏移量
    let left = e.clientX - disX ;    
    let top = e.clientY - disY;
    //移动当前元素
    dom.style.left = left + 'px';
    dom.style.top = top + 'px';
  }
  document.onmouseup = (e) => {
      document.onmousemove = null;
      document.onmouseup = null;
}