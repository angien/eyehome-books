function expandrl() {
    expand($('.rectangleLeft').attr("id"), 1);
    //shrink($('.rectangleTop').attr("id"), 0);
    //shrink($('.rectangleRight').attr("id"), 1);
    //shrink($('.rectangleBottom').attr("id"), 0);
    sClickd(1);
}

function expandrt() {
    //shrink($('.rectangleLeft').attr("id"), 1);
    expand($('.rectangleTop').attr("id"), 0);
    //shrink($('.rectangleRight').attr("id"), 1);
    //shrink($('.rectangleBottom').attr("id"), 0);
    sClickd(2);
}

function expandrr() {
    //shrink($('.rectangleLeft').attr("id"), 1);
    //shrink($('.rectangleTop').attr("id"), 0);
    expand($('.rectangleRight').attr("id"), 1);
    //shrink($('.rectangleBottom').attr("id"), 0);
    sClickd(3);
}

function expandrb() {
    //shrink($('.rectangleLeft').attr("id"), 1);
    //shrink($('.rectangleTop').attr("id"), 0);
    //shrink($('.rectangleRight').attr("id"), 1);
    expand($('.rectangleBottom').attr("id"), 0);
    sClickd(4);
}

function shrinkall() {
    shrink($('.rectangleLeft').attr("id"), 1);
    shrink($('.rectangleTop').attr("id"), 0);
    shrink($('.rectangleRight').attr("id"), 1);
    shrink($('.rectangleBottom').attr("id"), 0);
}

function expandCenter() {
    sClickd(5);
    var elementStyle = document.getElementById("centerButton").style;
    elementStyle.width = "450px";
    elementStyle.height = "450px";
    //shrink($('.rectangleLeft').attr("id"), 1);
    //shrink($('.rectangleRight').attr("id"), 1);
    //shrink($('.rectangleTop').attr("id"), 0);
    //shrink($('.rectangleBottom').attr("id"), 0);
    setTimeout(function () {
        elementStyle.width = "400px";
        elementStyle.height = "400px";
    }, 550);
}

function expand(rid, type, normal) {
    if (typeof normal == "undefined")
        normal = true;
    var elementStyle = document.getElementById(rid).style;
    if (type == 1) {
        elementStyle.top = "17.5%";
        elementStyle.width = "200px";
        elementStyle.height = "65%";
    } else {
        elementStyle.left = "17.5%";
        elementStyle.height = "200px";
        elementStyle.width = "65%";
    }
    if (normal == true)
        setTimeout(function () { normalSize(rid, type) }, 550);
}

function shrink(rid, type, normal) {
    if (typeof normal == "undefined")
        normal = true;
    var elementStyle = document.getElementById(rid).style;
    if (type == 1) {
        elementStyle.top = "22.5%";
        elementStyle.width = "75px";
        elementStyle.height = "55%";
    } else {
        elementStyle.left = "22.5%";
        elementStyle.height = "75px";
        elementStyle.width = "55%";
    }
    if(normal == true)
        setTimeout(function () { normalSize(rid, type) }, 550);
}
function normalSize(rid,type){
    var elementStyle = document.getElementById(rid).style;
    if (type == 1) {
        elementStyle.top = "20%";
        elementStyle.width = "150px";
        elementStyle.height = "60%";
    } else {
        elementStyle.left = "20%";
        elementStyle.height = "150px";
        elementStyle.width = "60%";
    };
}

function sClickd(click) {
    setTimeout(function () {
        sClick(click);
    }, 1100);
}