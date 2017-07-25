

$(function() {
	//导航条的显示隐藏
	$('#more').click(function(){
		var state =$('#sDNew').attr("data-state");
		if(state == "hide"){
			$('#sDNew').show();
			$('#sDNew').attr("data-state","show")
		}else{
			$('#sDNew').hide();
			$('#sDNew').attr("data-state","hide")		
		}

	})

	//选择
	$('.screen .theme .listName').click(function(){
		if($(this).hasClass('listName')){
			$(this).removeClass('listName');
			$(this).addClass('selected');
			$(this).append("<div class='delete'></div>");	
		}else{
			$(this).children('.delete').remove();
			$(this).removeClass('selected');
			$(this).addClass('listName');			
		}
		
	})

	//筛选打开
	$('.sort .right').click(function(){
		$('.screen').show();
		$('.mask').show();		
	})

	//筛选关闭
	$('.screen .close').click(function(){
		$('.screen').hide();
		$('.mask').hide();
	})
	$('.mask').click(function(){
		$('.screen').hide();
		$('.mask').hide();
	})

	//价格范围选择
	$('.theme .most').click(function(){
		var range = $(this).children('.range').html();
		var rangeArray = range.split("-");
		$('.theme .choice .minimum ').val(rangeArray[0]);
		$('.theme .choice .highest ').val(rangeArray[1]);
	})

	//重置
	$('.reset').click(function(){
		$('.screen .theme .selected').children('.delete').remove();
		$('.screen .theme .selected').removeClass('selected').addClass('listName');
	})

	//完成
	$('.complete').click(function(){
		var screen =[];
		var len =  $('.screen .theme .selected').length;
		for(var i=0; i<len; i++){
			screen[i] = $('.screen .theme .selected').eq(i).text();
		}
		//var aa = $('.screen .theme .selected').text()+",";
		console.log(screen);
	})
})