/**
 * Created by Administrator on 2017/5/22 0022.
 */
/***********************手机充值**********************/
Views.voucherCenterView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'voucherCenter',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        $('#mobileNum').blur(function(){
            var reg = /^(13|15|18)[0-9]{9}$/;//点击查询
            tel=$('#mobileNum').val();
            if(tel){
                if(reg.test(tel)){
                    $.ajax({
                        type: "get",
                        url: 'http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel='+tel,
                        dataType: "jsonp",
                        jsonp: "callback",
                        success: function(data){
                            $('#error').html(data.carrier);
                        },
                        error:function (){
                            $('li span').html('');
                            $('.error').css('display','block');
                        }
                    });
                }else{
                    $('#mobileNum').val('');
                    $('#error').html('号码有误 或 无数据');
                }
            }
        });

        var url     = WEB_URL +'/api/rechargeConfig/recharge/goodsClassList';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    console.log(data.msg);
                }else{
                    var _self   = data.data;
                    console.log(_self);
                    dataSave('rechargeId',_self[0].id);
                    var url     = WEB_URL +'/api/rechargeConfig/recharge/goodsList';
                    var dataTwo    ={id:dataGet('rechargeId')};
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        data:JSON.stringify(dataTwo),
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log(XMLHttpRequest, textStatus, errorThrown);
                        },
                        success:function(data){
                            if(!data.success) {
                                alert(data.msg);
                            }else{
                                var _self   = data.data;
                                var str     ='';
                                console.log(_self);
                                for (var i=0;i<_self.length;i++){
                                    var PPPP    = _self[i].goodsData;
                                    var PPPPstr ='';
                                    var key     =eval('('+PPPP+')')[0].key;
                                    var values  =eval('('+PPPP+')')[0].value;
                                    PPPPstr =   key+':'+values
                                    str +=  '<div class="voucherCenter_Area ui_btn" data-action="voucherCenter_Area_btn" data-uuids="'+_self[i].goodsSpecs[0].id+'">'
                                            +'<div class="telephoneFare">'
                                            +' <span>'+values+'元</span> <span>售价：'+_self[i].price+'元</span> '
                                            +'</div>'
                                            +'</div>'
                                }
                                $('#voucherCenter_telephoneAreas').html(str);
                            }
                        }
                    });
                }
            }
        });
        $(document).on('click','.telephoneFare',function(){
            $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
            $(this).addClass("rSelected");
        });
        addEventListener();
        $(document).on('click','wantToRecharge_shady',function(){
            $(this).hide();
            $(".wantToRecharge_payment").stop().slideUp();
            $(".wantToRechargeChange").stop().slideUp();
        });
        $(".wantToRechargeChangeArea").eq(0).click(function () {
            $(".wantToRechargePay").hide();
            $(".wantToRechargeChange").show();
            $(".wantToRechargeHeader span").html("付款方式");
        });
        $(document).on('click','wantToRechargeChangeArea',function(){
            $(this).parent(".wantToRechargeChange").find(".wantToRechargeChangeArea").removeClass("selecteds");
            $(this).addClass("selecteds");
        });
        $(document).on('click','#sss .wantToRechargeChangeArea',function(){
            $('#sss .wantToRechargeChangeArea').removeClass('selecteds');
            $(this).addClass("selecteds");
            $('#sss').hide();
            $('.wantToRechargePay ').show();
            $('.wantToRechargePay .warp_Rg').html($(this).find('span').text());
        });
        $(document).on('click','.wantToRechargePay .bB',function(){
            $('#backs').hide();
            $('#backss').show();
        });
        $(document).on('click','#backs',function(){
            $('.wantToRecharge_shady').hide();
            $(".wantToRecharge_payment").stop().slideUp();
            $(".wantToRechargeChange").stop().slideUp();
        });
        $(document).on('click','#backss',function(){
            $('#backs').show();
            $('#backss').hide();
            $('.wantToRechargePay').show();
            $('.wantToRechargeChange').hide();
        });
        $(document).on('click','.wantToRecharge_shady',function(){
            $(this).hide();
            $('.wantToRecharge_payment').hide();
        })

    },
    gz:function(){
        $('.rechargerule').show();
    },
    rechargerule:function(){
        $('.rechargerule').hide();
    },
    patSuuccess:function(){
        if($('.wantToRechargePay .warp_Rg').html()=='微信'){
            var patwodd = WEB_URL + '/api/core/selectLoginUser';
            $.ajax({
                type:'POST',
                dataType:'json',
                url:patwodd,
                data: {},
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        console.log(data);
                        if(data.data.payPassword == null){
                            alert('请先设置支付密码！');
                            Views.fillinNewPasswordView.show();
                        }else{

                            var urlTwos = WEB_URL + '/api/orderMall/addRole' ;//生成订单
                            var storeId  =1;
                            var orderType = 3;
                            var orderGoods = [{specId:dataGet('uuids'),attrName:$('#mobileNum').val()}];
                            var dataTwo = {storeId:storeId,orderType:orderType,orderGoods:orderGoods};
                            console.log(dataTwo);
                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:urlTwos,
                                data: JSON.stringify(dataTwo),
                                contentType:'application/json;charset=utf-8',
                                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                success:function(data){
                                    if(!data.success){
                                        console.log(data.msg);
                                    }else{
                                        console.log(data.data);
                                        dataSave('payIdsss',data.data.id);
                                        var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
                                        var payId  ='';
                                        var payType = 0;
                                        var orderMalls = [{id:data.data.id}];
                                        var datas = {payId:payId,payType:payType,orderMalls:orderMalls};
                                        $.ajax({
                                            type:'POST',
                                            dataType:'json',
                                            url:urlTwos,
                                            data: JSON.stringify(datas),
                                            contentType:'application/json;charset=utf-8',
                                            error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                            success:function(data){
                                                if(!data.success){
                                                    console.log(data.msg);
                                                }else{
                                                    console.log(data.data);
                                                    dataSave('payIds', data.data.payId);//支付商品id
                                                    var url  = WEB_URL + "/api/coreMoney/wxpay";
                                                    $.ajax({
                                                        type:'POST',
                                                        dataType:'json',
                                                        url:url,
                                                        data:JSON.stringify({tradeNo:data.data.payId}),
                                                        contentType:'application/json;charset=utf-8',
                                                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                            alert(XMLHttpRequest, textStatus, errorThrown);
                                                        },
                                                        success:function(data){
                                                            if (data.codeEnum == 'OVERTIME') {
                                                                Views.signInView.show();
                                                            }else{
                                                                var _responseText;
                                                                try {
                                                                    _responseText = JSON.parse(JSON.stringify(data));
                                                                } catch(error) {
                                                                    _responseText = {success:true};
                                                                }
                                                                if (false == _responseText.success) {
                                                                    alert(_responseText.msg);
                                                                }else{
                                                                    //调起支付
                                                                    var wxPay = api.require('wxPay');
                                                                    wxPay.payOrder(_responseText, function(ret, err) {
                                                                        if (ret.status) {
                                                                            //支付成功
                                                                            alert('支付成功');
                                                                            //......

                                                                        }
                                                                        Views.myOrderView.show();
                                                                    });
                                                                }
                                                            }

                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            });



                        }
                    }
                }
            });
        }else if($('.wantToRechargePay .warp_Rg').html()=='余额支付'){
            var patwodd = WEB_URL + '/api/core/selectLoginUser';
            $.ajax({
                type:'POST',
                dataType:'json',
                url:patwodd,
                data: {},
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        console.log(data);
                        if(data.data.payPassword == null){
                            alert('请先设置支付密码！');
                            Views.fillinNewPasswordView.show();
                        }else{
                            var urlTwos = WEB_URL + '/api/orderMall/addRole' ;//生成订单
                            var storeId  =1;
                            var orderType = 3;
                            var orderGoods = [{specId:dataGet('uuids'),attrName:$('#mobileNum').val()}];
                            var dataTwo = {storeId:storeId,orderType:orderType,orderGoods:orderGoods};
                            console.log(dataTwo);
                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:urlTwos,
                                data: JSON.stringify(dataTwo),
                                contentType:'application/json;charset=utf-8',
                                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                success:function(data){
                                    if(!data.success){
                                        alert(data.msg);
                                    }else{
                                        console.log(data.data);
                                        dataSave('payIdsss',data.data.id);
                                        var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
                                        var payId  ='';
                                        var payType = 3;
                                        var orderMalls = [{id:data.data.id}];
                                        var datas = {payId:payId,payType:payType,orderMalls:orderMalls};
                                        $.ajax({
                                            type:'POST',
                                            dataType:'json',
                                            url:urlTwos,
                                            data: JSON.stringify(datas),
                                            contentType:'application/json;charset=utf-8',
                                            error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                            success:function(data){
                                                if(!data.success){
                                                    alert(data.msg);
                                                }else{
                                                    console.log(data.data);
                                                    dataSave('payIds', data.data.payId);//支付商品id
                                                    $('#payFixed').show();
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            });
        }
    },
    goInchargeFlow:function(){
        Views.chargeFlowView.show();
    },

    goInRefuelingCard:function(){
        Views.refuelingCardDetailsView.show();
    },

    goInEntertainmentRecharge:function(){
        Views.entertainmentRechargeView.show();
    },

    goInBankCard:function(){
        Views.addBankCardView.show();
    },
    paySuccess01:function(){

        var urlTwos = WEB_URL + '/api/coreMoney/balancePay' ;//支付
        var tradeNo = dataGet('payIds');
        var payPassword = $('#passwords').val();
        console.log(payPassword);
        var data = {tradeNo:tradeNo,payPassword:payPassword};
        console.log(data)
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwos,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    if(data.code == '-4'){
                        Views.fillinNewPasswordView.show()
                    }else if(data.code == '-2'){
                        alert('账户余额不足，请去充值');
                        Views.wantToRechargeView.show()
                    }else if(data.code == '-3'){
                        alert('账户金豆不足，请去充值');
                        Views.myImazamoxView.show()
                    }else if(data.code == '-5'){
                        alert('支付密码错误');
                        $('#passwords').val('')
                    }
                }else{
                    console.log(data);
                    alert('您已支付成功！');
                    $('.wantToRecharge_shady').hide();
                    $('.wantToRecharge_payment').hide();
                    Views.myOrderView.show();
                    $('#payFixed').hide();
                }
            }
        });

    },
    cencalss:function(){
        $('#payFixed').hide();
        $('.wantToRecharge_payment').hide();
        $('.wantToRecharge_shady').hide();
    },
    voucherCenter_Area_btn:function(btn){
        if($('#mobileNum').val()==''){
            alert('手机号必填！');
            $(btn).children().removeClass('rSelected');
        } else {
            if ($(btn).attr('class') == 'voucherCenter_Area first') {
                console.log($(btn))
                $(btn).children().removeClass('rSelected');
            } else {
                $(".wantToRecharge_shady").show();
                $(".wantToRecharge_payment").show();
                $(".wantToRechargePay").show();
                dataSave('uuids', $(btn).attr('data-uuids'))
            }
        }
    },
    czjl:function(){
        Views.czjlView.show();
    }
})


/***********************流量充值**********************/
Views.chargeFlowView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'chargeFlow',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        $('#mobileNum').blur(function(){
            var reg = /^(13|15|18)[0-9]{9}$/;//点击查询
            tel=$('#mobileNum').val();
            if(tel){
                if(reg.test(tel)){
                    $.ajax({
                        type: "get",
                        url: 'http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel='+tel,
                        dataType: "jsonp",
                        jsonp: "callback",
                        success: function(data){
                            $('#error').html(data.carrier);
                        },
                        error:function (){
                            $('li span').html('');
                            $('.error').css('display','block');
                        }
                    });
                }else{
                    $('#mobileNum').val('');
                    $('#error').html('号码有误 或 无数据');
                }
            }
        });

        var url     = WEB_URL +'/api/rechargeConfig/recharge/goodsClassList';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    console.log(data.msg);
                }else{
                    var _self   = data.data;
                    console.log(data.data)
                    dataSave('rechargeId',_self[1].id);
                    var url     = WEB_URL +'/api/rechargeConfig/recharge/goodsList';
                    var dataTwo    ={id:dataGet('rechargeId')};
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        data:JSON.stringify(dataTwo),
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log(XMLHttpRequest, textStatus, errorThrown);
                        },
                        success:function(data){
                            if(!data.success) {
                                console.log(data.msg);
                            }else{
                                var _self   = data.data;
                                var str     ='';
                                console.log(_self);
                                for (var i=0;i<_self.length;i++){
                                    str +=  '<div class="voucherCenter_Area ui_btn" data-action="voucherCenter_Area_ph" data-uuids="'+_self[i].goodsSpecs[0].id+'">'
                                        +'<div class="telephoneFare">'
                                        +' <span>'+_self[i].name+'</span> <span>售价：'+_self[i].price+'元</span> '
                                        +'</div>'
                                        +'</div>'
                                }
                                $('#voucherCenter_telephoneArea').html(str);
                            }
                        }
                    });
                }
            }
        });
        $(document).on('click','.telephoneFare',function(){
            $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
            $(this).addClass("rSelected");
        });
        addEventListener();
        $(document).on('click','wantToRecharge_shady',function(){
            $(this).hide();
            $(".wantToRecharge_payment").stop().slideUp();
            $(".wantToRechargeChange").stop().slideUp();
        });
        $(".wantToRechargeChangeArea").eq(0).click(function () {
            $(".wantToRechargePay").hide();
            $(".wantToRechargeChange").show();
            $(".wantToRechargeHeader span").html("付款方式");
        });
        $(document).on('click','wantToRechargeChangeArea',function(){
            $(this).parent(".wantToRechargeChange").find(".wantToRechargeChangeArea").removeClass("selecteds");
            $(this).addClass("selecteds");
        });
        $(document).on('click','#sss .wantToRechargeChangeArea',function(){
            $('#sss .wantToRechargeChangeArea').removeClass('selecteds');
            $(this).addClass("selecteds");
            $('#sss').hide();
            $('.wantToRechargePay ').show();
            $('.wantToRechargePay .warp_Rg').html($(this).find('span').text());
        });
        $(document).on('click','.wantToRechargePay .bB',function(){
            $('#backs').hide();
            $('#backss').show();
        });
        $(document).on('click','#backs',function(){
            $('.wantToRecharge_shady').hide();
            $(".wantToRecharge_payment").stop().slideUp();
            $(".wantToRechargeChange").stop().slideUp();
        });
        $(document).on('click','#backss',function(){
            $('#backs').show();
            $('#backss').hide();
            $('.wantToRechargePay').show();
            $('.wantToRechargeChange').hide();
        });
        $(document).on('click','.wantToRecharge_shady',function(){
            $(this).hide();
            $('.wantToRecharge_payment').hide();
        });
    },
    patSuuccess:function(){
        if($('.wantToRechargePay .warp_Rg').html()=='微信'){
            var patwodd = WEB_URL + '/api/core/selectLoginUser';
            $.ajax({
                type:'POST',
                dataType:'json',
                url:patwodd,
                data: {},
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        console.log(data);
                        if(data.data.payPassword == null){
                            alert('请先设置支付密码！');
                            Views.fillinNewPasswordView.show();
                        }else{

                            var urlTwos = WEB_URL + '/api/orderMall/addRole' ;//生成订单
                            var storeId  =1;
                            var orderType = 3;
                            var orderGoods = [{specId:dataGet('uuids'),attrName:$('#mobileNum').val()}];
                            var dataTwo = {storeId:storeId,orderType:orderType,orderGoods:orderGoods};
                            console.log(dataTwo);
                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:urlTwos,
                                data: JSON.stringify(dataTwo),
                                contentType:'application/json;charset=utf-8',
                                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                success:function(data){
                                    if(!data.success){
                                        console.log(data.msg);
                                    }else{
                                        console.log(data.data);
                                        dataSave('payIdsss',data.data.id);
                                        var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
                                        var payId  ='';
                                        var payType = 0;
                                        var orderMalls = [{id:data.data.id}];
                                        var datas = {payId:payId,payType:payType,orderMalls:orderMalls};
                                        $.ajax({
                                            type:'POST',
                                            dataType:'json',
                                            url:urlTwos,
                                            data: JSON.stringify(datas),
                                            contentType:'application/json;charset=utf-8',
                                            error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                            success:function(data){
                                                if(!data.success){
                                                    console.log(data.msg);
                                                }else{
                                                    console.log(data.data);
                                                    dataSave('payIds', data.data.payId);//支付商品id
                                                    var url  = WEB_URL + "/api/coreMoney/wxpay";
                                                    $.ajax({
                                                        type:'POST',
                                                        dataType:'json',
                                                        url:url,
                                                        data:JSON.stringify({tradeNo:data.data.payId}),
                                                        contentType:'application/json;charset=utf-8',
                                                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                            alert(XMLHttpRequest, textStatus, errorThrown);
                                                        },
                                                        success:function(data){
                                                            if (data.codeEnum == 'OVERTIME') {
                                                                Views.signInView.show();
                                                            }else{
                                                                var _responseText;
                                                                try {
                                                                    _responseText = JSON.parse(JSON.stringify(data));
                                                                } catch(error) {
                                                                    _responseText = {success:true};
                                                                }
                                                                if (false == _responseText.success) {
                                                                    alert(_responseText.msg);
                                                                }else{
                                                                    //调起支付
                                                                    var wxPay = api.require('wxPay');
                                                                    wxPay.payOrder(_responseText, function(ret, err) {
                                                                        if (ret.status) {
                                                                            //支付成功
                                                                            alert('支付成功');
                                                                            //......

                                                                        }
                                                                        Views.myOrderView.show();
                                                                    });
                                                                }
                                                            }

                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            });



                        }
                    }
                }
            });
        }else if($('.wantToRechargePay .warp_Rg').html()=='余额支付'){
            var patwodd = WEB_URL + '/api/core/selectLoginUser';
            $.ajax({
                type:'POST',
                dataType:'json',
                url:patwodd,
                data: {},
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        console.log(data);
                        if(data.data.payPassword == null){
                            alert('请先设置支付密码！');
                            Views.fillinNewPasswordView.show();
                        }else{

                            var urlTwos = WEB_URL + '/api/orderMall/addRole' ;//生成订单
                            var storeId  =1;
                            var orderType = 3;
                            var orderGoods = [{specId:dataGet('uuids'),attrName:$('#mobileNum').val()}];
                            var dataTwo = {storeId:storeId,orderType:orderType,orderGoods:orderGoods};
                            console.log(dataTwo);
                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:urlTwos,
                                data: JSON.stringify(dataTwo),
                                contentType:'application/json;charset=utf-8',
                                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                success:function(data){
                                    if(!data.success){
                                        console.log(data.msg);
                                    }else{
                                        console.log(data.data);
                                        dataSave('payIdsss',data.data.id);
                                        var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
                                        var payId  ='';
                                        var payType = 0;
                                        var orderMalls = [{id:data.data.id}];
                                        var datas = {payId:payId,payType:payType,orderMalls:orderMalls};
                                        $.ajax({
                                            type:'POST',
                                            dataType:'json',
                                            url:urlTwos,
                                            data: JSON.stringify(datas),
                                            contentType:'application/json;charset=utf-8',
                                            error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                            success:function(data){
                                                if(!data.success){
                                                    console.log(data.msg);
                                                }else{
                                                    console.log(data.data);
                                                    dataSave('payIds', data.data.payId);//支付商品id
                                                    $('#payFixed').show();
                                                }
                                            }
                                        });
                                    }
                                }
                            });



                        }
                    }
                }
            });
        }
    },
    goInchargeFlow:function(){
        Views.voucherCenterView.show();
    },
    gz:function(){
        $('.rechargerule').show();
    },
    rechargerule:function(){
        $('.rechargerule').hide();
    },
    goInRefuelingCard:function(){
        Views.refuelingCardDetailsView.show();
    },

    goInEntertainmentRecharge:function(){
        Views.entertainmentRechargeView.show();
    },

    goInBankCard:function(){
        Views.addBankCardView.show();
    },
    paySuccessas:function(){

        var urlTwos = WEB_URL + '/api/coreMoney/balancePay' ;//支付
        var tradeNo = dataGet('payIds');
        var payPassword = $('#passwords').val();
        console.log(payPassword);
        var data = {tradeNo:tradeNo,payPassword:payPassword};
        console.log(data)
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwos,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    if(data.code == '-4'){
                        Views.fillinNewPasswordView.show()
                    }else if(data.code == '-2'){
                        alert('账户余额不足，请去充值');
                        Views.wantToRechargeView.show()
                    }else if(data.code == '-3'){
                        alert('账户金豆不足，请去充值');
                        Views.myImazamoxView.show()
                    }else if(data.code == '-5'){
                        alert('支付密码错误');
                        $('#passwords').val('');
                        $('#payFixed').hide();
                    }
                }else{
                    console.log(data);
                    alert('您已支付成功！');
                    $('.wantToRecharge_shady').hide();
                    $('.wantToRecharge_payment').hide();
                    Views.myOrderView.show();
                }
            }
        });
    },
    voucherCenter_Area_ph:function(btn){
        if($('#mobileNum').val()==''){
            alert('手机号必填！');
            $(btn).children().removeClass('rSelected');
        }else{
            if($(btn).attr('class') == 'voucherCenter_Area first'){
                console.log($(btn))
                $(btn).children().removeClass('rSelected');
            }else{
                $(".wantToRecharge_shady").show();
                $(".wantToRecharge_payment").show();
                $(".wantToRechargePay").show();
                dataSave('uuids',$(btn).attr('data-uuids'))
            }
        }
    },
    czjl:function(){
        Views.czjlView.show();
    },
    cencalss:function(){
        $('.wantToRecharge_shady').hide();
        $('.wantToRecharge_payment').hide();
        $('#payFixed').hide();
    }
})

