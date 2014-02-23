/*
	Author : Nikhil Prakash
	Version: 1.0.5
	Changes: Initiation of transition usage
*/

$(function(){

	var transitionArray = [
	{MozTransition:'width 1s, height 1s'},
	{MozTransition:'transform 1s'}
	];

	/*When user hovers over a transition*/
	$('#transitions').on('mouseover',transitionArray,function(evt){

		var $transitionSelected = $(evt.target);
		var i = $transitionSelected.index();
		$transitionSelected.css(evt.data[i]);

	});//end - hovering over a transition

	$('#transitions').on('click',transitionArray,function(evt){

		var $transitionSelected = $(evt.target);
		var i = $transitionSelected.index();
		if(typeof evt.data[0] === 'number')
			evt.data.shift();	//remove the previous transition number from the array
		evt.data.unshift(i);	//insert the transition number to the beginning of the array
		console.log(evt.data);
	});
});
