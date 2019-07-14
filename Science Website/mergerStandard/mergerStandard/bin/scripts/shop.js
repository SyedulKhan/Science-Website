//Global variables
var currentProduct;
var tShirtQuantity = 0;
var totalKeyrings = 0;
var glassQuantity = 0;
var totalValerian = 0;
var totalStickers = 0;
var totalPosters = 0;
var orderTotal = 0;
var currentTshirt;
var currentGlasses;
var currentQuantity = 0;
var tShirtsOrderedBySize = [0, 0, 0, 0, 0];
var tShirtsAmountBySize = [0, 0, 0, 0, 0];
var glassesOrderedBySize = [0, 0, 0];
var glassesAmountBySize = [0, 0, 0];
var individualProductTotal = [0, 0, 0, 0];
var inputIds = ["customertitle", "customerfirstname", "customerlastname", "customeremail", "customernumber", "customeraddress1", "customeraddress2", "customerpostcode", "customercity", "visadebit", "visacredit", "mastercard", "cardholder", "cardnumber", "expirymonth", "expiryyear", "termsandconditions"];
var counter = 0;
var photoPaths = ["./img/shop/tshirt.jpg", "./img/shop/keyringscience.jpg", "./img/shop/scienceglasses.jpg", "./img/shop/valerian.jpg", "./img/shop/plutonium.jpg", "./img/shop/poster.jpg"];

//Setting images in product tiles of the shop
// and in the enlarged popup product
function setImages() {
    
    for (var i = 0 ; i < photoPaths.length; i++) {     
		//Calls reused function to change background image
        changeBackgroundImage('prod' + (i+1), photoPaths[i]);
    }
    
}

//Called by "onclick" when user selects a product and
// enlarges the product and shows additional information
function showProduct(prodNo) {
    currentProduct = prodNo;
    makeInvisible();
    
    if (prodNo == 7) {
        document.getElementById("formcontainer").innerHTML = document.getElementById("show7").innerHTML;
        document.getElementById("formcontainer").style.display = "block";
    }
    else {        
        document.getElementById("infosection").innerHTML = document.getElementById("show" + prodNo).innerHTML;
        changeBackgroundImage('windowphoto', photoPaths[prodNo - 1]);
        document.getElementById("windowcontainer").style.display = "block";
    }

}

//Makes enlarged popup (product and personal details) invisible
function makeInvisible() {
    document.getElementById("windowcontainer").style.display = "none";
    document.getElementById("formcontainer").style.display = "none";
    document.getElementById("checkout").style.display = "none";
}

