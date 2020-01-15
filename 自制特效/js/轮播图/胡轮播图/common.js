function my$(id) {
    return document.getElementById(id);
}

/**
 *
 * @param element
 * @param text
 */
function setInnerText(element,text){
    if (typeof element.textContent==="undefined"){
        element.innerText=text;
    }else{
        element.textContent=text;
    }
}

function getInnerText(element){
    if (typeof element.textContent=="undefined"){
        return element.innerText;
    } else {
        return element.textContent;
    }
}

function getFirstElementChild(element) {
    if (element.firstElementChild){
        return element.firstElementChild;
    }else{
        var node=element.firstChild;
        while (node&&node.nodeType!==1){
            node = node.nextSibling;
        }
    }
}

function getLastElementChild(element) {
    if (element.lastElementChild){
        return element.lastElementChild;
    }else{
        var node=element.lastChild;
        while (node&&node.nodeType!==1){
            node = node.previousSibling;
        }
    }
}

//为任意的元素绑定任意的事件，任意元素、事件的类型、事件处理函数
function addEventListener(element,type,fn) {
    if (element.addEventListener){
        element.addEventListener(type, fn, false);
    }else if (element.attachEvent){
        element.attachEvent("on"+type, fn);
    } else{
        element["on"+type]=fn;
    }
}
//移动元素
function animate(element,target) {
    var timeId=setInterval(function () {
        var current=element.offsetLeft;
        var step=20;
        step=current<target?step:-step;
        current+=step;
        if (Math.abs(target-current)>Math.abs(step)){
            element.style.left=current+"px";
        }else {
            element.style.left=target+"px";
            clearInterval(timeId);
        }
    },20);
}