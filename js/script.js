$(function() {
	$('#light-pagination').pagination({
		items: 20,
		itemsOnPage: 8,
		currentPage: 1,
		hrefTextPrefix: '',
		hrefTextSuffix: '.html',
		// prevText: 'Начало',
		// nextText: 'Конец',
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

function getRangeOfPages(firstPage, lastPage) { 
	var result = [];
	var item = 0;
	if(lastPage > pages.length)	{
		console.log("последняя страница больше размера массива");
		lastPage = pages.length;
	}
	if(firstPage > lastPage) {
		console.log('поменяй местами номера страниц');
		var buff = firstPage;
		firstPage = lastPage;
		lastPage = buff;
	}	
	for (var i = firstPage; i < lastPage; i++) {

		for (var j = 0; j < pages[i].length; j++) {
			result[item++] = pages[i][j];

		}

	}
	return result;

}
// ----------------------------------------------

var pages = [];

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
			pages[i] = [];

			for (var j = 0; j < n; j++){
				if(item < numOfItems){
					pages[i][j] = cards[item++];
					
					
				}
			}
		}
			// console.log(getRangeOfPages(0, cards.length));
			$('#s-all').on('click', function() {
				getRangeOfPages(0, cards.length);

			});	
		});
	
	$.ajax ({
		url: itemUrl,
		success: function(item) {
			var $templateItem = $(item);
			var html = '';

			var slice = pages[pageNumber - 1];
			

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