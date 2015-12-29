define(function(require) {
	var pages={},mes={};
	var $c  ,$cmtWrapper,$goods;
	var pro_id=-1,receiver=0,isOwner=false,loginFlag=0,user_id;
	var isEmpty=true;
	var desireTop=0;
	var txtUtil = require('./modules/textUtil');
	window.onload = function(){
		init();
		
		(function() {
			var curImg = $(".article-photo > img");
			var curParent = $(".article-photo");
			if(curImg.width() > curImg.height()) {
				curParent.removeClass();
				curParent.addClass("article-photo article-photo-width");
			} else {
				curParent.removeClass();
				curParent.addClass("article-photo article-photo-height");
			}
		})();
		
		$('.cmtWrapper').on('click','.reply-button',function(){
			if(parseInt($('i.logo-self-info').attr('data-log'),10)==0){
				mes.show("请先登录再评论。");
				return ;
			}
			var $this = $(this);
			var $replay = $this.parents('.comment-button-list').next('.article-comment-frame');
			if($replay.css('display')==='block'){
				$replay.css('display','none');
			}
			else {
				$replay.css('display','block');
			}
			
		});
		
		$('.cmtWrapper').on('click','.comment-submit-button',function(){
			if(parseInt($('i.logo-self-info').attr('data-log'),10)==0){
				mes.show("请先登录再评论。");
				return ;
			}
			var $this = $(this);
			var $textArea = $this.prev();
			var $area = $($this.parents('.user-comment-area')[0]);
			var $username = $area.find('.user-name');
			var $text = $area.find('.user-comment-content');
			var pro_name = $goods.html();
			var parent_id = parseInt($text.attr('data-parent'),10);
			if(!parent_id){
				parent_id = parseInt($text.attr('data-id'),10);
			}
			
			var receiver_id = parseInt($username.attr('data-id'),10);
			var text = $textArea.html().trim();
			text = txtUtil.decode(text);
			if (text!=""&&text!='\r\n') {
				$.post('comments/add',{
					parent_id:parent_id,
					pro_id : pro_id,
					receiver_id: receiver_id,
					content: text
				},function(res){
//					res = $.parseJSON(res);
					if (res.code==1) {
						var $replay = $this.parents('.article-comment-frame');
						$replay.css('display','none');
						var area = $this.parents('.user-comment-outer').find('.user-comment-area').first();
						area.append(createInner(res.data));
						mes.show(res.mes);
					}
					mes.show(res.mes);
				})
			}
			$textArea.html('<br />');
		});
	
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
//						console.log({'cur-=':cur});
						pages.update(cur);
					}
				}
				else if($num==-2){
					if(cur<pages.max){
						pages.removeActive();
						cur++;
//						console.log({'cur+=':cur});
						pages.update(cur);
					}
				}
				else {
					cur = parseInt($num,10);
//					console.log({'cur':cur});
					pages.removeActive();
					pages.update(cur);
				}
				getCmt(cur);
			}
		});
	
		$cmtWrapper.on('click','.confirm-button',function(){
			var $this = $(this);
			var receiver_id = parseInt($this.parents('.wrapper').find('.user-name').first().attr('data-id'),10);
//			console.log({pro_id:pro_id,receiver_id:receiver_id});
			$.post('goods/give',{pro_id:pro_id,receiver_id:receiver_id},function(res){
//				res = $.parseJSON(res);
				if(res.code==1){
					$cmtWrapper.find('.confirm-button').remove();
					var $tem = $cmtWrapper.find('.user-comment-outer>.user-comment-area>.wrapper');
					$tem.each(function(){
						var $this = $(this);
						var userId = parseInt($this.find('.user-name').first().attr('data-id'),10);
						if(userId == receiver_id) {
							$this.find('.comment-button-list').first().prepend('<a href="javascript:void(0)" class="success comment-button"></a>');
						}
					});
					receiver = receiver_id;
					mes.show("物品已送出，坐等Ta签收~");
				}
				else {
					mes.show(res.mes);
				}
			})
		});
		
		$('#comment-submit').on('click',function(){
			if(parseInt($('i.logo-self-info').attr('data-log'),10)==0){
				mes.show("请先登录再评论。");
				return ;
			}
			var $this = $(this);
			var $textArea = $this.prev();
			var $area = $($this.parents('.user-comment-area')[0]);
			var $text = $area.find('.user-comment-content');
			var parent_id = 0;
			
			var text = $textArea.html().trim();
			text = txtUtil.decode(text);
			if (text!=""&&text!='\r\n') {
//				console.log({
//					parent_id:parent_id,
//					pro_id : pro_id,
//					receiver_id: user_id,
//					text: text
//				});
				$.post('comments/add',{
					parent_id:parent_id,
					pro_id : pro_id,
					receiver_id: user_id,
					content: text
				},function(res){
//					res = $.parseJSON(res);
					mes.show(res.mes);
					if(res.code==1){
						var str = createCmt(res.data);
						if(isEmpty){
							$cmtWrapper.html('');
							$('.empty-reply').remove();
							isEmpty = false;
						}
						$cmtWrapper.prepend(str);
					}
				})
			}
			$textArea.html('<br />');
		});
	
		//图片滑动切换
		$(".article-photo-list li img").on("mouseover",function(){
			var curSrc = $(this).attr("src");
			var curImg = $(".article-photo > img");
			var curParent = $(".article-photo");
			$(".goods-photo-hover").removeClass();
			curImg.attr("src",curSrc);
			if(curImg.width() > curImg.height()) {
				curParent.removeClass();
				curParent.addClass("article-photo article-photo-width");
			} else {
				curParent.removeClass();
				curParent.addClass("article-photo article-photo-height");
			}
			$(this).addClass("goods-photo-hover");
		});
	
		$('.article-comment-area').on('paste','.comment-content-area',function(){
			var $this = $(this);
			setTimeout(function(){
				var text = $this.html();
				text = text.replace(/<br\s*\/?>/gi,"\r\n");
				text = text.replace(/&nbsp;/g," ");
				$this.html(text);
				text = $this.text();
				text = txtUtil.encode(text);
				$this.html(text);
			},2)
		});

		$('#edit-goods').on('click',function(e) {
			var search = window.location.search,
				proId = search.split('=')[1];
			window.location.href = '/edit-goods?pro_id=' + proId;
		});
		
