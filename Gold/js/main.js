$(document).bind('pageinit',function(){
                
});

	

	
$('#addGame').on('pageinit', function(){

		var myForm = $('#gameEntry'),
                gameErrorsLink = $("#gameEntryLink")
                ;
		myForm.validate({
		       invalidHandler: function(form, validator) {
                },
                submitHandler: function() {
                        var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
 //any other code needed for addItem page goes here
function getFavTeam(){
        var radioButton = document.forms["gameEntry"].yes;
        for (var i=0; i<radioButton.length; i++) {
            if (radioButton[i].checked) {
                favValue = radioButton[i].val();}
                }
        }
    
var storeData = function(key){
                if (!key) {
                                var ID      = Math.floor(Math.random()*10000001);
                 }else{
                                ID = key;
        }
        var favValue = getFavTeam();
                var item    = {};
                item.gameName       =["Name of Game:", $("#nameOfGame").val()];
                item.homeTeam       =["Home Team:", $("#homeTeam").val()];
                item.awayTeam       =["Away Team:", $("#awayTeam").val()];
                item.group          =["Group:", $("#selectSport").val()];
                item.other          =["Other:", $("#otherSport").val()];
                item.priority       =["Game Priority:", $("#gamePriority").val()];
                item.dateOfGame     =["Date of Game:", $("#dateOfGame").val()];
                item.favTeam        =["Favorite Team:", favValue];
            
        localStorage.setItem(ID, JSON.stringify(item));
        alert("Game Saved!");
    };
    

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};
 

var deleteItem = function (){
	var ask = confirm("Are you absolutely sure you want to delete this game?");
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
        }else{
            alert("Game was NOT deleted!");}

};
					
var clearLocal = function(){
        if (localStorage.length == 0) {
            alert("No data to clear!");
        }else{
            localStorage.clear();
            alert("All games deleted!");
            window.location.reload();
            return false;
        }
};
    