//Called to add an item to user basket
function addToBasket(prodNo, frm) {

    if (prodNo == 1) {
        currentQuantity = parseInt(frm.tshirtquantity.value);
        var tShirtSize = frm.tshirtsize.value;
        if (tShirtSize == "x-small") {
            tShirtsOrderedBySize[0] += parseInt(frm.tshirtquantity.value);
            currentTshirt = 0;
        }
        else if (tShirtSize == "small") {
            tShirtsOrderedBySize[1] += parseInt(frm.tshirtquantity.value);
            currentTshirt = 1;
        }
        else if (tShirtSize == "medium") {
            tShirtsOrderedBySize[2] += parseInt(frm.tshirtquantity.value);
            currentTshirt = 2;
        }
        else if (tShirtSize == "large") {
            tShirtsOrderedBySize[3] += parseInt(frm.tshirtquantity.value);
            currentTshirt = 3;
        }
        else if (tShirtSize == "x-large") {
            tShirtsOrderedBySize[4] += parseInt(frm.tshirtquantity.value);
            currentTshirt = 4;
        }

        tShirtsAmountBySize[currentTshirt] += currentQuantity * 15;
        //Checks if there is already this item in the basket and if not catches it and creates new entry
		try {
            document.getElementById(tShirtSize + "T").innerHTML = tShirtsOrderedBySize[currentTshirt] + " " + tShirtSize + " Oceanic t-shirts : £" + tShirtsAmountBySize[currentTshirt];
        }
        catch (Exception) {
            document.getElementById("addeditem").innerHTML = document.getElementById("addeditem").innerHTML + "<div id=\"" + tShirtSize + "T\">" + tShirtsOrderedBySize[currentTshirt] + " " + tShirtSize + " Oceanic t-shirt(s) : £" + tShirtsAmountBySize[currentTshirt] + "</div><br />";
        }
    }

    if (prodNo == 2) {
        currentQuantity = parseInt(frm.keyringquantity.value);
        totalKeyrings += parseInt(frm.keyringquantity.value);
        individualProductTotal[0] += currentQuantity * 10;
		//Checks if there is already this item in the basket and if not catches it and creates new entry
        try {
            document.getElementById("orderedkeyrings").innerHTML = totalKeyrings + " Divine keyrings : £" + individualProductTotal[0];
        }
        catch (Exception) {
            document.getElementById("addeditem").innerHTML = document.getElementById("addeditem").innerHTML + "<div id=\"orderedkeyrings\">" + totalKeyrings + " Divine keyring(s) : £" + individualProductTotal[0] + "</div><br />";
        }
    }

    if (prodNo == 3) {
        currentQuantity = parseInt(frm.glassquantity.value);
        var glassSize = frm.glasssize.value;
        if (glassSize == "small") {
            glassesOrderedBySize[0] += parseInt(frm.glassquantity.value);
            currentGlasses = 0;
        }
        else if (glassSize == "medium") {
            glassesOrderedBySize[1] += parseInt(frm.glassquantity.value);
            currentGlasses = 1;
        }
        else if (glassSize == "large") {
            glassesOrderedBySize[2] += parseInt(frm.glassquantity.value);
            currentGlasses = 2;
        }

        glassesAmountBySize[currentGlasses] += currentQuantity * 25;
		//Checks if there is already this item in the basket and if not catches it and creates new entry
        try {
            document.getElementById(glassSize + "G").innerHTML = glassesOrderedBySize[currentGlasses] + " pairs of " + glassSize + " Legendary Shades : £" + glassesAmountBySize[currentGlasses];
        }
        catch (Exception) {
            document.getElementById("addeditem").innerHTML = document.getElementById("addeditem").innerHTML + "<div id=\"" + glassSize + "G\">" + glassesOrderedBySize[currentGlasses] + " pair(s) of " + glassSize + " Legendary Shades : £" + glassesAmountBySize[currentGlasses] + "</div><br />";
        }
    }

    if (prodNo == 4) {
        currentQuantity = parseInt(frm.valerianquantity.value);
        totalValerian += parseInt(frm.valerianquantity.value);
        individualProductTotal[1] += currentQuantity * 5;
		//Checks if there is already this item in the basket and if not catches it and creates new entry
        try {
            document.getElementById("orderedvalerian").innerHTML = totalValerian + " grams of Silencer : £" + individualProductTotal[1];
        }
        catch (Exception) {
            document.getElementById("addeditem").innerHTML = document.getElementById("addeditem").innerHTML + "<div id=\"orderedvalerian\">" + totalValerian + " gram(s) of Silencer : £" + individualProductTotal[1] + "</div><br />";
        }
    }

    if (prodNo == 5) {
        currentQuantity = parseInt(frm.stickerquantity.value);
        totalStickers += parseInt(frm.stickerquantity.value);
        individualProductTotal[2] += currentQuantity * 4;
		//Checks if there is already this item in the basket and if not catches it and creates new entry
        try {
            document.getElementById("orderedstickers").innerHTML = totalStickers + " Plutonium stickers : £" + individualProductTotal[2];
        }
        catch (Exception) {
            document.getElementById("addeditem").innerHTML = document.getElementById("addeditem").innerHTML + "<div id=\"orderedstickers\">" + totalStickers + " Plutonium sticker(s) : £" + individualProductTotal[2] + "</div><br />";
        }
    }

    if (prodNo == 6) {
        currentQuantity = parseInt(frm.posterquantity.value);
        totalPosters += parseInt(frm.posterquantity.value);
        individualProductTotal[3] += currentQuantity * 30;
		//Checks if there is already this item in the basket and if not catches it and creates new entry
        try {
            document.getElementById("orderedposters").innerHTML = totalPosters + " Antimatter Posters : £" + individualProductTotal[3];
        }
        catch (Exception) {
            document.getElementById("addeditem").innerHTML = document.getElementById("addeditem").innerHTML + "<div id=\"orderedposters\">" + totalPosters + " Antimatter Poster(s) : £" + individualProductTotal[3] + "</div><br />";
        }
    }
	//Calls function to calculate total bill
    calcTotal(prodNo, currentQuantity);
}

