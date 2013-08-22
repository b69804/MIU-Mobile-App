// Matthew Ashton
// MUI 1308 Project 1
// JavaScript






window.addEventListener("DOMContentLoaded", function(){
    //I used easy because it helped me remember that this is the easy way to get things from the HTML page.
    function easy(n){
        var getSomething = document.getElementById(n);
        return getSomething;
    }
    // This is for the drop down menu function for which sport the game is for
    function sportOption() {
        var formTag = document.getElementsByTagName("form"),
            selectLi = easy("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("ID", "groups");
        for (var i=0, j=sportTypes.length; i<j; i++) {
            var makeOption = document.createElement("option");
            var sportText = sportTypes[i];
            makeOption.setAttribute("value", sportText);
            makeOption.innerHTML = sportText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    // This function is for getting the radio button value 
    function getFavTeam(){
        var radioButton = document.forms[0].Yes;
        for (var i=0; i<radioButton.length; i++) {
            if (radioButton[i].checked) {
                favValue = radioButton[i].value;
            }
        }
    }
    // This toggles the CSS to display certain things depending on what is clicked.
    function togglePage(n){
        switch (n){ 
            case "on":
                easy("gameForm").style.display = "none";
                easy("clearData").style.display = "inline";
                easy("displayData").style.display = "none";
                easy("addNewGame").style.display = "inline";
                break;
            case "off":
                easy("gameForm").style.display = "block";
                easy("clearData").style.display = "inline";
                easy("displayData").style.display = "inline";
                easy("addNewGame").style.display = "none";
                easy("items").style.display = "none";
                break;
            default:
                return false;
        }
    }
    // This is the function for adding stuff to local storage. 
    function addStuff(key) {
        if (!key) {
            var ID      = Math.floor(Math.random()*10000001);
        }else{
            ID = key;
        }
        getFavTeam();
        var item    = {};
            item.gameName       =["Name of Game:", easy("gameName").value];
            item.homeTeam       =["Home Team:", easy("homeTeam").value];
            item.awayTeam       =["Away Team:", easy("awayTeam").value];
            item.group          =["Group:", easy("groups").value];
            item.other          =["Other:", easy("otherField").value];
            item.favTeam        =["Favorite Team:", favValue];
            item.priority       =["Game Priority:", easy("priority").value];
            item.dateOfGame     =["Date of Game:", easy("dateOfGame").value];
            item.winningTeam    =["Winning Team:", easy("winningTeam").value];
            
        localStorage.setItem(ID, JSON.stringify(item));
        alert("Game Saved!");
    }
    
       function imageSelector(imgName, makeSubList) {
        var imageLi = document.createElement("li");
        makeSubList.appendChild(imageLi);
        var newImage = document.createElement("img");
        var setSource = newImage.setAttribute("src", "img/"+ imgName + ".png");
        imageLi.appendChild(newImage);
        newImage.style.margin = "5px";
        newImage.style.padding = "2px";
    }
    
    
    // This is the function for getting the stuff from local storage and displaying it as a list
    function getStuff(){
        document.getElementById("items").innerHTML="";
        togglePage("on");
        if (localStorage.length === 0) {
            alert("There is no data available, default data is shown.");
            testDataLoaded ();
        }
        var makeStuff = document.getElementById("items");
        //makeStuff.setAttribute("ID", "items");
        var makeListOfStuff = document.createElement("ul");
        makeStuff.appendChild(makeListOfStuff);
        //document.body.appendChild(makeStuff);
        easy("items").style.display = "inline";
        for (var i=0, len=localStorage.length; i<len; i++) {
            var createList = document.createElement("li");
            var linksLi = document.createElement("li");
            makeListOfStuff.appendChild(createList);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var listObject = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            createList.appendChild(makeSubList);
            imageSelector(listObject.group[1], makeSubList);
            makeSubList.style.margin = "10px";
            for (var n in listObject){ 
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var subText = listObject[n][0]+" "+listObject[n][1];
                makeSubli.innerHTML = subText;
                makeSubli.appendChild(linksLi);
            }
            createEditItemLinks(localStorage.key(i), linksLi);
        }
    }
    
    function testDataLoaded(){
        for (var n in jsonObject) {
            var id = Math.floor(Math.random()*10000001);
            localStorage.setItem(id, JSON.stringify(jsonObject[n]));
        }
    }
    
    
    function createEditItemLinks(key, linksLi) {
        var editGameData = document.createElement('a');
        editGameData.href = "#";
        editGameData.key = key;
        var editGameText = "Edit Game Data";
        editGameData.addEventListener("click", editGameEntry);
        editGameData.innerHTML = editGameText;
        linksLi.appendChild(editGameData);
        
        var breakUpStuff = document.createElement('br');
        linksLi.appendChild(breakUpStuff);
        
        var deleteGameData = document.createElement('a');
        deleteGameData.href = "#";
        deleteGameData.key = key;
        var deleteGameText = "Delete Game";
        deleteGameData.addEventListener("click", deleteGameEntry);
        deleteGameData.innerHTML = deleteGameText;
        linksLi.appendChild(deleteGameData);
    }
    
    function editGameEntry() {
        var value = localStorage.getItem(this.key);
        var entry = JSON.parse(value);
        togglePage("off");
        
        easy("gameName").value = entry.gameName[1];
        easy("homeTeam").value = entry.homeTeam[1];
        easy("awayTeam").value = entry.awayTeam[1];
        easy("groups").value = entry.group[1];
        easy("otherField").value = entry.other[1];
        var favTeamButton = document.forms[0].Yes;
        for (var i=0; i<favTeamButton.length; i++) {
            if (favTeamButton[i].value == "Yes" && entry.favTeam[1] == "Yes") {
                favTeamButton[i].setAttribute("checked", "checked");
            }else if (favTeamButton[i].value == "No" && entry.favTeam[1] == "No") {
                favTeamButton[i].setAttribute("checked", "checked");
            }
        }
        easy("priority").value = entry.priority[1];
        easy("dateOfGame").value = entry.dateOfGame[1];
        easy("winningTeam").value = entry.winningTeam[1];
        
        save.removeEventListener("click", addStuff);
        easy("button").value = "Edit Contact";
        var editSubmit = easy("button");
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
        
    }
    
    function deleteGameEntry() {
        var ask = confirm("Are you absolutely sure you want to delete this game?");
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
        }else{
            alert("Game was NOT deleted!");
        }
    }
    
    
    // This clears the local storage of stuff
    function clearStuff(){
        if (localStorage.length === 0) {
            alert("No data to clear!");
        }else{
            localStorage.clear();
            alert("All games deleted!");
            window.location.reload();
            return false;
        }
    }
    
    function validate(e) {
        var getGameName = easy("gameName");
        var getHomeTeam = easy("homeTeam");
        var getAwayTeam = easy("awayTeam");
        var getGroup = easy("groups");
        var getDateOfGame = easy("dateOfGame");
        
        errorMsg.innerHTML = "";
            getGameName.style.border = "1px solid black";
            getHomeTeam.style.border = "1px solid black";
            getAwayTeam.style.border = "1px solid black";
            getGroup.style.border = "1px solid black";
            getDateOfGame.style.border = "1px solid black";
        
        var errorMessage = [];
        
        if (getGameName.value === "") {
            var gameError = "Please Enter Game Title";
            getGameName.style.border = "2px double red";
            errorMessage.push(gameError);
        }
        
        if (getHomeTeam.value === "") {
            var homeTeamError = "Please Enter Home Team";
            getHomeTeam.style.border = "2px double red";
            errorMessage.push(homeTeamError);
        }  
        
        if (getAwayTeam.value === "") {
            var awayTeamError = "Please Enter Away Team";
            getAwayTeam.style.border = "2px double red";
            errorMessage.push(awayTeamError);
        }   
        
        if (getGroup.value === "--Sport Types--") {
            var groupError = "Please Select Sport Type";
            getGroup.style.border = "2px double red";
            errorMessage.push(groupError);
        }
        
        if (getDateOfGame.value === "") {
            var dateError = "Please Select Date Of Game";
            getDateOfGame.style.border = "2px double red";
            errorMessage.push(dateError);
        }
        
        if (errorMessage.length >= 1) {
            for (var i = 0, j=errorMessage.length; i < j; i++) {
                var errorText = document.createElement("li");
                errorText.innerHTML = errorMessage[i];
                errorMsg.appendChild(errorText);
            }
            e.preventDefault();
            return false;
        }else{
            addStuff(this.key);
            
        }
        
    }
    
    var sportTypes = ["Football", "Basketball", "Soccer", "Baseball", "Hockey", "Other"],
        favValue,
        errorMsg = easy("errors");
        
    sportOption();

    var displayData = easy("displayData");
    displayData.addEventListener("click", getStuff);
    var clearData = easy("clearData");
    clearData.addEventListener("click", clearStuff);
    var save = easy("button");
    save.addEventListener("click", validate);
    
});

// I purposefully used "stuff" in the function and variable names because it is an
// easy way for me to remember what is happening.  It makes the code seem more general
// which I feel will help me later on.  