/***********************加油卡**********************/
Views.refuelingCardView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'refuelingCard',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {


        $(document).ready(function(){
            $(".telephoneFare").click(function(){
                $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
                $(this).addClass("rSelected");
            });
        });
    },

    details:function(){
        Views.refuelingCardDetailsView.show();
    },
    czjl:function(){
        Views.czjlView.show();
    }
})

/***********************加油卡详情**********************/
Views.refuelingCardDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'refuelingCardDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {


        var url     = WEB_URL +'/api/rechargeConfig/recharge/goodsClassList';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self   = data.data;
                    console.log(data.data)
                    dataSave('rechargeId',_self[2].goodsClasses[0].id);
                    var url     = WEB_URL +'/api/rechargeConfig/recharge/goodsList';
                    var dataTwo    ={id:dataGet('rechargeId')};
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        data:JSON.stringify(dataTwo),
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest, textStatus, errorThrown);
                        },
                        success:function(data){
                            if(!data.success) {
                                alert(data.msg);
                            }else{
                                var _self   = data.data;
                                var str     ='';
                                console.log(_self);
                                if(_self==''){
                                    $('.rcd').html('该业务暂无活动');
                                }else{
                                    for (var i=0;i<_self.length;i++){
                                        str +='<div class="details_amountAreaTxt conceal" data-uuidds="'+_self[i].id+'"> <span class="warp_Lt conceal">充值金额</span> <span class="rcd">'+_self[i].price+'</span> </div>'
                                    }
                                    $('#details_amountAreaTxt').html(str);
                                }

                            }
                        }
                    });
                }
            }
        });





            $(document).on('click','.details_amountAreaTxt',function(){
                if($(".details_amountAreaTxt").hasClass("conceal")){
                    $(".details_amountAreaTxt").removeClass("conceal")
                }else {
                    $(".details_amountAreaTxt ").addClass("conceal");
                    $(".details_amountAreaTxt:first").removeClass("conceal");
                    var txt = $('>span:nth-child(2)',this).html();
                    $(".details_amountAreaTxt:first span:nth-child(2)").html(txt);
                    dataSave('uuids',$(this).data('uuidds'))
                }

            });
        $(document).on('click','wantToRecharge_shady',function(){
            $(this).hide();
            $(".wantToRecharge_payment").stop().slideUp();
            $(".wantToRechargeChange").stop().slideUp();
        });
        $(".wantToRechargeChangeArea").eq(0).click(function () {
            $(".wantToRechargePay").hide();
            $(".wantToRechargeChange").show();
            $(".wantToRechargeHeader span").html("付款方式");
        });

        $(document).on('click','wantToRechargeChangeArea',function(){
            $(this).parent(".wantToRechargeChange").find(".wantToRechargeChangeArea").removeClass("selecteds");
            $(this).addClass("selecteds");
        });
        $(document).on('click','#sss .wantToRechargeChangeArea',function(){
            $('#sss .wantToRechargeChangeArea').removeClass('selecteds');
            $(this).addClass("selecteds");
            $('#sss').hide();
            $('.wantToRechargePay ').show();
            $('.wantToRechargePay .warp_Rg').html($(this).find('span').text());
        });
        $(document).on('click','.wantToRechargePay .bB',function(){
            $('#backs').hide();
            $('#backss').show();
        });

        $(document).on('click','#backs',function(){
            $('.wantToRecharge_shady').hide();
            $(".wantToRecharge_payment").stop().slideUp();
            $(".wantToRechargeChange").stop().slideUp();
        });
        $(document).on('click','#backss',function(){
            $('#backs').show();
            $('#backss').hide();
            $('.wantToRechargePay').show();
            $('.wantToRechargeChange').hide();
        });
        $(document).on('click','.wantToRecharge_shady',function(){
            $(this).hide();
            $('.wantToRecharge_payment').hide();
        })
    },

    submitData:function(){
      var iText = $('.details_Fill .details_fillTxt input');
        for( var i=0; i<iText.length; i++){
            if( $(iText[i]).val().length == 0){
                alert("请输入相应的数据");
                return;
            }
        }
        if($('.rcd').html()=='选择充值金额'){
            alert('请选择充值金额！')
        }else{
            var name = $('#name').val();
            var idCard = $('#idCard').val();
            var cardNumber =$('#cardNumber').val();
            var money = $('.details_amountArea .details_amountAreaTxt .rcd').html();

            $(".wantToRecharge_shady").show();
            $(".wantToRecharge_payment").show();
            $(".wantToRechargePay ").show();
            $('#sss').hide();
        }



    },
    gz:function(){
        $('.rechargerule').show();
    },
    patSuuccess:function(){
        if($('.wantToRechargePay .warp_Rg').html()=='微信'){
            var patwodd = WEB_URL + '/api/core/selectLoginUser';
            $.ajax({
                type:'POST',
                dataType:'json',
                url:patwodd,
                data: {},
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        console.log(data);
                        if(data.data.payPassword == null){
                            alert('请先设置支付密码！');
                            Views.fillinNewPasswordView.show();
                        }else{

                            var urlTwos = WEB_URL + '/api/orderMall/addRole' ;//生成订单
                            var storeId  =1;
                            var orderType = 3;
                            var orderGoods = [{specId:dataGet('uuids'),attrName:$('#cardNumber').val()}];
                            var dataTwo = {storeId:storeId,orderType:orderType,orderGoods:orderGoods};
                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:urlTwos,
                                data: JSON.stringify(dataTwo),
                                contentType:'application/json;charset=utf-8',
                                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                success:function(data){
                                    if(!data.success){
                                        console.log(data.msg);
                                    }else{
                                        console.log(data.data);
                                        dataSave('payIdsss',data.data.id);
                                        var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
                                        var payId  ='';
                                        var payType = 0;
                                        var orderMalls = [{id:data.data.id}];
                                        var datas = {payId:payId,payType:payType,orderMalls:orderMalls};
                                        $.ajax({
                                            type:'POST',
                                            dataType:'json',
                                            url:urlTwos,
                                            data: JSON.stringify(datas),
                                            contentType:'application/json;charset=utf-8',
                                            error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                            success:function(data){
                                                if(!data.success){
                                                    console.log(data.msg);
                                                }else{
                                                    console.log(data.data);
                                                    dataSave('payIds', data.data.payId);//支付商品id
                                                    var url  = WEB_URL + "/api/coreMoney/wxpay";
                                                    $.ajax({
                                                        type:'POST',
                                                        dataType:'json',
                                                        url:url,
                                                        data:JSON.stringify({tradeNo:data.data.payId}),
                                                        contentType:'application/json;charset=utf-8',
                                                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                            alert(XMLHttpRequest, textStatus, errorThrown);
                                                        },
                                                        success:function(data){
                                                            if (data.codeEnum == 'OVERTIME') {
                                                                Views.signInView.show();
                                                            }else{
                                                                var _responseText;
                                                                try {
                                                                    _responseText = JSON.parse(JSON.stringify(data));
                                                                } catch(error) {
                                                                    _responseText = {success:true};
                                                                }
                                                                if (false == _responseText.success) {
                                                                    alert(_responseText.msg);
                                                                }else{
                                                                    //调起支付
                                                                    var wxPay = api.require('wxPay');
                                                                    wxPay.payOrder(_responseText, function(ret, err) {
                                                                        if (ret.status) {
                                                                            //支付成功
                                                                            alert('支付成功');
                                                                            //......

                                                                        } else {
                                                                            alert(JSON.stringify(err));
                                                                        }
                                                                    });
                                                                }
                                                            }

                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            });



                        }
                    }
                }
            });
        }else if($('.wantToRechargePay .warp_Rg').html()=='余额支付'){
            var patwodd = WEB_URL + '/api/core/selectLoginUser';
            $.ajax({
                type:'POST',
                dataType:'json',
                url:patwodd,
                data: {},
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        console.log(data);
                        if(data.data.payPassword == null){
                            alert('请先设置支付密码！');
                            Views.fillinNewPasswordView.show();
                        }else{

                            var urlTwos = WEB_URL + '/api/orderMall/addRole' ;//生成订单
                            var storeId  =1;
                            var orderType = 3;
                            var orderGoods = [{specId:dataGet('uuids'),attrName:$('#cardNumber').val()}];
                            var dataTwo = {storeId:storeId,orderType:orderType,orderGoods:orderGoods};
                            console.log(dataTwo);
                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:urlTwos,
                                data: JSON.stringify(dataTwo),
                                contentType:'application/json;charset=utf-8',
                                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                success:function(data){
                                    if(!data.success){
                                        console.log(data.msg);
                                    }else{
                                        console.log(data.data);
                                        dataSave('payIdsss',data.data.id);
                                        var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
                                        var payId  ='';
                                        var payType = 0;
                                        var orderMalls = [{id:data.data.id}];
                                        var datas = {payId:payId,payType:payType,orderMalls:orderMalls};
                                        $.ajax({
                                            type:'POST',
                                            dataType:'json',
                                            url:urlTwos,
                                            data: JSON.stringify(datas),
                                            contentType:'application/json;charset=utf-8',
                                            error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                            success:function(data){
                                                if(!data.success){
                                                    console.log(data.msg);
                                                }else{
                                                    console.log(data.data);
                                                    dataSave('payIds', data.data.payId);//支付商品id
                                                    $('#payFixed').show();
                                                }
                                            }
                                        });
                                    }
                                }
                            });



                        }
                    }
                }
            });
        }
    },
    paySuccess:function(){

        var urlTwos = WEB_URL + '/api/coreMoney/balancePay' ;//支付
        var tradeNo = dataGet('payIds');
        var payPassword = $('#passwords').val();
        console.log(payPassword);
        var data = {tradeNo:tradeNo,payPassword:payPassword};
        console.log(data)
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwos,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    if(data.msg == '请先设置支付密码'){
                        Views.fillinNewPasswordView.show()
                    }else{
                        alert(data.msg);
                    };
                }else{
                    console.log(data);
                    alert('您已支付成功！');
                    $('.wantToRecharge_shady').hide();
                    $('.wantToRecharge_payment').hide();
                    Views.myOrderView.show();
                }
            }
        });
        $('#payFixed').hide();
    }



})

