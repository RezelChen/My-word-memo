// html转码，从网上复制过来
var HtmlUtil = {
    htmlEncode:function (html){
        var temp = document.createElement ("div");
        (temp.textContent != undefined ) ? (temp.textContent = html) 
        								 : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    htmlDecode:function (text){
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }
};

var fileTreeC = function(data) {
	var current = data;

	var _pathResolve = function(r, p) { return r + '/' + p };

	var _render = function(data) {
		var iter = function(data, ctx) {
			if(!data.children) {
				data = HtmlUtil.htmlEncode(data);
				return '<li><a href="/word?path='+ _pathResolve(ctx.path, data) +
					   '">' + data + '</a></li>';
			} else {
				return '<li><a class="cc" href="javascript:;">'+ data.name +'</a></li>';
			};
		};

		return data.children.map(function(item) {
			return iter(item, data);
		}).reduce(function(prev, current) {
			return prev + current;
		}, '<p class="'+ (data.parent?'uu': 'root') +
		   '" style="padding-top: 30px">'+ data.name +'</p>');
	};

	return {
		render: function() { return _render(current); },
		changePath: function(dir) {
			current.children.forEach(function(item, i) {
				if (dir == item.name) {
					var t = current;
					current = item;
					current.parent = t;
				}
			});
		},
		upPath: function() {
			current = current.parent;
		}
	};
};

var init = function() {
	$.ajax({
		type: 'GET',
		url: 'lexicon/data',
		success: function (result) {
			var fileTree = fileTreeC(result);

			$('#file-nav').html(fileTree.render());

			$('#file-nav').on('click', '.cc', function(e) {
				fileTree.changePath(e.target.innerText);
				$('#file-nav').html(fileTree.render());
			});
			$('#file-nav').on('click', '.uu', function(e) {
				fileTree.upPath();
				$('#file-nav').html(fileTree.render());
			});
		}
	});
};

init();