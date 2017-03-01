$(function() {
	$('#light-pagination').pagination({
		items: 20,
		itemsOnPage: 8,
		currentPage: 1,
		hrefTextPrefix: '',
		hrefTextSuffix: '.html',
		cssStyle: 'light-theme'
	});
});

function getSlice(arr, num) {
	if(arr.length && num > 0) {
		if(arr.length < num) {
			num = arr.length;			
		}
		var partOfArr = arr.slice(0, num);
		return partOfArr;

	}

}
// ----------------------------------------------

var windowItems = [];


function goToPage(pageNumber) {
	var itemUrl = '/item.html';
	var jsonUrl = '/item.json';

	$.getJSON(jsonUrl, function(json) {
		cards = json.slice();

		var n = 8, item = 0, numOfItems = 20; /*8-the number of cards per page, 20-It comes from the server*/
		var m = parseInt(numOfItems / n); /*expects the rest of the cards displayed on the page*/
		if(numOfItems % n != 0) {
			m++;
		}

		for (var i = 0; i < m; i++){
			windowItems[i] = [];
			
			for (var j = 0; j < n; j++){
				if(item < numOfItems){
					windowItems[i][j] = cards[item++];
					
				}
			}
		}
	});
	
	$.ajax ({
		url: itemUrl,
		success: function(item) {
			var $templateItem = $(item);
			var html = '';

			var slice = windowItems[pageNumber - 1];
			

			$(slice).each(function(index, el) {
				var item = $templateItem.clone();

				item.find('.header-img').attr('src',el.headerImg);
				item.find('.header-title').text(el.headerTitle);
				item.find('.content-img').attr('src',el.contentImg);
				item.find('.content-title').text(el.contentTitle);
				item.find('.content-subtitle').text(el.contentSubtitle);
				item.find('.modal_details').attr('data-id', el.dataItem);

				html = html + $('<div></div>').append(item).html();

			});


			$('.wrap').html(html);
			modalEventsHandler();
		}
	});

	
	
	function modalEventsHandler() {
		$('input[type="button"]').click(function() {
			var id = $(this).data('id');
			var modalUrl = '/modal.html';
			var jsonUrl = '/data.json';

			$.ajax ({
				url: modalUrl,
				success: function(data) {
					var $html = $(data);
					var obj = obj;

					$.getJSON(jsonUrl, function(data) {
						$(data).each(function(key, value){
							if(value.dataID == id){
								obj = value;
							}
						});

						$html.find('.modal-img').attr('src',obj.modalImg);
						$html.find('.mod_title').text(obj.modTitle);
						$html.find('.mod_description').text(obj.modDescription);

						$('#modal_windows').html($html).addClass('modal_windows_open');
						
					});
				}

			});

		});

		$('#modal_windows').on('click', '#modal_close',function() {
			$('#modal_windows').removeClass('modal_windows_open');
		});
	}
}