/***********************影视充值**********************/
Views.entertainmentRechargeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'entertainmentRecharge',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $('.hotPic div , .hotPicEntertainment').click(function(){
            Views.videoRechargeDetailsView.show()
        })
    },

    goInVideoRechargeDetails:function(){
        Views.videoRechargeDetailsView.show();
    },

})

/***********************影视充值详情**********************/
Views.videoRechargeDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'videoRechargeDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(document).ready(function(){
            $(".telephoneFare").click(function(){
                $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
                $(this).addClass("rSelected");
            });
        });
        addEventListener();
        $(".voucherCenter_telephoneArea .voucherCenter_Area").click(function () {
            if($(this).attr('class') == 'voucherCenter_Area first'){
                console.log($(this))
                $(this).children().removeClass('rSelected');
            }else{
                $(".wantToRecharge_shady").show();
                $(".wantToRecharge_payment").stop().slideToggle();
                $(".wantToRechargePay").show();
            }

        });
        $('.wantToRecharge_shady').click(function (){
            $(this).hide();
            $(".wantToRecharge_payment").stop().slideUp();
            $(".wantToRechargeChange").stop().slideUp();
        });
        $(".wantToRechargeChangeArea").eq(0).click(function () {
            $(".wantToRechargePay").hide();
            $(".wantToRechargeChange").show();
            $(".wantToRechargeHeader span").html("付款方式");
        });
        $(".wantToRechargeChangeArea").click(function () {
            $(this).parent(".wantToRechargeChange").find(".wantToRechargeChangeArea").removeClass("selecteds");
            $(this).addClass("selecteds");
        });

        $('.wantToRechargePay .bB').click(function(){
            $('#backs').hide();
            $('#backss').show();
        });
        $('#backs').click(function(){
            $('.wantToRecharge_shady').hide();
            $(".wantToRecharge_payment").stop().slideUp();
            $(".wantToRechargeChange").stop().slideUp();
        });
        $('#backss').click(function(){
            $('#backs').show();
            $('#backss').hide();
            $('.wantToRechargePay').show();
            $('.wantToRechargeChange').hide();
        });
    },

    goInCode:function(){
        Views.activationCodeView.show()
    },

    usDel:function(btn){
        $('#del').val("");
    }

})

