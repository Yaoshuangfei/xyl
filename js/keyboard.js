
$(function(){


	function keyboard(){

	}


	var number ="";

	// 写号码
	$('.number_in').click(function(){
		$('.dialList').show();
		$('.dialListT').hide();

		var deleteNumber = $('.head .h_in .number').html();
		// if(deleteNumber.length === 11){
		// 	return;
		// }


		// $(this).addClass('bg');
		// $(this).children().css("color","#fff");


		if($(this).children('.nI').length != 0){
			number += $(this).children('.nI').html();
		}else{
			number += $(this).html();
		}
		$('.head .number').html(number);
		if( number.length === 11){
			//查询号码归属地
			$('.head .h_in .region').html("中国");
		}else{
			$('.head .h_in .region').html("号码归属地");
		}
	})

	// 删除号码
	$('.dialList .delete').click(function(){
		var deleteNumber = $('.head .number').html();
		var len = deleteNumber.length;
		if( len !=0){
			number = deleteNumber.substr(0, len-1);
		}
		$('.head .number').html(number);
		if( number.length === 11){
			//查询号码归属地
			$('.head .h_in .region').html("中国");
		}else{
			$('.head .h_in .region').html("号码归属地");
		}


		if(number.length == 0){
			if(!$(this).hasClass('add')){
				$('.dialListT').show();
				$('.dialList').hide();
			}

		}
	})

	// $('.number_in').ontouchstart(function(){
	// 	$(this).addClass('bg');
	// 	$(this).children().css("color","#fff");
	// })
	// $('.number_in').mouseup(function(){
	// 	$(this).removeClass('bg');
	// 	$(this).children().css("color","#333");
	// })

	// 查询号码归属地

	//
	// $('.number_in').touchstart(function(){

	// })


	//

	$('.phoneBook').click(function(){
		//$('.keyboard .number').slideToggle();
		// $('.phoneBook').addClass("yes");
		if($('.phoneBook').hasClass("yes")){
			$('.phoneBook').css("background-image","url(images/dial/phoneBook.png)");
			$('.phoneBook').removeClass("yes");
		}else{
			$('.phoneBook').css("background-image","url(images/dial/phoneBookT.png)");
			$('.phoneBook').addClass("yes");
		}
		
	})

	
})