$(document).ready(function() {

	$('input[type="button"]').click(function() {
		var title = $(this).data('title'), 
		description = $(this).data('description');
		$('.mod_title').text(title);
		$('.mod_description').text(description);
		var src = $(this).data('image');
		$('#modal_windows .modal-img').attr('src',src);
	});

	$('input[type="button"]').click(function() {
		$('#modal_windows').addClass('modal_windows_open');
	});

	$('#modal_close').click(function() {
		$('#modal_windows').removeClass('modal_windows_open');
	});
});
