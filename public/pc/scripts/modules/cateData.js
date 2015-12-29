define(function(require,exports) {
	var pages = require('./pages');
	pages = pages.initPage();
	var $ul=$('.list');
	var mes = require('./mes').mes;
	
	exports.createItem = function(data){
		var $li = $('<li></li>');
		$li.html('<div class="imgWrapper"><a href=""><img /></a></div><div class="textWrapper"><div class="goodsName"><a href=""></a></div><div class="des"></div><div class="time"></div></div>');
		var $a = $li.find('a');
		var $img = $li.find('img');
//		var $cover = $li.find('.cover');
//		var $college = $cover.find('.college');
//		var $username = $cover.find('.username');
		var $textWrapper = $li.find('.textWrapper');
		var $goodName = $textWrapper.find('.goodsName');
		var $des = $textWrapper.find('.des');
		var $time = $textWrapper.find('.time');
		$a.attr('href','detail.php?pro_id='+data.id);
		$img.attr('src',data.src);
//		$college.html(data.college);
//		$username.html(data.username);
		$goodName.html(data.pro_name);
		$des.html(data.pro_desc)
		$time.html(data.reg_time);
		var $tem = $('<div></div>');
		$tem.append($li);
		return $tem.html();
	}
	
	exports.getRes = function(curPage,url){
		$.get(url,{order:"general",curPage:curPage},function(res){
//			res = $.parseJSON(res);
			if(res.code==1){
				res = res.data;
				if (res.maxPage==0) {
					pages.max = 1;
					pages.update(1);
				}
				else {
					pages.max = res.maxPage;
					pages.update(res.curPage);
				}
				var str = '';
				var len = res.data.length;
				if(len){
					for(var i=0;i<len;i++){
						str +=exports.createItem(res.data[i]);
					}
				}
				else {
					str +='<li class="info">这里还什么都没有，去搜搜其他的？</li>';
				}
				str +='<li class="fixed"></li><li class="fixed"></li><li class="fixed"></li>';
				$ul.html(str);
				$('body,html').animate({ scrollTop: 0 },0);
			}
			else {
				mes.show(res.mes);
			}
		});
	}
	
	exports.event = function(url){
		$('.pages').on('click','li',function(){
			var $this = $(this);
			if($this.hasClass('active')){
				return;
			}
			var $num = parseInt($this.attr('data-num'),10);
			if($num==-3){
				return;
			}
			else {
				var cur = pages.getCur();
				if($num==-1){
					if(cur>1){
						pages.removeActive();
						cur--;
						pages.update(cur);
					}
				}
				else if($num==-2){
					if(cur<pages.max){
						pages.removeActive();
						cur++;
						pages.update(cur);
					}
				}
				else {
					cur = parseInt($num,10);
					pages.removeActive();
					pages.update(cur);
				}
				exports.getRes(cur,url,pages,$ul);
			}
		});
	}
})
