// ENTER YOUR JSON DATA VARIABLE TO ASSIGN IT TO jsonName
	var jsonName = sampleJSON;

// ENTER THE TOTAL NUMBER OF CORRECT GUESSES THAT WINS THE GAME
	var winGuessTally = 13;

// ENTER THE TOTAL NUMBER OF INCORRECT GUESSES THAT LOSES THE GAME
	var loseGuessTally = 5;

// ENTER THE TEXT STRING HERE THAT WILL APPEAR IF THE USER MAKES A CORRECT GUESS
	var rightGuessMsg = "Yes, an MRV is here!";

// IF AN IMAGE WILL APPEAR AFTER A CORRECT ANSWER, ENTER THE STRING OF THE PATH AND FILE HERE
	var rightGuessImg = "../images/mine-resistant-vehicle.jpg";

// ENTER THE TEXT STRING HERE THAT WILL APPEAR IF THE USER MAKES AN INCORRECT GUESS
	var wrongGuessMsg = "Sorry, no MRV here";

// ENTER THE TEXT STRING HERE THAT WILL APPEAR IF THE USER WINS THE GAME
	var winningMessage = "YOU WIN! Sorry, I don't even have a gas mask to give you for a prize.";

// ENTER THE TEXT STRING HERE THAT WILL APPEAR IF THE USER LOSES THE GAME
	var losingMessage = "You lost this time, but you can click below to try again.";

// this starts the tally for correct guesses and incorrect guesses
	var wrongGuessCount = 0;
	var rightGuessCount = 0;

// Creates and displays cards from JSON data
for(var i = 0; i < jsonName.length; i++){

// REPLACE VALUE NAMES (E.G., 'MRV-THERE' 'PLACE' 'POPULATION') AND REORDER HTML TO REFLECT YOUR JSON DATA AND CARD CONTENTS
	$(".container").append("<a href='#'><div class='placebox " + jsonName[i]['mrv-there'] + "''>" + jsonName[i]['place'] + "<br><span class='pop'>Pop.: " + jsonName[i]['population'] + "</span><br><br><span class='qn'>?</span></div></a>");
}

// users can refresh the page or iframe to start over
	$('.restart').click(function() {
    	location.reload();
	});

// All of the following code to the end of the page is part of this click function on a single card
	$( "a div" ).click(function() {

		if($(this).hasClass('true')) {

	// If correct, this replaces question mark area with image and text answer
		  	$( this ).find('.qn').replaceWith("<img src='" + rightGuessImg + "'><span class='ans'>" + rightGuessMsg + "</span>"); 

			rightGuessCount++;

	// this removes class to prevent continued click tally on already-clicked right guess card 	  		
	  		$(this).removeClass( "true" );
	  		
	  		$(".feedback1").replaceWith("<span class='feedback1'>" + rightGuessCount + "</span>");

	// this ensures that only a winning game message appears, even if enough cards are clicked that it would tally up to a loss also
	  		if (rightGuessCount === winGuessTally && wrongGuessCount < loseGuessTally) {
	  			$("div.container").addClass("endgame");
	// winning message container is moved by absolute positioning to a more centered spot in case bottom position would not be seen
	  			$(".container2").append("<div class='winning-message'>" + winningMessage + "</div>");
		  	}
		} 
		else if($(this).hasClass('false')) {

			$( this ).find('.qn').replaceWith("<br><span class='ans'>" + wrongGuessMsg + "</span></div>" );

			wrongGuessCount++;

	// this removes class to prevent continued click tally on already-clicked wrong guess card 
	  		$(this).removeClass( "false" );

			$(".feedback2").replaceWith("<span class='feedback2'>" + wrongGuessCount + "</span>");

	// this ensures that only a losing game message appears, even if enough cards are clicked that it would tally up to a win also
			if (wrongGuessCount === loseGuessTally && rightGuessCount < winGuessTally) {
		  			$(".container2").append("<div class='losing-message'>" + losingMessage + "</div>");
	// losing message container is moved by absolute positioning to a more centered spot in case bottom position would not be seen with limited screen view
		  			$("div.container").addClass("endgame");
		  	}
		}
	});

