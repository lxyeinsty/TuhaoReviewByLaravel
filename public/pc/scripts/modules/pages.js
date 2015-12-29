define(function (require, exports) {
	exports.initPage = function(){
		var $ol = $('.pages ol');
		var $this = this;
		$this.max = parseInt($('.pages ol li').eq(-2).attr('data-num'));
		$this.start = 1;
		$this.btnNum = 5;
		this.end = $this.btnNum;
		
		this.getCur = function(){
			return parseInt($ol.find('li.active').attr('data-num'),10);
		}
		this.active=function(cur){
			$ol.find('li[data-num="'+cur+'"]').addClass('active');
		}
		this.removeActive=function(){
			$ol.find('li.active').removeClass('active');
		}
		this.update = function(cur){
			if(cur>$this.max) cur = $this.max;
			var lis = '<li data-num="-1" ><a href="javascript:void(0);">&lt;</a></li>'
			if(cur>=($this.max-$this.btnNum-1)){
				if(($this.max-$this.btnNum-1)>=1){
					lis+='<li data-num="1"><a href="javascript:void(0);">1</a></li>';
					lis+='<li data-num="-3"><a href="javascript:void(0);">···</a></li>';
					for(var i=0;i<$this.btnNum+2;i++){
						lis+='<li data-num="'+($this.max-$this.btnNum-1+i)+'"><a href="javascript:void(0);">'+($this.max-$this.btnNum-1+i)+'</a></li>';
					}
					$this.start = $this.max-$this.btnNum-1;
				}
				else {
					for(var i=1;i<=$this.max;i++){
						lis+='<li data-num="'+i+'"><a href="javascript:void(0);">'+i+'</a></li>';
					}
					$this.start =1;
				}
				
				$this.end = $this.max;
			}
			else if(cur<=$this.btnNum){
				for(var i=0;i<$this.btnNum;i++){
					lis+='<li data-num="'+(i+1)+'"><a href="javascript:void(0);">'+(1+i)+'</a></li>';
				}
				lis+='<li data-num="-3"><a href="javascript:void(0);">···</a></li>';
				lis+='<li data-num="'+$this.max+'"><a href="javascript:void(0);">'+$this.max+'</a></li>';
				$this.start = 1;
				$this.end = $this.btnNum;
			}
			else {
				lis+='<li data-num="1"><a href="javascript:void(0);">1</a></li>';
				lis+='<li data-num="-3"><a href="javascript:void(0);">···</a></li>';
				if(cur<=$this.start){
					for(var i=0;i<$this.btnNum;i++){
						lis+='<li data-num="'+(cur-$this.btnNum+1+i)+'"><a href="javascript:void(0);">'+(cur-$this.btnNum+1+i)+'</a></li>';
					}
					lis+='<li data-num="-3"><a href="javascript:void(0);">···</a></li>';
					lis+='<li data-num="'+$this.max+'"><a href="javascript:void(0);">'+$this.max+'</a></li>';
					$this.start = cur-$this.btnNum+1;
					$this.end = cur;
				}
				else if(cur>=$this.end){
					for(var i=0;i<$this.btnNum;i++){
						lis+='<li data-num="'+(cur+i)+'"><a href="javascript:void(0);">'+(cur+i)+'</a></li>';
					}
					lis+='<li data-num="-3"><a href="javascript:void(0);">···</a></li>';
					lis+='<li data-num="'+$this.max+'"><a href="javascript:void(0);">'+$this.max+'</a></li>';
					$this.start = cur;
					$this.end = cur+$this.btnNum-1;
				}
			}
			lis+='<li data-num="-2"><a href="javascript:void(0);">&gt;</a></li>';
			$ol.html(lis);
			$ol.find('li[data-num="'+cur+'"]').addClass('active');
		}
		return this
	}
});
