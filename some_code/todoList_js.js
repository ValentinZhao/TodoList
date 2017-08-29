/**
 * left,top是这个框的坐标
 * current是鼠标的坐标，因为我们用e.clientX来记录鼠标的位置，每次鼠标点击拖拽的时候
 * 坐标都不一致
 * 我们的算法就是，通过current字段与clientX的偏移量计算，再加之left, top赋给target.style.left(top)来实现框的移动
 */

let params = {
    flag: false,
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0
}

function getCss (target, key) {
    return target.currentStyle ? target.currentStyle[key] : document.defaultView.getComputedStyle(target, false)[key];
}

function startDrag (bar, target, callback) {
    if (getCss(target, 'left') !== 'auto') {
        params.left = getCss(target, 'left');
    }

    if (getCss(target, 'top') !== auto) {
        params.top = getCss(target, 'top');
    }

    bar.onmousedown = function(event) {
        if (!event) {
            event = window.event;
        }

        params.flag = true;
        params.currentX = event.clientX;
        params.currentY = event.clientY;
    }

    document.onmouseup = function(event) {
        if (!event) {
            event = window.event;
        }

        /**
         * 抬起鼠标，则重置现在框的位置
         */
        if(getCss(target, "left") !== "auto"){
            params.left = getCss(target, "left");
        }
        if(getCss(target, "top") !== "auto"){
            params.top = getCss(target, "top");
        }

    }

    document.onmousemove = function(event) {
        let e = event ? event : window.event;
        if(params.flag){
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - params.currentX, disY = nowY - params.currentY;
            target.style.left = parseInt(params.left) + disX + "px";
            target.style.top = parseInt(params.top) + disY + "px";
            if (event.preventDefault) {
                event.preventDefault();
            }
            return false;
        }
        
        if (typeof callback == "function") {
            callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
        }
    }

    let div = document.getElementsByClassName('test-box')[0];
    startDrag(div, div, console.log('MOVED!'));
}