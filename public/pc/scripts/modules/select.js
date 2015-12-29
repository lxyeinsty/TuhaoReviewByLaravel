define(function(require,exports){
	exports = function(){
		var _this = this;
		this.dom=null;
		this.init = function(ele,array){
			if(arguments.length){
				_this.dom = $(ele)
			}
			else {
				return;
			}
			if(Object.prototype.toString.call(array) === '[object Array]'){
				var $options = _this.dom.find('.options').first();
				if($options.length>0){
					var str = "";
					for(var i=0,len=array.length;i<len;i++){
						str +='<li class="option" data-value="'+(i+1)+'">'+array[i]+'</li>';
					}
					$options.html(str);
				}
				else {
					return ;
				}
			}
			
			$('body')[0].addEventListener('click',function(e){
				if(e.target == _this.dom[0]){
					e.preventDefault();
					e.stopPropagation(); 
					returnValue=false;
					return false;
				}
			},false);
			
			$('body')[0].addEventListener('click',function(e){
				_this.hide();
			},true);
			
			_this.dom.on('click','.textWrapper',function(){
				if(_this.dom.find('.options').hasClass('active')){
					_this.hide();
				}
				else {
					_this.show();
				}
			})
			
			_this.dom.on('click','.option',function(){ 
				_this.dom.find('.textWrapper').text($(this).text());
				_this.dom.find('.textWrapper').attr('data-value',$(this).text());
				_this.hide();
				_this.dom.find('.option').removeClass('active');
				$(this).addClass('active');
			});
		}
		this.show = function(){
			if(!_this.dom){
				return;
			}
			_this.dom.find('.options').addClass('active');
		}
		
		this.hide = function(){
			if(!_this.dom){
				return;
			}
			_this.dom.find('.options').removeClass('active');
		}
	}
	
	return exports;
})
