/*
 author : Nikhil Prakash
 version: 1.0.1
*/

$(function(){
	
	/*disable document scrolling
	$('html, body').css({
    'overflow': 'hidden',
    'height': '100%'
	});*/

	/*To enable document scrolling
	$('html, body').css({
    'overflow': 'auto',
    'height': 'auto'
	});*/

	/*Creating and adding a new slide to the canvas*/
	var numSlides=0;
	var currentSlide;
	$('input[name="addSlide"]').click(function(){

		numSlides++;
		$('#canvas').on({
						mouseenter : slideOn,
						mouseleave : slideOff,
						mousewheel : zoomInOut,
						focus : selectSlide,
						click : slideClick

		},'#slide'+numSlides);
		$('#canvas').append("<div class=\"slide\" id=\"slide" + numSlides + "\"> </div>");
		currentSlide = $('#slide'+numSlides);
		currentSlide.addClass('slide');
		currentSlide.prepend("<h2>Slide"+numSlides+"</h2>").css('textAlign','center');
		currentSlide.trigger('click');

	});//end click addSlide


	/*Zooming in or out */
	var zoomInOut = function(evt){

		console.log("X="+evt.deltaX+" Y="+evt.deltaY+" deltafactor="+evt.deltaFactor);
		
		if(evt.deltaY == 1)
		{		$(this).addClass('zoomin').css({	
							transform:'auto',	//so that esc works properly
							transitionProperty:'transform',
							transitionDuration:'2s'
				}).removeClass('zoomout');
		}
		else if(evt.deltaY == -1)
		{
				$(this).addClass('zoomout').css({
							transform:'auto', //so that esc works properly
							transitionProperty:'transform',
							transitionDuration:'2s'
				}).removeClass('zoomin');
		}

	};	// end - zoom in and out the slide when the user scrolls mouse wheen


	var selectSlide = function(evt){
		$(this).css({
					boxShadow:'0 0 20px blue'
		});

	};//end - when the slide is selected and is in focus

	/*Function to execute when clicked inside a slide*/
	var slideClick = function(evt){

		
		$('#canvas div').each(function(){
			$(this).attr('tabindex',0);
			$(this).css('boxShadow','');
		});	//set tabindex of other slides as 0 i.e greater than the current slide

		$(this).attr('tabindex',-1).trigger('focus');
		currentSlide = $(this);
	};//end - slide is clicked

	/*When hovered over a slide*/
	var slideOn = function(){
		$(this).addClass('glow');
	};
	var slideOff = function(){
		$(this).removeClass('glow');
	};//end - when hovered, glow


	/*Interaction via keypress - moving between slides,zooming in and out,esc to original position*/
	$('#canvas').keydown(function(evt){

		if(evt.which == 37)		//left arrow
		{	currentSlide = currentSlide.prev('div');
			currentSlide.click();
		}
		else if(evt.which == 39)	//right arrow
		{	currentSlide = currentSlide.next('div');
			currentSlide.click();
		}
		else if(evt.which == 38) //up arrow
		{
			currentSlide.addClass('zoomin').css({
							transform:'auto',	//so that esc works properly
							transitionProperty:'transform',
							transitionDuration:'2s'
				}).removeClass('zoomout');
		}
		else if(evt.which == 40) //down arrow
		{
			currentSlide.addClass('zoomout').css({
							transform:'auto',   //so that esc works properly
							transitionProperty:'transform',
							transitionDuration:'2s'
				}).removeClass('zoomin');
		}
		else if(evt.which == 27)//esc - set scaling to original position
		{
			$('#canvas div').each(function(){
				var none = "none";
				$(this).css({
								transform:none
				});
			});
		}
	});	// end - left click


	/*when user clicks play or pause or stop*/
	$('.video').bind('click',function(){



	});//end - clicks play,pause,stop


});//end ready