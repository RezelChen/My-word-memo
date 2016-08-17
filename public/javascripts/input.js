var strToWords = function (str, list, listName) {
	var arr = str.split('\n');
	var result = _.map(arr, function (item, i) {
		var a = item.split(':');
		var en = a[0], cn = a[1];
		return {
			listName: listName,
			listNumber: list,
			en: en,
			cn: cn,
			progress:0,
		};
	});
	return result;
};

(function() {
	$('#submit').click(function(e){
		var inArea = $('#inArea').val(),
		 	listNumber = parseInt($('#listNumber').val()) || undefined,
		 	listName = $('#listName').val();
		if (inArea !== '') {
			if ((listName == '') || (listNumber == undefined)) {
				alert('请先输入词表名称和编号 ^0^');
			} else {
				$.ajax({
					type : 'POST',
					contentType: 'application/json', 
					url : '/input',
					data : JSON.stringify({
						listName: listName,
						listNumber: listNumber,
						inArea: inArea
					}),
					success: function(data) {
						if(data === 'success') {
							window.location.href = '/word?path=/' + 
							listName + '/' + listNumber;
						}
					}	
				});
			}
			
		};
		
	});
		
})();