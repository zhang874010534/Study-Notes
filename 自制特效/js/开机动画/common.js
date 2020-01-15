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
//移动元素匀速 uniform
function animateU(element,target) {
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
//移动元素变速 shift
/**
 *
 * @param element--元素名字
 * @param json---属性名字对象集合如 left
 * @param fn---函数
 */
function animateS(element,json,fn) {
    clearInterval(element.timeId);
    element.timeId=setInterval(function () {
        var flag=true;
        for (var attr in json){
            if (attr==="z-index"){//判断是不是zIndex
                element.style[attr]=json[attr];
            }else if (attr==="opacity"){//透明度
                //当前透明度
                var current=window.getComputedStyle(element,null)[attr]*100;
                //目标透明度
                var target=json[attr]*100;
                var step=(target-current)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                current+=step;
                element.style[attr]=current/100;
                if (target!==current){
                    flag=false;
                }
            }else {
                var current=parseInt(window.getComputedStyle(element,null)[attr]);
                var target=json[attr];
                var step=(target-current)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                current+=step;
                element.style[attr]=current+"px";
                if (target!==current){
                    flag=false;
                }
            }
            // console.log("current:"+current+"target:"+target+"step:"+step);
        }
        if (flag){
            clearInterval(element.timeId);
            if (fn){
                fn();
            }
        }
    },20);

}