//		$cmtWrapper.on('click','.delete-comment',function(e){
//			var dataId = parseInt($(e.target).attr("data-id")),
//				dataParent = $(e.target).parent().parent().parent().parent(),
//              mForm = new FormData();
//          console.log(typeof dataId);
//          mForm.append('comm_id',dataId);
//			$.ajax({
//				url: "doPerson/editComm.php?active=deleteComm",
//				type: 'POST',
//				data: mForm,
//              contentType: false,
//              processData: false,
//				success: function(data) {
//					if(data.success) {
//						dataParent.fadeOut(500,function() {
//							dataParent.remove();
//						});
//					} else {
//						mes.show("删除失败");
//					}
//				},
//				error: function() {
//					mes.show("删除失败");
//				}
//			});
//		});
	}
	
	function init(){
		$goods = $("#goods");
		pro_id = parseInt($goods.attr('data-id'),10);
		receiver = parseInt($goods.attr('data-receiver'),10)
		$cmtWrapper = $(".cmtWrapper");
		loginFlag = parseInt($('i.logo-self-info').attr('data-log'),10);
		user_id = parseInt($('.article-master').first().attr('data-id'),10);
		desireTop = $('.master-desire-area').offset().top-104;
		if(user_id==loginFlag){
			isOwner=true;
		}
		if($('.empty-reply').length==0){
			isEmpty=false;
		}
		// page init
		pages = require('./modules/pages');
		pages = pages.initPage();
		
		mes = require('./modules/mes').mes;
	}
	
	function createCmt(data){
		var $section = $('<section class="user-comment-outer"></section>');
		$section.html('<div class="user-potrait"><a href="guest.php?id='+data.sender_id+'"><img src="'+data.src+'"></a></div>');
		var $area = createUserArea(data);
//		if(loginFlag==data.sender_id){
//			$area.find('.comment-button-list').first().prepend('<a href="javascript:;" class="comment-button delete-comment" data-id="'+data.id+'"></a>');
//		}
		if(isOwner){
			if(receiver==0){
//              console.log(data.sender_id )
//              console.log(user_id)
				if(data.sender_id != user_id)
				$area.find('.comment-button-list').first().prepend('<a href="javascript:void(0)" class="confirm-button comment-button"></a>');

			}
			else if(receiver==data.sender_id){
				$area.find('.comment-button-list').first().prepend('<a href="javascript:void(0)" class="success comment-button"></a>');
			}
		}
		var len = data.comments.length;
		for(var i =0,len = data.comments.length;i<len;i++){
			$area.append(createInner(data.comments[i]));
		}
		$section.append($area);
		var $tem = $('<div></div>');
		$tem.append($section);
		return $tem.html()
	}
	function createUserArea(data){
		var $userArea = $('<div class="user-comment-area"></div>');
		var userAreaInner = '<div class="wrapper"><p class="user-name" data-id=""></p><div class="user-comment-content" data-id=""></div><div class="comment-button-list"><a href="javascript:void(0)" class="reply-button comment-button"></a></div><section class="article-comment-frame"><div class="comment-content-area" contenteditable="true"><br /></div><a href="javascript:void(0)" class="comment-submit-button">回&nbsp;复</a></section></div>';
		$userArea.html(userAreaInner);
		var $username = $userArea.find('p.user-name');
		$username.attr('data-id',data.sender_id);
		if(data.receiver_author){
			$username.html('<a href="guest.php?id='+data.sender_id+'">'+data.sender_author+'</a> 回复 <a href="guest.php?id='+data.receiver_id+'">'+data.receiver_author +'</a>：');
		}
		else {
			$username.html('<a href="guest.php?id='+data.sender_id+'">'+data.sender_author+'</a>:');
		}
		var $cmt = $userArea.find('.user-comment-content');
		$cmt.attr('data-id',data.id);
		$cmt.attr('data-parent',data.parent_id);
		var text = data.content;
		text = txtUtil.encode(text);
		$cmt.html(text);
		return $userArea;
	}
	
	function createInner(data){
		var $section = $('<section class="user-comment-inner"></section>');
		$section.html('<div class="user-potrait"><img src="'+data.src+'"></div>');
		$section.append(createUserArea(data));
		return $section;
	}
	
	function getCmt(curPage){
		$.get('comments/details',{curPage:curPage,pro_id:pro_id},function(res){
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
				var str="";
				for(var i=0,len = res.data.length;i<len;i++){
					str+=createCmt(res.data[i]);
				}
				$cmtWrapper.html(str);
				$('html,body').animate({scrollTop:desireTop},0);
			}
			else {
				mes.show(res.mes);
			}
		});
	}
	
});

