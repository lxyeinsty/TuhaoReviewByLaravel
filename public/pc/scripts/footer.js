$(function() {
	var footer = $("footer"),
		main = $("main");
		originHeight = $(document).height(),
		headerHeight = $("header").height(),
		footerHeight = $("footer").height(),
		mainHeight = $("main").height(),
		originLeft = footer.offset().left;

	//将main元素垂直居中
	main.css("top", (originHeight - headerHeight - footerHeight - mainHeight) / 2 + "px");
	$(window).on("scroll", function() {
		footer.css("left",(originLeft - $(window).scrollLeft()) + "px");
	});
});