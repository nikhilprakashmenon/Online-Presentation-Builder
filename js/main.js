/*
 author : Nikhil Prakash
 version: 1.0.0
*/

$(function(){
	
	/*Creating and adding a new slide to the canvas*/
	var numSlides=0;
	$('input[name="addSlide"]').click(function(){

		numSlides++;
		$('#canvas').on({
						mouseenter : slideOn,
						mouseleave : slideOff,
						scroll : zoomInOut,
						click : slideClick

		},'#slide'+numSlides);
		$('#canvas').append("<div class=\"slide\" id=\"slide" + numSlides + "\"> </div>");
		$('#slide'+numSlides).addClass('slide');
		$('#slide'+numSlides).prepend("<h2>Slide"+numSlides+"</h2>").css('textAlign','center');
		
	});//end click addSlide

	/*Zooming in or out */
	var zoomInOut = function(evt){

		$(this).addClass('zooming').css({
					transitionProperty:'transform',
					transitionDuration:'2s'
		});

	}

	/*Function to execute when clicked inside a slide*/
	var slideClick = function(evt){

		
	}

	/*When hovered over a slide*/
	var slideOn = function(){
		$(this).addClass('glow');
	}
	var slideOff = function(){
		$(this).removeClass('glow');
	}


	/*Moving among slides*/
	$('input[name="left"]').click(function(){

		

	});	// end left click

	$('input[name="left"]').click(function(){



	});// end right click

});//end ready