/***********************激活码充值**********************/
Views.activationCodeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'activationCode',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(document).ready(function(){
            $(".telephoneFare").click(function(){
                $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
                $(this).addClass("rSelected");
            });
        });
        addEventListener();
        $(".voucherCenter_telephoneArea .voucherCenter_Area").click(function () {
            $(".wantToRecharge_shady").show();
            $(".wantToRecharge_payment").stop().slideToggle();
            $(".wantToRechargePay").show();
        });
        $('.wantToRecharge_shady').click(function (){
            $(this).hide();
            $(".wantToRecharge_payment").stop().slideUp();
            $(".wantToRechargeChange").stop().slideUp();
        });
        $(".wantToRechargeChangeArea").eq(0).click(function () {
            $(".wantToRechargePay").hide();
            $(".wantToRechargeChange").show();
            $(".wantToRechargeHeader span").html("付款方式");
        });
        $(".wantToRechargeChangeArea").click(function () {
            $(this).parent(".wantToRechargeChange").find(".wantToRechargeChangeArea").removeClass("selecteds");
            $(this).addClass("selecteds");
        });

        $('.wantToRechargePay .bB').click(function(){
            $('#backs').hide();
            $('#backss').show();
        });
        $('#backs').click(function(){
            $('.wantToRecharge_shady').hide();
            $(".wantToRecharge_payment").stop().slideUp();
            $(".wantToRechargeChange").stop().slideUp();
        });
        $('#backss').click(function(){
            $('#backs').show();
            $('#backss').hide();
            $('.wantToRechargePay').show();
            $('.wantToRechargeChange').hide();
        });
    },

})


