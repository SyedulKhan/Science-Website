//Main function that makes the font-size changes
function changeFontSize(change) {
    var elemSize = document.getElementsByClassName("FontSize");
    var fontSizes = ["xx-small", "x-small", "small", "medium", "large", "x-large"];
    var fontSizeAbr = ["XXS", "XS", "S", "M", "L", "XL"];
    var hasValue = false;
    var sizeChar;
    //Since all font sizes after first change are the same takes one to check in which size they are set 
    var size = elemSize[0].style.fontSize;

    //1 stands for size increase and is used as index to get value from fontSizes array
    //-1 stands for size decrease
    if (size == "x-large" && change==1) {
        alert("This is the maximum font size");
    }
    else if (size == "xx-small" && change==-1) {
        alert("This is the minimum font size");
    }
    else {
        for (var j = 0; j < fontSizes.length; j++) {
            if (size == fontSizes[j]) {
                hasValue = true;
                var newSize = fontSizes[j + change];
                sizeChar = fontSizeAbr[j + change];
                break;
            }
        }
        if (!hasValue) {
            if (change == 1) {
                newSize = "large";
                sizeChar = "L";
            }
            else {
                newSize = "small";
                sizeChar = "S";
            }
        }
        document.getElementById("currentFontSize").innerHTML = sizeChar;
        for (var i = 0; i < elemSize.length; i++) {
            elemSize[i].style.fontSize = newSize;
        }
    }
}

//Called by "onclick" to either show or hide the font size panel
function showFontSizePanel() {
    
    var panelState = document.getElementById("fontPanel").style;
    
    if (panelState.display == "block") {
        panelState.display = "none";
       document.getElementById("fontSizePanelTab").innerHTML = "Font Size";
    }
    else {
        panelState = "block";
       document.getElementById("fontSizePanelTab").innerHTML = "Hide Panel";
    }  
    document.getElementById("fontPanel").style.display = panelState;
}