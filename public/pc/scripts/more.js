define(function(require){
	var key='',mes;
	var eventListener = require('./modules/cateData').event;
	window.onload=function(){
		init();
		eventListener('doPerson/more.php');
	}
	function init(){
		key = $('.result h2').attr("data-key");
	}
})