/***********************充值记录**********************/
Views.czjlView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'czjl',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var url = WEB_URL +'/api/rechargeConfig/recharge/goodsClassList';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    console.log(data.msg);
                }else{
                    var _self   = data.data;
                    var str     ='';
                    for(var i=0;i<_self.length;i++){
                        str +='<p  class="ui_btn" data-action="czjl_sorts" data-tags="'+(i+1)+'">'+_self[i].name+'</p>'
                    }
                    $('#czjl_sorts').html(str);
                }
            }
        });
        var url         = WEB_URL +'/api/userCashFlow/find/businessCard';
        var pageNum     =1;
        var pageSize    =50;
        var startTime   =$('#startTime').val();
        var endTime     =$('#endTime').val();
        var tags        ='';
        var data        ={pageNum:pageNum,pageSize:pageSize,startTime:startTime,endTime:endTime,tags:tags};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    console.log(data.msg);
                }else{
                    var _self   = data.data.list;
                    console.log(data);
                    var sre     ='';
                    for (var i=0;i<_self.length;i++){
                        if(_self[i].tags ==1){
                            _self[i].tags = '话费'
                        }else if(_self[i].tags ==2){
                            _self[i].tags = '流量'
                        }else if(_self[i].tags ==3){
                            _self[i].tags = '油卡'
                        }else if(_self[i].tags ==4){
                            _self[i].tags = '视频'
                        }
                        if(_self[i].orderStatus == 2){
                            _self[i].orderStatus = '充值中'
                        }else{
                            _self[i].orderStatus = '已完成'
                        }
                        var date = new Date(_self[i].createTime);
                        Y = date.getFullYear() + '.';
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                        D = date.getDate() + ' ';
                        h = date.getHours() + ':';
                        m = date.getMinutes() + ':';
                        s = date.getSeconds();
                        sre +='<li>'
                            +'<p class="czjl_nav_01">'+_self[i].tags+'</p>'
                            +'<p class="czjl_nav_02">'+_self[i].attrName+'</p>'
                            +'<p class="czjl_nav_03">'+_self[i].productPrice+'</p>'
                            +'<p class="czjl_nav_04">'+_self[i].orderStatus+'</p>'
                            +'<p class="czjl_nav_05"> <span>'+Y+M+D+'</span> <span>'+h+m+s+'</span> </p>'
                            +'</li>'
                    }
                    $('.czjl_detail ul').html(sre)
                }
            }
        });
        ;!function(){
            laydate({
                elem: '#endTime'
            })
        }();
    },
    czjl_sort:function(btn){
        $('#czjl_sorts').stop().toggle()
    },
    czjl_sorts:function(btn){
        $('#czjl_sort span').html($(btn).text());
        dataSave('tags',$(btn).attr('data-tags'))
    },
    Time:function(){
        var url         = WEB_URL +'/api/userCashFlow/find/businessCard';
        var pageNum     =1;
        var pageSize    =50;
        var startTime   =$('#startTime').val();
        var endTime     =$('#endTime').val();
        var tags        =dataGet('tags');
        var data        ={pageNum:pageNum,pageSize:pageSize,startTime:startTime,endTime:endTime,tags:tags};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    console.log(data.msg);
                }else{
                    var _self   = data.data.list;
                    console.log(data);
                    if(_self.length==0){
                        $('.czjl_detail ul').html('<div style="text-align:center;height:44px;background: #fff;line-height: 44px;font-size: 18px;">暂无记录</div>')
                    }else{
                        var sre     ='';
                        for (var i=0;i<_self.length;i++){
                            if(_self[i].tags ==1){
                                _self[i].tags = '话费'
                            }else if(_self[i].tags ==2){
                                _self[i].tags = '流量'
                            }else if(_self[i].tags ==3){
                                _self[i].tags = '油卡'
                            }else if(_self[i].tags ==4){
                                _self[i].tags = '视频'
                            }
                            if(_self[i].orderStatus == 2){
                                _self[i].orderStatus = '充值中'
                            }else{
                                _self[i].orderStatus = '已完成'
                            }
                            var date = new Date(_self[i].createTime);
                            Y = date.getFullYear() + '.';
                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                            D = date.getDate() + ' ';
                            h = date.getHours() + ':';
                            m = date.getMinutes() + ':';
                            s = date.getSeconds();
                            sre +='<li>'
                                +'<p class="czjl_nav_01">'+_self[i].tags+'</p>'
                                +'<p class="czjl_nav_02">'+_self[i].attrName+'</p>'
                                +'<p class="czjl_nav_03">'+_self[i].productPrice+'</p>'
                                +'<p class="czjl_nav_04">'+_self[i].orderStatus+'</p>'
                                +'<p class="czjl_nav_05"> <span>'+Y+M+D+'</span> <span>'+h+m+s+'</span> </p>'
                                +'</li>'
                        }
                        $('.czjl_detail ul').html(sre)
                    }

                }
            }
        });
    }
})

/***********************充值记录**********************/