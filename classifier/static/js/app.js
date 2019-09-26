$( document ).ready(function(){
	$('.draggable-move').draggable({
		cursor: "move"
	});
	$('.progress').hide();
	$('#inputFile').hide();
	$('#input-image').on('click',()=> {
		$('#inputFile').trigger('click')
	});
});