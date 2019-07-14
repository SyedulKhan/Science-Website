var currentForegroundColour = "inherit";
var currentBackgroundColour = "inherit";

function startup() {
    var imgs = document.getElementById("imgs").getElementsByTagName("img");

    for (var i = 0; i < imgs.length; i++) {
        imgs[i].onmouseover = function () {
            this.style.cursor = 'hand';
            this.style.borderColor = 'green';
        }

        imgs[i].onmouseout = function () {
            this.style.cursor = 'pointer';
            this.style.borderColor = 'black';
        }
    }
}

function changeImg(event) {
    var targetElement = event.srcElement;
    var description = document.getElementById("description");

    if (targetElement.tagName == "IMG") {
        changeBackgroundImage("largeImg",targetElement.getAttribute("src"));
        description.innerHTML = targetElement.alt;
    }

    setColors(currentForegroundColour, currentBackgroundColour);
}

function changeBackgroundImage(elementId, imageUrl)
{
    document.getElementById(elementId).setAttribute('style', "background-image:url('" + imageUrl + "')");

}
function changeBackGColor() {
    var bColor = document.getElementById("backgColorList");
    currentBackgroundColour = bColor.value;

    setColors(currentForegroundColour, currentBackgroundColour);
}

function changeFontColor() {
    var fColor = document.getElementById("fontColorList");
    currentForegroundColour = fColor.value;
    
    setColors(currentForegroundColour, currentBackgroundColour);    
}

function resetColors() {
    currentBackgroundColour = "inherit";
    currentForegroundColour = "inherit";

    setColors(currentForegroundColour, currentBackgroundColour);

    var fColor = document.getElementById("fontColorList");
    var bColor = document.getElementById("backgColorList");

    //fColor.sel
}


function setColors(foreground, background) {
    document.getElementById("description").setAttribute("style", "color:" + foreground + ";");
    document.getElementById("largeImg").style.backgroundColor = background;
}