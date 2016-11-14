;(function($){
	var Msgbox = function(options){

		Msgbox.defaults = {
			type:'alert',
			content:'提示内容',
			confirm:function(){},
			confirmText:'确定',
			cancelText:'取消'
		}
		this.settings = $.extend({}, Msgbox.defaults, options);
		this.init();
	}
	Msgbox.prototype ={
		init:function(){
			this.create();
			console.log(this.settings);
		},
		create:function(){
			var self = this;
			if(this.settings.type == 'alert'){
				var content='<div class="content">'+this.settings.content+'</div>';
				var btn_bar = '<div class="btn-bar"></div>';
				var temple = '<div class="msgbox">'+content+btn_bar+'</div>';
				this.alertDom = $('<div>').addClass('msgbox-masker').html(temple).appendTo('body');
				if($.isFunction(this.settings.confirm)){
					this.confirm();
				}
				if($.isFunction(this.settings.cancel)){
					this.cancel();
				}
			}else if(this.settings.type == 'toast'){
				var temple = '<div class="toast-bar">'+this.settings.content+'</div>';
				this.toasttDom = $(temple).appendTo('body');
				if(typeof(this.settings.time) == 'number' ){
					setTimeout(function(){
						removeDom();
					},this.settings.time)
				}else{
					setTimeout(function(){
						removeDom();
					},3000)
				}
				function removeDom(){
					self.toasttDom.remove();
				}

			}
		},
		confirm:function(){
			var self = this;
			
			var btn_bar = this.alertDom.find('.btn-bar');
			$('<span class="confirm">').html(this.settings.confirmText).appendTo(btn_bar);
			$('.confirm').click(function(){
				var confirm = self.settings.confirm();
				if(confirm==undefined || confirm){
					self.close();
				}
				
			});
		},
		cancel:function(){
			var self = this;
			
			var btn_bar = this.alertDom.find('.btn-bar');
			$('<span class="cancel">').html(this.settings.cancelText).prependTo(btn_bar);
			$('.cancel').click(function(){
				var cancel  = self.settings.cancel();
				if(cancel==undefined || cancel){
					self.close();
				}
				
			});
		},
		close:function(){
			this.alertDom.remove();
		},
	}
	
	var alert = function(options){
		if(typeof(options)=='string'){
			Msgbox.defaults.content = options;
			Msgbox.defaults.closeBtn = true;
		}
		return new Msgbox(options);
	}
	window.alert = $.alert = alert;
})(jQuery);