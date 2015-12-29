define(function(require,exports){
	exports.decode = function(text){
		text = text.replace(/<br\s*\/?>/gi,"\r\n");
		text = text.replace(/</g,"&lt;");
		text = text.replace(/>/g,"&gt;");
		text = text.replace(/&nbsp;/g," ");
		text = text.trim();
		return text;
	}
	exports.encode = function(text){
		text = text.replace(/ /g,'&nbsp;');
		text = text.replace(/\r\n/g,'<br />');
		text = text.replace(/\n/g,'<br />');
		return text;
	}
})
