define(function(require) {
	var key='';
	var $ul,eventListener = require('./modules/cateData').event;
	window.onload=function(){
		init();
		eventListener('goods/category');
	}
	function init(){
		key = $('.result h2').attr("data-key");
	}
});


