$(function() {
	//固定nav在页面顶端
	var $nav = $(".navigation");
	var $top = $nav.offset().top;
	$(window).scroll(function() {
		if ($top <= $(this).scrollTop()) {
			$nav.addClass("nav-fixed-top");
		} else {
			$nav.removeClass("nav-fixed-top");
		}
	});
	//切换导航展示li     
	var $bar = $(".progress-bar");
	$(".nav-lists").children("li").on({
		mouseenter: function() {
			$(this).find("article").addClass('article-active');
			if ($bar.is(":animated")) {
				$bar.stop(true, true);
			}
			$bar.animate({
				width: "100%"
			}, 'slow');
		},
		mouseleave: function() {
			$(this).find("article").removeClass('article-active');
			if ($bar.is(":animated")) {
				$bar.stop(true, true);
			}
			$bar.animate({
				width: "0"
			}, 'fast');
		}
	})

	// 根据index显示指定土豪信息
	var detailOrder = function($detail, index) {
		var order = 1;
		if (index) {
			order = index;
		}
		$detail.fadeIn().addClass('flex').find('.box').css('left', (-667 * order + "px")); //显示指定土豪信息
	}
	//切换头像图和详细信息图,origin是头像图，detial是详细图
	var toggleInfo = function($origin, $detail, index, display) {
		if ($origin.css('display') === display) {
			$origin.hide();
			detailOrder($detail, index);
		} else {
			$origin.fadeIn();
			$detail.removeClass('flex');
			$detail.hide();
		}
	}
	var $top5 = $("#top5-items"), //top5的更多btn
		$top10 = $('#top10-items'), //top10的更多btn
		$list_content = $(".lists-content"), //top5的土豪头像区 
		$top10_lists = $('.top10-lists'), //top10的土豪头像区
		container = $('#container'), //top5的个人信息区
		container_top10 = $('#container-top10'), //top10的个人信息区
		list = $('#list'),
		prev = $('#prev'),
		next = $('#next'),
		index = 1;
		//top10的内容
		list_top10 = $('#list-top10'),
		prev_top10 = $('#prev-top10'),
		next_top10 = $('#next-top10'),
		index_top10 = 1,
		len_top10 = 10;

	//给top5的"更多"绑定切换事件
	$top5.on("click", function() {
		toggleInfo($list_content, container, null, "flex");
	})
	//给top5的thumbnail绑定切换事件
	$list_content.find(".thumbnail").on("click", function() {
		var $this = $(this),
			index = $this.attr('index');
		if (index) {
			toggleInfo($list_content, container, index, "flex");
		}
	})
	//给top10的"更多"绑定切换事件
	$top10.on('click', function() {
		toggleInfo($top10_lists, container_top10, null, "block")
	})
	//给top10的thumbnail绑定切换事件
	$top10_lists.find('.thumbnail').on('click', function() {
		var $this = $(this),
			index = $this.attr('index');
		if (index) {
			toggleInfo($top10_lists, container_top10, index, "block");
		}
	})
		//使用动画定义,切换土豪个人信息事件
	function animate(offset, list,len) {
		var left = parseInt(list.css('left')) + offset;
		if (offset > 0) {
			offset = '+=' + offset;
		} else {
			offset = '-=' + Math.abs(offset);
		}
		list.animate({
			'left': offset
		}, 667, function() {
			if (left > -200) {
				list.css('left', -667 * len);
			}
			if (left < (-667 * len)) {
				list.css('left', -667);
			}
		});
	}
	next.on('click', function() {
		if (list.is(':animated')) {
			return;
		}
		if (index == len) {
			index = 1;
		} else {
			index += 1;
		}
		animate(-667, list,5);
	});

	prev.on('click', function() {
		if (list.is(':animated')) {
			return;
		}
		if (index == 1) {
			index = 5;
		} else {
			index -= 1;
		}
		animate(667, list,5);
	});
	//top10的切换按钮
	prev_top10.on('click', function() {
		if (list_top10.is(':animated')) {
			return;
		}
		if (index_top10 == 1) {
			index_top10 = 10;
		} else {
			index_top10 -= 1;
		}
		animate(667, list_top10,10);
	})
	next_top10.on('click', function() {
		if (list_top10.is(':animated')) {
			return;
		}
		if (index_top10 == len_top10) {
			index_top10 = 1;
		} else {
			index_top10 += 1;
		}
		animate(-667, list_top10,10);
	})

})