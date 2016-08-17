var reviewList = (function() {
	var review = [];
	return {
		add: function(a) {
			review.push(a.en);
		},
		show: function() {
			var reviewList = _.unique(review).join('<br/>');
			$("#reviewList").html(reviewList);
			$(".review").show();
		}
	}
	
})();

var init = function(path) {
	$.ajax({
		type : 'GET',
		url : '/data',
		data : {
			'path': path
		},
		success: function(data) {
			console.log(data);
			var getLex = getLexFn(data);

			$("#next").click(function () {
				showLex(getLex(1));
				$("#cn").hide();
			});
			$("#prep").click(function() {
				showLex(getLex(-1));
				$("#cn").hide();
			});
			$("#mark").click(function () {
				reviewList.add(getLex());
			});
			$("#show").click(function () {
				$("#cn").show();
			});

			showLex(getLex());
			$("#cn").hide();
		}	
	});
};

var getLexFn = function (lexicals) {
	var arrLexs = _.shuffle(lexicals),
		len = arrLexs.length,
		i = 0;

	return function (a) {
		a = a || 0;
		i = i + a;
		if(i >= len){
			i = i - a;
			reviewList.show();
		} else if(i < 0){
			i = 0;
		}
		return arrLexs[i];
	}
};

var showLex = function(item) {
	$('#en').html(_.template(item.en));
	$('#cn').html(_.template(item.cn));
};

document.onkeyup = function(e) {
	if (e.keyCode == 32) {
		$("#show").click();
	} else if (e.keyCode == 39) {
		$("#next").click();
	} else if (e.keyCode == 37) {
		$("#prep").click();
	} else if (e.keyCode == 13) {
		$("#mark").click();
	}
};
