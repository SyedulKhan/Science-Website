// Loads an HTML document into an element as its inner HTML.
function loadContent(path, elementId, showMenu)
{
    try
    {
        // Prepare for HTTP Request.
        var c = new XMLHttpRequest();

        // Requests HTML file.
        c.open("GET", path, false);
        c.send();

        // Returns the response as HTML and sets it to the inner HTML of the specified element
        document.getElementById(elementId).innerHTML = c.response;

        // Makes the menu visible/invisible.
        if(showMenu) document.getElementById("page_links").setAttribute("class", "Nav VNav VNavMain Dark-dark Visible");
        else document.getElementById("page_links").setAttribute("class", "Nav VNav VNavMain Dark-dark Invisible");
    }
    catch (e)
    {
        // document.getElementById("page_content").innerHTML = "<h1>Error: " + e.message + "</h1>";
        throw e;
    }
}

// Handles path assembly for the loadContent() function using standardised paths
function showPage(pageName, showMenu)
{
    var pageUrl = "./pages/home.html";
    var menuUrl = "./menus/home_menu.html";
           
    pageUrl = "./pages/" + pageName + ".html";
    menuUrl = "./menus/" + pageName + "_menu.html";
         
    try{
        loadContent(pageUrl, 'page_content', false);
    } catch (e) {
        // Return to home page on exception if possible.
        if (pageName != 'home')
            showPage('home', true);
    }
    try{
        if (showMenu) loadContent(menuUrl, 'page_links', true);
    } catch (e) {
       // Do nothing.
    }
}