define(function (require, exports) {
	exports.mes = {
		$dom : $('#mes'),
		show : function(str){
			this.$dom.html(str);
			this.$dom.addClass('active');
			var $this = this;
			setTimeout(function(){
				$this.hide();
			},2000);
		},
		hide : function(){
			this.$dom.removeClass('active');
		}
	}
});