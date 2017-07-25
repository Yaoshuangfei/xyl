/**
 * Created by Administrator on 2017/5/15 0015.
 */
//addEventListener();
$(function(){
    // 添加银行卡
    $('#BankCardNumber').keyup(function(){
        $('#sub').css('background-color','rgb(0,124,195)');
    });
    $(document).on('touchstart','#sub',function(){
        if($(this).css('background-color')=='rgb(204, 204, 204)'){
            alert('请输入您的银行卡号！！');
        } else{
            var bankno =$('#BankCardNumber').val();
            if(bankno == "") {
                alert('请填写银行卡号');
                return false;
            }
            if(bankno.length < 16 || bankno.length > 19) {
                alert('银行卡号长度必须在16到19之间');
                return false;
            }
            var num = /^\d*$/; //全数字
            if(!num.exec(bankno)) {
                alert('银行卡号必须全为数字');
                return false;
            }
//开头6位
            var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
            if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
                alert('银行卡号开头6位不符合规范');
                return false;
            }
//Luhm校验（新）
            if(!luhmCheck(bankno))
                return false;
            alert('验证通过');
            return true;
        }
    });
    $('.clear').click(function(){
        $('#BankCardNumber').val("");
        $('.addZone .list input').focus();
        $('#sub').css('background-color','rgb(204, 204, 204)');
    })
});


// 明细页

    //function edit(){
    //    if($('.detailedScreen').css('top')=='-66px'){
    //        $('.bgMask').show();
    //        $('.detailedScreen').stop().animate({
    //            top:'40px'
    //        });
    //    }else{
    //        $('.bgMask').hide();
    //        $('.detailedScreen').stop().animate({
    //            top:'-66px'
    //        },10);
    //    }
    //}
    //$(document).on('touchstart','.bgMask',function(){
    //    $('.bgMask').hide();
    //    $('.detailedScreen').stop().animate({
    //        top:'-66px'
    //    },10);
    //});
    //$(document).on('touchstart','.detailedScreen .screenType',function(){
    //    $('.screenType').removeClass('selectedBg');
    //    $(this).addClass('selectedBg');
    //    $('.bgMask').hide();
    //    $('.detailedScreen').stop().animate({
    //        top:'-66px'
    //    },10);
    //});

// 兑换记录
$(function(){
    for(var i=0;i<$('.chooseBox div').length;i++){
        $('.chooseBox div')[i].onclick = function(){
            $('.chooseBox div').removeClass('selection');
            $(this).addClass('selection');
            var side = $(this).data('side');
            $('.chooseList').hide();
            $('#side'+side).show();
        }
    }
});

//我的金豆
    function zhuanzheng(){
        $('.mask , .donation').show();
    }
    function cancel(){
        $('.mask , .donation').hide();
    }
    function cancel_no(){
    $('.rechargeMode').stop().animate({
        bottom:'-195px'
    });
    $('.mask').hide();
}
    function handsel(){
        $('.mask').show();
        $('.rechargeMode').stop().animate({
            bottom:0
        });
    }

//我的个人中心
    function code(){
        $('.masks').show();
        $('.mall_img').css('background-image','url(images/mine/personalShare.png)');
        $('.mallShare').show();
        $('#cc').removeClass('xiala');
        $('html').css({'overflow':'hidden','height':'100%'});
        $('body').css({'overflow':'hidden','height':'100%'});
    }
    function closes(){
        $('.masks').hide();
        $('.mallShare').hide();
        $('#shareShow').stop().animate({
            bottom:'-296px'
        });
        $('html').css({'overflow':'auto'});
        $('body').css({'overflow':'auto'});
    }
    function fenxiang(){
        $('.masks').show();
        $('.mall_img').css('background-image','url(images/mine/mallShare.png)');
        $('.mallShare').show();
        $('#cc').addClass('xiala');
        $('html').css({'overflow':'hidden','height':'100%'});
        $('body').css({'overflow':'hidden','height':'100%'});
    }
    function xiala(){
        if($('#cc').hasClass('xiala')){
            if($('#shareShow').css('bottom')=='-296px'){
                $('#shareShow').stop().animate({
                    bottom:0
                });
            }else{
                $('#shareShow').stop().animate({
                    bottom:'-296px'
                });
            }
        }
    }
    $('#bgCancel').click(function(){
        $('#shareShow').stop().animate({
            bottom: '-296px'
        });
    });


//发起捐款
    $(document).on('click','.arrow',function(){
        if($(this).hasClass('btns')){
            $(this).css('background-image','url(images/InitiateDonation/arrow_top.png)');
            $(this).removeClass('btns');
            $('.select').stop().animate({
                height:'60px'
            });
        }else{
            $(this).css('background-image','url(images/InitiateDonation/arrow.png)');
            $(this).addClass('btns');
            $('.select').stop().animate({
                height:0
            });
        }
    });
    $(document).on('click','.select li',function(e){
       var side = $(this).data('side');
        $('.select').stop().animate({
            height:0
        });
        $('.arrow').css('background-image','url(images/InitiateDonation/arrow.png)');
        $('.arrow').addClass('btns');
        if (side == 2) {
            $('.medical').show();
            $('.student').hide();
            $('#rType').val('医学');
        }
        if (side == 1) {
            $('.student').show();
            $('.medical').hide();
            $('#rType').val('助学');
        }
    });