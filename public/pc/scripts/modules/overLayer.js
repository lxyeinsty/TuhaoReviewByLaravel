define(function (require, exports) {
	exports.overLayer = {
		$dom: $('#overLayer'),
		show: function(str) {
			this.$dom.addClass('active');
		},
		hide: function() {
			this.$dom.removeClass('active');
		}
	}
});