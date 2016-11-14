$(function(){
	// $('select').change(function(){
	// 	$(this).prev('.text').text($(this).find('option:selected').text());
	// });
	// from表单选择控件
	var CheckAssembly = function(){
		$('.radio,.checkbox,.select-box,.select-wrap').click(function(){
			var obj = $(this);
			operation(obj,obj.attr('data-type'),obj.attr('data-role'));
		});
		function operation(obj,type,role){
			var checked = obj.hasClass('checked');
			if(type == 'radio'){
				if(checked){
					return;
				}else{
					$('[data-role='+role+']').removeClass('checked');
					obj.addClass('checked');
				}
			}else if(type == 'checkbox'){
				obj.toggleClass('checked');
			}else{
				obj.find('select').change(function(){
					obj.find('.text').text(obj.find('select').find('option:selected').text());
				});
			}
		}
	}
	window.checkAssembly = new CheckAssembly();

	// 公共自动滚动
	var AutoScroll = function(){
		var height = $('.v-scroll').height();
    	function autoScroll(obj) {

            $(obj).find("ul:first").animate(
	            {
	                marginTop: -(height)
	            }, 
	            500,
	             function() {
	                $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
	            } //回调函数；
            );
        }
        var myar = setInterval(function(){
        	autoScroll($('.v-scroll'));
        }, 1500);
        $(".v-scroll").hover(
        	function() {
        	 	clearInterval(myar);
        	}, 
        	function() {
        		myar = setInterval('autoScroll(".v-scroll")', 1000);
        	}
        );
	}
	window.autoScroll = new AutoScroll();

	// tab
	var Tab = function(){
		$('.tab-mdl .tab-title>.item').click(function(){
			var obj = $(this);
			var index  = obj.index();
			if(obj.hasClass('cur')){
				return;
			}else{
				obj.addClass('cur').siblings().removeClass('cur');
				obj.parents('.tab-title').siblings('.tab-con').find('.item').eq(index).show().siblings().hide();
			}
		});
		$('.tab-mdl .tab-con').find('.item').not(':first').hide();
	}

	window.tab = new Tab();

	function go_gome(){
		var temp = '<a style="position:fixed;right:1.6rem;bottom:1.6rem;width:4rem;height:4rem;z-index:9999;" href="http://www.baidu.com"><img src="../images/backgome.png"></a>'
		$(temp).appendTo('body');
	}
	go_gome();
})