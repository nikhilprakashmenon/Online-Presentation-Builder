/*
	Author : Nikhil Prakash
	Version: 1.0.6
	Changes : Added Slider info, close button, other minor modifications and inclusion of play and stop
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

		if( target.is("img:even:eq(0)") )  //Creating and adding a new slide to the canvas
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
		else if( target.is("img:even:eq(1)")  )
			{
				console.log("Second item");
				if(numSlides==0)
					alert("No Slide Exists!");
				else
				{
					var textarea = '<textarea id="resizable" class="ui-widget-content"></textarea>';
					//var textarea = '<textarea></textarea>';
					currentSlide.find('#textArea').append(textarea).trigger('focus');//setting slide to be draggable
					$('.draggable:not(.ui-draggable)').draggable();
					//currentSlide.append("<div id=\"draggable\">" + textarea + "</div>").trigger('focus');				
				}
			}	
		else if( target.is("img:even:eq(2)") )	
			{
				if(numSlides==0)
					alert("No Slide Exists!");
				else
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
					$('#imgchooseOpt').on("click",imageOptClick);	
				}
				
			}
		else if( target.is("img:even:eq(3)") )
			{
				console.log("Fourth item");
				if(numSlides==0)
					alert("No Slide Exists!");
				else
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
		else if(evt.which == 46)//delete	
		{

		}
	});	// end - left click

	//Transitions selection
	var transitionArray = [
	{transition:'width 1s, height 1s'}, //scale
	{transition:'transform 1s'}			//rotate
	];

	/*When user moves over a transition or selects a transition*/
	$('#transitions img').on('click mouseover',transitionArray,function(evt){

		var $transitionSelected = $(evt.target);
		var i = $transitionSelected.attr('id').replace(/trans(\d)/,"$1");
		console.log("transition: "+i);
	
		if(typeof evt.data[0] === 'string')
			{
				console.log("Removing first element");
				evt.data.shift();	//remove the previous transition number    from the array
			}

		if(evt.type == "mouseover")
		{
			console.log("Mouseover transition");			
			$transitionSelected.css(evt.data[i]);			
		}
		else if(evt.type == "click")
		{
			evt.data.unshift(i);	//insert the transition number to the beginning of the array
			console.log(evt.data);
			$('#transitions > div.closeButton').trigger('click');
		}
		
	});//end - transition selection

	//When user wants to play/stop the presentation
	$('#presentationPlayStop').on('click',transitionArray,function(evt){

		if(numSlides==0)
			alert("No Slide Exists!");
		else
		{
			var $choice = $(evt.target);

			$('#canvas div').each(function(){
				var none = "none";
				$(this).css({
								transform:none
				}).delay(1000);
			});//same effect as pressing 'esc' key

			if($choice.is('#startTransition'))
			{
				console.log('Start Transition number '+evt.data[0]);
				var transNum = evt.data.shift();

				var $thisSlide;
				for(var i=1; i<=numSlides; i++)
				{
					$thisSlide = $('#slide'+i);
					/*var this = '#slide'+i;
					$('#canvas div:not(this)').each(function(){


					});*/

					console.log('array '+evt.data);					
					console.log(evt.data[transNum].transition);

					$thisSlide.addClass('slideTransStart').css(evt.data[transNum].transition);
					$thisSlide.trigger('focus');
				}
			}
			else if($choice.is('#stopTransition'))
			{
				console.log('Stop Transition');
			}
			
		}

	});//end - play/stop transition

	
	/* When user clicks close button*/
	$(document).on('click','.closeButton',function(evt){

		$ElementToClose = $(evt.target).parent();
		var element = $ElementToClose.attr('id');
		$ElementToClose.fadeOut('slow',function(){
			if( $(this).is('#imgchooseOpt') )
			{
				$(this).css({	opacity: 0.5,
								left:'0px'    });
			}
		});
	});//end - close button

});//end ready