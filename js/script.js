$(document).ready(function() {

	$('.modal_details').click(function() {
		$('#modal_windows').addClass('modal_windows_open');
	});

	$('#modal_close').click(function() {
		$('#modal_windows').removeClass('modal_windows_open');
	});
	
	// ----------------------------------------------------------
	// $('.modal_details').click(function(){
	// 	$('#modal_windows').fadeIn('slow');
	// })

	// $('#modal_close').click(function(){
	// 	$('#modal_windows').fadeOut('slow');
	// })
	
	// $('.modal_details').click(function() {
	// 	$('#modal_windows').show(1000);
	// });

	// $('#modal_close').click(function() {
	// 	$('#modal_windows').hide(1000);
	// });
// ------------------------------------------------------	
	// $('.modal_details').click(function() {
	// 	$('#modal_windows').animate({
	// 		width:  '100%',
	// 		height: '100%',
	// 		opacity: 1
	// 	}, 1000);
	// });

	// $('#modal_close').click(function() {
	// 	$('#modal_windows').animate({
	// 		height: 0
	// 	}, 1000);
	// });
// -------------------------------------------------------
	
});