//Calculates the order total (price)
function calcTotal(prodNo, quantity) {
    switch (prodNo) {
        case 1: orderTotal += quantity * 15;
            break;
        case 2: orderTotal += quantity * 10;
            break;
        case 3: orderTotal += quantity * 25;
            break;
        case 4: orderTotal += quantity * 5;
            break;
        case 5: orderTotal += quantity * 4;
            break;
        case 6: orderTotal += quantity * 30;
            break;
        default:
            break;
    }
	//Calls function to calculate new charitable amount
    charityCalc(orderTotal);
    document.getElementById("tamount").innerHTML = "£ " + orderTotal;
}

//Calculates the charity contribution
function charityCalc(orderTotal) {

    var charTotal = orderTotal * 5 / 100;
    var charWindow = document.getElementById("charitywindow");
    document.getElementById("charityamount").innerHTML = "£ " + orderTotal * 5 / 100;

}

//Reset/empties the user's basket
function emptyOrder() {
    document.getElementById("addeditem").innerHTML = "";
    document.getElementById("tamount").innerHTML = "£ 0";
    document.getElementById("charityamount").innerHTML = "£ 0";

    orderTotal = 0;
    tShirtsOrderedBySize = [0, 0, 0, 0, 0];
    glassesOrderedBySize = [0, 0, 0];
    tShirtsAmountBySize = [0, 0, 0, 0, 0];
    glassesAmountBySize = [0, 0, 0];
    individualProductTotal = [0, 0, 0, 0];
    totalValerian = 0;
    totalStickers = 0;
    totalPosters = 0;
    totalKeyrings = 0;
    document.getElementById("show7").style.display = "none";

    charityCalc(0);
}

//Validates if the basket contains at least one item
// before continuing to checkout form
function basketValidation() {
    if (orderTotal == 0) {
        alert("Your basket is empty!");
    }
    else {
        showProduct(7);
        document.getElementById("checkout").style.display = "block";
    }
}

//Highlights all input fields that were given wrong input format
// by the user
function styleInputForm(valid, id) {
    if (valid) {
        document.getElementById(id).style.boxShadow = "";
        return true;
    }
    else {
        document.getElementById(id).style.boxShadow = "rgba(219, 0, 0, 0.7) 0 0 3px 3px";
        return false;
    }
}

//Displays order summary when completed
function messageOrder(frm) {
    
    var name = frm.firstname.value;
    var orderSummary = document.getElementById("addeditem").innerText;
    alert("Dear " + name + ", we are happy to inform you that your order was successful.\n Here is a summary of your order:\n" + orderSummary + "\n\nYour total bill is £" + orderTotal);
    makeInvisible();
    emptyOrder();
    
	var feedback = confirm("Thank you for shopping with us.\n\n" + "Take a minute to tell us what you think of our website");
    //Navigates the user to Contact page if he chose to do so
	if (feedback) {
        showPage('contact', false);
    }
}

//Called by "onclick" when the user is navigating in the enlarged product pop up
// and is the mechanism of the previous and next item buttons
function changeProduct(move) {
	//Move 0 stands for previous item
    if (move == 0) {
        if (currentProduct == 1) {
            currentProduct = 6;
        }
        else {
            currentProduct--;
        }
    }
	//Move 1 stands for next item
    else if (move == 1) {
        if (currentProduct == 6) {
            currentProduct = 1;
        }
        else {
            currentProduct++;
        }
    }
    showProduct(currentProduct);
}

