

//添加点击事件
function  addEventListener(){
	var self = this;
	var btn = $('.Ubtn');

	for(var i=0; i<btn.length; i++){

		btn[i].addEventListener('click', function (){ 
			var motionName = $(this).attr('data-motion');
			// console.log(ss);
			// ss();
			if(self[motionName]){
   				self[motionName](this);
   			}else{
	       		console.log(motionName?"事件" + motionName + "未定义": "没有声明事件");
	       	}
		})

	}
}
