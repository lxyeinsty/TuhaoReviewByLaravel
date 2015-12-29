$(function() {
	var timeShow = $("#countTime");
	var countTime = function(time) {
		time = time - 1;
		if(time === 0) {
			window.location.href = '/';
		} else {
			timeShow.text(time);
			setTimeout(function() {
				countTime(time);
			},1000);
		}
	};
	setTimeout(function() {
		countTime(3);
	},1000);
});