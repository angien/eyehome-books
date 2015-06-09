
function doOnLoad() {
    console.log("on load");
    var elementStyle = document.getElementById('rlp').style;
    elementStyle.left = "100%";
    elementStyle.top = "0px";
    elementStyle.height = "0%";
    elementStyle.width = "20px";

    var elementStyle = document.getElementById('rtp').style;
    elementStyle.top = "100%";
    elementStyle.left = "0px";
    elementStyle.height = "20px";
    elementStyle.width = "0%";

    var elementStyle = document.getElementById('rrp').style;
    elementStyle.right = "100%";
    elementStyle.top = "0px";
    elementStyle.height = "0%";
    elementStyle.width = "20px";

    var elementStyle = document.getElementById('rbp').style;
    elementStyle.bottom = "100%";
    elementStyle.left = "0px";
    elementStyle.height = "20px";
    elementStyle.width = "0%";
}
window.onload = doOnLoad();
//I am sure there is quite an easy way to make a seperate onHover for both of these, though I did not make such a thing
$('.rectangleLeft').hover(
    function (e) {
        expand($('.rectangleLeft').attr("id"), 1, false);
        var elementStyle = document.getElementById('rlp').style;
        console.log(document.getElementById('rlp'));
        elementStyle.transitionDuration = "3s";
        elementStyle.height = "100%";
        this.interval = setInterval(function () {
            elementStyle.transitionDuration = "0s";
            elementStyle.height = "0%";
            setTimeout(function () {
                elementStyle.transitionDuration = "2.9s";
                elementStyle.height = "100%";
            }, 100);
            document.getElementById($('.rectangleLeft').attr("id")).click();
        }, 3000);
    }, function (e) {
        clearInterval(this.interval);
        normalSize($('.rectangleLeft').attr("id"), 1);
        var elementStyle = document.getElementById('rlp').style;
        elementStyle.transitionDuration = ".5s";
        elementStyle.height = "0%";
});

$('.rectangleRight').hover(
    function (e) {
        expand($('.rectangleRight').attr("id"), 1, false);
        var elementStyle = document.getElementById('rrp').style;
        elementStyle.transitionDuration = "3s";
        elementStyle.height = "100%";
        this.interval = setInterval(function () {
            elementStyle.transitionDuration = "0s";
            elementStyle.height = "0%";
            setTimeout(function () {
                elementStyle.transitionDuration = "2.9s";
                elementStyle.height = "100%";
            },100);
            document.getElementById($('.rectangleRight').attr("id")).click();
        }, 3000);
    }, function (e) {
        clearInterval(this.interval);
        normalSize($('.rectangleRight').attr("id"), 1);
        var elementStyle = document.getElementById('rrp').style;
        elementStyle.transitionDuration = ".5s";
        elementStyle.height = "0%";
});

$('.rectangleTop').hover(
    function (e) {
        expand($('.rectangleTop').attr("id"), 0, false);
        var elementStyle = document.getElementById('rtp').style;
        elementStyle.transitionDuration = "3s";
        elementStyle.width = "100%";
        this.interval = setInterval(function () {
            elementStyle.transitionDuration = "0s";
            elementStyle.width = "0%";
            setTimeout(function () {
                elementStyle.transitionDuration = "2.9s";
                elementStyle.width = "100%";
            }, 100);
            document.getElementById($('.rectangleTop').attr("id")).click();
        }, 3000);
    }, function (e) {
        clearInterval(this.interval);
        normalSize($('.rectangleTop').attr("id"), 0);
        var elementStyle = document.getElementById('rtp').style;
        elementStyle.transitionDuration = ".5s";
        elementStyle.width = "0%";
});

$('.rectangleBottom').hover(
    function (e) {
        expand($('.rectangleBottom').attr("id"), 0, false);
        var elementStyle = document.getElementById('rbp').style;
        elementStyle.transitionDuration = "3s";
        elementStyle.width = "100%";
        this.interval = setInterval(function () {
            elementStyle.transitionDuration = "0s";
            elementStyle.width = "0%";
            setTimeout(function () {
                elementStyle.transitionDuration = "2.9s";
                elementStyle.width = "100%";
            }, 100);
            document.getElementById($('.rectangleBottom').attr("id")).click();
        }, 3000);
    }, function (e) {
        clearInterval(this.interval);
        normalSize($('.rectangleBottom').attr("id"), 0);
        var elementStyle = document.getElementById('rbp').style;
        elementStyle.transitionDuration = ".5s";
        elementStyle.width = "0%";
});