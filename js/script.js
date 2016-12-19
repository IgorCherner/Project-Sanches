$(document).ready(function() { // вся мaгия пoсле зaгрузки стрaницы
	$('.modal_details').click( function(event){
		// event.preventDefault(); 
		$('#modal_windows') 
		.css('display', 'block') 
		.animate({opacity: 1, }, 300); 
	});

	$('#modal_close').click( function(){ 
		$('#modal_windows')
		.animate({opacity: 0}, 300,  
			function(){
				$('#modal_windows').css('display', 'none');
			}
			);
	});
});