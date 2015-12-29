define(function(require){
	var $ul
	var user_id;
	var mes={},pages={};
	
	
	window.addEventListener('load',function(){
		init();
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
				getGoods(cur);
			}
		});
	});
	
	function init(){
		pages = require('./modules/pages');
		pages = pages.initPage();
		
		//dom init
		$ul = $('.list>ul');
		user_id = parseInt($('#main header .username').attr('data-id'),10);
		//Obj init
		mes = require('./modules/mes').mes;
	}
	
	
	function creatGoodsList(data){
		var $li = $('<li class="item"></li>');
		$li.html('<div class="goodsName"></div><div class="wrapper"><div class="text"><a href=""></a></div></div><a href=""><img src=""/></a>');
		var $goodsName = $li.find('.goodsName');
		var $wrapper = $li.find('.wrapper');
		var $a = $li.find('a');
		var $text = $li.find('.text a');
		var $img = $li.find('img');
		$a.attr('href','detail.php?pro_id='+data.pro_id);
		$text.html(data.pro_desc);
		$goodsName.attr('data-id',data.pro_id);
		$goodsName.html(data.goods_name);
		$img.attr('src',data.src);
		var $tem = $('<div></div>');
		$tem.append($li);
		return $tem.html();
	}
	
	function getGoods(curPage){
		url = "goods/guest"
		$.ajax({
			type:"get",
			url:url,
			async:true,
			data:{id:user_id,curPage:curPage},
			success: function(res){
				if(res.code==1){
					res = res.data;
					if(res.maxPage==0){
						pages.max = 1;
						pages.update(1);
					}
					else {
						pages.max = res.maxPage;
						pages.update(res.curPage);
					}
					var str = '';
					var len = res.data.length;
					if(len==0){
						str = '<li class="item" style="text-align: center;">他还米有正在送出的物品哦~</li>';
					}
					else {
						for(var i=0;i<len;i++){
							str+=creatGoodsList(res.data[i]);
						}
					}
					$ul.html(str);
					$('html,body').animate({scrollTop:0},0);
				}
				else {
					mes.show(res.mes)
				}
			}
		});
	}
})

