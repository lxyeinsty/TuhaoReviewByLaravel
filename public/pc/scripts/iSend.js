$(function() {
	var fisrtcolor ="#85ffd5";
	//绑定土豪榜页面
	function loaded() {
		myScroll = new IScroll('#wrapper', {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true,
			useTransition: true
		});
	}
	loaded();
	// 商品翻页动画
	var recommendation = $(".recommend ul"),
		pre = $(".logo-left-arrow"), //前页
		next = $(".logo-right-arrow"); //下页
	function moveLists(offset) {
		var left = parseInt(recommendation.css('left')) + offset;
		if (offset > 0) {
			offset = '+=' + offset;
		} else {
			offset = '-=' + Math.abs(offset);
		}
		if (left < -1969) {
			//  取消向右点击
			recommendation.css('left', -1969);
		} else if (left > 0) {
			// 取消向左点击
			recommendation.css('left', 0);
		} else {
			recommendation.css('left', offset);
		}
	}
	next.on("click", function() {
		moveLists(-987);
	});
	pre.on("click", function() {
		moveLists(987);
	});
	// !商品翻页动画

	// 土豪翻页动画
	var chart = $(".lists ul"),
		down = $(".down"),
		up = $(".up"),
		offsetTop,
		synTop;
	// 同步ul的top值
	// setTimeout(function() {
	//	 offsetTop = $('#scroller');
	//	 synTop = setInterval(getTop, 150, offsetTop, chart);
	// }, 3000);
	// 将first的top赋值给second


	function setTanslate($target, top) {
		$target.css({
			"transform": "matrix(1, 0, 0, 1, 0," + top + ")"
		});

	}

	function movechart(offset) {
		var top = chart.position().top;
		if (offset > 0) {
			top += offset;
		} else {
			top -= Math.abs(offset);
		}
		if (top < -560) {
			//  取消向下点击
			setTanslate(chart, -560);
		} else if (top > 0) {
			// 取消向上点击
			setTanslate(chart, 0);
		} else {
			setTanslate(chart, top);
		}

		// getTop(chart, offsetTop);
		// synTop = setInterval(getTop, 150, offsetTop, chart)
	}
	down.on("click", function() {
		movechart(-305);
	});
	up.on("click", function() {
		movechart(305);
	});
	// !土豪翻页动画
	
	//carousel 事件切换.
	var container = $('.carsouel'),
		list = $('.container'),
		buttons = $('#buttons span'),
		index = 1,
		len = 3,
		interval = 3000,
		timer,
		ori_left = 1220,
		inter_space = 1220;

	function animate(offset) {
		var left = parseInt(list.css('left')) + offset;
		if (offset > 0) {
			offset = '+=' + offset;
		} else {
			offset = '-=' + Math.abs(offset);
		}
		list.animate({
			'left': offset
		}, 600, function() {
			if (left > -200) {
				list.css('left', -inter_space * (len - 1) - ori_left);
			}
			if (left < (-inter_space * (len - 1) - ori_left)) {
				list.css('left', -ori_left);
			}
		});
	}
	function changeColor($target,color){
		$target.css('background-color',color);
	}
	function showButton() {
		var _index = index -1,
			$doodle = $('.doodle'),
			color = "#ffd200";			
		buttons.eq(_index).addClass('on').parent().siblings().children("span").removeClass('on');
		switch(_index){
			case 0:
				color = fisrtcolor;
				break;
			case 1:
				color = "#F4F2F5";
				break;
			case 2:
				color = "#ffd200";
				break;
		}
		changeColor($doodle,color);
	}

	function nextPage() {
		if (list.is(':animated')) {
			return;
		}
		if (index == len) {
			index = 1;
		} else {
			index += 1;
		}
		animate(-inter_space);
		showButton();
	}

	function prePage() {
		if(list.is(':animated')) {
			return;
		}
		if(index === 1) {
			index = 3;
		} else {
			index -= 1;
		}
		animate(inter_space);
		showButton();
	}

	function play() {
		timer = setTimeout(function() {
			play();
			nextPage();
		}, interval);
	}

	function stop() {
		clearTimeout(timer);
	}


	buttons.each(function() {
		$(this).bind('click', function() {
			if (list.is(':animated') || $(this).attr('class') == 'on') {
				return;
			}
			var myIndex = parseInt($(this).attr('index'));
			var offset = -inter_space * (myIndex - index);

			animate(offset);
			index = myIndex;
			showButton();
		})
	});

	container.on({
		mouseover: stop,
		mouseout: play
	});
	play();

	$('.left-arrow').on('click',prePage);
	$('.right-arrow').on('click',nextPage);

});
$(function() {
	/*
	 *  修改周榜和月榜
	 */
	function changeSrc($target, src) {
		$target.attr('src', src);
	}

	function fillHTML($target, html) {
		$target.html(html);
	}

	function fillChart($chart) {
		var sticky = '<span>' + $chart[0].college + '</span>' +
			'<span>' + $chart[0].username + '</span>',
			lis = $('#scroller>li'),
			i;
		//修改first的内容
		changeSrc($('.container-img>img'), $chart[0].head_photo);
		fillHTML($('.sticky'), sticky);
		//修改剩下9个土豪
		lis.each(function(index) {
			i = index + 1;
			var _this = $(this),
				img = _this.children('img'), //获得土豪的头像
				$detail = _this.find('.detail'), //获得detail的值
				detail = '<span data-role="level">LV' + $chart[i].levell + '</span>' +
				'<span data-role="name">' + $chart[i].username + '</span>' +
				'<span data-role="college">' + $chart[i].college + '</span>' +
				'<span data-role="score">积分: ' + $chart[i].score + '</span>';
			changeSrc(img, $chart[i].head_photo); //改变头像
			fillHTML($detail, detail); //改变土豪的详细信息
		})
	}
	/*
	 * 发送ajaxUtitlity
	 */
	sendAjax.DEFAULT = {
		type: 'get'
	};

	function sendAjax(opts) {
		var opts = $.extend({}, sendAjax.DEFAULT, opts);
		$.ajax({
			url: opts.url,
			type: opts.type,
			data: opts.data,
			success: function(res) {
				if(res.code){
					opts.success(res.data);
				}
			},
			complete: function() {
				opts.complete();
			}

		})
	}
	/*
	 * 切换周榜和月榜
	 */
	var url = {
		time_chart: "user/index",
		getMore: 'goods/index'
	}
	$('.week-chart,.month-chart').on('click', function(event) {
		$(".title a").removeClass("chart-active");
		$(this).addClass('chart-active');
		
		var target = $(event.target),
			date,
			opts = {};
		if (target.hasClass('month-chart')) {
			date = 'total';
			$('.chart>a').attr('href','chart?type=total');
		} else if (target.hasClass('week-chart')) {
			date = 'week';
			$('.chart>a').attr('href','chart?type=week');
		} else {
			date = 'total';
			$('.chart>a').attr('href','chart?type=total');
		}
		opts.data = {
			'type': date
		};
		opts.url = url.time_chart;
		opts.success = function(data){fillChart(data);}
		opts.complete = function(){
			myScroll.refresh();
			myScroll.scrollTo(0,0);
		}
		sendAjax(opts);
	})
	/*
	 * 查看更多加载数据
	 * action: 每点击一次，加载15个数据
	 */
	function addMore($target, data) {
		var _html = $target.html(),
			html = joint(data);

		$target.append(html);

	}
	/*
	 *处理添加lis的json数据，并返回添加的lis
	 */
	function joint(data) {
		var html = [],
			li;
		for (var i = 0; i < data.length; i++) {
			var _data = data[i],
				ele_li = $(document.createElement('li'));
			li =
				'<a href="details?pro_id=' + _data.id + '">' +
				'<div class="thumbnail" >' +
				'<img src=' + _data.src + ' />' +
				'</div></a><div class="sticky-note" >' +
				'<a href=details?pro_id=' + _data.id + '>ABOUT MORE</a>' +
				'<p>' + _data.pro_desc + '</p>' +
				'<span>' + _data.college + ' ' + _data.username + '</span>' +
				'</div>';
			ele_li.html(li);
			html.push(ele_li);
		}
		return html;
	}
	/*
	 * 将getMore的btn改变
	 */
	function disabledMore($target, classname) {
		$target.attr('disabled', 'disabled')
			.addClass(classname);
	}

	function useMore($target, classname) {
		$target.removeAttr('disabled')
			.removeClass(classname);

	}
	function noMore($target){
		disabledMore($target,'afterMore');
		$target.text("没有更多");

	}
	/*
	 * 添加addMore的触发事件
	 */
	var num = 1;
	$('.getall').on('click', function() {
		var _this = $(this),
			opts = {},
			$target = $(".add_more ul");
		disabledMore(_this, 'afterMore');
		opts.url = url.getMore;
		opts.data = {
			page:num++
		};
		opts.success = function(data){
			if(data.length>0){
				addMore($target,data);
				useMore(_this,"afterMore");
			}else{
				noMore(_this);
			}
		}
		opts.complete = function(){useMore(_this, 'afterMore');}
		sendAjax(opts);
	})
})
