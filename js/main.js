/*
	Author : Nikhil Prakash
	Version: 1.0.5
	Changes : Set Slide to be draggable and textarea partially draggable,
			  Changed background of canvas to grid lines
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

	//Hide and Initialization
	$('#imgchooseOpt').hide();
	$('#transitions').hide();
	$('#upload').hide();
	$( "#resizable" ).resizable();	//Resizable plug-in
	$( ".draggable" ).draggable({

		containment : "parent",
		scroll : false

	}); //end - set item to be draggable

	//tiny mce plugin for text editor
	/*tinymce.init ({
    selector: "textarea",
    browser_spellcheck : true,
    resize: "both",
    width : 200,
    height : 200,
    //toolbar: "undo redo | styleselect | bold italic | link image"
   // toolbar1: "undo redo | styleselect | bold italic",
    //toolbar2: "link image",
    menubar : false	//disable all menus
    //menubar: "tools table format view insert edit"	//Configure different order
    //visual: false//This true/false option gives you the ability to turn on/off the visual aid for borderless tables. 
     			//If the border of a table is set to "0", then TinyMCE adds a dotted line around the table by default.
    //body_id: "elm1=my_id,elm2=my_id2"
	 
 	});//end - texteditor plugin
	
	*/

	
	/*hovering over dashboard*/
	$('#dashboard').hover(function(evt){

		$(this).stop().animate(
			{
				left:0,
			},500);

	},function(){

		$(this).stop().animate(
		{
			left : '-92px',
		},1500);

	});//end - hover over dashboard


	var numSlides=0;
	var currentSlide;
	/*When an item is selected from dashboard*/
	$('#dashboard').click(function(evt){

		var target = $(evt.target);

		if( target.is("img:eq(0)") )  //Creating and adding a new slide to the canvas
			{
				console.log("First item");
				numSlides++;
				$('#canvas').on({
								mouseenter : slideOn,
								mouseleave : slideOff,
								mousewheel : zoomInOut,
								focus : selectSlide,
								click : slideClick						

				},'#slide'+numSlides);
				$('#canvas').append("<div class=\"draggable\" id=\"slide" + numSlides + "\">" + "<div id=\"textArea\" class=\"draggable\"></div>" +"</div>");

				currentSlide = $('#slide'+numSlides);
				currentSlide.addClass('slide');
				currentSlide.prepend("<h2>Slide"+numSlides+"</h2>").css('textAlign','center');
				//currentSlide.append("<p class=\"slidepara\" id=\"p" + numSlides+ "\"></p>");
				$('.draggable:not(.ui-draggable)').draggable();
				currentSlide.trigger('click');
			}
		else if( target.is("img:eq(1)")  )
			{
				console.log("Second item");
				var textarea = '<textarea id="resizable" class="ui-widget-content"></textarea>';
				//var textarea = '<textarea></textarea>';
				currentSlide.find('#textArea').append(textarea).trigger('focus');//setting slide to be draggable
				$('.draggable:not(.ui-draggable)').draggable();
				//currentSlide.append("<div id=\"draggable\">" + textarea + "</div>").trigger('focus');				
			}	
		else if( target.is("img:eq(2)") )	
			{
				console.log("Third item");
				$('#imgchooseOpt').show().css({
												top:'-300px',
												opacity:0.5
											})
										 .animate({
													left:'500px',
													opacity:1
												
				},'slow');
				$('#imgchooseOpt').append("<p><button type=\"button\" name=\"uploadImg\">Upload Image</button></p>");						
				$('#imgchooseOpt').append("<p><button type=\"button\" name=\"chooseImg\">Choose Image</button></p>");
				$('#imgchooseOpt').on("click",imageOptClick);
			}
		else if( target.is("img:eq(3)") )
			{
				console.log("Fourth item");
				$('#transitions').fadeIn('slow');
			}	


	});//end - item selected from dashboard

	/* When an image needs to be uploaded to the slide*/
	var imageOptClick = function(evt){

		$('#imgchooseOpt').fadeOut('slow');
		var target = $(evt.target);
		if(target.is("button[name=\"uploadImg\"]"))
		{
			//$('#upload').fadeIn('slow');
			$('#fileUpload').load('fileup.html');
			
		}
		else if(target.is("button[name=\"chooseImg\"]"))
		{
			
		}

	};

	/*File uploaded sent to the server */
	$("#fileuploader").uploadFile({
	url:"../php/fileupload.php",
	allowedTypes:"png,gif,jpg,jpeg",
	fileName:"myfile"
	});//end - uploading image/file to the slide

	

	/*Zooming in or out */
	var zoomInOut = function(evt){
				
		//console.log("X="+evt.deltaX+" Y="+evt.deltaY+" deltafactor="+evt.deltaFactor);		
		var mouseWheelScrollDirection = evt.deltaY;

		if(mouseWheelScrollDirection == 1)	//Up
		{		
				
				$(this).addClass('zoomin').css({	
							transform:'auto',	//so that esc works properly
							transition:'transform 2s'
				}).removeClass('zoomout');
		}
		else if(mouseWheelScrollDirection == -1)	//Down
		{			
				
				$(this).addClass('zoomout').css({
							transform:'auto', //so that esc works properly
							transition:'transform 2s'							
				}).removeClass('zoomin');
		}

	};	// end - zoom in and out the slide when the user scrolls mouse wheen


	/*when the slide is in focus*/
	var selectSlide = function(){
		$(this).css({
					boxShadow:'0 0 20px blue'
		});
		currentSlide = $(this);

	};//end - when the slide is selected and is in focus


	/*Function to execute when clicked inside a slide*/
	var slideClick = function(evt){

		var target = $(evt.target)

		if(target.is('textarea'))
		{
			console.log('second item');
			//$(this).css('borderStyle','solid');
		}
		else 
		{
			var currentSlideColor = $(this).css('backgroundColor');
			$(this).find('textarea').css({
											background : currentSlideColor,
											borderStyle : 'none',
											fontWeight : 'bold'
			});

			console.log('Slide into focus');
			$('#canvas div').each(function(){
				$(this).attr('tabindex',0);
				$(this).css('boxShadow','');
			});	//set tabindex of other slides as 0 i.e greater than the current slide

			$(this).attr('tabindex',-1).trigger('focus');
			$(this).
			currentSlide = $(this);

		}
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
		{	
			if(currentSlide.prev('div').is(".slide"))
			{
				currentSlide = currentSlide.prev('div');
				currentSlide.click();
			}
		}
		else if(evt.which == 39)	//right arrow
		{	
			if(currentSlide.next('div').is(".slide"))
			{
				currentSlide = currentSlide.next('div');
				currentSlide.click();
			}
		}
		else if(evt.which == 38) //up arrow
		{
			/*currentSlide.addClass('zoomin').css({
							transform:'auto',	//so that esc works properly
							transitionProperty:'transform',
							transitionDuration:'2s'
				}).removeClass('zoomout');*/
		}
		else if(evt.which == 40) //down arrow
		{
			/*currentSlide.addClass('zoomout').css({
							transform:'auto',   //so that esc works properly
							transitionProperty:'transform',
							transitionDuration:'2s'
				}).removeClass('zoomin');*/
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




	/*when user clicks play or pause or stop
	$('.video').bind('click',function(evt){

		var target = $(evt.target); 
		if(target.is('#play'))
		{
			console.log('Pressed Play!');
			
		}
		else if(target.is('#pause'))
		{
			console.log('Pressed Paused!');

		}
		else if(target.is('#stop'))
		{
			console.log('Pressed Stop!');
			
		}


	});//end - clicks play,pause,stop*/


});//end ready