//Validation for the checkout form (personal details)
// using regular expressions
function validate(frm) {
	
    var emailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var radiobuttons = document.getElementsByClassName("CardType");
    var uncheckedRadioButtons = 0;
    //Holds boolean for each user input that is true when passed the validation
	var allGood = new Array(15);

    if (frm.title.value == "-") {
        allGood[0] = styleInputForm(false, "customertitle");
    } else {
        allGood[0] = styleInputForm(true, "customertitle");
    }

    if (frm.firstname.value.length < 3 || !frm.firstname.value.match(/^[a-zA-Z ]+$/)) {
        allGood[1] = styleInputForm(false, "customerfirstname");
    } else {
        allGood[1] = styleInputForm(true, "customerfirstname");
    }

    if (frm.lastname.value.length < 4 || !frm.lastname.value.match(/^[a-zA-Z]+$/)) {
        allGood[2] = styleInputForm(false, "customerlastname");
    } else {
        allGood[2] = styleInputForm(true, "customerlastname");
    }

    if (emailFormat.test(frm.email.value) == false) {
        allGood[3] = styleInputForm(false, "customeremail");
    } else {
        allGood[3] = styleInputForm(true, "customeremail");
    }

    if (!frm.number.value == "") {
        if (frm.number.value.length < 10 || !frm.number.value.match(/^[0-9]+$/)) {
            allGood[4] = styleInputForm(false, "customernumber");
        } else {
            allGood[4] = styleInputForm(true, "customernumber");
        }
    } else {
        allGood[4] = styleInputForm(true, "customernumber");
    }

    if (frm.address1.value.length < 8) {
        allGood[5] = styleInputForm(false, "customeraddress1");
    } else {
        allGood[5] = styleInputForm(true, "customeraddress1");
    }

    if (!frm.address2.value == "") {
        if (frm.address2.value.length < 4) {
            allGood[6] = styleInputForm(false, "customeraddress2");
        } else {
            allGood[6] = styleInputForm(true, "customeraddress2");
        }
    } else {
        allGood[6] = styleInputForm(true, "customeraddress2");
    }

    if (frm.postcode.value.length < 5 || !frm.postcode.value.match(/\d+/g) || !frm.postcode.value.match(/^[a-zA-Z]/) || !frm.postcode.value.match(/[a-zA-Z]$/) || !frm.postcode.value.match(/[a-zA-Z0-9 *]/)) {
        allGood[7] = styleInputForm(false, "customerpostcode");
    } else {
        allGood[7] = styleInputForm(true, "customerpostcode");
    }

    if (frm.city.value.length < 4 || !frm.city.value.match(/^[a-zA-Z]+$/)) {
        allGood[8] = styleInputForm(false, "customercity");
    } else {
        allGood[8] = styleInputForm(true, "customercity");
    }

    for (var i = 0; i < radiobuttons.length - 3; i++) {
        if (radiobuttons[i].checked) {
            allGood[9] = styleInputForm(true, "visadebit");
            allGood[9] = styleInputForm(true, "visacredit");
            allGood[9] = styleInputForm(true, "mastercard");
            break;
        }
        else {
            uncheckedRadioButtons++;
        }
    }

    if (uncheckedRadioButtons == 3) {
        allGood[9] = styleInputForm(false, "visadebit");
        allGood[9] = styleInputForm(false, "visacredit");
        allGood[9] = styleInputForm(false, "mastercard");
    }

    if (frm.cardholder.value.length < 6 || !frm.cardholder.value.match(/^[a-zA-Z ]+$/)) {
        allGood[10] = styleInputForm(false, "cardholder");
    } else {
        allGood[10] = styleInputForm(true, "cardholder");
    }

    if (frm.cardnumber.value.length < 16 || !frm.cardnumber.value.match(/^[0-9]+$/)) {
        allGood[11] = styleInputForm(false, "cardnumber");
    } else {
        allGood[11] = styleInputForm(true, "cardnumber");
    }

    if (frm.expirymonth.value == "-") {
        allGood[12] = styleInputForm(false, "expirymonth");
    } else {
        allGood[12] = styleInputForm(true, "expirymonth");
    }

    if (frm.expiryyear.value == "-") {
        allGood[13] = styleInputForm(false, "expiryyear");
    } else {
        allGood[13] = styleInputForm(true, "expiryyear");
    }

    if (frm.expirymonth.value < 4 && frm.expiryyear.value == 2017) {
        allGood[12] = styleInputForm(false, "expirymonth");
        allGood[13] = styleInputForm(false, "expiryyear");
        alert("Your card has expired");
    }

    if (!frm.termsandconditions.checked) {
        allGood[14] = styleInputForm(false, "termsandconditions");
    } else {
        allGood[14] = styleInputForm(true, "termsandconditions");
    }

    var falseCounter = 0;
    for (var i = 0; i < allGood.length; i++) {
        if (allGood[i] == false) {
            falseCounter++;
        }
    }
    if (falseCounter == 0) {
        messageOrder(frm);
    }
}