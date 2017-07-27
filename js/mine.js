/**
 * Created by Administrator on 2017/5/19 0019.
 */

/***********************我的start**********************/
Views.indexMineView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'indexMine',
        hasFootNav: true,
        footItemOrder: 1, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {



        addEventListener();

        // 用户头像 余额
        var url  = WEB_URL + "/api/core/selectLoginUser";
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
                    if (data.codeEnum == 'OVERTIME') {
                        Views.signInView.show();
                    }else{
                        alert(data.msg);
                    }

                }else{
                        var _self = data.data;
                        console.log(_self);
                        var headImg             = _self.headImg; //用户头像
                        var nickName            = _self.nickName; //用户昵称
                        var availableIncome     = _self.availableIncome; //用户余额
                        var integral            = _self.integral; //用户金豆
                        dataSave('crade',_self.crade);
                        dataSave('nickName',_self.nickName);
                        dataSave('mobile',_self.mobile);
                        dataSave('goldBind',_self.integral);
                        $('#pic').html(headImg == null?'<img src="images/mine/head.png" >':'<img src="'+headImg+'" style="height:55px;">');
                        $('.name').html(nickName);
                        $('.balance .oNumber').html('￥'+(availableIncome == null?0:availableIncome));
                        $('.Imazamox .oNumber').html('￥'+(integral == null?0:integral));
                    }
                }
        });
        // 用户收藏
        var urlone  = WEB_URL + "/api/coreCollection/selectNo";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlone,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    if (data.codeEnum == 'OVERTIME') {
                        Views.signInView.show();
                    }else{
                        alert(data.msg);
                    }
                }else{
                    var _self = data.data;
                    var goods       = _self.goods; //收藏的商品数量
                    var store       = _self.store; //收藏的店铺数量
                    $('#chanp').html(goods == null?0:goods);
                    $('#dianp').html(store == null?0:store);

                }
            }
        });
        // 用户订单
        var urlCrade        = WEB_URL +'/api/orderMall/selectCountByGroup';
        var coreUserId      =dataGet('user_id');
        var data            ={coreUserId:coreUserId};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlCrade,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    if (data.codeEnum == 'OVERTIME') {
                        Views.signInView.show();
                    }else{
                        alert(data.msg);
                    }
                }else{
                    var _self = data.data;
                    console.log(data);
                    for (var i=0;i<_self.length;i++){
                        if(_self[i].orderStatus==1){
                            $('.waitPay').html(_self[i].countGroup == 0?'':'<div class="number">'+_self[i].countGroup+'</div>');
                        }else if(_self[i].orderStatus==2){
                            $('.waitDelivery').html(_self[i].countGroup == 0?'':'<div class="number">'+_self[i].countGroup+'</div>');
                        }else if(_self[i].orderStatus==5){
                            $('.waitReceipt').html(_self[i].countGroup == 0?'':'<div class="number">'+_self[i].countGroup+'</div>');
                        }else if(_self[i].orderStatus==6){
                            $('.waitEvaluate').html(_self[i].countGroup == 0?'':'<div class="number">'+_self[i].countGroup+'</div>');
                        }else if(_self[i].orderStatus==9){
                            $('.service').html(_self[i].countGroup == 0?'':'<div class="number">'+_self[i].countGroup+'</div>');
                        }
                    }
                }
            }
        });


        $('#fenxiang').click(function(){
            $('.masks').show();
            $('html').css({'overflow':'hidden','height':'100%'});
            $('body').css({'overflow':'hidden','height':'100%'});
            $('.mallShare').show();
        });
        $('.mallShare_btn').click(function(e){
            $('#shareShow').animate({
                bottom:0
            });
            $(document).click(function(){
                $('#shareShow').animate({
                    bottom:'-296px'
                });
            });
            e.stopPropagation();
        });
        jQuery('#qrcode').qrcode({
            render: "canvas",
            width: 100,
            height: 100,
            correctLevel: 0,
            background: "#ffffff", //二维码的后景色
            foreground: "#000000", //二维码的前景色
            //text: "minwuyou://" + JSON.stringify(data)
            text: 'http://www.51att.cn/sm666/fenxiang.html?'+dataGet('mobile')
        });
    },
    goInSetUp:function(){
        Views.setUpView.show();
    },
    typeTox:function(btn){
        var side = $(btn).attr('data-side');
        dataSave('page',side);
        Views.myOrderView.show();
    },
    goInPersonal:function(){
        Views.personalCenterView.show();
    },

    goInSuperior:function(){
        Views.mySuperiorView.show();
    },

    goInWallet:function(){
        Views.myWalletView.show();
    },

    goInImazamox:function(){
        Views.myImazamoxView.show();
    },
    typeListFX:function(){
        // Views.caseView.show();
        $('.masks').show();
        $('.fenxiangs').show();
    },
    fenxiangs_Close:function(){
        $('.masks').hide();
        $('.fenxiangs').hide();
    },
    goInShoppingCart:function(){
        Views.shoppingCartView.show();
    },
    btnss:function(){
        var sharedModule = api.require('shareAction');
        //path:'http://www.51att.cn/sm666/fenxiang.html?mobile='+dataGet('mobile')
        sharedModule.share({
            type:'text',
            text:"http://123.206.115.18:8084/sm666/fenxiang.html?mobile="+dataGet('mobile')
        });
        $('.masks').hide();
        $('.fenxiangs').hide();
        // Views.fenxiangView.show();
    },

    goInOrder:function(){
        Views.myOrderView.show();
    },

    goInRefund:function(){
        Views.salePageView.show();
    },

    goInPersonalStore:function(){
        if(dataGet('crade')==3){
            var url = WEB_URL + '/api/store/merchants/store';
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
                        if(data.msg == '没有开通店铺!'){
                            alert('去pc端开通店铺');
                        }else{
                            alert(data.msg);
                        }
                    }else{
                        var _self = data.data;
                        console.log(_self);
                        Views.personalStoreView.show();
                    }
                }
            });
        }else{
            alert('您不是创客商，无法进入！');
        }

    },

    goInDistribution:function(){
        Views.storeDistributionView.show();
    },

    recharge:function(){
        Views.voucherCenterView.show();
    },
    recharges:function(){
        if(dataGet('crade')==3){
            Views.dpsfView.show();
        }else{
            alert('您不是代理商或者创客商，无此权限进入！');
        }
    },

    goInService:function(){
        Views.customerServiceView.show();
    },

    goInMyBill:function(){
        Views.myBillView.show();
    },

    mine_index:function(){
        Views.indexView.show();
    },

    goInMy:function(){
        Views.myDonationView.show();
    },
    // 查看物流
    ckwl:function(){
        Views.viewLogisticsView.show();
    },

    // 我的收藏
    // coll:function(){
    //     Views.myCollectionView.show();
    // }
    coll_01:function(btn){
        dataSave('typeId',$(btn).attr('data-typeId'));
        Views.myCollectionView.show();
    }

})
/***********************我的end**********************/


/***********************设置start**********************/
Views.setUpView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'setUp',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);

    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
        // var data = {};
        ajaxTool("post",null,url,
            function error(XMLHttpRequest, textStatus, errorThrown,fnErr){
                alert("error:请求失败");
            },
            function success(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    $('#mobile').html(data.data.mobile==''?'未绑定手机':data.data.mobile);
                }
            },true,true
        );
    },
    login_out:function(){
        dataSave('isNotLogin', "true");
        dataSave('user_id', '');
        dataSave('user_name', '');
        dataSave('user_password', '');
        dataSave('user_token', '');

        var urlOne = WEB_URL + '/api/core/logout';//退出
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlOne,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                }
            }
        });

        Views.indexView.show();
    },
    goInAccountSecurity:function(){
        Views.accountSecurityView.show();
    },

    goInPaymentSet:function(){
        Views.paymentSettingsView.show();
    },

    goInPasswordSet:function(){
        Views.passwordResetView.show();
    },

    goInNews:function(){
        Views.messageNotificationView.show();
    },

    goInPrivacy:function(){
        Views.privacyView.show();
    },

    goInGeneral:function(){
        Views.generalView.show();
    },

    goInAbout:function(){
        Views.aboutTView.show();
    }

})
/***********************设置end**********************/

/***********************支付设置start**********************/
Views.paymentSettingsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'paymentSettings',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $('.defray').click(function(){
            $('.defray').addClass('change')
                $(this).removeClass('change');
            $('.defray').find('div').removeClass('warp_Rg').addClass('warp_Lt');
                $(this).find('div').removeClass('warp_Lt').addClass('warp_Rg');
                $('#defray').val($(this).data('side')) ;

                var urltwo  = WEB_URL + "/api/coreUser/payPriorityConf";
                var data    ={payPriorityConf:$('#defray').val()}
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:urltwo,
                    data:JSON.stringify(data),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest, textStatus, errorThrown);
                    },
                    success:function(data){
                        if(!data.success) {
                            console.log(data.msg);
                        }else{
                            console.log(data);
                        }
                    }
                });

            });
    },

})
/***********************支付设置end**********************/

/***********************密码重置start**********************/
Views.passwordResetView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'passwordReset',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInSignSet:function(){
        Views.resetLoginView.show();
    },

    goInPaySet:function(){
        Views.resetPayView.show();
    }

})
/***********************密码重置end**********************/
/***********************分享start**********************/
Views.caseView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'case',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var config = {
            url:'http://blog.wangjunfeng.com',
            title:'王俊锋的个人博客',
            desc:'王俊锋的个人博客',
            img:'http://www.wangjunfeng.com/img/face.jpg',
            img_title:'王俊锋的个人博客',
            from:'王俊锋的博客'
        };
        var share_obj = new nativeShare('nativeShare',config);
    }
})
/***********************分享end**********************/
/***********************重置支付密码start**********************/
Views.resetPayView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'resetPay',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
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
                    var _self = data.data;
                    console.log(_self);
                    $("#mobile").html(data.data.email.substring(0, 3) + "****" + data.data.mobile.substring(7, 11));
                    $('#inputs').val(data.data.mobile);
                }
            }
        });
    },

    goInNo:function(){
        Views.verificationCodeTaView.show();
    },
    forgetPasswword:function(){
        var url =WEB_URL + '/api/coreUser/sendMsmOrEmail/5';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify({type:5}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    console.log(data);
                }else{
                    var _self = data.data;
                    console.log(_self);
                }
            }
        });
    },
    goInYes:function(){
        Views.rememberTaView.show();
    }

})
/***********************重置支付密码end**********************/

/***********************重置支付密码(记得)start**********************/
Views.rememberTaView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'rememberTa',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    subBtns:function(){
        var url         =   WEB_URL +'/api/coreUser/resetPassword';
        var type        =2;
        var password    =$('#new_yans').val();
        var newPassword =$('#new_yanss').val();
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
                    var _self = data.data;
                    console.log(_self);
                    alert('修改成功');
                }
            }
        });
    }

})
/***********************重置支付密码end**********************/

/***********************忘记密码(不记得)start**********************/
Views.verificationCodeTaView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'verificationCodeTa',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
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
                    var _self = data.data;
                    console.log(_self);
                    $("#mobile").html(data.data.mobile.substring(0, 3) + "****" + data.data.mobile.substring(7, 11));
                    $('#inputs').val(data.data.mobile);
                }
            }
        });
    },
    setTime:function (btn) {
        var self=this;
        if (this.countdown == 0) {
            $(btn).html("重新获取");
            btn.style.color = "#007cc3";

            clearTimeout(function(){
                this.setTime(btn);
            });
            this.countdown = 60;

        } else {
            $(btn).attr("disabled",true);
            $(btn).css("color","#999999");
            $(btn).html( this.countdown);
            this.countdown--;

            setTimeout(function(){
                self.setTime(btn);
            },1000);
        }
    },
    subBtns:function(){
        var url  = WEB_URL + "/api/coreUser/verifyVecode";
        var data = {type:2,vecode:$('#new_yans').val()};
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
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    $('#payFixed').show();

                }
            }
        });
    },
    paySuccess:function(){
        var url  = WEB_URL + "/api/coreUser/resetPayPassword";
        var datas = {type:1,vecode:$('#new_yans').val(),newPassword:$('.passwords').val()};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(datas),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    alert('修改成功！');
                    Views.indexMineView.show();
                }
            }
        });
    },
    cencalss:function(){
        $('#payFixed').hide();
    }
})
/***********************忘记密码**********************/

/***********************忘记密码(下一步)start**********************/
Views.fillinNewPasswordTaView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'fillinNewPasswordTa',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

})
/***********************忘记密码(下一步)end**********************/

/***********************重置登录密码start**********************/
// Views.resetLoginView = $.extend({}, Views.PanelView, {
//     options: {
//         tmpl: 'resetLogin',
//         //hasFootNav: true,
//         //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
//         //itemClass: 'item'
//     },
//
//     willShow: function (param, isBackPage) {
//         this.show(param, isBackPage);
//     },
//
//     didShow: function () {
//         addEventListener();
//         alert(454);
//     },
//
// })
/***********************重置登录密码end**********************/

/***********************重置登录密码start**********************/
Views.resetLoginView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'resetLogin',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
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
                    var _self = data.data;
                    console.log(_self);
                    $("#userId").html(data.data.userName.substring(0, 3) + "****" + data.data.mobile.substring(7, 11));
                    $('#inputs').val(data.data.mobile);
                }
            }
        });
    },

    goInNo:function(){
        Views.verificationCodeTTView.show();
    },
    forgetPasswword:function(){
        var url =WEB_URL + '/api/coreUser/sendMsmOrEmail/4';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify({type:4}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    console.log(data);
                }else{
                    var _self = data.data;
                    console.log(_self);
                }
            }
        });
    },
    goInYes:function(){
        Views.rememberView.show();
    },


})
/***********************重置登录密码end**********************/

/***********************重置登录密码(记得)start**********************/
Views.rememberView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'remember',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInNext:function(){
        alert(454);
    },

})
/***********************重置登录密码(记得)end**********************/

/***********************重置登录密码(记得 下一步)start**********************/
Views.rememberView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'remember',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInNext:function(){
        Views.fillinNewPasswordView.show();
    },

})
/***********************重置登录密码(记得 下一步)end**********************/

/***********************重置登录密码(不记得验证)start**********************/
Views.verificationCodeTTView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'verificationCodeTT',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
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
                    var _self = data.data;
                    console.log(_self);
                    $("#mobile").html(data.data.mobile.substring(0, 3) + "****" + data.data.mobile.substring(7, 11));
                    $('#inputs').val(data.data.mobile);
                }
            }
        });
    },
    setTime:function (btn) {
        var self=this;
        if (this.countdown == 0) {
            $(btn).html("重新获取");
            btn.style.color = "#007cc3";

            clearTimeout(function(){
                this.setTime(btn);
            });
            this.countdown = 60;

        } else {
            $(btn).attr("disabled",true);
            $(btn).css("color","#999999");
            $(btn).html( this.countdown);
            this.countdown--;

            setTimeout(function(){
                self.setTime(btn);
            },1000);
        }
    },
    subBtns:function(){
        var url  = WEB_URL + "/api/coreUser/verifyVecode";
        var data = {type:1,vecode:$('#new_yans').val()};
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
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    $('#payFixed').show();

                }
            }
        });
    },
    paySuccess:function(){
        var url  = WEB_URL + "/api/coreUser/resetPassword";
        var datas = {type:1,vecode:$('#new_yans').val(),newPassword:$('.passwords').val()};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(datas),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    alert('修改成功！');
                    Views.indexMineView.show();
                }
            }
        });
    },
    cencalss:function(){
        $('#payFixed').hide();
    }

})
/***********************重置登录密码(不记得验证)end**********************/

/***********************填写新密码start**********************/
Views.fillinNewPasswordView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'fillinNewPassword',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },
    cancelssD:function(){
        if($('#passwordD').val()==$('#passwordDNew').val()){
            var url     = WEB_URL + '/api/coreUser/payPasswordConf';
            var data    = {payPassword:$('#passwordD').val()};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data:JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        alert(data.msg);
                    }else{
                        var _length = data.data;
                        console.log(_length);
                        backPage();
                    }
                }
            });
        }else{
            alert('两次密码输入不一致!');
            $('#passwordD').val('');
            $('#passwordDNew').val('');
        }
    }

})
/***********************填写新密码startend**********************/

/***********************账户安全start**********************/
Views.accountSecurityView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'accountSecurity',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
        // var data = {};
        ajaxTool("post",null,url,
            function error(XMLHttpRequest, textStatus, errorThrown,fnErr){
                alert("error:请求失败");
            },
            function success(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    console.log(data)
                    if(data.data.mobile == null ){
                        $('#mobile').html('您未绑定手机号');
                    }else if(data.data.mobile == ''){
                        $('#mobile').html('您未绑定手机号');
                    } else{
                        $("#mobile").html(data.data.mobile.substring(0, 3) + "****" + data.data.mobile.substring(7, 11));
                    }
                    if(data.data.email == null ){
                        $('#email').html('您未绑定邮箱');
                    }else if(data.data.email == ''){
                        $('#email').html('您未绑定邮箱');
                    } else{
                        $('#email').html(data.data.email);
                    }

                }
            },true,true
        );


        var urlOne = WEB_URL + '/api/userShippingAddress/userAddressCount';

        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlOne,
            data: {},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    $('#address_num').html(data.data+'个');
                }
            }
        });

    },

    goInAddressManagement:function(){
        Views.addressManagementView.show();
    },

    goInAuthentication:function(){
        Views.authenticationView.show();
    },

    goInEmail:function(){
        if($('#email').html()=='您未绑定邮箱'){
            Views.addmailBridgingView.show();
        }else{
            Views.mailboxView.show();
        }
    },
    goInPhone:function(){
        if($('#mobile').html()=='您未绑定手机号'){
            Views.addphoneBridgingView.show();
        }else{
            Views.mobileNumberView.show();
        }
    }

})
/***********************账户安全end**********************/

/***********************手机管理start**********************/
Views.mobileNumberView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'mobileNumber',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
        var data = {};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    if(data.data.mobile == null ){
                        $('#mobile').html('您未绑定手机号');
                    }else{
                        $("#mobile").html(data.data.mobile.substring(0, 3) + "****" + data.data.mobile.substring(7, 11));
                        $('#inputs').val(data.data.mobile);
                    }
                }
            }
        });
    },

    goInUp:function(){
        Views.changeAddressView.show();
    },

    replacePhone:function(){

        Views.phoneBridgingView.show();
    }
})
/***********************手机管理end**********************/

/***********************更换手机start**********************/
Views.phoneBridgingView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'phoneBridging',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInUp:function(){
        Views.changeAddressView.show();
    },

    area:function(){
        Views.areaView.show();
    },

    next:function(){
        // 更换手机验证码
        var mobileEmail = $('#inputs').val();
        addCookie('mobile',mobileEmail);
        var isPhoneNo = IsMobile(mobileEmail);
        if(!isPhoneNo) {
            alert('请输入正确的手机号！');
            return;
        }
        var urlOne = WEB_URL + "/api/coreUser/sendMsmOrEmail/3";
        var data   = {mobileEmail:mobileEmail};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlOne,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    Views.verificationCodeTView.show();
                }
            }
        });
    }

})
/***********************更换手机end**********************/
/***********************绑定手机start**********************/
Views.addphoneBridgingView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'addphoneBridging',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInUp:function(){
        Views.changeAddressView.show();
    },

    area:function(){
        Views.areaView.show();
    },

    next:function(){
        // 更换手机验证码
        var mobileEmail = $('#inputs').val();
        dataSave('mobile',mobileEmail);
        var isPhoneNo = IsMobile(mobileEmail);
        if(!isPhoneNo) {
            alert('请输入正确的手机号！');
            return;
        }
        var urlOne = WEB_URL + "/api/coreUser/sendMsmOrEmail/3";
        var data   = {mobileEmail:mobileEmail};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlOne,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    Views.verificationCodeTView.show();
                }
            }
        });
    }

})
/**
/***********************选着地区start**********************/
Views.areaView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'area',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInUp:function(){
        Views.changeAddressView.show();
    }
})
/***********************选着地区end**********************/

/***********************更换手机号验证start**********************/
Views.verificationCodeTView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'verificationCodeT',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var mobile = dataGet('mobile');
        $('#mobiles').html("+86    "+mobile);

    },

    subBtn:function(){
        var newME  = dataGet('mobile');
        var vecode = $('#new_yans').val();
        var url = WEB_URL + "/api/coreUser/inTie";
        var data   = {newME:newME,vecode:vecode};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    if(data.msg=='格式错误'){
                        alert('账号已存在');
                    }else{
                        alert(data.msg);
                    }
                    $("html,body").animate({scrollTop:0}, 500);
                    history.back();
                }else{
                    alert('更改成功！！');
                    Views.indexMineView.show();
                }
            }
        });
    }
});
/***********************更换手机号验证end**********************/

/***********************收货地址管理start**********************/
Views.addressManagementView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'addressManagement',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var url     = WEB_URL + '/api/userShippingAddress/selectList';
        var data    ={pageNum:1,size:20};

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
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    var str     = '';
                    var _length = _self.list;
                    for (var i = 0;i<_length.length;i++){
                        str +=  '<div style="margin-bottom: 20px;background: #fff;position:relative;">'
                                +'<div class="management_area breadth bB ui_btn"  data-action="goInUp" data-addressId="'+_length[i].id+'">'
                                +'<div class="area warp_Lt">'
                                +'<span>'+_length[i].realName+'</span>'
                                +'<span>'+_length[i].provinceName+_length[i].cityName+_length[i].countyName+_length[i].address+'</span>'
                                +'</div>'
                                +'<div class="quite warp_Rg"></div>'
                                +'</div>'
                                +'<div class="mr ui_btn" data-action="mr" data-id="'+_length[i].id+'" data-address="'+_length[i].address+'" data-countyname="'+_length[i].countyName+'" data-county="'+_length[i].county+'" data-cityname="'+_length[i].cityName+'" data-city="'+_length[i].city+'" data-provincename="'+_length[i].provinceName+'" data-province="'+_length[i].province+'" data-zipcode="'+_length[i].zipCode+'" data-contact="'+_length[i].contact+'" data-realname="'+_length[i].realName+'"><img src="images/icon_0010.png" alt="">设为默认地址</div>'
                                +'<div class="bj_01 ui_btn" data-action="bianji"><img src="images/icon_0012.png"> 编辑</div>'
                                +'<div class="bj_02 ui_btn" data-action="shanchu"><img src="images/icon_0013.png"> 删除</div>'
                                +'</div>'
                    }
                    $('#area_aside').html(str);
                }
            }
        });



    },

    goInUp:function(btn){
        dataSave('addressId',$(btn).attr('data-addressId'));
        Views.changeAddressView.show();
    },
    goInAdd:function(){
        Views.addedAddressView.show();
    },
    backAccountSecurity:function(){
        Views.accountSecurityView.show();
    },
    mr:function(btn){
        // $(btn).find('img').attr('src','images/icon_0011.png')
        console.log()
        if($(btn).find('img').attr('src')=='images/icon_0010.png'){
            $('.mr').find('img').attr('src','images/icon_0010.png');
            $(btn).find('img').attr('src','images/icon_0011.png');
            var url             = WEB_URL + '/api/userShippingAddress/update';
            var id              =$(btn).attr('data-id')
            var realName        =$(btn).attr('data-realname');
            var contact        =$(btn).attr('data-contact');
            var zipCode        =$(btn).attr('data-zipcode');
            var province        =$(btn).attr('data-province');
            var provinceName        =$(btn).attr('data-provincename');
            var city        =$(btn).attr('data-city');
            var cityName        =$(btn).attr('data-cityname');
            var county        =$(btn).attr('data-county');
            var countyName        =$(btn).attr('data-countyname');
            var address        =$(btn).attr('data-address');
            var type            =1;
            var status          =1;
            var data ={id:id,realName:realName,contact:contact,zipCode:zipCode,province:province,provinceName:provinceName,city:city,cityName:cityName,county:county,countyName:countyName,address:address,type:type,status:status}
            dataSave('realNames',$(btn).attr('data-realname'));//地址信息
            dataSave('zipCode',$(btn).attr('data-zipcode'));//邮编
            dataSave('cityCode',$(btn).attr('data-city'));//省id
            dataSave('cityText',$(btn).attr('data-cityname'));//省名称
            dataSave('provinceCode',$(btn).attr('data-province'));//市/id
            dataSave('provinceText',$(btn).attr('data-provincename'));//市名称
            dataSave('countyCode',$(btn).attr('data-county'));//区id
            dataSave('countyText',$(btn).attr('data-countyname'));//区名称
            dataSave('address',$(btn).attr('data-address'));//详细地址
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
                        alert(data.msg);
                    }else{
                        var _self = data.data;
                        console.log(_self);
                        $('.mr').css('color','#333');
                        $(btn).css('color','red');
                        javascript:history.go(-1);
                        $("html,body").animate({scrollTop:0}, 500);
                    }
                }
            });
        }else{
            $('.mr').find('img').attr('src','images/icon_0010.png');
        }
    },
    bianji:function(btn){
        dataSave('addressId',$(btn).siblings('.management_area').attr('data-addressId'));
        Views.changeAddressView.show();
    },
    shanchu:function(btn){
        var url = WEB_URL +'/api/userShippingAddress/deleteById';
        var id          =$(btn).siblings('.management_area').attr('data-addressId');//用户id
        var data        ={id:id};
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
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    // Views.addressManagementView.show();
                    var urlT     = WEB_URL + '/api/userShippingAddress/selectList';
                    var dataT    ={pageNum:1,size:20};
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:urlT,
                        data:JSON.stringify(dataT),
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest, textStatus, errorThrown);
                        },
                        success:function(data){
                            if(!data.success) {
                                alert(data.msg);
                            }else{
                                var _self = data.data;
                                var str     = '';
                                var _length = _self.list;
                                for (var i = 0;i<_length.length;i++){
                                    str +=  '<div style="margin-bottom: 20px;background: #fff;position:relative;">'
                                        +'<div class="management_area breadth bB ui_btn"  data-action="goInUp" data-addressId="'+_length[i].id+'">'
                                        +'<div class="area warp_Lt">'
                                        +'<span>'+_length[i].realName+'</span>'
                                        +'<span>'+_length[i].provinceName+_length[i].cityName+_length[i].countyName+_length[i].address+'</span>'
                                        +'</div>'
                                        +'<div class="quite warp_Rg"></div>'
                                        +'</div>'
                                        +'<div class="mr ui_btn" data-action="mr" data-id="'+_length[i].id+'" data-address="'+_length[i].address+'" data-countyname="'+_length[i].countyName+'" data-county="'+_length[i].county+'" data-cityname="'+_length[i].cityName+'" data-city="'+_length[i].city+'" data-provincename="'+_length[i].provinceName+'" data-province="'+_length[i].province+'" data-zipcode="'+_length[i].zipCode+'" data-contact="'+_length[i].contact+'" data-realname="'+_length[i].realName+'"><img src="images/icon_0010.png" alt="">设为默认地址</div>'
                                        +'<div class="bj_01 ui_btn" data-action="bianji"><img src="images/icon_0012.png"> 编辑</div>'
                                        +'<div class="bj_02 ui_btn" data-action="shanchu"><img src="images/icon_0013.png"> 删除</div>'
                                        +'</div>'
                                }
                                $('#area_aside').html(str);
                            }
                        }
                    });
                    alert('删除成功！');
                }
            }
        });
    }
})
/***********************收货地址管理end**********************/

/***********************新增收货地址start**********************/
Views.addedAddressView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'addedAddress',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var area2 = new LArea();
        area2.init({
            'trigger': '#demo2',
            'valueTo': '#value2',
            'keys': {
                id: 'value',
                name: 'text'
            },
            'type': 2,
            'data': [provs_data, citys_data, dists_data]
        });

        $('#fixeds span').on('click',function(){


            var url             = WEB_URL + '/api/userShippingAddress/add';//添加用户收货地址
            var realName        =$('#shr').val();//收货人
            var contact         =$('#mobile').val();//手机号
            var zipCode         =$('#email').val();//邮编号
            var province        =dataGet('provinceCode');//省id
            var provinceName    =dataGet('provinceText');//省名称
            var city            =dataGet('cityCode');//省id
            var cityName        =dataGet('cityText');//省名称
            var county          =dataGet('countyCode');//省id
            var countyName      =dataGet('countyText');//省名称
            var address         =$('#address').val();//邮箱
            var type            =$(this).data('type');//是否默认  1默认  2不默认
            var status          =1;//状态 启用
            var data            ={realName:realName,contact:contact,zipCode:zipCode,province:province,provinceName:provinceName,city:city,cityName:cityName,county:county,countyName:countyName,address:address,type:type,status:status};
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
                        alert(data.msg);
                        $('#fixeds').hide();
                    }else{
                        var _self = data.data;
                        console.log(_self);
                        alert('恭喜您，添加地址成功！');
                        dataSave('address',address);
                        dataSave('zipCode',zipCode);
                        dataSave('realNames',realName);
                        javascript:history.go(-1);
                        $("html,body").animate({scrollTop:0}, 500);
                    }
                }
            });
        });

    },

    goInUp:function(){

    },
    end:function(){
        Views.addressManagementView.show();
    },
    cancels:function(){
        var a =$('#shr').val();//收货人
        var b =$('#mobile').val();//手机号
        var c =$('#demo2').val();//地区
        var d =$('#address').val();//详细地址
        if(a ==='' || b ==='' || c ==='' || d ==='' ){
            alert('信息不能为空！');
            return;
        }else{
            $('#fixeds').show();
        }



    }


})
/***********************新增收货地址end**********************/

/***********************修改收货地址start**********************/
Views.changeAddressView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'changeAddress',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var area2 = new LArea();
        area2.init({
            'trigger': '#demo2',
            'valueTo': '#value2',
            'keys': {
                id: 'value',
                name: 'text'
            },
            'type': 2,
            'data': [provs_data, citys_data, dists_data]
        });


        var url         = WEB_URL + '/api/userShippingAddress/selectOne';//根据id查找用户收货地址
        var id          =dataGet('addressId');//用户id
        var data        ={id:id};
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
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);

                    $('#shr').val(_self.realName);
                    $('#mobile').val(_self.contact);
                    $('#demo2').val(_self.provinceName+','+_self.countyName+','+_self.cityName);
                    $('#address').val(_self.address);
                    $('#email').val(_self.zipCode);

                }
            }
        });

    },

    goInUp:function(){

    },

    delAddress:function(){
        var url = WEB_URL +'/api/userShippingAddress/deleteById';
        var id          =dataGet('addressId');//用户id
        var data        ={id:id};
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
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    alert('删除成功！');
                    Views.addressManagementView.show();
                }
            }
        });
    },



    baocuns:function(){
        var url             = WEB_URL + '/api/userShippingAddress/update';//修改用户收货地址
        var id              =dataGet('addressId');//用户id
        var realName        =$('#shr').val();//收货人
        var contact         =$('#mobile').val();//手机号
        var zipCode         =$('#email').val();//邮编号
        var province        =dataGet('provinceCode');//省id
        var provinceName    =dataGet('provinceText');//省名称
        var city            =dataGet('cityCode');//省id
        var cityName        =dataGet('cityText');//省名称
        var county          =dataGet('countyCode');//省id
        var countyName      =dataGet('countyText');//省名称
        var address         =$('#address').val();//详细地址
        var type            =1;//是否默认  1默认  2不默认
        var status          =1;//状态 启用
        var data            ={id:id,realName:realName,contact:contact,zipCode:zipCode,province:province,provinceName:provinceName,city:city,cityName:cityName,county:county,countyName:countyName,address:address,type:type,status:status};
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
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    alert('恭喜您，修改地址成功！');
                    dataSave('address',address);
                    dataSave('zipCode',zipCode);
                    Views.addressManagementView.show();
                }
            }
        });
    }

})
/***********************修改收货地址end**********************/

/***********************身份验证start**********************/
Views.authenticationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'authentication',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInUp:function(){

    }
})
/***********************身份验证end**********************/

/***********************邮箱start**********************/
Views.mailboxView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'mailbox',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
        var data = {};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    console.log(data);
                    if(data.data.email == null ){
                        $('#email').html('您未绑定邮箱');
                    }else{
                        $('#email').html(data.data.email);
                    }
                }
            }
        });
    },

    goInReplace:function(){
        Views.mailBridgingView.show();
    }

})
/***********************邮箱end**********************/


/***********************更换邮箱下一步start**********************/
Views.mailBridgingView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'mailBridging',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInReplace:function(){
        //mailBridging
    },

    goInCodes:function(){
        var Email = $('#emails').val();
        regs=/^\w+@[a-zA-Z0-9]+(\.[a-z]{2,3}){1,2}$/;
        if(!regs.test(Email)){
            alert('请输入正确的邮箱!');
        }else {
            addCookie('emails',Email);
            var urlOne = WEB_URL + "/api/coreUser/sendMsmOrEmail/3";
            var data   = {mobileEmail:Email};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:urlOne,
                data:JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success) {
                        alert(data.msg);
                    }else{
                        Views.verificationCodeView.show();
                    }
                }
            });
        }
        // Views.verificationCodeView.show();
    }
})
/***********************更换邮箱下一步end**********************/

/***********************绑定邮箱下一步start**********************/
Views.addmailBridgingView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'addmailBridging',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInReplace:function(){
        //mailBridging
    },

    goInCodes:function(){
        var Email = $('#emails').val();
        regs=/^\w+@[a-zA-Z0-9]+(\.[a-z]{2,3}){1,2}$/;
        if(!regs.test(Email)){
            alert('请输入正确的邮箱!');
        }else {
            addCookie('emails',Email);
            var urlOne = WEB_URL + "/api/coreUser/sendMsmOrEmail/3";
            var data   = {mobileEmail:Email};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:urlOne,
                data:JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success) {
                        alert(data.msg);
                    }else{
                        Views.verificationCodeView.show();
                    }
                }
            });
        }
        // Views.verificationCodeView.show();
    }
})
/***********************绑定邮箱下一步end**********************/


/***********************更换邮箱下下一步start**********************/
Views.verificationCodeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'verificationCode',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $('#email').html(getCookie('emails'));
    },
    subBtne:function(){
        var newME  = getCookie('emails');
        var vecode = $('#new_yanss').val();
        var url = WEB_URL + "/api/coreUser/inTie";
        var data   = {newME:newME,vecode:vecode};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    if(data.msg == '格式错误'){
                        alert('账号已存在');
                    }else{
                        alert(data.msg)
                    }
                    $("html,body").animate({scrollTop:0}, 500);
                    history.back();
                }else{
                    alert('更改成功！！');
                    Views.indexMineView.show();
                }
            }
        });
    },
    setTime:function (btn) {
    },

})
/***********************更换邮箱下下一步end**********************/

/***********************新消息提示start**********************/
Views.messageNotificationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'messageNotification',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $(document).ready(function(){
            $(".set_circle").click(function(){
                if($(this).hasClass("warp_Rg")) {
                    $(this).removeClass("warp_Rg");
                    $(this).addClass("warp_Lt");
                    $(this).parent(".defray").addClass("change");
                }else {
                    $(this).addClass("warp_Rg");
                    $(this).removeClass("warp_Lt");
                    $(this).parent(".defray").removeClass("change");
                }

            });

        });
    },

})
/***********************新消息提示end**********************/

/***********************隐私start**********************/
Views.privacyView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'privacy',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $(document).ready(function(){
            $(".set_circle").click(function(){
                if($(this).hasClass("warp_Rg")) {
                    $(this).removeClass("warp_Rg");
                    $(this).addClass("warp_Lt");
                    $(this).parent(".defray").addClass("change");
                }else {
                    $(this).addClass("warp_Rg");
                    $(this).removeClass("warp_Lt");
                    $(this).parent(".defray").removeClass("change");
                }

            });

        });
    },

})
/***********************隐私end**********************/

/***********************通用start**********************/
Views.generalView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'general',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

    },

    goInMultilingual:function(){
        Views.multilingualView.show();
    }


})
/***********************通用end**********************/

/***********************多种语言start**********************/
Views.multilingualView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'multilingual',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

    },

})
/***********************多种语言end**********************/

/***********************关于start**********************/
Views.aboutTView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'aboutT',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

    },

    goInFeedback:function(){
        Views.feedbackTView.show();
    }

})
/***********************关于end**********************/

/***********************意见反馈start**********************/
Views.feedbackTView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'feedbackT',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);

    },

    didShow: function () {
        addEventListener();
        $('#doc').on('click',function(fileDom){
            //判断是否支持FileReader
            if (window.FileReader) {
                var reader = new FileReader();
            } else {
                alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
            }

            console.log(fileDom.originalEvent.srcElement.files[0])

            //获取文件
            var file = fileDom.originalEvent.srcElement.files[0];
            var imageType = /^image\//;
            //是否是图片
            // if (!imageType.test(file.type)) {
            //     alert("请选择图片！");
            //     return;
            // }
            //读取完成
            reader.onload = function(e) {
                //获取图片dom
                var img = document.getElementById("preview");
                //图片路径设置为读取的图片
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    },
    fSubmit:function(){
        var url         = WEB_URL +'/api/userFeedback/add';
        var content     = $('.text textarea').val();
        var imgDetails  = WEB_URL + dataGet('json_url');
        var data        ={content:content,imgDetails:imgDetails};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    alert('修改成功！');
                    Views.indexMineView.show();
                }
            }
        });
    },
    imgheadinput:function(){
        var json_url = '';
        $("#doc").attachsvr({
            script: WEB_URL + "/api/attachment/upload",
            uploadkey:"file",
            filetype:[".jpg",".png",".jpeg",".bmp"],

            // onComplete:function(json){
            //     var data = JSON.parse(json.data);
            //     if (data.success == true) {
            //         //$("#"+divUploadWrap).css("background-image","");
            //         //$("#"+fileuri).text(‘‘);
            //         //i表示在data中的索引位置，n表示包含的信息的对象
            //         //$("#"+yulanimg).html(‘‘);
            //         var filespanval = $("#"+fileuri).text();
            //         $.each(data.data,function(i,n){
            //             console.log($(this))
            //         });
            //     }else{
            //         alert("上传失败");
            //     }
            //
            // },

            onComplete:function(json){
                console.log(json.data.data[0].uri);
                // alert(json.data.data[0].uri);
                var json_url = json.data.data[0].uri;
                dataSave('json_url',json_url);
                console.log(json_url);
            },
            onProgress:function(xhr){
                console.log(2)
                //console.log(xhr);
                //console.log("progress,在这里可以添加loading 效果",parseInt(xhr.loaded/xhr.total*100)+"%")
                $('#continuefile').text(parseInt(xhr.loaded/xhr.total*100)+"%");
            },
            onCheck:function(file){
                console.log(3)
                console.log(file);
                return true;
            },
            onError:function(e){console.log("error",e)},
            ctxdata:{
                "参数1":"参数1的值",
                "参数2":"参数2",
            }

        });
    }

})
/***********************意见反馈end**********************/

/***********************个人中心start**********************/
Views.personalCenterView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'personalCenter',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);

    },

    didShow: function () {
        addEventListener();
        // 用户头像 昵称
        var url = WEB_URL + "/api/core/selectLoginUser";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self    = data.data;
                    console.log(_self)
                    var headImg  = _self.headImg;   //头像
                    var nickName = _self.nickName;  //用户名
                    var userName   = _self.userName;    //注册名称
                    var crade    = _self.crade;     //身份
                    $('#user_img').html(headImg == null?'<img src="images/mine/head.png" >':'<img src="'+headImg+'">');
                    $('#user_xinxi .name').html(nickName);
                    $('#user_xinxi .type').html(crade == 1 ? '普通会员' : (crade == 2 ? '创客' : (crade == 3 ? '合作商' : a)));
                    $('#user_xinxi .pcNnumber').html(userName);
                }
            }
        });
    },

    goInMyBankCard:function(){
        Views.myBankCardView.show();
    },
    backPage:function(){
        Views.indexMineView.show();
    },

    goInMyFriends:function(){
        Views.myCircleOfFriendsView.show();
    },

    goInShare:function(){
        Views.myShareCommodityView.show();
    },

    goInCollection:function(){
        Views.myCollectionView.show();
    },

    personalData:function () {
        Views.personalDataView.show();
    }

})
/***********************个人中心end**********************/

/***********************个人资料start**********************/
Views.personalDataView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'personalData',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var area1 = new LArea();
        area1.init({
            'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
            'valueTo': '#value1', //选择完毕后id属性输出到该位置
            'keys': {
                id: 'id',
                name: 'name'
            }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
            'type': 1, //数据源类型
            'data': LAreaData //数据源
        });
        area1.value=[1,13,3];//控制初始位置，注意：该方法并不会影响到input的value
        var url = WEB_URL + "/api/core/selectLoginUser";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self    = data.data;
                    console.log(_self);
                    var headImg         = _self.headImg;   //头像
                    var nickName        = _self.nickName;  //用户名
                    var gender          = _self.gender;    //性别
                    var address         = _self.address;    //地址
                    var constellation   = _self.constellation;    //星座
                    var height          = _self.height;    //身高
                    var weight          = _self.weight;    //体重
                    $('#preview').attr('src',headImg == null?'images/mine/head.png':headImg);
                    $('#name').val(nickName);
                    $('#sex').val(gender == 1?'男':'女');
                    $('#demo1').html(address);
                    $('#constellation').val(constellation);
                    $('#height').val(height);
                    $('#weight').val(weight);
                }
            }
        });
        $('#doc').on('change',function(fileDom){
            alert(1)
            //判断是否支持FileReader
            if (window.FileReader) {
                var reader = new FileReader();
                alert(2)
            } else {
                alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
            }

            //获取文件
            var file = fileDom.files[0];
            var imageType = /^image\//;
            //是否是图片
            if (!imageType.test(file.type)) {
                alert("请选择图片！");
                return;
            }
            //读取完成
            reader.onload = function(e) {
                alert(3)
                //获取图片dom
                var img = document.getElementById("preview");
                //图片路径设置为读取的图片
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    },
    pd_preservations:function(){
        var url           = WEB_URL + '/api/coreUser/update';
        var headImg       = WEB_URL + dataGet('json_url');
        var nickName      = $('#name').val();
        var gender        = $('#sex').val()=='男'?1:2;
        var address       = $('#demo1').val();
        var constellation = $('#constellation').val();
        var height        = $('#height').val();
        var weight        = $('#weight').val();
        var data          = {headImg:headImg,nickName:nickName,gender:gender,address:address,constellation:constellation,height:height,weight:weight};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    alert('修改成功！');
                    Views.personalCenterView.show();
                }
            }
        });

    },
    imgheadinput:function(){
        var json_url = '';
        $("#doc").attachsvr({
            script: WEB_URL + "/api/attachment/upload",
            uploadkey:"file",
            filetype:[".jpg",".png",".jpeg",".bmp"],

            onComplete:function(json){
                console.log(json.data.data[0].uri);
                // alert(json.data.data[0].uri);
                var json_url = json.data.data[0].uri;
                dataSave('json_url',json_url);
            },
            onProgress:function(xhr){
                //console.log(xhr);
                //console.log("progress,在这里可以添加loading 效果",parseInt(xhr.loaded/xhr.total*100)+"%")
                $('#continuefile').text(parseInt(xhr.loaded/xhr.total*100)+"%");
            },
            onCheck:function(file){
                return true;
            },
            onError:function(e){console.log("error",e)},
            ctxdata:{
                "参数1":"参数1的值",
                "参数2":"参数2",
            }

        });
    }
});

/***********************个人资料end**********************/



/***********************我的银行卡start**********************/
Views.myBankCardView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myBankCard',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url = WEB_URL +'/api/userBank/selectList';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: {},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    console.log(data);
                    var _self = data.data;
                    var str   ='';
                    for (var i=0;i<_self.length;i++){
                        str += '<div class="card buildBg ui_btn" data-numbersss="'+_self[i].bankCode+'" data-types="'+_self[i].bankName+'" data-Name="'+_self[i].realName+'" data-mobiless="'+_self[i].mobile+'" data-action="bankCards" data-uid="'+_self[i].id+'">'
                                +'<div class="cardLogo fL"></div>'
                                +'<div class="cardInformation fL">'
                                +'<div class="bcTitle">'+_self[i].realName+'</div>'
                                +'<div class="type">'+_self[i].bankName+'</div>'
                                +'<div class="number">'+_self[i].bankCode+'</div>'
                                +'</div>'
                                +'<div class="paymentLogo"></div>'
                                +'</div>'
                    }
                    $('#bankCard').html(str);
                    window.addEventListener('load',function(){
                        alert(1)
                        var initX;
                        var moveX;
                        var X = 0;
                        var objX = 0;
                        window.addEventListener('touchstart',function(event){

                            event.preventDefault();
                            var obj = event.target.parentNode;
                            if(obj.className == "buildBg"){
                                initX = event.targetTouches[0].pageX;
                                objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
                            }
                            if( objX == 0){
                                window.addEventListener('touchmove',function(event) {
                                    event.preventDefault();
                                    var obj = event.target.parentNode;
                                    if (obj.className == "buildBg") {
                                        moveX = event.targetTouches[0].pageX;
                                        X = moveX - initX;
                                        if (X > 0) {
                                            obj.style.WebkitTransform = "translateX("+0+"px)";
                                        }
                                        else if (X < 0) {
                                            var l = Math.abs(X);
                                            obj.style.WebkitTransform = "translateX(" +  -l  + "px)";
                                            if(l>80){
                                                l=80;
                                                obj.style.WebkitTransform = "translateX("  + -l  + "px)";
                                            }
                                        }
                                    }
                                });
                            }
                            else if(objX<0){
                                window.addEventListener('touchmove',function(event) {
                                    event.preventDefault();
                                    var obj = event.target.parentNode;
                                    if (obj.className == "buildBg") {
                                        moveX = event.targetTouches[0].pageX;
                                        X = moveX - initX;
                                        if (X > 0) {
                                            var r = -80+Math.abs(X);
                                            obj.style.WebkitTransform = "translateX("  + r  + "px)";
                                            if(r>0){
                                                r=0;
                                                obj.style.WebkitTransform = "translateX("  + r  + "px)";
                                            }
                                        }
                                        else {     //向左滑动
                                            obj.style.WebkitTransform = "translateX("   +-80  + "px)";
                                        }
                                    }
                                });
                            }

                        })
                        window.addEventListener('touchend',function(event){
                            event.preventDefault();
                            var obj = event.target.parentNode;
                            if(obj.className == "buildBg"){
                                objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
                                if(objX>-40){
                                    obj.style.WebkitTransform = "translateX("  + 0  + "px)";
                                }else{
                                    obj.style.WebkitTransform = "translateX("   +-80   +"px)";
                                }
                            }
                        })

                    })
                }
            }
        });

    },

    goInAddCard:function(){
        Views.addBankCardView.show();
    },
    bankCards:function(btn){
        dataSave('BankCard',$(btn).attr('data-uid'));
        dataSave('BankMobile',$(btn).attr('data-mobiless'));
        dataSave('Banknumbersss',$(btn).attr('data-numbersss'));
        dataSave('Banktypes',$(btn).attr('data-types'));
        dataSave('BankName',$(btn).attr('data-Name'));
        Views.xgBankCardView.show();
    },
    bk:function(){
        Views.personalCenterView.show();
    }


})
/***********************我的银行卡end**********************/

/***********************添加银行卡start**********************/
Views.addBankCardView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'addBankCard',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var one = false , two = false;

        $('.addClear').click(function(){
            $(this).siblings('input').val('');
        });
        $('#BankCardNumber').blur(function(){
            var reg = /^[0-9]+.?[0-9]*$/;
            if (reg.test($(this).val())) {
                one = true
            }else{
                alert('请输入正确银行卡');
                $(this).val('')
            }
        })
        $('#BankCardPhone').blur(function(){
            var reg = /^[0-9]+.?[0-9]*$/;
            if(!reg.test($(this).val())){
                    alert('请输入正确手机号');
                    $(this).val('');
                    two = false;
            }else if(!($(this).val().length==11)){
                    alert('确认手机号码为11位');
                    $(this).val('');
                    two = false;
            }else{
                    dataSave('true',1)
            }
        })
    },



    goInAddSuccess:function(){
        if(dataGet('true')==1){
            var url         = WEB_URL + '/api/userBank/add';
            var realName    = $('#BankCardName').val();
            var bankCode    = $('#BankCardNumber').val();
            var bankName    = $('#BankCardBank').val();
            var mobile      = $('#BankCardPhone').val();

            if(realName==''&&bankCode==''&&bankName==''&&mobile==''){
                alert('所属信息有未填项')
            }else{
                var data        = {realName:realName,bankCode:bankCode,bankName:bankName,mobile:mobile};
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:url,
                    data: JSON.stringify(data),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(!data.success) {
                            alert(data.msg);
                        }else{
                            alert('添加成功！');
                            Views.myBankCardView.show();
                        }
                    }
                });
            }
        }else{
            alert('所填信息有误')
        }
    }

})
/***********************添加银行卡end**********************/


/***********************修改银行卡start**********************/
Views.xgBankCardView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'xgBankCard',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        $('.addClear').click(function(){
            $(this).siblings('input').val('');
        });

        $('#BankCardName').val(dataGet('BankName'));
        $('#BankCardNumber').val(dataGet('Banknumbersss'));
        $('#BankCardBank').val(dataGet('Banktypes'));
        $('#BankCardPhone').val(dataGet('BankMobile'));
        $('#BankCardNumber').blur(function(){
            var reg = /^[0-9]+.?[0-9]*$/;
            if (reg.test($(this).val())) {
                return true;
            }else{
                alert('请输入正确银行卡');
                $(this).val('')
            }
        })
    },
    goInAddSuccess:function(){
        var url         = WEB_URL +'/api/userBank/update';
        var id          =dataGet('BankCard');
        var realName    =$('#BankCardName').val();
        var bankCode    =$('#BankCardNumber').val();
        var bankName    =$('#BankCardBank').val();
        var mobile    =$('#BankCardPhone').val();
        var data        ={id:id,realName:realName,bankCode:bankCode,bankName:bankName,mobile:mobile}
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    alert('修改成功！');
                    Views.myBankCardView.show();
                }
            }
        });
    },
    del:function(){
        var url = WEB_URL + '/api/userBank/userCancelBack';
        var id  =dataGet('BankCard');
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify({id:id}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    alert('删除成功！');
                    Views.myBankCardView.show();
                }
            }
        });
    }

})
/***********************修改银行卡end**********************/

/***********************填写银行卡信息start**********************/
Views.fillBankCardInformationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'fillBankCardInformation',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

    },

    goInAddNext:function(){

    }

})
/***********************填写银行卡信息end**********************/

/***********************我的朋友圈start**********************/
Views.myCircleOfFriendsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myCircleOfFriends',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        dataSave('findUsertype',2);
        //页面进入默认展示一级
        var urlTwo         = WEB_URL + '/api/coreUser/findUserRetailO?pageNum=1&pageSize=20&type=2';
        var pageNum     =1;
        var pageSize    =20;
        var type        =2;
        var datas        ={pageNum:pageNum,pageSize:pageSize,type:type};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwo,
            data:JSON.stringify(datas),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self   = data.data;
                    console.log(_self);
                    var _length = _self.list;
                    var str     = '';
                    var Img     ='';
                    if(_length.length ==0){
                        $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
                    }else{
                        for(var i=0;i<_length.length;i++){
                            var date = new Date(_length[i].createTime);
                            Y = date.getFullYear() + '.';
                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                            D = date.getDate() + ' ';
                            h = date.getHours() + ':';
                            m = date.getMinutes() + ':';
                            s = date.getSeconds();
                            if(_length[i].headImg ==null){
                                Img ='images/storeDetails/head.png';
                            }else{
                                Img = _length[i].headImg;
                            }
                            str +='<div class="cList">'
                                +'<div class="cfHead fL">'
                                +'<img src="'+Img+'">'
                                +'</div>'
                                +'<div class="cfData fL">'
                                +'<div class="name">'+_length[i].nickName+'</div>'
                                +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
                                +'</div>'
                                +'<div class="cfTime fR">'+Y+M+D+'</div>'
                                +'</div>'
                        }
                        $('.list_sort').html(str);
                    }

                }
            }
        });

        // 获取昵称
        var url  = WEB_URL + "/api/core/selectLoginUser";
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
                    var _self = data.data;
                    console.log(_self);
                    // headImg == null?'<img src="images/mine/head.png" >':'<img src="'+headImg+'">'
                    $('.cHead .pic').html(_self.headImg == null?'<img src="images/mine/head.png"  style="width:55px;height:55px;">':'<img style="width:55px;height:55px;"  src="'+_self.headImg+'">');//头像
                    $('.cHead .name').html(_self.nickName);//昵称
                    $('.smData .fL').html('平台身份:'+(_self.crade === 1?'普通会员':(_self.crade === 2?'创客':(_self.crade === 3 ?'创客商':_self.crade))));//昵称
                    $('.smData .fR').html('获得的佣金:'+_self.totalIncome);//佣金
                }
            }
        });

        // // 进入默认创客（一级）
        // $('#leaveOne').click(function(){
        //     var url         = WEB_URL + '/api/coreUser/findUserRetailO?pageNum=1&pageSize=20&type='+dataGet('findUsertype');
        //     var pageNum     =1;
        //     var pageSize    =20;
        //     var type        =parseInt(dataGet('findUsertype'));
        //     var data        ={pageNum:pageNum,pageSize:pageSize,type:type};
        //     if(type ==2){
        //         $.ajax({
        //             type:'POST',
        //             dataType:'json',
        //             url:url,
        //             data:JSON.stringify(data),
        //             contentType:'application/json;charset=utf-8',
        //             error: function (XMLHttpRequest, textStatus, errorThrown) {
        //                 alert(XMLHttpRequest, textStatus, errorThrown);
        //             },
        //             success:function(data){
        //                 if(!data.success) {
        //                     alert(data.msg);
        //                 }else{
        //                     var _self   = data.data;
        //                     console.log(_self);
        //                     var _length = _self.list;
        //                     var str     = '';
        //                     var Img     ='';
        //                     if(_length.length ==0){
        //                         $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
        //                     }else{
        //                         for(var i=0;i<_length.length;i++){
        //                             if(_length[i].headImg ==null){
        //                                 Img ='images/storeDetails/head.png';
        //                             }else{
        //                                 Img = _length[i].headImg;
        //                             }
        //                             str +='<div class="cList">'
        //                                 +'<div class="cfHead fL">'
        //                                 +'<img src="'+Img+'">'
        //                                 +'</div>'
        //                                 +'<div class="cfData fL">'
        //                                 +'<div class="name">'+_length[i].nickName+'</div>'
        //                                 +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
        //                                 +'</div>'
        //                                 +'<div class="cfTime fR">2017.03.04</div>'
        //                                 +'</div>'
        //                         }
        //                         $('.list_sort').html(str);
        //                     }
        //
        //                 }
        //             }
        //         });
        //     }else{
        //         $.ajax({
        //             type:'POST',
        //             dataType:'json',
        //             url:url,
        //             data:JSON.stringify(data),
        //             contentType:'application/json;charset=utf-8',
        //             error: function (XMLHttpRequest, textStatus, errorThrown) {
        //                 alert(XMLHttpRequest, textStatus, errorThrown);
        //             },
        //             success:function(data){
        //                 if(!data.success) {
        //                     alert(data.msg);
        //                 }else{
        //                     var _self   = data.data;
        //                     console.log(_self);
        //                     var _length = _self.list;
        //                     var str     ='';
        //                     var Img     ='';
        //                     var inv     ='';
        //                     if(_length.length ==0){
        //                         $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
        //                     }else{
        //                         for(var i=0;i<_length.length;i++){
        //                             if(_length[i].headImg ==null){
        //                                 Img ='images/storeDetails/head.png';
        //                             }else{
        //                                 Img = _length[i].headImg;
        //                             };
        //                             if(_length[i].inviteTotal ==null){
        //                                 inv ='<div class="coSee no fR">查看店铺</div>';
        //                             }else{
        //                                 inv ='<div class="coSee fR">查看店铺</div>';
        //                             };
        //                             str +='<div class="cList">'
        //                                 +'<div class="cfHead fL">'
        //                                 +'<img src="'+Img+'">'
        //                                 +'</div>'
        //                                 +'<div class="cfData fL">'
        //                                 +'<div class="name">'+_length[i].nickName+'</div>'
        //                                 +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
        //                                 +'</div>'
        //                                 +inv
        //                                 +'</div>'
        //                         }
        //                         $('.list_sort').html(str);
        //                     }
        //
        //                 }
        //             }
        //         });
        //     }
        // });
        //
        // // 进入默认创客（二级）
        // $('#leaveTwo').click(function(){
        //     var url         = WEB_URL + '/api/coreUser/findUserRetailT?pageNum=1&pageSize=20&type='+dataGet('findUsertype');
        //     var pageNum     =1;
        //     var pageSize    =20;
        //     var type        =parseInt(dataGet('findUsertype'));
        //     var data        ={pageNum:pageNum,pageSize:pageSize,type:type};
        //     if(type ==2){
        //         $.ajax({
        //             type:'POST',
        //             dataType:'json',
        //             url:url,
        //             data:JSON.stringify(data),
        //             contentType:'application/json;charset=utf-8',
        //             error: function (XMLHttpRequest, textStatus, errorThrown) {
        //                 alert(XMLHttpRequest, textStatus, errorThrown);
        //             },
        //             success:function(data){
        //                 if(!data.success) {
        //                     alert(data.msg);
        //                 }else{
        //                     var _self   = data.data;
        //                     console.log(_self);
        //                     var _length = _self.list;
        //                     var str     = '';
        //                     var Img     ='';
        //                     if(_length.length ==0){
        //                         $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
        //                     }else{
        //                         for(var i=0;i<_length.length;i++){
        //                             if(_length[i].headImg ==null){
        //                                 Img ='images/storeDetails/head.png';
        //                             }else{
        //                                 Img = _length[i].headImg;
        //                             }
        //                             str +='<div class="cList">'
        //                                 +'<div class="cfHead fL">'
        //                                 +'<img src="'+Img+'">'
        //                                 +'</div>'
        //                                 +'<div class="cfData fL">'
        //                                 +'<div class="name">'+_length[i].nickName+'</div>'
        //                                 +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
        //                                 +'</div>'
        //                                 +'<div class="cfTime fR">2017.03.04</div>'
        //                                 +'</div>'
        //                         }
        //                         $('.list_sort').html(str);
        //                     }
        //
        //                 }
        //             }
        //         });
        //     }else{
        //         $.ajax({
        //             type:'POST',
        //             dataType:'json',
        //             url:url,
        //             data:JSON.stringify(data),
        //             contentType:'application/json;charset=utf-8',
        //             error: function (XMLHttpRequest, textStatus, errorThrown) {
        //                 alert(XMLHttpRequest, textStatus, errorThrown);
        //             },
        //             success:function(data){
        //                 if(!data.success) {
        //                     alert(data.msg);
        //                 }else{
        //                     var _self   = data.data;
        //                     console.log(_self);
        //                     var _length = _self.list;
        //                     var str     ='';
        //                     var Img     ='';
        //                     var inv     ='';
        //                     if(_length.length ==0){
        //                         $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
        //                     }else{
        //                         for(var i=0;i<_length.length;i++){
        //                             if(_length[i].headImg ==null){
        //                                 Img ='images/storeDetails/head.png';
        //                             }else{
        //                                 Img = _length[i].headImg;
        //                             };
        //                             if(_length[i].inviteTotal ==null){
        //                                 inv ='<div class="coSee no fR">查看店铺</div>';
        //                             }else{
        //                                 inv ='<div class="coSee fR">查看店铺</div>';
        //                             };
        //                             str +='<div class="cList">'
        //                                 +'<div class="cfHead fL">'
        //                                 +'<img src="'+Img+'">'
        //                                 +'</div>'
        //                                 +'<div class="cfData fL">'
        //                                 +'<div class="name">'+_length[i].nickName+'</div>'
        //                                 +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
        //                                 +'</div>'
        //                                 +inv
        //                                 +'</div>'
        //                         }
        //                         $('.list_sort').html(str);
        //                     }
        //
        //                 }
        //             }
        //         });
        //     }
        // });
        //
        // // 进入默认创客（三级）
        // $('#leaveThree').click(function(){
        //     var url         = WEB_URL + '/api/coreUser/findUserRetailTH?pageNum=1&pageSize=20&type='+dataGet('findUsertype');
        //     var pageNum     =1;
        //     var pageSize    =20;
        //     var type        =parseInt(dataGet('findUsertype'));
        //     var data        ={pageNum:pageNum,pageSize:pageSize,type:type};
        //     if(type ==2){
        //         $.ajax({
        //             type:'POST',
        //             dataType:'json',
        //             url:url,
        //             data:JSON.stringify(data),
        //             contentType:'application/json;charset=utf-8',
        //             error: function (XMLHttpRequest, textStatus, errorThrown) {
        //                 alert(XMLHttpRequest, textStatus, errorThrown);
        //             },
        //             success:function(data){
        //                 if(!data.success) {
        //                     alert(data.msg);
        //                 }else{
        //                     var _self   = data.data;
        //                     console.log(_self);
        //                     var _length = _self.list;
        //                     var str     = '';
        //                     var Img     ='';
        //                     if(_length.length ==0){
        //                         $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
        //                     }else{
        //                         for(var i=0;i<_length.length;i++){
        //                             if(_length[i].headImg ==null){
        //                                 Img ='images/storeDetails/head.png';
        //                             }else{
        //                                 Img = _length[i].headImg;
        //                             }
        //                             str +='<div class="cList">'
        //                                 +'<div class="cfHead fL">'
        //                                 +'<img src="'+Img+'">'
        //                                 +'</div>'
        //                                 +'<div class="cfData fL">'
        //                                 +'<div class="name">'+_length[i].nickName+'</div>'
        //                                 +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
        //                                 +'</div>'
        //                                 +'<div class="cfTime fR">2017.03.04</div>'
        //                                 +'</div>'
        //                         }
        //                         $('.list_sort').html(str);
        //                     }
        //
        //                 }
        //             }
        //         });
        //     }else{
        //         $.ajax({
        //             type:'POST',
        //             dataType:'json',
        //             url:url,
        //             data:JSON.stringify(data),
        //             contentType:'application/json;charset=utf-8',
        //             error: function (XMLHttpRequest, textStatus, errorThrown) {
        //                 alert(XMLHttpRequest, textStatus, errorThrown);
        //             },
        //             success:function(data){
        //                 if(!data.success) {
        //                     alert(data.msg);
        //                 }else{
        //                     var _self   = data.data;
        //                     console.log(_self);
        //                     var _length = _self.list;
        //                     var str     ='';
        //                     var Img     ='';
        //                     var inv     ='';
        //                     if(_length.length ==0){
        //                         $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
        //                     }else{
        //                         for(var i=0;i<_length.length;i++){
        //                             if(_length[i].headImg ==null){
        //                                 Img ='images/storeDetails/head.png';
        //                             }else{
        //                                 Img = _length[i].headImg;
        //                             };
        //                             if(_length[i].inviteTotal ==null){
        //                                 inv ='<div class="coSee no fR">查看店铺</div>';
        //                             }else{
        //                                 inv ='<div class="coSee fR">查看店铺</div>';
        //                             };
        //                             str +='<div class="cList">'
        //                                 +'<div class="cfHead fL">'
        //                                 +'<img src="'+Img+'">'
        //                                 +'</div>'
        //                                 +'<div class="cfData fL">'
        //                                 +'<div class="name">'+_length[i].nickName+'</div>'
        //                                 +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
        //                                 +'</div>'
        //                                 +inv
        //                                 +'</div>'
        //                         }
        //                         $('.list_sort').html(str);
        //                     }
        //
        //                 }
        //             }
        //         });
        //     }
        // });

    },
    cTitle:function(btn){
        if($(btn).attr('data-core') ==2){
            $('.cType div').removeClass('sc');
            $(btn).addClass('sc');
            dataSave('findUsertype',2);
            $('.cGrade div').removeClass('sc');
            $('#leaveOne').addClass('sc');
            var url         = WEB_URL + '/api/coreUser/findUserRetailO?pageNum=1&pageSize=20&type=2';
            var pageNum     =1;
            var pageSize    =20;
            var type        =parseInt(dataGet('findUsertype'));
            var data        ={pageNum:pageNum,pageSize:pageSize,type:type};
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
                        var _self   = data.data;
                        console.log(_self);
                        var _length = _self.list;
                        var str     = '';
                        var Img     ='';
                        if(_length.length ==0){
                            $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
                        }else{
                            for(var i=0;i<_length.length;i++){
                                var date = new Date(_length[i].createTime);
                                Y = date.getFullYear() + '.';
                                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                                D = date.getDate() + ' ';
                                h = date.getHours() + ':';
                                m = date.getMinutes() + ':';
                                s = date.getSeconds();
                                if(_length[i].headImg ==null){
                                    Img ='images/storeDetails/head.png';
                                }else{
                                    Img = _length[i].headImg;
                                }
                                str +='<div class="cList">'
                                    +'<div class="cfHead fL">'
                                    +'<img src="'+Img+'">'
                                    +'</div>'
                                    +'<div class="cfData fL">'
                                    +'<div class="name">'+_length[i].nickName+'</div>'
                                    +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
                                    +'</div>'
                                    +'<div class="cfTime fR">'+Y+M+D+'</div>'
                                    +'</div>'
                            }
                            $('.list_sort').html(str);
                        }

                    }
                }
            });
        }else{
            $('.cType div').removeClass('sc');
            $(btn).addClass('sc');
            dataSave('findUsertype',3);
            $('.cGrade div').removeClass('sc');
            $('#leaveOne').addClass('sc');
            var url         = WEB_URL + '/api/coreUser/findUserRetailO?pageNum=1&pageSize=20&type=3';
            var pageNum     =1;
            var pageSize    =20;
            var type        =parseInt(dataGet('findUsertype'));
            var data        ={pageNum:pageNum,pageSize:pageSize,type:type};
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
                        var _self   = data.data;
                        console.log(_self);
                        var _length = _self.list;
                        var str     ='';
                        var Img     ='';
                        var inv     ='';
                        if(_length.length ==0){
                            $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
                        }else{
                            for(var i=0;i<_length.length;i++){

                                if(_length[i].headImg ==null){
                                    Img ='images/storeDetails/head.png';
                                }else{
                                    Img = _length[i].headImg;
                                };
                                if(_length[i].inviteTotal ==null){
                                    inv ='<div class="coSee no fR">查看店铺</div>';
                                }else{
                                    inv ='<div class="coSee fR ui_btn" data-action="coSee" data-id="'+_length[i].showStoreId+'">查看店铺</div>';
                                };
                                str +='<div class="cList">'
                                    +'<div class="cfHead fL">'
                                    +'<img src="'+Img+'">'
                                    +'</div>'
                                    +'<div class="cfData fL">'
                                    +'<div class="name">'+_length[i].nickName+'</div>'
                                    +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
                                    +'</div>'
                                    +inv
                                    +'</div>'
                            }
                            $('.list_sort').html(str);
                        }

                    }
                }
            });
        }
    },
    gradeType:function(btn){
        $('.cGrade div').removeClass('sc');
        $(btn).addClass('sc');
        if($(btn).attr('data-side') == 1){
            var url         = WEB_URL + '/api/coreUser/findUserRetailO?pageNum=1&pageSize=20&type='+dataGet('findUsertype');
            var pageNum     =1;
            var pageSize    =20;
            var type        =parseInt(dataGet('findUsertype'));
            var data        ={pageNum:pageNum,pageSize:pageSize,type:type};
            console.log(data)
            if(type ==2){
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
                            var _self   = data.data;
                            console.log(_self);
                            var _length = _self.list;
                            var str     = '';
                            var Img     ='';
                            if(_length.length ==0){
                                $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
                            }else{
                                for(var i=0;i<_length.length;i++){
                                    if(_length[i].headImg ==null){
                                        Img ='images/storeDetails/head.png';
                                    }else{
                                        Img = _length[i].headImg;
                                    }
                                    str +='<div class="cList">'
                                        +'<div class="cfHead fL">'
                                        +'<img src="'+Img+'">'
                                        +'</div>'
                                        +'<div class="cfData fL">'
                                        +'<div class="name">'+_length[i].nickName+'</div>'
                                        +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
                                        +'</div>'
                                        +'<div class="cfTime fR">2017.03.04</div>'
                                        +'</div>'
                                }
                                $('.list_sort').html(str);
                            }

                        }
                    }
                });
            }else{
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
                            var _self   = data.data;
                            console.log(_self);
                            var _length = _self.list;
                            var str     ='';
                            var Img     ='';
                            var inv     ='';
                            if(_length.length ==0){
                                $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
                            }else{
                                for(var i=0;i<_length.length;i++){
                                    if(_length[i].headImg ==null){
                                        Img ='images/storeDetails/head.png';
                                    }else{
                                        Img = _length[i].headImg;
                                    };
                                    if(_length[i].inviteTotal ==null){
                                        inv ='<div class="coSee no fR">查看店铺</div>';
                                    }else{
                                        inv ='<div class="coSee fR">查看店铺</div>';
                                    };
                                    str +='<div class="cList">'
                                        +'<div class="cfHead fL">'
                                        +'<img src="'+Img+'">'
                                        +'</div>'
                                        +'<div class="cfData fL">'
                                        +'<div class="name">'+_length[i].nickName+'</div>'
                                        +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
                                        +'</div>'
                                        +inv
                                        +'</div>'
                                }
                                $('.list_sort').html(str);
                            }

                        }
                    }
                });
            }
        }else if ($(btn).attr('data-side') == 2){
            var url         = WEB_URL + '/api/coreUser/findUserRetailT?pageNum=1&pageSize=20&type='+dataGet('findUsertype');
            var pageNum     =1;
            var pageSize    =20;
            var type        =parseInt(dataGet('findUsertype'));
            var data        ={pageNum:pageNum,pageSize:pageSize,type:type};
            console.log(data)
            if(type ==2){
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
                            var _self   = data.data;
                            console.log(_self);
                            var _length = _self.list;
                            var str     = '';
                            var Img     ='';
                            if(_length.length ==0){
                                $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
                            }else{
                                for(var i=0;i<_length.length;i++){
                                    if(_length[i].headImg ==null){
                                        Img ='images/storeDetails/head.png';
                                    }else{
                                        Img = _length[i].headImg;
                                    }
                                    str +='<div class="cList">'
                                        +'<div class="cfHead fL">'
                                        +'<img src="'+Img+'">'
                                        +'</div>'
                                        +'<div class="cfData fL">'
                                        +'<div class="name">'+_length[i].nickName+'</div>'
                                        +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
                                        +'</div>'
                                        +'<div class="cfTime fR">2017.03.04</div>'
                                        +'</div>'
                                }
                                $('.list_sort').html(str);
                            }

                        }
                    }
                });
            }else{
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
                            var _self   = data.data;
                            console.log(_self);
                            var _length = _self.list;
                            var str     ='';
                            var Img     ='';
                            var inv     ='';
                            if(_length.length ==0){
                                $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
                            }else{
                                for(var i=0;i<_length.length;i++){
                                    if(_length[i].headImg ==null){
                                        Img ='images/storeDetails/head.png';
                                    }else{
                                        Img = _length[i].headImg;
                                    };
                                    if(_length[i].inviteTotal ==null){
                                        inv ='<div class="coSee no fR">查看店铺</div>';
                                    }else{
                                        inv ='<div class="coSee fR">查看店铺</div>';
                                    };
                                    str +='<div class="cList">'
                                        +'<div class="cfHead fL">'
                                        +'<img src="'+Img+'">'
                                        +'</div>'
                                        +'<div class="cfData fL">'
                                        +'<div class="name">'+_length[i].nickName+'</div>'
                                        +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
                                        +'</div>'
                                        +inv
                                        +'</div>'
                                }
                                $('.list_sort').html(str);
                            }

                        }
                    }
                });
            }
        }else{
            var url         = WEB_URL + '/api/coreUser/findUserRetailTH?pageNum=1&pageSize=20&type='+dataGet('findUsertype');
            var pageNum     =1;
            var pageSize    =20;
            var type        =parseInt(dataGet('findUsertype'));
            var data        ={pageNum:pageNum,pageSize:pageSize,type:type};
            console.log(data)
            if(type ==2){
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
                            var _self   = data.data;
                            console.log(_self);
                            var _length = _self.list;
                            var str     = '';
                            var Img     ='';
                            if(_length.length ==0){
                                $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
                            }else{
                                for(var i=0;i<_length.length;i++){
                                    if(_length[i].headImg ==null){
                                        Img ='images/storeDetails/head.png';
                                    }else{
                                        Img = _length[i].headImg;
                                    }
                                    str +='<div class="cList">'
                                        +'<div class="cfHead fL">'
                                        +'<img src="'+Img+'">'
                                        +'</div>'
                                        +'<div class="cfData fL">'
                                        +'<div class="name">'+_length[i].nickName+'</div>'
                                        +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
                                        +'</div>'
                                        +'<div class="cfTime fR">2017.03.04</div>'
                                        +'</div>'
                                }
                                $('.list_sort').html(str);
                            }

                        }
                    }
                });
            }else{
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
                            var _self   = data.data;
                            console.log(_self);
                            var _length = _self.list;
                            var str     ='';
                            var Img     ='';
                            var inv     ='';
                            if(_length.length ==0){
                                $('.list_sort').html('<img src="images/null.png" alt="" style="position: relative;    transform: translateX(-50%);left:50%;">');
                            }else{
                                for(var i=0;i<_length.length;i++){
                                    if(_length[i].headImg ==null){
                                        Img ='images/storeDetails/head.png';
                                    }else{
                                        Img = _length[i].headImg;
                                    };
                                    if(_length[i].inviteTotal ==null){
                                        inv ='<div class="coSee no fR">查看店铺</div>';
                                    }else{
                                        inv ='<div class="coSee fR">查看店铺</div>';
                                    };
                                    str +='<div class="cList">'
                                        +'<div class="cfHead fL">'
                                        +'<img src="'+Img+'">'
                                        +'</div>'
                                        +'<div class="cfData fL">'
                                        +'<div class="name">'+_length[i].nickName+'</div>'
                                        +'<div class="howManyPeople">共邀请'+_length[i].inviterNo+'人</div>'
                                        +'</div>'
                                        +inv
                                        +'</div>'
                                }
                                $('.list_sort').html(str);
                            }

                        }
                    }
                });
            }
        }

    },
    coSee:function(btn){
        dataSave('storeId',$(btn).attr('data-id'));
        Views.storeDetailsView.show();

    }

})
/***********************我的朋友圈end**********************/

/***********************我的商品分享start**********************/
Views.myShareCommodityView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myShareCommodity',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();


    },

})
/***********************我的商品分享end**********************/

/***********************我的收藏start**********************/
Views.myCollectionView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myCollection',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();


        var url     = WEB_URL + '/api/coreCollection/findUserCollection?pageNum=1&pageSize=20&type='+dataGet('typeId');
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
                    console.log(data.msg);
                }else{
                    var _self   = data.data;
                    console.log(_self);
                    if(dataGet('typeId')==1){
                        $('.CollectionType div').eq(0).css('color','red');
                        $('.CollectionType div').eq(1).css('color','#333');
                        $('#side1').show();
                        $('#side2').hide();
                        var str ='';
                        for (var i=0;i<_self.list.length;i++){
                            if(_self.list[i].object == null){
                                _self.list[i].object.veiw = '该商品暂无简介'
                            }else if(_self.list[i].object.veiw =='' || _self.list[i].object.veiw ==null){
                                _self.list[i].object.veiw = '该商品暂无简介'
                            }
                            else{
                                _self.list[i].object.veiw = _self.list[i].object.veiw
                            }
                            str +='<div class="list ui_btn"  >'
                                    +'<div class="select fL "> <div class="but wYes ui_btn" data-id="'+_self.list[i].id+'" data-action="single"></div> </div>'
                                    +'<div class="commodity fL ui_btn" data-action="tiaosp" data-id="'+_self.list[i].object.id+'">'
                                    +'<div class="pic fL"> <img src="'+_self.list[i].object.carouselPicture+'"> </div>'
                                    +'<div class="content fL">'
                                    +'<div class="title">'+_self.list[i].object.name+'</div>'
                                    +'<div class="introduce">'+_self.list[i].object.veiw+'</div>'
                                    +'<div class="salesVolume" style="margin-top: 0;"> <span class="fL">￥'+_self.list[i].object.price+'</span> </div>'
                                    +'</div>'
                                    +'<div class="more fR ui_btn" data-action="more" > </div>'
                                    +'</div>'
                                    +'</div>'
                        }
                        $('.sccc').html(str);
                    }else{
                        $('.CollectionType div').eq(1).css('color','red');
                        $('.CollectionType div').eq(0).css('color','#333');
                        $('#side2').show();
                        $('#side1').hide();
                        var strs ='';
                        for (var i=0;i<_self.list.length;i++){
                            if(_self.list[i].object.veiw =='' || _self.list[i].object.veiw ==null){
                                _self.list[i].object.veiw = '该店铺暂无简介'
                            }else{
                                _self.list[i].object.veiw = _self.list[i].object.veiw
                            }
                            if(_self.list[i].object.logo ==null){
                                _self.list[i].object.logo = 'images/null.png'
                            }else{
                                _self.list[i].object.logo = _self.list[i].object.logo
                            }
                            strs +='<div class="list ">'
                                +'<div class="select fL "> <div class="but wYes asddd  ui_btn" data-id="'+_self.list[i].id+'" data-action="single"></div> </div>'
                                +'<div class="commodity fL ui_btn" data-action="tiaodp" data-id="'+_self.list[i].object.id+'">'
                                +'<div class="pic fL"> <img src="'+_self.list[i].object.logo+'"> </div>'
                                +'<div class="content fL">'
                                +'<div class="title">'+_self.list[i].object.name+'</div>'
                                +'<div class="introduce">'+_self.list[i].object.veiw+'</div>'
                                +'</div>'
                                +'<div class="more fR ui_btn" data-action="more" > </div>'
                                +'</div>'
                                +'</div>'
                        }
                        $('.cccss').html(strs);
                    }
                }
            }
        });


    },
    //编辑
    edit: function (btn) {
        $('.list').css('left', '0');
        if ($(btn).hasClass('eYes')) {
            // $('#bottom_fixed').show();
            $(btn).text("完成");
            $('.list').css("margin-left", "10%");
            $(btn).removeClass('eYes');
            $('.editWhole').show();
            $('.positionBottom').show();

            $('.CollectionType').hide();
            $('.position').css("height", '44px');
            $('.but').show();

        } else {
            // $('#bottom_fixed').hide();
            $(btn).text("编辑");
            $('.list').css("margin-left", "0%");
            $(btn).addClass('eYes');
            $('.editWhole').hide();
            $('.positionBottom').hide();
            $('.paragraph').removeClass('btn');
            dataSave('myCollection',0);
            $('.but').hide();

            $('.CollectionType').show();
            $('.position').css("height", '78px');

            $('.paragraph').children('.but ').css('background-image', 'url(images/storeDetails/noChoice.png)');
            $('.list .select .but').css('background-image', 'url(images/storeDetails/noChoice.png)');
        }
    },
    tiaosp:function(btn){
        dataSave('commodityUuid',$(btn).attr('data-id'));
        Views.commodityDetailsView.show();
        // storeDetails
    },
    tiaodp:function(btn){
        dataSave('storeId',$(btn).attr('data-id'));
        Views.storeDetailsView.show();
        // storeDetails
    },
    //单个
    single: function (btn) {
        if ($(btn).hasClass('wYes')) {
            $(btn).parent().parent().parent().find('.but').addClass('wYes');
            $(btn).parent().parent().parent().find('.but').css('background-image', 'url(images/storeDetails/noChoice.png)');
            $(btn).css('background-image', 'url(images/storeDetails/choice.png)');
            $(btn).removeClass('wYes');
            dataSave('myCollection',$(btn).attr('data-id'))
        } else {
            $(btn).css('background-image', 'url(images/storeDetails/noChoice.png)');
            $(btn).addClass('wYes');
            $(btn).parent().parent().siblings('.paragraph').children('.but').css('background-image', 'url(images/storeDetails/noChoice.png)');
        }
    },

    //更多
    more: function (btn) {
        $('.moreModules').show();
        $('.bgMask').show();
    },

    //取消
    cancel: function () {
        $('.moreModules').hide();
        $('.bgMask').hide();
    },
    bk:function(){
        Views.indexMineView.show();
    },

    /////////////////////切换事件/////////////////////////////
    type_commodity: function () {
        var url     = WEB_URL + '/api/coreCollection/findUserCollection?pageNum=1&pageSize=20&type=1';
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
                    console.log(_self);
                        $('.CollectionType div').eq(0).css('color','red');
                        $('.CollectionType div').eq(1).css('color','#333');
                        $('#side1').show();
                        $('#side2').hide();
                        var str ='';
                        commodityNum = _self.list.length;
                        for (var i=0;i<_self.list.length;i++){
                            if(_self.list[i].object.veiw =='' || _self.list[i].object.veiw ==null){
                                _self.list[i].object.veiw = '该商品暂无简介'
                            }else{
                                _self.list[i].object.veiw = _self.list[i].object.veiw
                            }
                            str +='<div class="list ui_btn"  data-action="tiaosp" data-id="'+_self.list[i].object.id+'">'
                                +'<div class="select fL "> <div class="but wYes  ui_btn" data-action="single"></div> </div>'
                                +'<div class="commodity fL">'
                                +'<div class="pic fL"> <img src="'+_self.list[i].object.carouselPicture+'"> </div>'
                                +'<div class="content fL">'
                                +'<div class="title">'+_self.list[i].object.name+'</div>'
                                +'<div class="introduce">'+_self.list[i].object.veiw+'</div>'
                                +'<div class="salesVolume" style="margin-top: 0;"> <span class="fL">￥'+_self.list[i].object.price+'</span> </div>'
                                +'</div>'
                                +'<div class="more fR ui_btn" data-action="more">'
                                +'</div>'
                                +'</div>'
                        }
                        $('.sccc').html(str);
                }
            }
        });
    },

    type_business: function () {
        var url     = WEB_URL + '/api/coreCollection/findUserCollection?pageNum=1&pageSize=20&type=2';
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
                    console.log(_self);
                        $('.CollectionType div').eq(1).css('color','red');
                        $('.CollectionType div').eq(0).css('color','#333');
                        $('#side2').show();
                        $('#side1').hide();
                        var strs ='';
                        commodityNums = _self.list.length;
                        for (var i=0;i<_self.list.length;i++){
                            if(_self.list[i].object.veiw =='' || _self.list[i].object.veiw ==null){
                                _self.list[i].object.veiw = '该店铺暂无简介'
                            }else{
                                _self.list[i].object.veiw = _self.list[i].object.veiw
                            }
                            if(_self.list[i].object.logo ==null){
                                _self.list[i].object.logo = 'images/null.png'
                            }else{
                                _self.list[i].object.logo = _self.list[i].object.logo
                            }
                            strs +='<div class="list ui_btn"  data-action="tiaodp" data-id="'+_self.list[i].object.id+'">'
                                +'<div class="select fL "> <div class="but wYes  ui_btn" data-action="single"></div> </div>'
                                +'<div class="commodity fL">'
                                +'<div class="pic fL"> <img src="'+_self.list[i].object.logo+'"> </div>'
                                +'<div class="content fL">'
                                +'<div class="title">'+_self.list[i].object.name+'</div>'
                                +'<div class="introduce">'+_self.list[i].object.veiw+'</div>'
                                +'</div>'
                                +'<div class="more fR ui_btn" data-action="more">'
                                +'</div>'
                                +'</div>'
                        }
                        $('.cccss').html(strs);
                }
            }
        });
    },
    del:function(){
        if(dataGet('myCollection') == 0){
            alert('请选择要删除的藏品');
        }else{
            var url = WEB_URL + '/api/coreCollection/rmUserCollection';
            var id  =dataGet('myCollection');
            var data={id:id};
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
                        console.log(data);
                        Views.myCollectionView.show();
                        $('.edit').text("编辑");
                        $('.list').css("margin-left", "0%");
                        $('.edit').addClass('eYes');
                        $('.editWhole').hide();
                        $('.positionBottom').hide();
                        $('.paragraph').removeClass('btn');
                        dataSave('myCollection',0);
                        $('.but').hide();

                        $('.CollectionType').show();
                        $('.position').css("height", '78px');

                        $('.paragraph').children('.but ').css('background-image', 'url(images/storeDetails/noChoice.png)');
                        $('.list .select .but').css('background-image', 'url(images/storeDetails/noChoice.png)');
                    }
                }
            });
        }

    },
})
/***********************我的收藏end**********************/

/***********************我的上级start**********************/
Views.mySuperiorView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'mySuperior',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var url = WEB_URL + '/api/coreUser/selectUserSuperior';
        ajaxTool("post",null,url,
            function error(XMLHttpRequest, textStatus, errorThrown,fnErr){
                alert("error:请求失败");
            },
            function success(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    console.log(data);
                    var _self    = data.data;
                    var headImg  = _self.headImg;   //头像
                    var nickName = _self.nickName;  //昵称
                    var userName = _self.userName;  //用户名
                    var realName = _self.realName;  //真实姓名
                    var mobile   = _self.mobile;    //手机号
                    var crade    = _self.crade;     //身份
                    $('.pic').html(headImg==null?'<img src="images/mine/head.png" style="border-radius: 50%;width:100%;height:100%;">' :'<img src='+headImg+' style="border-radius: 50%;width:100%;height:100%;">');
                    $('.name span').html(nickName);
                    $('.name p').html(userName);
                    $('.name .right').html(realName==null?'您未进行实名认证' :realName);
                    $('.mobile .right').html(mobile==null?' ' :mobile);
                    $('.level .right').html(crade == 1?'普通会员':(crade == 2 ?'创客':(crade == 3?'合作商':crade)));
                }
            },true
        );
    },

})
/***********************我的上级end**********************/

/***********************我的账单start**********************/
Views.myBillView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myBill',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        var time1 = new Date().Format("yyyy-MM");
        var url         = WEB_URL + '/api/userCashFlow/selectList';
        var pageNum     =1;
        var pageSize    =31;
        var myDate      =new Date();
        var selectTime  =time1;
        var data        ={pageNum:pageNum,pageSize:pageSize,selectTime:selectTime};
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
                    alert(data.msg);
                }else{
                    var _self   = data.data;
                    console.log(_self.list)
                    var _length = _self.list;
                    var str     ='';
                    for (var i=0;i<_length.length;i++){
                        if(_self.list[i].pmType ==0){
                            _self.list[i].pmType = '-'
                        }else{
                            _self.list[i].pmType = '+'
                        }
                        var date = new Date(_self.list[i].createTime);
                        Y = date.getFullYear() + '-';
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        D = date.getDate() + ' ';
                        h = date.getHours() + ':';
                        m = date.getMinutes() + ':';
                        s = date.getSeconds();
                        str +='<div class="myBillArea ui_btn" data-action="goInBillingDetails" data-uuids="'+_self.list[i].id+'">'
                                +'<div class="myBillAreaDetails bB">'
                                +'<div class="myBill_dateHead warp_Lt" style="font-size: 12px;">'
                                +'<span>'+Y+M+D+'</span>'
                                +'<span>'+h+m+s+'</span>'
                                +'</div>'
                                +'<div class="myBill_dateHead warp_Lt">'
                                +'<div class="myBill_datePic"></div>'
                                +'</div>'
                                +'<div class="myBillDetails">'
                                +'<p>'+_self.list[i].pmType+_self.list[i].quota+'</p>'
                                +'<span class="warp_lC" style="-webkit-line-clamp:1">'+_self.list[i].remark+'</span>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                    }
                    $('#myBillArea').html(str);
                }
            }
        });

    },

    goInBillingDetails:function(btn){
        dataSave('goInBilling',$(btn).data('uuids'));
        Views.billingDetailsAView.show();
    }

})
/***********************我的账单end**********************/



/***********************我的账单详情start**********************/
Views.billingDetailsAView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'billingDetailsA',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var url = WEB_URL + '/api/userCashFlow/selectOne';
        var id  = parseInt(dataGet('goInBilling'));
        var data={id:id};
        console.log(data)
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
                    var _self   = data.data;
                    console.log(_self);
                    if(_self.payType ==0){
                        _self.payType = '微信支付'
                    }else if(_self.payType ==1){
                        _self.payType = '支付宝支付'
                    }else if(_self.payType ==2){
                        _self.payType = '银联支付'
                    }else if(_self.payType ==3){
                        _self.payType = '余额支付'
                    }else if(_self.payType ==4){
                        _self.payType = '余额金豆混合支付'
                    }else if(_self.payType ==5){
                        _self.payType = '金豆支付'
                    };
                    var ll =_self.pmType==0?'-':'+'
                    var date = new Date(_self.createTime);
                    Y = date.getFullYear() + '-';
                    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    D = date.getDate() + ' ';
                    h = date.getHours() + ':';
                    m = date.getMinutes() + ':';
                    s = date.getSeconds();
                    $('#dataContent_05').html(_self.orderGoods.productName);
                    $('.transactionQuota').html(ll+_self.quota);
                    $('#dataContent_01').html(_self.payType);
                    $('#dataContent_02').html(_self.pmType==0?'付款':'收款');
                    $('#dataContent_03').html(Y+M+D+h+m+s);
                    $('#dataContent_04').html(_self.orderMallId);
                }
            }
        });

    },

})
/***********************我的账单详情end**********************/


/***********************消息通知详情start**********************/
Views.XXbillingDetailsAView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'XXbillingDetailsA',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        if(dataGet('notifyType')==3){
            $('.bdTop span').html('分佣明细');
            var url = WEB_URL + '/api/userCentCommission/selectOne';
            var id  = parseInt(dataGet('goInBilling'));
            var data={id:id};
            console.log(data)
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
                        var _self   = data.data;
                        console.log(_self);
                        // if(_self.payType ==0){
                        //     _self.payType = '微信支付'
                        // }else if(_self.payType ==1){
                        //     _self.payType = '支付宝支付'
                        // }else if(_self.payType ==2){
                        //     _self.payType = '银联支付'
                        // }else if(_self.payType ==3){
                        //     _self.payType = '余额支付'
                        // }else if(_self.payType ==4){
                        //     _self.payType = '余额金豆混合支付'
                        // }else if(_self.payType ==5){
                        //     _self.payType = '金豆支付'
                        // };
                        // var ll =_self.pmType==0?'-':'+'
                        // var date = new Date(_self.createTime);
                        // Y = date.getFullYear() + '-';
                        // M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        // D = date.getDate() + ' ';
                        // h = date.getHours() + ':';
                        // m = date.getMinutes() + ':';
                        // s = date.getSeconds();
                        // $('#dataContent_05').html(_self.orderGoods.productName);
                        // $('.transactionQuota').html(ll+_self.quota);
                        // $('#dataContent_01').html(_self.payType);
                        // $('#dataContent_02').html(_self.pmType==0?'付款':'收款');
                        // $('#dataContent_03').html(Y+M+D+h+m+s);
                        // $('#dataContent_04').html(_self.orderMallId);
                    }
                }
            });
        }else if(dataGet('notifyType')==13){
            $('.bdTop span').html('充值明细');
            var url = WEB_URL + '/api/orderMall/selectListAll';
            var data={pageNum:1,size:1,orderId:parseInt(dataGet('goInBilling'))};
            console.log(data)
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
                        var _self   = data.data.list[0];
                        console.log(_self);
                        if(_self.payMethod ==0){
                            _self.payMethod = '微信支付'
                        }else if(_self.payMethod ==1){
                            _self.payMethod = '支付宝支付'
                        }else if(_self.payMethod ==2){
                            _self.payMethod = '银联支付'
                        }else if(_self.payMethod ==3){
                            _self.payMethod = '余额支付'
                        }else if(_self.payMethod ==4){
                            _self.payMethod = '余额金豆混合支付'
                        }else if(_self.payMethod ==5){
                            _self.payMethod = '金豆支付'
                        };
                        // var ll =_self.pmType==0?'-':'+'
                        var date = new Date(_self.createTime);
                        Y = date.getFullYear() + '-';
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        D = date.getDate() + ' ';
                        h = date.getHours() + ':';
                        m = date.getMinutes() + ':';
                        s = date.getSeconds();
                        $('#dataContent_05').html('充值');
                        $('.transactionQuota').html('-'+_self.orderGoods[0].productPrice);
                        $('#dataContent_01').html(_self.payMethod);
                        $('#dataContent_02').html('付款');
                        $('#dataContent_03').html(Y+M+D+h+m+s);
                        $('#dataContent_04').html(_self.orderGoods[0].id);
                    }
                }
            });
        }


    },

})
/***********************消息通知详情end**********************/



/***********************我的钱包start**********************/
Views.myWalletView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myWallet',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
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
                    var _self = data.data;
                    console.log(_self);
                    var availableIncome     = _self.availableIncome; //用户余额
                    var frozenIncome        = _self.frozenIncome; //用户冻结余额
                    var totalIncome         = _self.totalIncome; //用户总收益
                    $('.mmNumber').html('￥'+(parseFloat(availableIncome)+parseFloat(frozenIncome)));
                    $('#ky').html('￥'+(availableIncome==null?0:availableIncome));
                    $('#dj').html('￥'+(frozenIncome==null?0:frozenIncome));
                }
            }
        });


    },

    goInWithdraw:function(){
        Views.withdrawView.show();
    },

    goInWantToRecharge:function(){
        Views.wantToRechargeView.show();
    },
    zd:function(){
        // Views.detailedView.show();
        Views.myBillView.show();
    }

})
/***********************我的钱包end**********************/

/***********************明细start**********************/
Views.detailedView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'detailed',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        var time1 = new Date().Format("yyyy-MM");
        var url         = WEB_URL + '/api/userCashFlow/selectList';
        var pageNum     =1;
        var pageSize    =31;
        var myDate      =new Date();
        var selectTime  =time1;
        var data        ={pageNum:pageNum,pageSize:pageSize,selectTime:selectTime};
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
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    var str     ='';
                    for (var i=0;i<_self.list.length;i++){
                        if(_self.list[i].pmType ==0){
                            _self.list[i].pmType = '-'
                        }else{
                            _self.list[i].pmType = '+'
                        }
                        if(_self.list[i].remark==null){
                            _self.list[i].remark = ''
                        }else{
                            _self.list[i].remark = _self.list[i].remark
                        }
                        var date = new Date(_self.list[i].createTime);
                        Y = date.getFullYear() + '-';
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        D = date.getDate() + ' ';
                        h = date.getHours() + ':';
                        m = date.getMinutes() + ':';
                        s = date.getSeconds();
                        str +='<div class="list">'
                                +'<div class="mode">'
                                +'<div class="modeName">'+_self.list[i].remark+'</div>'
                                +'<div class="dTime">'+Y+M+D+'</div>'
                                +'</div>'
                                +'<div class="amount">'
                                +'<div class="amountDetailed">'+_self.list[i].pmType+_self.list[i].quota+'</div>'
                                +'</div>'
                                +'</div>'
                    }
                    $('.detailed').html(str);
                }
            }
        });
    },

    dEdit:function(){
    if($('.detailedScreen').css('top')=='-66px'){
        $('.bgMask').show();
        $('.detailedScreen').stop().animate({
            top:'40px'
        });
        $('.detailedScreen').show();
    }else{
        $('.bgMask').hide();
        $('.detailedScreen').hide();
        $('.detailedScreen').stop().animate({
            top:'-66px'
        },10);
    }
}

})
/***********************明细end**********************/


/***********************提现start**********************/
Views.withdrawView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'withdraw',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var url = WEB_URL +'/api/userBank/selectOne';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: {},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    console.log(data);
                    if(data.data==null){
                        alert('请先设置您的银行卡');
                        Views.addBankCardView.show();
                    }else{
                        var _self = data.data;
                        $('.withdraw_card p').html(_self.bankName);
                        $('.withdraw_card span').html(_self.bankCode);
                        $('#asdd').html('您的卡号：'+_self.bankCode);
                        dataSave('BangIdsss',_self.id);
                    }

                }
            }
        });

        var urlTwo = WEB_URL +'/api/core/selectLoginUser';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwo,
            data: {},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    console.log(data);
                    $('#available').html(data.data.availableIncome);
                }
            }
        });

        $('#money').keyup(function() {
            var reg = /^[0-9]+.?[0-9]*$/;
            if (reg.test($(this).val())) {
                var money = parseFloat($(this).val());
                var available = parseFloat($('#available').html());
                if (money > available) {
                    $('#wPrompt').show();
                }else {
                    $('#wPrompt').hide();
                }
                return true;
            }else{
                alert('只能输入数字！');
                $(this).val('')
            }
            });

        $('#wWhole').click(function(){
            var available = $('#available').html();
            $('#money').val(available);
        });
    },

    goInSelectBankCard:function(){
        Views.selectBankCardView.show();
    },
    withdraw_btn:function(){
        var urlTwo = WEB_URL +'/api/userWithdrawal/add';
        var reg    =   /^[0-9]+.?[0-9]*$/;
        if(reg.test($('#money').val())){
            var data    ={userBankId:dataGet('BangIdsss'),amount:$('#money').val()};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:urlTwo,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success) {
                        alert(data.msg);
                    }else{
                        console.log(data);
                        alert('您的提现申请已经提交，休息一下！');
                        Views.myWalletView.show();
                    }
                }
            });
        }else{
            alert('金额请输入数字！');
            $('#money').val('')
        }

    }

})
/***********************提现end**********************/

/***********************银行卡选择start**********************/
Views.selectBankCardView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'selectBankCard',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var url = WEB_URL +'/api/userBank/selectList';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: {},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    console.log(data);
                    var _self = data.data;
                    var str   ='';
                    for(var i=0;i<_self.length;i++){
                        str +='<div class=" setBreadth selectBankCard" data-id="'+_self[i].id+'">'
                                +'<div class="select_icon warp_Lt"></div>'
                                +'<p>'+_self[i].bankName+'</p>'
                                +'<p>'+_self[i].bankCode+'</p>'
                                +'</div>'
                    }
                    $('.setAside').html(str);
                }
            }
        });

        $(document).on('click','.selectBankCard',function(){
            $(this).parent(".setAside").find(".selectBankCard").removeClass("addSelectBank");
            $(this).addClass("addSelectBank");
            var url = WEB_URL +'/api/userBank/updateStatus';
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify({id:$(this).data('id')}),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success) {
                        alert(data.msg);
                    }else{
                        console.log(data);
                    }
                }
            });
            Views.withdrawView.show();
        })
    },

    goInAddCard:function(){
        Views.addBankCardView.show();
    }

})
/***********************银行卡选择end**********************/

/***********************我要充值start**********************/
Views.wantToRechargeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'wantToRecharge',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
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
        $("#ccc .wantToRechargeChangeArea").click(function () {
            $("#ccc .wantToRechargeChangeArea").removeClass("selecteds");
            $(this).addClass("selecteds");
            $('#ccc').hide();
            $('.wantToRechargePay ').show();
            $('.wantToRechargePay .warp_Rg').html($(this).find('span').text());
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

    wrConfirm:function(){
        var wtrRecharge = $('#wtrRecharge').val();
        if(wtrRecharge.length <= 0){
            alert("请输入充值金额");
        }else{
            $(".wantToRecharge_shady").show();
            $(".wantToRecharge_payment").stop().slideToggle();
            $(".wantToRechargePay").show();
        }
    },
    withdraw_btn:function(){
        // $('#payFixed').show();
        $('.wantToRecharge_payment').hide();
        $('.wantToRecharge_shady').hide();

        var url         = WEB_URL + '/api/orderMall/addRole';
        var storeId     =1;
        var orderType   =4;
        var orderGoods  =[{productPrice:$('#wtrRecharge').val()}];
        var data        ={storeId:storeId,orderType:orderType,orderGoods:orderGoods};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    dataSave('payIdsss',data.data.id);
                    var url         = WEB_URL + '/api/orderMall/payment';
                    var payId       ='';
                    var payType     =0;
                    var orderMalls  =[{id:dataGet('payIdsss')}];
                    var data        ={payId:payId,payType:payType,orderMalls:orderMalls};

                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        data: JSON.stringify(data),
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(!data.success){
                                console.log(data.msg);
                            }else{
                                console.log(data);
                                dataSave('payIds',data.data.payId);
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

    },
    cencalss:function(){
        $('#payFixed').hide();
    },


})
/***********************我要充值end**********************/

/***********************我的金豆start**********************/
Views.myImazamoxView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myImazamox',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        // 用户头像 余额
        var url  = WEB_URL + "/api/core/selectLoginUser";
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
                    if (data.codeEnum == 'OVERTIME') {
                        Views.signInView.show();
                    }else{
                        alert(data.msg);
                    }

                }else{
                    var _self = data.data;
                    console.log(_self);
                    var headImgs             = _self.bfTicket; //bianfujuan
                    var headdouzi            = _self.integral; //douzi
                    $('#asdasdas').html(headImgs+'张');
                    $('#douzi').html(headdouzi+'颗');
                }
            }
        });

        var cradeLeave = dataGet('crade');//判断身份
        cradeLeave ==1?$('#shopRoleDist').show():$('#shopRoleDist').hide();
        $('.wantToRecharge_shady').click(function (){
            $(this).hide();
            $(".wantToRecharge_payment").slideUp();
            $(".wantToRechargeChange").slideUp();
        });
        $(".wantToRechargeChangeArea").eq(0).click(function () {
            $(".wantToRechargePay").hide();
            $(".wantToRechargeChange").show();
            $(".wantToRechargeHeader span").html("付款方式");
        });
        $("#sdasda .wantToRechargeChangeArea").click(function () {
            $("#sdasda .wantToRechargeChangeArea").removeClass("selecteds");
            $(this).addClass("selecteds");
            $('#sdasda').hide();
            $('.wantToRechargePay ').show();
            $('.wantToRechargePay .warp_Rg').html($(this).find('span').text());
        });
        $('#sdasda .wantToRechargeChangeArea').click(function(){
            $('#sdasda').hide();
            $('.wantToRechargePay').show();
        });

        $('.wantToRechargePay .bB').click(function(){
            $('#backs').hide();
            $('#backss').show();
        });
        $('#backs').click(function(){
            $('.wantToRecharge_shady').hide();
            $(".wantToRecharge_payment").slideUp();
            $(".wantToRechargeChange").slideUp();
        });
        $('#backss').click(function(){
            $('#backs').show();
            $('#backss').hide();
            $('.wantToRechargePay').show();
            $('.wantToRechargeChange').hide();
        });
        $('.miMask').click(function(){
            $('.wantToRecharge_payment').hide();
        });
    },

    //我的金豆
    shopRoleDistdddd:function(btn){
        var pLeave      =parseInt($(btn).attr('data-id'));//购买平台身份
        var url         = WEB_URL + '/api/orderMall/addRole';
        var storeId     = 1; //店铺id
        var orderType   = dataGet('crade')==1?7:9; //订单类型3业务充值 4余额充值 6店铺身份购买 7平台身份购买 8补货 9金豆充值
        var shopRoleDist={roleLevel:pLeave};
        var data        ={storeId:storeId,orderType:orderType,shopRoleDist:shopRoleDist};
        console.log(data);

        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    dataSave('payIdsss',data.data.id);
                    // $('#shopRoleDist').hide();
                    $('.wantToRecharge_shady').show();
                    $('.wantToRecharge_payment').show();
                }
            }
        });
    },
    shopRoleDistdddds:function(btn){
        var pLeave      =parseInt($(btn).attr('data-id'));//购买平台身份
        var url         = WEB_URL + '/api/orderMall/addRole';
        var storeId     = 1; //店铺id
        var orderType   = dataGet('crade')==1?7:9; //订单类型3业务充值 4余额充值 6店铺身份购买 7平台身份购买 8补货 9金豆充值
        var shopRoleDist={roleLevel:pLeave};
        var data        ={storeId:storeId,orderType:orderType,shopRoleDist:shopRoleDist};
        console.log(data);

        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    dataSave('payIdsss',data.data.id);
                    // $('#shopRoleDist').hide();
                    $('.wantToRecharge_shady').show();
                    $('.wantToRecharge_payment').show();
                }
            }
        });
    },
    zhuanzheng:function (){
        $('.miMask , .donation').show();
    },
    cancel:function (){
        $('.miMask , .donation').hide();
    },
    cancel_no:function (){
        $('.rechargeMode').stop().animate({
            bottom:'-195px'
        });
        $('.miMask').hide();
        $('.donation').hide();
    },
    handsel:function (){

        var miRecharge = $('#miRecharge').val();
        if(miRecharge.length <= 0){
            alert("请输入充值金额");
        }else if(parseInt(miRecharge)%50!==0){
            alert('请输入50的倍数')
        } else{
            $('.miMask').show();
            $('.wantToRecharge_payment').show();
            $('.rechargeMode').stop().animate({
                bottom:0
            });
            //金豆充值
            var url         = WEB_URL + '/api/orderMall/addRole';
            var storeId     = 1; //店铺id
            var orderType   = 13; //订单类型3业务充值 4余额充值 6店铺身份购买 7平台身份购买 8补货 9金豆充值
            var orderGoods  =[{productPrice:parseInt(miRecharge)}];
            var data        ={storeId:storeId,orderType:orderType,orderGoods:orderGoods};
            console.log(data)
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        console.log(data);
                        dataSave('payIdsss',data.data.id);
                        $('.wantToRecharge_shady').show();
                        $('.wantToRecharge_payment').show();
                    }
                }
            });
        }
    },
    // 兑换记录
    lookup:function(){
        Views.exchangeRecordView.show();
    },
    exchange:function(){
        Views.exchangeView.show();
    },
    yuE:function(){
        var url         = WEB_URL + '/api/orderMall/payment';
        var payId       ='';
        var payType     =3;
        var orderMalls  =[{id:dataGet('payIdsss')}];
        var data        ={payId:payId,payType:payType,orderMalls:orderMalls};

        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    dataSave('PayIdss',data.data.payId);

                    ////////////////////////////////////////////

                    var urlTwos = WEB_URL + '/api/coreMoney/balancePay' ;//支付
                    var tradeNo = dataGet('PayIdss');
                    var payPassword = '123456';
                    var data = {tradeNo:tradeNo,payPassword:payPassword};
                    console.log(data);
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:urlTwos,
                        data: JSON.stringify(data),
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(!data.success){
                                console.log(data.msg);
                            }else{
                                console.log(data);
                                alert('您已支付成功！');
                                $('.rechargeMode').stop().animate({
                                    bottom:'-195px'
                                });
                                $('.miMask').hide();
                                Views.indexMineView.show();
                            }
                        }
                    });
                }
            }
        });

    },
    payFor:function(){
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
                        if($('.wantToRechargePay .warp_Rg').text()=='余额支付'){
                            var url         = WEB_URL + '/api/orderMall/payment';
                            var payId       ='';
                            var payType     =3;
                            var orderMalls  =[{id:dataGet('payIdsss')}];
                            var data        ={payId:payId,payType:payType,orderMalls:orderMalls};

                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:url,
                                data: JSON.stringify(data),
                                contentType:'application/json;charset=utf-8',
                                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                success:function(data){
                                    if(!data.success){
                                        console.log(data.msg);
                                    }else{
                                        console.log(data);
                                        dataSave('PayIdss',data.data.payId);
                                        $('#payFixed').show();
                                    }
                                }
                            });
                        }else{
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

                                            var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
                                            var payId  ='';
                                            var payType = 3;
                                            var id = dataGet('payIdsss');//id
                                            var orderMalls = [{id:id}];
                                            var data = {payId:payId,payType:payType,orderMalls:orderMalls};
                                            $.ajax({
                                                type:'POST',
                                                dataType:'json',
                                                url:urlTwos,
                                                data: JSON.stringify(data),
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
                                }
                            });
                        }
                    }
                }
            }
        });


    },
    paySuccessad:function(){

        var urlTwos = WEB_URL + '/api/coreMoney/balancePay' ;//支付
        var tradeNo = dataGet('PayIdss');
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
                    alert(data.msg);
                    $('.wantToRecharge_shady').hide();
                    $('.wantToRecharge_payment').hide();
                }else{
                    console.log(data);
                    alert('您已支付成功！');
                    $('.wantToRecharge_shady').hide();
                    $('.wantToRecharge_payment').hide();
                    Views.indexMineView.show();
                    $('#payFixed').hide();
                }
            }
        });

    },
    cencalss:function(){
        $('.wantToRecharge_shady').hide();
        $('.wantToRecharge_payment').hide();
        $('#payFixed').hide();
        $('#payFixedyz').hide();
        $('.miMask').hide();
    },
    // 转赠
    paySuccessadyz:function(){
        var url         = WEB_URL +'/api/coreUser/donation';
        var account     = dataGet('accountA');
        var number      = dataGet('numberA');
        var payPassword = parseInt($('#passwordsyz').val());
        var data    ={account:account,number:number,payPassword:payPassword};
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
                        alert(data.msg);
                    $('#payFixedyz').hide();
                    $('.miMask').hide();
                }else{
                    var _self = data.data;
                    console.log(_self);
                    alert('转赠成功!');
                    $('.donation').hide();
                    $('.miMask').hide();
                }
            }
        });
    },
    confirm:function(){
        dataSave('accountA',parseInt($('#donationIn_01').val()))//号码
        dataSave('numberA',parseInt($('#donationIn_02').val()))//数量
        $('#payFixedyz').show();
        $('.donation').hide();
    },
    shopRoleDist:function(e){
        $('#shopRoleDist').hide();
    },
    returns:function(){
        Views.indexMineView.show();
    }
})
/***********************我的金豆end**********************/

/***********************兑换金豆start**********************/
Views.exchangeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'exchange',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },
    exBoxs:function(){
        var url     = WEB_URL + '/api/coreUser/exchange/beans';
        var data    ={number:$('#exBox').val()}
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    alert(data.msg);
                }else{
                    console.log(data);
                    alert('兑换成功！');
                    Views.myImazamoxView.show();
                }
            }
        });
    }
})
/***********************兑换金豆end**********************/

/***********************购物车start**********************/
Views.shoppingCartView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'shoppingCart',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var url     = WEB_URL + '/api/shopCart/select/list';
        var pageNum =1;
        var size    =30;
        var data    ={pageNum:pageNum,size:size};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    alert(data.msg);
                }else{
                    console.log(data);
                    if(data.data.list.length==''){
                        $('#shoppingCart_wareArea').html('<p style="width:100%;text-align: center;"><img src="images/null.png" alt=""><p style="text-align: center;">您的购物车空空如也！</p></p>');
                    }else{
                        var _self = data.data.list[0];
                        console.log(data.data)
                        var str   ='';
                        var _length =   data.data.list;
                        for (var i=0;i<_length.length;i++){
                            console.log(_length[i])
                            var PPPP    = _length[i].cartList[0].goodsSpecs.specData;
                            var key     =eval('('+PPPP+')')[0].key;
                            var values  =eval('('+PPPP+')')[0].value;
                            var PPPPstr =   key+':'+values;
                            dataSave('PPPPstr',PPPPstr);
                            str +='<div class="shoppingCart_wareArea" data-goodsIds="'+_length[i].cartList[0].goodsId+'">'
                                +'<div class="shoppingCart_wareStore">'
                                +'<div class="choose ui_btn" data-action="choose"></div>'
                                +'<span class="warp_Lt">'+_length[i].store.name+'</span>'
                                +'<div class="quiet"></div>'
                                +' <span class="warp_Rg edit ui_btn" data-action="bianji">编辑</span> '
                                +'</div>'
                                // +'<div class="shoppingCart_wareDetails">'
                                +'<div class="shoppingCart_wareDetails" data-carId="'+_length[i].cartList[0].id+'"  data-carSpecId="'+_length[i].cartList[0].specId+'" data-goodsId="'+_length[i].cartList[0].goodsId+'">'
                                +'<div class="shoppingCart_wareDetailTxt" data-action="joinDps" data-dpid="'+_length[i].store.id+'">'
                                +'<div class="print"><img src="'+_length[i].cartList[0].goods.carouselPicture+'" alt=""></div>'
                                +'<div class="shoppingCart_wareTxt">'
                                +'<span class="warp_lC">'+_length[i].cartList[0].goods.name+'</span>'
                                +'<span style="color: #cccccc;" id="sp_sort">商品分类：'+_length[i].cartList[0].goods.goodsDesc+'</span>'
                                +'<div class="shoppingCart_price">'
                                +'<span class="warp_Lt" style="margin-top: 2px;margin-right: 10px">￥</span>'
                                +'<span style="font-size:1.25rem;" class="warp_Lt dsasdasd">'+_length[i].cartList[0].goods.price+'</span>'
                                +'<span class="warp_Rg" style="color: #000">×<span class="productNumber">'+_length[i].cartList[0].goodsCount+'</span></span>'
                                +'</div>'
                                +'</div>'
                                +'<div class="shoppingCart_wareEditArea">'
                                +'<div class="shoppingCart_wareContent warp_Lt">'
                                +'<div class="shoppingCart_digitalAddition">'
                                +'<div class="minus warp_Lt ui_btn" data-action="minus"></div>'
                                +'<div class="number" id="numbersssss">'+_length[i].cartList[0].goodsCount+'</div>'
                                +'<div class="plus warp_Rg ui_btn" data-action="plus"></div>'
                                +'</div>'
                                +'<div class="shoppingCart_digitalAddition lib ui_btn" data-action="shoppingCart_digitalAddition" style="border:0;"> <span style="color: #cccccc" id="numHtml">'+PPPPstr+'</span> <div class="down warp_Rg"></div> </div>'
                                +'</div>'
                                +'<div class="shoppingCart_wareDel warp_Rg ui_btn" data-action="del"><span>删除</span></div>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                        }
                        $('#shoppingCart_wareArea').html(str);
                        var ParseIce=0;
                        var Numss=0;
                        $('#shoppingCart_wareArea .shoppingCart_wareArea').each(function(){
                            var numB    = parseFloat($(this).find('.dsasdasd').text());
                            var parice  = parseFloat($(this).find('.productNumber').text());
                            ParseIce +=numB*parice;
                            Numss    +=parice;
                        })
                        $('#parices').html('￥'+0);
                        $('#wholeNumber').html('￥'+0);
                        $('#card_num').html(_length.length==0?0:_length.length);
                    }

                }
            }
        });
//        编辑模块
        $('.shoppingCart_wareEditArea .shoppingCart_wareContent .shoppingCart_digitalAddition .number').html($('.productNumber').html());
        $(document).on('click', '.area', function () {
            $(this).parent().parent(".shoppingCart_qualityArea").find(".area").removeClass("pitchOn");
            $(this).addClass("pitchOn");
        });
        $(document).on('click', '.shoppingCart_check', function () {
            $(".shoppingCart_properties").hide();
            $(".shoppingCart_black").hide();
            $(".shoppingCart_check").hide()
        });
        $(document).on('click', '.shoppingCart_black', function () {
            $(".shoppingCart_properties").hide();
            $(".shoppingCart_black").hide();
            $(".shoppingCart_check").hide()
        });
        $(document).on('touchstart', '.area', function () {
            if ($(this).is('.unchecked')) {
                return;
            }
            $(this).parent().parent(".shoppingCart_qualityArea").find(".area").removeClass("pitchOn");
            $(this).addClass("pitchOn");
            dataSave('areaUuid', $(this).attr('data-uuid'));
            dataSave('areaHtml', $(this).text());
            dataSave('sssssssss', 1);

        });
        count();
        function count(){
            var index = $('.shoppingCart_wareArea').length;
            var headTxt = $('.mine_top span:nth-child(2)').text();
            var headName=headTxt + "("+index+")";
            $('.mine_top  span:nth-child(2)').text(headName);
        };

    },
    symbolMin:function(){
        var s =dataGet('areaNum');
        s--;
        if(s<=1){s=1};
        $('.num').html(s);
        dataSave('areaNum', s);
    },
    symbolMax:function(){
        var s =dataGet('areaNum');
        s++;
        $('.num').html(s);
        dataSave('areaNum', s);
    },
    shoppingCart_count:function(){
        if($('#wholeNumber').html()=='￥0'){
            alert('请选择需要结算的商品');
        }else{
            dataSave('countId',2);
            var arr     =[];
            $('.shoppingCart_wareArea .shoppingCart_wareDetails').each(function(i,o){
                arr.push({specId:$(this).data('carspecid'),quantity:parseInt($(this).find('.productNumber').text())})
            });
            console.log(arr)
            dataSave('arr',JSON.stringify(arr));
            var url         = WEB_URL   +'/api/orderMall/selectOfConfirm'
            var orderType   =   5;
            var orderGoods  =   arr;
            var data        ={orderType:orderType,orderGoods:orderGoods};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        console.log(data);
                        Views.successOrderView.show();
                    }
                }
            });
        }
    },
    del:function(btn){
        $('#card_num').html(parseInt($('#card_num').html())-1)
        var url =   WEB_URL + '/api/shopCart/delete/one';
        var id  =   $(btn).parent().parent().parent('.shoppingCart_wareDetails').data('carid');
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify({id:id}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    alert(data.msg);
                }else{
                    console.log(data);
                    $(btn).parent().parent().parent().parent(".shoppingCart_wareArea").remove();
                    $('#parices').html('￥'+0);
                    var url     = WEB_URL + '/api/shopCart/select/list';
                    var pageNum =1;
                    var size    =30;
                    var data    ={pageNum:pageNum,size:size};
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        data: JSON.stringify(data),
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(!data.success){
                                alert(data.msg);
                            }else{
                                console.log(data);
                                var url     = WEB_URL + '/api/shopCart/select/list';
                                var pageNum =1;
                                var size    =30;
                                var data    ={pageNum:pageNum,size:size};
                                $.ajax({
                                    type:'POST',
                                    dataType:'json',
                                    url:url,
                                    data: JSON.stringify(data),
                                    contentType:'application/json;charset=utf-8',
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                    success:function(data){
                                        if(!data.success){
                                            alert(data.msg);
                                        }else{
                                            console.log(data);
                                            if(data.data.list.length==''){
                                                $('#shoppingCart_wareArea').html('<p style="width:100%;text-align: center;"><img src="images/null.png" alt=""><p style="text-align: center;">您的购物车空空如也！</p></p>');
                                            }else{
                                                var _self = data.data.list[0];
                                                console.log(data.data)
                                                var str   ='';
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
    },
    wholeEdit:function(btn){
        if($(btn).is('.ok')){
            $('.shoppingCart_wareTxt').show();
            $('.shoppingCart_wareEditArea').hide();
            $(btn).html("编辑");
            $(btn).removeClass('ok');
            // $(".edit").show();
        }else{
            $('.shoppingCart_wareTxt').hide();
            $('.shoppingCart_wareEditArea').show();
            $(btn).html("完成");
            $(btn).addClass('ok');
            // $(".edit").hide();
        }
    },
    checkAll:function(btn){
        var ParseIce=0;
        var Numss=0;
        if ($(btn).hasClass("selecteds")) {
            $('.mine_warp .shoppingCart_wareArea .shoppingCart_wareStore .choose').removeClass("selecteds");
            $(btn).removeClass("selecteds");
            $('#parices').html('￥'+0);
            $('#wholeNumber').html('￥'+0);
        } else {
            var url     = WEB_URL + '/api/shopCart/select/list';
            var pageNum =1;
            var size    =30;
            var data    ={pageNum:pageNum,size:size};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        alert(data.msg);
                    }else{
                        console.log(data);
                        if(data.data.list.length==''){
                            $('#shoppingCart_wareArea').html('<p style="width:100%;text-align: center;"><img src="images/null.png" alt=""><p style="text-align: center;">您的购物车空空如也！</p></p>');
                        }else{
                            var _self = data.data.list[0];
                            console.log(data.data)
                            var str   ='';
                            $('#shoppingCart_wareArea .shoppingCart_wareArea').each(function(){
                                console.log($(this));
                                var numB    = parseFloat($(this).find('.dsasdasd').text());
                                var parice  = parseFloat($(this).find('.productNumber').text());
                                s =numB*parice;
                            })
                            console.log($('.shoppingCart_wareArea'));
                            $('#parices').html('￥'+s);
                            $('#wholeNumber').html('￥'+s);
                        }

                    }
                }
            });
            $(".checkAll").addClass("selecteds");
            $(".shoppingCart_wareStore .choose").addClass("selecteds");

        }
    },
    choose:function(btn){
        if($(btn).hasClass("selecteds")) {
            $(btn).removeClass("selecteds");
            var price = parseFloat($(btn).parent().siblings().find('.dsasdasd').text());
            var num   =parseInt($(btn).parent().siblings().find('.productNumber').text());
            money =price*num;
            s   -=money;
            $('#parices').html('￥'+s);
            $('#wholeNumber').html('￥'+s);
        }else {
            $(btn).addClass("selecteds");
            var price = parseFloat($(btn).parent().siblings().find('.dsasdasd').text());
            var num   =parseInt($(btn).parent().siblings().find('.productNumber').text());
            money =price*num;
            s   =money;
            $('#parices').html('￥'+s);
            $('#wholeNumber').html('￥'+s);
        }
    },
    minus:function(btn){
        var num = $(btn).parent().find(".number").html(); //获取数量值
        var reveal = parseFloat(num) - 1; //数量减一
        if (reveal == 0) {
            reveal = 1;
        }
        $(btn).parent().find(".number").html(reveal); //显示数量
        $(btn).parent().parent().parent('.shoppingCart_wareEditArea').siblings('.shoppingCart_wareTxt').find('.productNumber').html(reveal);
        var parice=0;
        $('#shoppingCart_wareArea .shoppingCart_wareArea').each(function(){
            var numB    = parseFloat($(this).find('.dsasdasd').text());
            parice  = parseFloat($(this).find('.dsasdasd').text());
            s =numB*parice;
        })
        if ($('.checkAll').hasClass("selecteds")) {
            $('#parices').html('￥'+reveal*parice);
        }
    },
    plus:function(btn){
        var num = $(btn).parent().find(".number").html(); //获取数量值
        var reveal = parseFloat(num) + 1; //数量加一
        $(btn).parent().find(".number").html(reveal); //显示数量
        $(btn).parent().parent().parent('.shoppingCart_wareEditArea').siblings('.shoppingCart_wareTxt').find('.productNumber').html(reveal);
        var parice=0;
        $('#shoppingCart_wareArea .shoppingCart_wareArea').each(function(){
            var numB    = parseFloat($(this).find('.dsasdasd').text());
            parice  = parseFloat($(this).find('.dsasdasd').text());
            s =numB*parice;
        })
        if ($('.checkAll').hasClass("selecteds")) {
            $('#parices').html('￥'+reveal*parice);
        }
    },
    shoppingCart_digitalAddition:function(btn){
        dataSave('areaNum',1);
        $('.shoppingCart_black').show();
        $('.shoppingCart_properties').show();
        $('.shoppingCart_check').show();
        var urlTwo = WEB_URL + '/api/goods/selectOne' ;//根据id 获取商品
        var commodityUuid = parseInt($(btn).parent().parent().parent().parent().attr('data-goodsid'));
        var datas   = {id:commodityUuid};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwo,
            data: JSON.stringify(datas),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    var _thisData           = data.data;
                    console.log(_thisData);
                    $('.arrange').html(_thisData.name);
                    $('#asdasd').html('库存：'+_thisData.goodsSpecs[0].storage+'件');
                    var bannerImg           = _thisData.carouselPicture==null?'':_thisData.carouselPicture.split(','); //商品详情轮播图
                    var commodityName       = _thisData.name;//商品名称
                    var commodityPrice      = _thisData.price;//商品单价
                    var commodityGoodsTags  =_thisData.goodsTags;//正品保障
                    var commodityGoodsSpecs =_thisData.goodsSpecs;//产品颜色等参数
                    var storeId             =_thisData.storeId;//店铺ID
                    dataSave('storeId', storeId);
                    _thisData.coreCollection!=null?$('#collection').addClass('coll').css({backgroundImage:'url(images/commodityDetails/collection.png)',color:'#e60012'}):$('#collection').removeClass('coll').css({backgroundImage:'url(images/commodityDetails/collection_hide.png)',color:'#ccc'});

                    if(_thisData.coreCollection!=null){
                        dataSave('collectionIds',_thisData.coreCollection.id);
                    }else{

                    }
                    //商品详情轮播图赋值
                    var strBanner = '';
                    for(var i=0;i<bannerImg.length;i++){
                        strBanner +='<div class="swiper-slide ui_btn">'
                            +'<img src="'+bannerImg[i]+'" alt="" style="min-height: 300px;">'
                            +'</div>'
                    }
                    $('#bannerImg').html(strBanner);
                    var swiper1 = new Swiper('.swiper1', {
                        loop: true,
                        autoplay: 3000,

                    });

                    //商品名称赋值
                    $('.productName .name').html(commodityName);

                    //商品名称赋值
                    $('.price').html('<span>￥</span>'+commodityPrice);

                    //正品保障赋值
                    var strGoodsTags = '';
                    for (var j=0;j<commodityGoodsTags.length-2;j++){
                        strGoodsTags += '<div class="cdItem fL">'
                            +'<div class="flag fL"></div>'
                            +'<div class="cdTitle fL">'+commodityGoodsTags[i].name+'</div>'
                            +'</div>'
                    }
                    $('.discount').html(strGoodsTags);
                    // 正品保障弹框赋值
                    var strGoodsTagsFixed = '';
                    for (var j=0;j<commodityGoodsTags.length;j++){
                        strGoodsTagsFixed += '<div class="shoppingCart_properties_list"><span><img src="images/commodityDetails/choice.png" alt=""></span>'+commodityGoodsTags[j].name+'</div>'
                    }
                    $('#shoppingCart_properties_list').html(strGoodsTagsFixed);

                    // 颜色尺码等赋值
                    var strGoodsSpecs = '';
                    var keyArray=new Array();
                    for (var k=0;k<commodityGoodsSpecs.length;k++){
                        var _name =eval('(' + commodityGoodsSpecs[k].specData + ')');
                        // console.log(commodityGoodsSpecs[k].id);
                        for(var p in _name){
                            keyArray.push(_name[p].key);
                        }
                    }
                    keyArray =removeDuplicatedItem(keyArray);
                    for(var o in keyArray){
                        strGoodsSpecs += '<div class="shoppingCart_qualityArea">'
                            +'<div class="shoppingCart_qualityTop">'+keyArray[o]+'</div>';
                        for (var k=0;k<commodityGoodsSpecs.length;k++){
                            var _name =eval('(' + commodityGoodsSpecs[k].specData + ')');
                            for(var p in _name){
                                if(keyArray[o]==_name[p].key){
                                    strGoodsSpecs += '<div class="shoppingCart_qualityBtn">'
                                        +'<div class="area" data-uuid="'+commodityGoodsSpecs[k].id+'">' +_name[p].value +'</div>'
                                        +'</div>';
                                }
                            }
                        }
                        strGoodsSpecs +='</div>';



                    }
                    $('.shoppingCart_quality').html(strGoodsSpecs);
                    var saddddd = '';
                    saddddd = ' <div class="shoppingCart_check ui_btn" data-id="'+commodityUuid+'" style="left:0;display: block;" data-action="shoppingCart_checks">确定</div>'
                    $('.shoppingCart_quality .shoppingCart_qualityArea').eq(1).find('.shoppingCart_qualityBtn').eq(1).css('display','none')
                    $('#asdjiowqe').append(saddddd)
                }
            }
        });
    },
    shoppingCart_checks:function(btn){
        $('#numHtml').html(dataGet('PPPPstr'));
        $('.productNumber').html(dataGet('areaNum'));
        $('#numbersssss').html(dataGet('areaNum'));
        $(".shoppingCart_properties").hide();
        $(".shoppingCart_black").hide();
        $(".shoppingCart_check").hide();
        var parice=0;
        $('#shoppingCart_wareArea .shoppingCart_wareArea').each(function(){
            var numB    = parseFloat($(this).find('.dsasdasd').text());
            parice  = parseFloat($(this).find('.dsasdasd').text());
            s =numB*parice;
        });
        if ($('.checkAll').hasClass("selecteds")) {
            $('#parices').html('￥'+parseInt(dataGet('areaNum'))*parice);
        }
    },
    bianji:function(btn){
        if($(btn).html()=="编辑") {
            $(btn).parent().parent(".shoppingCart_wareArea").find(".shoppingCart_wareTxt").hide();
            $(btn).html("完成");
            $(btn).parent().parent(".shoppingCart_wareArea").find(".shoppingCart_wareEditArea").show();
        }else {
            $(".shoppingCart_wareEditArea").hide();
            $(btn).html("编辑");
            $(".shoppingCart_wareTxt").show();

            var url         = WEB_URL + '/api/shopCart/update';
            var id          =$(btn).parent().siblings().data('carid');
            var goodsId     =$(btn).parent().siblings().data('goodsid');
            var goodsCount  =parseInt($(btn).parent().siblings().find('#numbersssss').text());
            var specId      =$(btn).parent().siblings().data('carspecid');
            var data        ={id:id,goodsId:goodsId,goodsCount:goodsCount,specId:specId};
            console.log(data)
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        alert(data.msg);
                    }else{
                        console.log(data);
                    }
                }
            });
        }
    },
})
var s=0;
/***********************购物车end**********************/

/***********************我的定单start**********************/
Views.myOrderView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myOrder',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {


        var urlOne      = WEB_URL + '/api/orderMall/selectListAll';
        var pageNum     =1;
        var size        =50;
        var orderStatus =parseInt(dataGet('page'));
        var coreUserId  =dataGet('user_id');//非创客商必填
        var dataOne        ={pageNum:pageNum,size:size,orderStatus:orderStatus,coreUserId:coreUserId};
        if(orderStatus == ''){
            $(".odd").remove()
            $('.myOrder_selectArea .myOrderOdd').removeClass('selectArea');
            $('.myOrder_selectArea .myOrderOdd').eq(0).addClass('selectArea').append("<div class='odd'></div>");
        }else if(orderStatus == 1){
            $(".odd").remove()
            $('.myOrder_selectArea .myOrderOdd').removeClass('selectArea');
            $('.myOrder_selectArea .myOrderOdd').eq(1).addClass('selectArea').append("<div class='odd'></div>");
        }else if(orderStatus == 2){
            $(".odd").remove()
            $('.myOrder_selectArea .myOrderOdd').removeClass('selectArea');
            $('.myOrder_selectArea .myOrderOdd').eq(2).addClass('selectArea').append("<div class='odd'></div>");
        }else if(orderStatus == 5){
            $(".odd").remove()
            $('.myOrder_selectArea .myOrderOdd').removeClass('selectArea');
            $('.myOrder_selectArea .myOrderOdd').eq(3).addClass('selectArea').append("<div class='odd'></div>");
        }else if(orderStatus == 6){
            $(".odd").remove()
            $('.myOrder_selectArea .myOrderOdd').removeClass('selectArea');
            $('.myOrder_selectArea .myOrderOdd').eq(4).addClass('selectArea').append("<div class='odd'></div>");
        }

        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlOne,
            data: JSON.stringify(dataOne),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    alert(data.msg);
                }else{
                    console.log(data);
                    var _self   = data.data.list;
                    var str     ='';
                    if(_self==null || _self.length==0){
                        $('.myOrder').html('<img src="images/null.png" style="position: relative;left: 50%;transform: translateX(-50%);">');
                    }else{
                        for(var i=0;i<_self.length;i++){
                            var stast ='';
                            if(_self[i].store.name==null){
                                _self[i].store.name = '该店铺暂无名称'
                            }else{
                                _self[i].store.name = _self[i].store.name;
                            };
                            if (_self[i].orderGoods[0].orderStatus == 1){
                                _self[i].orderGoods[0].orderStatus = '待付款'
                                if(_self[i].orderGoods[0].isVirtual ==1){
                                    stast =  '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionfk">付款</div>'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionNullM" data-mobile="'+_self[i].store.id+'">联系卖家</div>'
                                        +'</div>'
                                }else{
                                    stast =  '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionfk">付款</div>'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="backOrder" data-orders="'+_self[i].id+'">取消订单</div>'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionNullM" data-mobile="'+_self[i].store.id+'">联系卖家</div>'
                                        +'</div>'
                                }

                            }else if (_self[i].orderGoods[0].orderStatus == 2){
                                _self[i].orderGoods[0].orderStatus = '待发货'
                                if(_self[i].orderGoods[0].isVirtual ==1){
                                    stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionNullM" data-mobile="'+_self[i].store.id+'">联系卖家</div>'
                                        + '</div>'
                                }else{
                                    stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="backOrder" data-orders="'+_self[i].id+'">取消订单</div>'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionNullM" data-mobile="'+_self[i].store.id+'">联系卖家</div>'
                                        + '</div>'
                                }

                            }else if (_self[i].orderGoods[0].orderStatus == 3){
                                _self[i].orderGoods[0].orderStatus = '支付失败'
                            }else if (_self[i].orderGoods[0].orderStatus == 4){
                                _self[i].orderGoods[0].orderStatus = '订单取消'
                                stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                    + '<div class="settlementBtn warp_Rg" data-action="functionNull">已取消</div>'
                                    + '</div>'
                            }else if (_self[i].orderGoods[0].orderStatus == 5){
                                _self[i].orderGoods[0].orderStatus = '待收货'
                                stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-picture="'+_self[i].orderGoods[0].picture+'" data-expressName="'+_self[i].orderGoods[0].expressName+'"  data-expressCode="'+_self[i].orderGoods[0].expressCode+'" data-expno="'+_self[i].orderGoods[0].expno+'" data-action="logistics">查看物流</div>'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-action="qrsh" data-id="'+_self[i].orderGoods[0].id+'">确认收货</div>'
                                    + '</div>'
                            }else if (_self[i].orderGoods[0].orderStatus == 6){
                                _self[i].orderGoods[0].orderStatus = '已收货(未评价)'
                                stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-picture="'+_self[i].orderGoods[0].picture+'" data-expressName="'+_self[i].orderGoods[0].expressName+'"  data-expressCode="'+_self[i].orderGoods[0].expressCode+'" data-expno="'+_self[i].orderGoods[0].expno+'" data-action="logistics">查看物流</div>'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-action="pingjia" data-ordersgoodsid="'+_self[i].orderGoods[0].id+'" data-goodsid="'+_self[i].orderGoods[0].productId+'" data-orderid="'+_self[i].id+'">评价</div>'
                                    + '</div>'
                            }else if (_self[i].orderGoods[0].orderStatus == 7){
                                _self[i].orderGoods[0].orderStatus = '已收货(已评价)'
                                stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-picture="'+_self[i].orderGoods[0].picture+'" data-expressName="'+_self[i].orderGoods[0].expressName+'"  data-expressCode="'+_self[i].orderGoods[0].expressCode+'" data-expno="'+_self[i].orderGoods[0].expno+'" data-action="logistics">查看物流</div>'
                                    + '</div>'
                            }else if (_self[i].orderGoods[0].orderStatus == 8){
                                _self[i].orderGoods[0].orderStatus = '交易完成'
                                stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                    + '<div class="settlementBtn warp_Rg">待评价</div>'
                                    + '</div>'
                            }else if (_self[i].orderGoods[0].orderStatus == 9){
                                _self[i].orderGoods[0].orderStatus = '售后处理'
                            }else {
                                _self[i].orderGoods[0].orderStatus = '以删除'
                            };
                            var PPPP    = _self[i].orderGoods[0].attrName;
                            var PPPPstr ='';
                            if(_self[i].orderType==5){
                                var key     =eval('('+PPPP+')')[0].key;
                                var values  =eval('('+PPPP+')')[0].value;
                                PPPPstr =   key+':'+values
                            }else if(_self[i].orderType == 7){
                                PPPPstr =  PPPP==2?'创客':'创客商'
                            }else if(_self[i].orderType == 3){
                                PPPPstr ='手机充值：'+PPPP
                            }
                            if(_self[i].tradeNo = null){
                                _self[i].tradeNo=''
                            }else{
                                _self[i].tradeNo = _self[i].tradeNo
                            }
                            if(_self[i].orderGoods[0].picture == '' || _self[i].orderGoods[0].picture == null){
                                _self[i].orderGoods[0].picture = 'http://121.43.178.109:8080/ser/ATTACHMENT/ATTACHMENT/cf9df8a9-4d4d-405b-9765-03891c8e79a9.png'
                            }else{
                                _self[i].orderGoods[0].picture = _self[i].orderGoods[0].picture
                            }
                            str +='<div class="shoppingCart_wareArea"  data-order="'+_self[i].id+'" data-tradeno="'+_self[i].tradeNo+'">'
                                // <!--头部店铺选择-->
                                +'<div class="shoppingCart_wareStore">'
                                +'<div class="shop"></div>'
                                +'<span class="warp_Lt">'+_self[i].store.name+'</span>'
                                +'<div class="quiet"></div>'
                                +'<span class="warp_Rg myOrder_reveal" >'+_self[i].orderGoods[0].orderStatus+'</span>'
                                +'</div>'
                                // <!--商品属性展示区-->
                                +'<div class="shoppingCart_wareDetails ui_btn" data-action="shoppingCart_Detail" data-order="'+_self[i].id+'" style="height: 105px">'
                                +'<div class="shoppingCart_wareDetailTxt">'
                                +'<div class="print"><img src="'+_self[i].orderGoods[0].picture+'"></div>'
                                +'<div class="shoppingCart_wareTxt">'
                                +'<div class="myOrder_revealArea warp_Lt">'
                                +'<span class="warp_lC" style="height: 35px;margin-bottom: 5px;">'+_self[i].orderGoods[0].productName+'</span>'
                                +'<span style="color: #cccccc;display: block">'+PPPPstr+'</span>'
                                +'<div class="myOrder_quality">七天包退</div>'
                                +'</div>'
                                +'<div class="myOrder_reverlAreaL warp_Rg">'
                                +'<span style="color:#E60012">￥'+_self[i].orderGoods[0].productPrice+'</span>'
                                +'<span style="text-decoration:line-through;display: block;">￥'+(parseInt(_self[i].orderGoods[0].productPrice)-1)+'</span>'
                                +'<br/><br/>'
                                +'<span>X'+_self[i].orderGoods[0].quantity+'</span>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                                // // <!--结算区-->
                                +'<div class="myOrder_settlementArea breadth bB">共'+_self[i].orderGoods[0].quantity+'件商品 合计：<span style="font-size:.9875rem">¥ '+_self[i].orderGoods[0].quantity*_self[i].orderGoods[0].productPrice+'</span>(含运费¥0.00)</div>'
                                +stast
                                +'</div>'
                        }
                        $('.myOrder').html(str);

                    }

                }
            }
        });

        $(document).ready(function(){
            $(".settlementBtn").click(function(){
                $(this).parent(".myOrder_settlementArea").find(".settlementBtn").removeClass("changeBtn");
                $(this).addClass("changeBtn")
            });

            $(".choose").click(function(){
                if($(this).hasClass("selected")) {
                    $(this).removeClass("selected");
                }else {
                    $(this).addClass("selected");
                }
            });
            $("#myOrder").click(function(){
                $(".myOrder").show();
                $(".pendingPayment ").hide();
                $(".toBeShippedDetails ").hide();
                $(".pendingReceipt ").hide();
                $(".toBeEvaluated").hide();
            });

            // $(document).on('click','.myOrderOdd',function(){
            //     $(".odd").remove();
            //     $(this).parent(".myOrder_selectArea").find(".myOrderOdd").removeClass("selectArea");
            //     $(this).append("<div class='odd'></div>");
            //     $(this).addClass("selectArea");
            //     dataSave('order',$(this).data('order'));
            // });



        });
        $('#cencal').click(function(){
            $('.BackOrder').hide();
        })
        $('.wantToRecharge_shady').click(function (){
            $(this).hide();
            $(".wantToRecharge_payment").slideUp();
            $(".wantToRechargeChange").slideUp();
        });
        $(".wantToRechargeChangeArea").eq(0).click(function () {
            $(".wantToRechargePay").hide();
            $(".wantToRechargeChange").show();
            $(".wantToRechargeHeader span").html("付款方式");
        });
        $("#sdasda .wantToRechargeChangeArea").click(function () {
            $("#sdasda .wantToRechargeChangeArea").removeClass("selecteds");
            $(this).addClass("selecteds");
            $('#sdasda').hide();
            $('.wantToRechargePay ').show();
            $('.wantToRechargePay .warp_Rg').html($(this).find('span').text());
        });
        $('#sdasda .wantToRechargeChangeArea').click(function(){
            $('#sdasda').hide();
            $('.wantToRechargePay').show();
        });

        $('.wantToRechargePay .bB').click(function(){
            $('#backs').hide();
            $('#backss').show();
        });
        $('#backs').click(function(){
            $('.wantToRecharge_shady').hide();
            $(".wantToRecharge_payment").slideUp();
            $(".wantToRechargeChange").slideUp();
        });
        $('#backss').click(function(){
            $('#backs').show();
            $('#backss').hide();
            $('.wantToRechargePay').show();
            $('.wantToRechargeChange').hide();
        });
    },

    back:function(){
        dataSave('page','');
        Views.indexMineView.show();
    },
    //查看物流
    logistics:function(btn){
        dataSave('expno',$(btn).attr('data-expno'));//快递单号
        dataSave('expressCode',$(btn).attr('data-expressCode'));//快递单号
        dataSave('expressName',$(btn).attr('data-expressName'));//快递单号
        dataSave('picture',$(btn).attr('data-picture'));//快递单号
        Views.viewLogisticsView.show();
    },
    orderNum:function(btn){
        $(".odd").remove();
        $(btn).parent(".myOrder_selectArea").find(".myOrderOdd").removeClass("selectArea");
        $(btn).append("<div class='odd'></div>");
        $(btn).addClass("selectArea");
        dataSave('page',$(btn).attr('data-order'));
        var orders = $(btn).attr('data-order');
        var urlOne      = WEB_URL + '/api/orderMall/selectListAll';
        var pageNum     =1;
        var size        =50;
        var orderStatus =orders;
        var coreUserId  =dataGet('user_id');//非创客商必填
        var dataOne        ={pageNum:pageNum,size:size,orderStatus:orderStatus,coreUserId:coreUserId};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlOne,
            data: JSON.stringify(dataOne),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    alert(data.msg);
                }else{
                    console.log(data);
                    var _self   = data.data.list;
                    var str     ='';
                    if(_self==null || _self.length==0){
                        $('.myOrder').html('<img src="images/null.png" style="position: relative;left: 50%;transform: translateX(-50%);">');
                    }else{
                        for(var i=0;i<_self.length;i++){
                            var stast ='';
                            if(_self[i].store.name==null){
                                _self[i].store.name = '该店铺暂无名称'
                            }else{
                                _self[i].store.name = _self[i].store.name;
                            };
                            if (_self[i].orderGoods[0].orderStatus == 1){
                                _self[i].orderGoods[0].orderStatus = '待付款'
                                if(_self[i].orderGoods[0].isVirtual ==1){
                                    stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionfk">付款</div>'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionNullM" data-mobile="'+_self[i].store.id+'">联系卖家</div>'
                                        + '</div>'
                                }else{
                                    stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionfk">付款</div>'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="backOrder" data-orders="'+_self[i].id+'">取消订单</div>'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionNullM" data-mobile="'+_self[i].store.id+'">联系卖家</div>'
                                        + '</div>'
                                }

                            }else if (_self[i].orderGoods[0].orderStatus == 2){
                                _self[i].orderGoods[0].orderStatus = '待发货'
                                if(_self[i].orderGoods[0].isVirtual ==1){
                                    stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionNullM" data-mobile="'+_self[i].store.id+'">联系卖家</div>'
                                        + '</div>'
                                }else{
                                    stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="backOrder" data-orders="'+_self[i].id+'">取消订单</div>'
                                        + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionNullM" data-mobile="'+_self[i].store.id+'">联系卖家</div>'
                                        + '</div>'
                                }


                            }else if (_self[i].orderGoods[0].orderStatus == 3){
                                _self[i].orderGoods[0].orderStatus = '支付失败'
                            }else if (_self[i].orderGoods[0].orderStatus == 4){
                                _self[i].orderGoods[0].orderStatus = '订单取消'
                            }else if (_self[i].orderGoods[0].orderStatus == 5){
                                _self[i].orderGoods[0].orderStatus = '待收货'
                                stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-picture="'+_self[i].orderGoods[0].picture+'" data-expressName="'+_self[i].orderGoods[0].expressName+'"  data-expressCode="'+_self[i].orderGoods[0].expressCode+'" data-expno="'+_self[i].orderGoods[0].expno+'" data-action="logistics">查看物流</div>'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-action="qrsh" data-id="'+_self[i].orderGoods[0].id+'">确认收货</div>'
                                    + '</div>'
                            }else if (_self[i].orderGoods[0].orderStatus == 6){
                                _self[i].orderGoods[0].orderStatus = '已收货(未评价)'
                                stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-picture="'+_self[i].orderGoods[0].picture+'" data-expressName="'+_self[i].orderGoods[0].expressName+'"  data-expressCode="'+_self[i].orderGoods[0].expressCode+'" data-expno="'+_self[i].orderGoods[0].expno+'" data-action="logistics">查看物流</div>'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-action="pingjia" data-ordersgoodsid="'+_self[i].orderGoods[0].id+'" data-goodsid="'+_self[i].orderGoods[0].productId+'" data-orderid="'+_self[i].id+'">评价</div>'
                                    + '</div>'
                            }else if (_self[i].orderGoods[0].orderStatus == 7){
                                _self[i].orderGoods[0].orderStatus = '已收货(已评价)'
                            }else if (_self[i].orderGoods[0].orderStatus == 8){
                                _self[i].orderGoods[0].orderStatus = '交易完成'
                            }else if (_self[i].orderGoods[0].orderStatus == 9){
                                _self[i].orderGoods[0].orderStatus = '售后处理'
                            }else {
                                _self[i].orderGoods[0].orderStatus = '以删除'
                            };
                            var PPPP    = _self[i].orderGoods[0].attrName;
                            var PPPPstr ='';
                            if(_self[i].orderType==5){
                                var key     =eval('('+PPPP+')')[0].key;
                                var values  =eval('('+PPPP+')')[0].value;
                                PPPPstr =   key+':'+values
                            }else if(_self[i].orderType == 7){
                                PPPPstr =  PPPP==2?'创客':'创客商'
                            }else if(_self[i].orderType == 3){
                                PPPPstr ='手机充值：'+PPPP
                            }
                            if(_self[i].tradeNo = null){
                                _self[i].tradeNo=''
                            }else{
                                _self[i].tradeNo = _self[i].tradeNo
                            }
                            if(_self[i].orderGoods[0].picture == '' || _self[i].orderGoods[0].picture == null){
                                _self[i].orderGoods[0].picture = 'http://121.43.178.109:8080/ser/ATTACHMENT/ATTACHMENT/cf9df8a9-4d4d-405b-9765-03891c8e79a9.png'
                            }else{
                                _self[i].orderGoods[0].picture = _self[i].orderGoods[0].picture
                            }
                            // console.log(_self[i].orderType);
                            str +='<div class="shoppingCart_wareArea"  data-order="'+_self[i].id+'" data-tradeno="'+_self[i].tradeNo+'">'
                                // <!--头部店铺选择-->
                                +'<div class="shoppingCart_wareStore">'
                                +'<div class="shop"></div>'
                                +'<span class="warp_Lt">'+_self[i].store.name+'</span>'
                                +'<div class="quiet"></div>'
                                +'<span class="warp_Rg myOrder_reveal" >'+_self[i].orderGoods[0].orderStatus+'</span>'
                                +'</div>'
                                // <!--商品属性展示区-->
                                +'<div class="shoppingCart_wareDetails ui_btn" data-action="shoppingCart_Detail" data-order="'+_self[i].id+'" style="height: 105px">'
                                +'<div class="shoppingCart_wareDetailTxt">'
                                +'<div class="print"><img src="'+_self[i].orderGoods[0].picture+'"></div>'
                                +'<div class="shoppingCart_wareTxt">'
                                +'<div class="myOrder_revealArea warp_Lt">'
                                +'<span class="warp_lC" style="height: 35px;margin-bottom: 5px;">'+_self[i].orderGoods[0].productName+'</span>'
                                +'<span style="color: #cccccc;display: block">'+PPPPstr+'</span>'
                                +'<div class="myOrder_quality">七天包退</div>'
                                +'</div>'
                                +'<div class="myOrder_reverlAreaL warp_Rg">'
                                +'<span style="color:#E60012">￥'+_self[i].orderGoods[0].productPrice+'</span>'
                                +'<span style="text-decoration:line-through;display: block;">￥'+(parseInt(_self[i].orderGoods[0].productPrice)-1)+'</span>'
                                +'<br/><br/>'
                                +'<span>X'+_self[i].orderGoods[0].quantity+'</span>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                                // // <!--结算区-->
                                +'<div class="myOrder_settlementArea breadth bB">共'+_self[i].orderGoods[0].quantity+'件商品 合计：<span style="font-size:.9875rem">¥ '+_self[i].orderGoods[0].quantity*_self[i].orderGoods[0].productPrice+'</span>(含运费¥0.00)</div>'
                                +stast
                                +'</div>'
                        }
                        $('.myOrder').html(str);
                    }

                }
            }
        });
    },
    //代付款
    goInPayDetails:function(){
        Views.pendingPaymentDetailsView.show();
    },
    //未开通功能
    functionNull:function(){
        alert('该功能暂未开通！O(∩_∩)O');
    },
    //付款
    functionfk:function(btn){
        var order   = $(btn).parent().parent().attr('data-order');
        var tradeno = $(btn).parent().parent().attr('data-tradeno');
        if(tradeno === 'null'){
            $(".wantToRecharge_shady").show();
            $(".wantToRecharge_payment").slideToggle();
            $(".wantToRechargePay").show();
            dataSave('payIdsss',order)
        }
    },
    payFor:function(){
        if($('.wantToRechargePay .warp_Rg').text()=='余额支付'){
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
                        alert(data.msg);
                    }else{
                        console.log(data);
                        if(data.data.payPassword == null){
                            alert('请先设置支付密码！');
                            Views.fillinNewPasswordView.show();
                        }else{

                            var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
                            var payId  ='';
                            var payType = 3;
                            var id = dataGet('payIdsss');//id
                            var orderMalls = [{id:id}];
                            var data = {payId:payId,payType:payType,orderMalls:orderMalls};
                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:urlTwos,
                                data: JSON.stringify(data),
                                contentType:'application/json;charset=utf-8',
                                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                success:function(data){
                                    if(!data.success){
                                        alert(data.msg);
                                    }else{
                                        console.log(data.data);
                                        dataSave('payIds', data.data.payId);//支付商品id
                                    }
                                }
                            });



                            $('#payFixed').show();
                        }
                    }
                }
            });
        }else{
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

                            var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
                            var payId  ='';
                            var payType = 0;
                            var id = dataGet('payIdsss');//id
                            var orderMalls = [{id:id}];
                            var data = {payId:payId,payType:payType,orderMalls:orderMalls};
                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:urlTwos,
                                data: JSON.stringify(data),
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
                }
            });
        }

    },
    paySuccessaf:function(){

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
    },
    //代发货
    goInToBeShippedDetails:function(){
        Views.toBeShippedDetailsView.show();
    },
    functionNullM:function(btn){
        var url = WEB_URL + '/api/orderMall/selectMobileByStoreId';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify({storeId:parseInt($(btn).attr('data-mobile'))}),
            // data: JSON.stringify({storeId:parseInt(2)}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(data.msg=='成功'){
                    alert('该店家未设置号码!')
                }else{
                    console.log(data);
                    window.location.href='tel:'+data.msg
                }

            }
        });
    },
    //代收货
    goInPendingReceiptDetails:function(){
        Views.pendingReceiptDetailsView.show();
    },

    //代评价
    goInEvaluated:function(){
        Views.detailsToBeEvaluatedView.show();
    },

    //评价
    pingjia:function(btn){
        dataSave('ordersGoodsId',$(btn).attr('data-ordersgoodsid'));
        dataSave('goodsId',$(btn).attr('data-goodsid'));
        dataSave('orderId',$(btn).attr('data-orderid'));
        Views.evaluationView.show();
    },

    //查看物流
    //取消订单
    backOrder:function(btn){
        dataSave('Orderid',$(btn).attr('data-orders'));//订单id
        $('.BackOrder').show();
    },
    BackOrdersuccess:function(){
        var textareaHtml = $('#BackOrder_02').val();
        if(textareaHtml==''){
            alert('请输入您的意见！')
        }else{
            var url     = WEB_URL + '/api/orderMall/closeOrder';
            var orderId =dataGet('Orderid');
            var cancel  =textareaHtml;
            var data    ={orderId:orderId,cancel:cancel};
            console.log(data);
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        alert(data.msg);
                        $('.BackOrder').hide();
                    }else{
                        alert('您取消的订单已提交！');
                        console.log(data)
                        $('.BackOrder').hide();
                    }
                }
            });
        }
    },
    shoppingCart_Detail:function(btn){
        dataSave('orderId',$(btn).attr('data-order'));
        Views.pendingPaymentDetailsView.show();
    },
    qrsh:function(btn){
        $("#qrsh").show();
        dataSave('orderGoodsId',$(btn).attr('data-id'))
    },
    cencalss:function(){
        $('#qrsh').hide();
        $('#payFixed').hide();
        $('.wantToRecharge_payment').hide();
        $('.wantToRecharge_shady').hide();
    },
    payshouhuo:function(){
        var url             = WEB_URL +'/api/orderMall/receipt';
        var payPassword     =  $('#passwordss').val();
        var orderGoodsId    = parseInt(dataGet('orderGoodsId'));
        var data            ={payPassword:payPassword,orderGoodsId:orderGoodsId}
        console.log(data)
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    alert('您已确认收货');
                    Views.myOrderView.show();
                }
            }
        });
    }

})
/***********************我的订单end**********************/

/***********************代付款详情start**********************/
Views.pendingPaymentDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'pendingPaymentDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url     =   WEB_URL +'/api/orderMall/selectListAll';
        var pageNum =1;
        var size    =1;
        var orderId =dataGet('orderId');
        var data    ={pageNum:pageNum,size:size,orderId:orderId}
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    var _self = data.data.list[0];
                    if(_self.orderGoods[0].isVirtual == 1){
                        $('.orderDetails_logistics').hide();
                    }
                    var date = new Date(_self.createTime);
                    Y = date.getFullYear() + '-';
                    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                            date.getMonth()+1) + '-';
                    D = date.getDate() + ' ';
                    h = date.getHours() + ':';
                    m = date.getMinutes() + ':';
                    s = date.getSeconds();
                    var detailTop   ='';
                    var orderStast  ='';
                    var orderDetails_numbers    =   '';
                    var orderDetails_foot   ='';
                    if(_self.orderGoods[0].orderStatus == 1){
                        detailTop   +='<p>等待买家付款</p> <span id=timess></span> <div class="headline_ico"><img src="images/individual/money.png" alt=""/></div>'
                        $('.orderDetails_logistics').hide();
                        orderStast = '待付款';
                        orderDetails_numbers = '<span>订单编号：'+_self.id+'</span><span>创建时间：'+Y+M+D +h+m+s+'</span>';
                        orderDetails_foot   ='<div class="footBtn warp_Rg selectfoot ui_btn" data-id="'+_self.id+'" data-action="fk">立即付款</div>'
                    }else if(_self.orderGoods[0].orderStatus == 2){
                        detailTop   +='<p>等待卖家发货</p> <span id="timess"></span> <div class="headline_ico"><img src="images/individual/wait.png" alt=""/></div>'
                        orderStast = '待发货';
                        $('.orderDetails_logistics .bB').hide();
                        orderDetails_numbers = '<span>订单编号：'+_self.id+'</span><span>创建时间：'+Y+M+D +h+m+s+'</span><span>交易号：'+_self.tradeNo+'</span>';
                        orderDetails_foot   ='<div class="footBtn warp_Rg selectfoot" data-ordersgoosid="'+_self.orderGoods[0].id+'" onclick="alertBtn()">提醒发货</div>'
                    }else if(_self.orderGoods[0].orderStatus == 5){
                        detailTop   +='<p>卖家已发货</p> <span id="timess"></span> <div class="headline_ico"><img src="images/individual/car.png" alt=""/></div>'
                        orderStast = '待收货';
                        var urlTwo      = WEB_URL + '/api/orderMall/orderTraces';
                        var expno       =_self.orderGoods[0].expno;
                        var expressCode =_self.orderGoods[0].expressCode;
                        var data        ={expno:expno,expressCode:expressCode}
                        $.ajax({
                            type:'POST',
                            dataType:'json',
                            url:urlTwo,
                            data: JSON.stringify(data),
                            contentType:'application/json;charset=utf-8',
                            error: function (XMLHttpRequest, textStatus, errorThrown) {},
                            success:function(data){
                                if(!data.success){
                                    console.log(data.msg);
                                }else{
                                    console.log(data);
                                    var _selfs   = data.data.jsonArray;
                                    var str     ='';
                                    var strs    ='';
                                    if(_selfs.length == 0){
                                        $('.orderDetails_logistics .bB').html('您的快递单号有误，或无此单号！');
                                    }else{
                                        strs    ='<p class="warp_Lt ui_btn" data-action="wuliu" data-expno="'+_self.orderGoods[0].expno+'" data-expresscode="'+_self.orderGoods[0].expressCode+'" style="margin-bottom:3px;color:#EB6100;width: 93%">'+_selfs[0].AcceptStation+'</p> <div class="skip"></div> <span style="color: #CCCCCC">'+_selfs[0].AcceptTime+'</span>'
                                    }
                                    $('.orderDetails_logistics .bB').html(strs);
                                }
                            }
                        });
                        orderDetails_numbers = '<span>订单编号：'+_self.id+'</span><span>创建时间：'+Y+M+D +h+m+s+'</span><span>交易号：'+_self.tradeNo+'</span>';
                        orderDetails_foot   ='<div class="footBtn warp_Rg selectfoot ui_btn" data-action="qrsh" data-id="'+_self.orderGoods[0].id+'">确认收货</div><div class="footBtn warp_Rg selectfoot ui_btn" data-action="wuliu" data-expno="'+_self.orderGoods[0].expno+'" data-expresscode="'+_self.orderGoods[0].expressCode+'">查看物流</div>'
                    }else if(_self.orderGoods[0].orderStatus == 6){
                        detailTop   +='<p>交易成功</p>  <div class="headline_ico"><img src="images/individual/gift.png" alt=""/></div>'
                        orderStast = '待评价';
                        var urlTwo      = WEB_URL + '/api/orderMall/orderTraces';
                        var expno       =_self.orderGoods[0].expno;
                        var expressCode =_self.orderGoods[0].expressCode;
                        var data        ={expno:expno,expressCode:expressCode}
                        $.ajax({
                            type:'POST',
                            dataType:'json',
                            url:urlTwo,
                            data: JSON.stringify(data),
                            contentType:'application/json;charset=utf-8',
                            error: function (XMLHttpRequest, textStatus, errorThrown) {},
                            success:function(data){
                                if(!data.success){
                                    console.log(data.msg);
                                }else{
                                    console.log(data);
                                    var _selfs   = data.data.jsonArray;
                                    var str     ='';
                                    var strs    ='';
                                    if(_selfs.length == 0){
                                        $('.orderDetails_logistics .bB').html('您的快递单号有误，或无此单号！');
                                    }else{
                                        strs    ='<p class="warp_Lt ui_btn" data-action="wuliu" data-expno="'+_self.orderGoods[0].expno+'" data-expresscode="'+_self.orderGoods[0].expressCode+'" style="margin-bottom:3px;color:#EB6100;width: 93%">'+_selfs[0].AcceptStation+'</p> <div class="skip"></div> <span style="color: #CCCCCC">'+_selfs[0].AcceptTime+'</span>'
                                    }
                                    $('.orderDetails_logistics .bB').html(strs);
                                }
                            }
                        });
                        orderDetails_foot   ='<div class="footBtn warp_Rg selectfoot ui_btn" data-action="pingjia" data-ordersgoodsid="'+_self.orderGoods[0].id+'" data-goodsid="'+_self.orderGoods[0].productId+'" data-orderid="'+_self.id+'">评价</div>'
                    }
                    else if(_self.orderGoods[0].orderStatus == 7){
                        detailTop   +='<p>交易成功</p>  <div class="headline_ico"><img src="images/individual/gift.png" alt=""/></div>'
                        var urlTwo      = WEB_URL + '/api/orderMall/orderTraces';
                        var expno       =_self.orderGoods[0].expno;
                        var expressCode =_self.orderGoods[0].expressCode;
                        var data        ={expno:expno,expressCode:expressCode}
                        $.ajax({
                            type:'POST',
                            dataType:'json',
                            url:urlTwo,
                            data: JSON.stringify(data),
                            contentType:'application/json;charset=utf-8',
                            error: function (XMLHttpRequest, textStatus, errorThrown) {},
                            success:function(data){
                                if(!data.success){
                                    console.log(data.msg);
                                }else{
                                    console.log(data);
                                    var _selfs   = data.data.jsonArray;
                                    var str     ='';
                                    var strs    ='';
                                    if(_selfs.length == 0){
                                        $('.orderDetails_logistics .bB').html('您的快递单号有误，或无此单号！');
                                    }else{
                                        strs    ='<p class="warp_Lt ui_btn" data-action="wuliu" data-expno="'+_self.orderGoods[0].expno+'" data-expresscode="'+_self.orderGoods[0].expressCode+'" style="margin-bottom:3px;color:#EB6100;width: 93%">'+_selfs[0].AcceptStation+'</p> <div class="skip"></div> <span style="color: #CCCCCC">'+_selfs[0].AcceptTime+'</span>'
                                    }
                                    $('.orderDetails_logistics .bB').html(strs);
                                }
                            }
                        });
                        orderDetails_numbers = '<span>订单编号：'+_self.id+'</span><span>创建时间：'+Y+M+D +h+m+s+'</span><span>交易号：'+_self.tradeNo+'</span>';
                        orderDetails_foot   ='<div class="footBtn warp_Rg selectfoot ui_btn" data-action="wuliu" data-expno="'+_self.orderGoods[0].expno+'" data-expresscode="'+_self.orderGoods[0].expressCode+'">查看物流</div>'
                    }
                    var PPPP    = _self.orderGoods[0].attrName;
                    var PPPPstr ='';
                    if(_self.orderType==5){
                        var key     =eval('('+PPPP+')')[0].key;
                        var values  =eval('('+PPPP+')')[0].value;
                        PPPPstr =   key+':'+values
                    }else if(_self.orderType == 7){
                        PPPPstr =  PPPP==2?'创客':'创客商'
                    }else if(_self.orderType == 3){
                        PPPPstr ='手机充值：'+PPPP
                    }
                    $('.orderDetails_headline').html(detailTop);
                    //店铺
                    $('#order_name').html(_self.store.name);
                    $('.myOrder_reveal').html(orderStast);
                    $('.print').html('<img src="'+_self.orderGoods[0].picture+'" alt="">')
                    $('#productName').html(_self.orderGoods[0].productName);
                    $('.myOrder_reverlAreaL_01').html('￥'+_self.orderGoods[0].productPrice);
                    $('.myOrder_reverlAreaL_02').html('￥'+parseFloat(_self.orderGoods[0].productPrice));
                    $('.myOrder_reverlAreaL_03').html('X'+_self.orderGoods[0].quantity);
                    $('.myOrder_revealArea_01').html(PPPPstr);
                    $('.myOrder_freight_01').html(parseFloat(_self.orderGoods[0].productPrice)*parseInt(_self.orderGoods[0].quantity));
                    $('.orderDetails_numbers').html(orderDetails_numbers);
                    $('.orderDetails_foot').html(orderDetails_foot);


                    // 物流等
                    $('#name').html(_self.consignee +' '+_self.mobile);
                    $('#address').html(_self.cityName +' '+ _self.provinceName +' '+ _self.cityName +' '+ _self.address);

                    // 倒计时
                    var dateTime = new Date();//当前时间
                    var timer='';
                    if(_self.orderGoods[0].orderStatus == 5){
                        timer    =86400000;//24小时转换成毫秒
                    }else{
                        timer    =259200000;//24小时转换成毫秒
                    }
                    var nowTime  =_self.createTime;//数据库时间戳
                    var intDiff = parseInt((_self.createTime+86400000-new Date().getTime())/1000);//倒计时总秒数量
                    var day=0,

                        hour=0,

                        minute=0,

                        second=0;//时间默认值

                    if(intDiff > 0){

                        day = Math.floor(intDiff / (60 * 60 * 24));

                        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);

                        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);

                        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);

                    }

                    if (minute <= 9) minute = '0' + minute;

                    if (second <= 9) second = '0' + second;
                        $('#timess').html(day+"天"+hour+'时'+minute+'分'+second+'秒')
                    // $('#day_show').html(day+"天");
                    //
                    // $('#hour_show').html('<s id="h"></s>'+hour+'时');
                    //
                    // $('#minute_show').html('<s></s>'+minute+'分');
                    //
                    // $('#second_show').html('<s></s>'+second+'秒');


                }
            }
        });
        $('.wantToRecharge_shady').click(function (){
            $(this).hide();
            $(".wantToRecharge_payment").slideUp();
            $(".wantToRechargeChange").slideUp();
        });
        $(".wantToRechargeChangeArea").eq(0).click(function () {
            $(".wantToRechargePay").hide();
            $(".wantToRechargeChange").show();
            $(".wantToRechargeHeader span").html("付款方式");
        });
        $("#sdasda .wantToRechargeChangeArea").click(function () {
            $("#sdasda .wantToRechargeChangeArea").removeClass("selecteds");
            $(this).addClass("selecteds");
            $('#sdasda').hide();
            $('.wantToRechargePay ').show();
            $('.wantToRechargePay .warp_Rg').html($(this).find('span').text());
        });
        $('#sdasda .wantToRechargeChangeArea').click(function(){
            $('#sdasda').hide();
            $('.wantToRechargePay').show();
        });

        $('.wantToRechargePay .bB').click(function(){
            $('#backs').hide();
            $('#backss').show();
        });
        $('#backs').click(function(){
            $('.wantToRecharge_shady').hide();
            $(".wantToRecharge_payment").slideUp();
            $(".wantToRechargeChange").slideUp();
        });
        $('#backss').click(function(){
            $('#backs').show();
            $('#backss').hide();
            $('.wantToRechargePay').show();
            $('.wantToRechargeChange').hide();
        });
    },
    pingjia:function(btn){
        dataSave('ordersGoodsId',$(btn).attr('data-ordersgoodsid'));
        dataSave('goodsId',$(btn).attr('data-goodsid'));
        dataSave('orderId',$(btn).attr('data-orderid'));
        Views.evaluationView.show();
    },
    fk:function(btn){
        dataSave('payIdsss',$(btn).attr('data-id'))
        $(".wantToRecharge_shady").show();
        $(".wantToRecharge_payment").slideToggle();
        $(".wantToRechargePay").show();
    },
    payFor:function(){
        if($('.wantToRechargePay .warp_Rg').text()=='余额支付'){
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

                            var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
                            var payId  ='';
                            var payType = 3;
                            var id = dataGet('payIdsss');//id
                            var orderMalls = [{id:id}];
                            var data = {payId:payId,payType:payType,orderMalls:orderMalls};
                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:urlTwos,
                                data: JSON.stringify(data),
                                contentType:'application/json;charset=utf-8',
                                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                success:function(data){
                                    if(!data.success){
                                        console.log(data.msg);
                                    }else{
                                        console.log(data.data);
                                        dataSave('payIds', data.data.payId);//支付商品id
                                    }
                                }
                            });



                            $('#payFixed').show();
                        }
                    }
                }
            });
        }else{
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

                            var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
                            var payId  ='';
                            var payType = 0;
                            var id = dataGet('payIdsss');//id
                            var orderMalls = [{id:id}];
                            var data = {payId:payId,payType:payType,orderMalls:orderMalls};
                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:urlTwos,
                                data: JSON.stringify(data),
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
                                                                Views.myOrderView.show();

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
                    alert(data.msg);
                    Views.fillinNewPasswordView.show();
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
    },
    cencalss:function(){
        $('#payFixed').hide();
    },
    wuliu:function(btn){
        Views.viewLogisticsView.show();
        var expno       = dataSave('expno',$(btn).attr('data-expno'));//快递单号
        // var expno       ='3936341973796';//快递单号
        // var expressCode ='YD';//快递公司编号
        var expressCode = dataSave('expressCode',$(btn).attr('data-expresscode'));//快递公司编号
    },
    qrsh:function(btn){
        $("#qrsh").show();
        dataSave('orderGoodsId',$(btn).attr('data-id'))
    },
    cencalss:function(){
        $('#qrsh').hide();
    },
    payshouhuo:function(){
        var url             = WEB_URL +'/api/orderMall/receipt';
        var payPassword     =  $('#passwordss').val();
        var orderGoodsId    = parseInt(dataGet('orderGoodsId'));
        var data            ={payPassword:payPassword,orderGoodsId:orderGoodsId}
        console.log(data)
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    alert('您已确认收货');
                    Views.myOrderView.show();
                }
            }
        });
    }

})
/***********************代付款详情end**********************/

/***********************代发货详情start**********************/
Views.toBeShippedDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'toBeShippedDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

})
/***********************代发货详情end**********************/

/***********************代收货详情start**********************/
Views.pendingReceiptDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'pendingReceiptDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

})
/***********************代收货详情end**********************/


/***********************查看物流start**********************/
Views.viewLogisticsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'viewLogistics',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url         = WEB_URL + '/api/orderMall/orderTraces';
        var expno       =dataGet('expno');//快递单号
        var expressName       =dataGet('expressName');//快递名称
        var picture       =dataGet('picture');//快递图片
        // var expno       ='3936341973796';//快递单号
        // var expressCode ='YD';//快递公司编号
        var expressCode =dataGet('expressCode');//快递公司编号
        var data        ={expno:expno,expressCode:expressCode,expressName:expressName,picture:picture};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    var _self   = data.data.jsonArray;
                    var str     ='';
                    var strs    ='';
                    console.log(data.data.state)
                    if(data.data.state == '0'){
                        $('#zt').html('无轨迹');
                    }else if (data.data.state == '1'){
                        $('#zt').html('已揽收');
                    }else if (data.data.state == '2'){
                        $('#zt').html('在途中');
                    }else if (data.data.state == '3'){
                        $('#zt').html('签收');
                    }else if (data.data.state == '4'){
                        $('#zt').html('问题件');
                    }
                    $('#ly').html(data.data.expressName);
                    $('#dh').html(data.data.expno);
                    $('.pic img').attr('src',data.data.picture)
                    if(_self.length == 0){
                        $('.viewLogistics_details').html('<img src="images/null.png" style="position: relative;left: 50%;transform: translateX(-50%);">')
                    }else{
                        for (var i=0;i<_self.length;i++){
                            str +=  '<div class="toBtn"></div>'
                        }
                        $('.details_imgArea').html(str);
                        for (var j=0;j<_self.length;j++){
                            strs +=  ' <div class="details_area">'
                                    +'<p>'+_self[j].AcceptStation+'</p>'
                                    +'<p>'+_self[j].AcceptTime+'</p>'
                                    +'</div>'
                        }
                        $('.details_txtArea').html(strs);
                    }
                }
            }
        });
    },

})
/***********************查看物流end**********************/

/***********************查看物流通知start**********************/
Views.viewLogisticssView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'viewLogisticss',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url         = WEB_URL + '/api/orderMall/orderTracesByOrderGoodsId';
        var data        ={id:parseInt(dataGet('goInBilling'))};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    var _self   = data.data.jsonArray;
                    var str     ='';
                    var strs    ='';
                    if(_self.length == 0){
                        $('.viewLogistics_details').html('<img src="images/null.png" style="position: relative;left: 50%;transform: translateX(-50%);">')
                    }else{
                        for (var i=0;i<_self.length;i++){
                            str +=  '<div class="toBtn"></div>'
                        }
                        $('.details_imgArea').html(str);
                        for (var j=0;j<_self.length;j++){
                            strs +=  ' <div class="details_area">'
                                +'<p>'+_self[j].AcceptStation+'</p>'
                                +'<p>'+_self[j].AcceptTime+'</p>'
                                +'</div>'
                        }
                        $('.details_txtArea').html(strs);
                    }
                }
            }
        });
    },

})
/***********************查看物流end**********************/

/***********************代评价start**********************/
Views.detailsToBeEvaluatedView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'detailsToBeEvaluated',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        $(document).click(function(){
            $(".footBtn").click(function(){
                $(this).parent(".orderDetails_foot").find(".footBtn").removeClass("selectfoot");
                $(this).addClass("selectfoot")
            })
        })

    },

})
/***********************代评价end**********************/

/***********************发表评价start**********************/
Views.evaluationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'evaluation',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        // alert('订单商品ID'+dataGet('ordersGoodsId'));
        // alert('商品ID'+dataGet('goodsId'));
        // alert('订单ID'+dataGet('orderId'));
        dataSave('crate',1);
        dataSave('goodsScore',5);
        dataSave('sellerScore',5);
        dataSave('logisticsScore',5);
        $(".gradeTxt_01 .love").click(function(){
            if ($(this).hasClass("selectedLove")) {
                $(this).removeClass("selectedLove");
                $(this).nextAll(".love").removeClass("selectedLove");
                dataSave('goodsScore',$(this).index()-1);
            } else {
                $(this).prevAll(".love").addClass("selectedLove");
                $(this).addClass("selectedLove");
                dataSave('goodsScore',$(this).index());
            }
        });
        $(".gradeTxt_02 .love").click(function(){
            if ($(this).hasClass("selectedLove")) {
                $(this).removeClass("selectedLove");
                $(this).nextAll(".love").removeClass("selectedLove");
                dataSave('sellerScore',$(this).index()-1);
            } else {
                $(this).prevAll(".love").addClass("selectedLove");
                $(this).addClass("selectedLove");
                dataSave('sellerScore',$(this).index());
            }
        });
        $(".gradeTxt_03 .love").click(function(){
            if ($(this).hasClass("selectedLove")) {
                $(this).removeClass("selectedLove");
                $(this).nextAll(".love").removeClass("selectedLove");
                dataSave('logisticsScore',$(this).index()-1);
            } else {
                $(this).prevAll(".love").addClass("selectedLove");
                $(this).addClass("selectedLove");
                dataSave('logisticsScore',$(this).index());
            }
        });

    },
    nice:function (btn) {
        dataSave('crate',1);
        $('.flower_02').removeClass('centreHot').addClass('centre');
        $('.flower_03').removeClass('mistakeHot').addClass('mistake');
        if($(btn).hasClass(".niceHot")){
            $(btn).removeClass("niceHot");
            $(btn).addClass("nice");
        }else{
            $(btn).removeClass("nice");
            $(btn).addClass("niceHot");
        }
    },
    centre:function (btn) {
        dataSave('crate',2);
        $('.flower_01').removeClass('niceHot').addClass('nice');
        $('.flower_03').removeClass('mistakeHot').addClass('mistake');
        if($(btn).hasClass(".centreHot")){
            $(btn).removeClass("centreHot");
            $(btn).addClass("centre");
        }else{
            $(btn).removeClass("centre");
            $(btn).addClass("centreHot");
        }
    },
    mistake:function (btn) {
        dataSave('crate',3);
        $('.flower_01').removeClass('niceHot').addClass('nice');
        $('.flower_02').removeClass('centreHot').addClass('centre');
        if($(btn).hasClass(".mistakeHot")){
            $(btn).removeClass("mistakeHot");
            $(btn).addClass("mistake");
        }else{
            $(btn).removeClass("mistake");
            $(btn).addClass("mistakeHot");
        }
    },
    evaluationFoot_area:function(){
        var url             = WEB_URL +'/api/ordersEvaluate/add';
        var ordersGoodsId   =dataGet('ordersGoodsId');
        var goodsId         =parseInt(dataGet('goodsId'));
        var orderId         =parseInt(dataGet('orderId'));
        var crate           =parseInt(dataGet('crate'));
        var goodsScore      =parseInt(dataGet('goodsScore'));
        var sellerScore     =parseInt(dataGet('sellerScore'));
        var logisticsScore  =parseInt(dataGet('logisticsScore'));
        var content         =$('#tetxt').val();
        var data            =[{ordersGoodsId:ordersGoodsId,goodsId:goodsId,orderId:orderId,crate:crate,goodsScore:goodsScore,sellerScore:sellerScore,logisticsScore:logisticsScore,content:content}]
        console.log(data)
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    alert('我们已收到你的评价！');
                    Views.myOrderView.show();
                }
            }
        });
    }


})
/***********************发表评价end**********************/


/***********************退款/售后start**********************/
Views.salePageView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'salePage',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var urlOne      = WEB_URL + '/api/orderMall/selectListAll';
        var pageNum     =1;
        var size        =20;
        var orderStatus =9;
        var coreUserId  =dataGet('user_id');//非创客商必填
        var dataOne        ={pageNum:pageNum,size:size,orderStatus:orderStatus,coreUserId:coreUserId};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlOne,
            data: JSON.stringify(dataOne),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    var _self   = data.data.list;
                    var str     ='';
                    if(_self==null || _self.length==0){
                        $('.myOrder').html('<img src="images/null.png" style="position: relative;left: 50%;transform: translateX(-50%);">');
                    }else{
                        for(var i=0;i<_self.length;i++){
                            var stast ='';
                            if(_self[i].store.name==null){
                                _self[i].store.name = '该店铺暂无名称'
                            }else{
                                _self[i].store.name = _self[i].store.name;
                            };
                            if (_self[i].orderGoods[0].orderStatus == 1){
                                _self[i].orderGoods[0].orderStatus = '代付款'
                                stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-action="functionfk">付款</div>'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-action="backOrder" data-orders="'+_self[i].id+'">取消订单</div>'
                                    + '</div>'
                            }else if (_self[i].orderGoods[0].orderStatus == 2){
                                _self[i].orderGoods[0].orderStatus = '代发货'
                                stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-action="backOrder" data-orders="'+_self[i].id+'">取消订单</div>'
                                    + '</div>'
                            }else if (_self[i].orderGoods[0].orderStatus == 3){
                                _self[i].orderGoods[0].orderStatus = '支付失败'
                            }else if (_self[i].orderGoods[0].orderStatus == 4){
                                _self[i].orderGoods[0].orderStatus = '订单取消'
                            }else if (_self[i].orderGoods[0].orderStatus == 5){
                                _self[i].orderGoods[0].orderStatus = '待收货'
                                stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-expressCode="'+_self[i].orderGoods[0].expressCode+'" data-expno="'+_self[i].orderGoods[0].expno+'" data-action="logistics">查看物流</div>'
                                    + '</div>'
                            }else if (_self[i].orderGoods[0].orderStatus == 6){
                                _self[i].orderGoods[0].orderStatus = '以收货(未评价)'
                                stast = '<div class="myOrder_settlementArea breadth" style="padding-top: 3px;height: 32px;">'
                                    + '<div class="settlementBtn warp_Rg ui_btn" data-expressCode="'+_self[i].orderGoods[0].expressCode+'" data-expno="'+_self[i].orderGoods[0].expno+'" data-action="logistics">查看物流</div>'
                                    + '<div class="settlementBtn warp_Rg">评价</div>'
                                    + '</div>'
                            }else if (_self[i].orderGoods[0].orderStatus == 7){
                                _self[i].orderGoods[0].orderStatus = '以收货(以评价)'
                            }else if (_self[i].orderGoods[0].orderStatus == 8){
                                _self[i].orderGoods[0].orderStatus = '交易完成'
                            }else if (_self[i].orderGoods[0].orderStatus == 9){
                                _self[i].orderGoods[0].orderStatus = '售后处理'
                            }else {
                                _self[i].orderGoods[0].orderStatus = '以删除'
                            };
                            var PPPP    = _self[i].orderGoods[0].attrName;
                            var PPPPstr ='';
                            if(_self[i].orderType==5){
                                var key     =eval('('+PPPP+')')[0].key;
                                var values  =eval('('+PPPP+')')[0].value;
                                PPPPstr =   key+':'+values
                            }else if(_self[i].orderType == 7){
                                PPPPstr =  PPPP==2?'创客':'创客商'
                            }else if(_self[i].orderType == 3){
                                PPPPstr ='手机充值：'+PPPP
                            }
                            if(_self[i].tradeNo = null){
                                _self[i].tradeNo=''
                            }else{
                                _self[i].tradeNo = _self[i].tradeNo
                            }
                            // console.log(_self[i].orderType);
                            str +='<div class="shoppingCart_wareArea" data-order="'+_self[i].id+'" data-tradeno="'+_self[i].tradeNo+'">'
                                // <!--头部店铺选择-->
                                +'<div class="shoppingCart_wareStore">'
                                +'<div class="shop"></div>'
                                +'<span class="warp_Lt">'+_self[i].store.name+'</span>'
                                +'<div class="quiet"></div>'
                                +'<span class="warp_Rg myOrder_reveal" >'+_self[i].orderGoods[0].orderStatus+'</span>'
                                +'</div>'
                                // <!--商品属性展示区-->
                                +'<div class="shoppingCart_wareDetails" style="height: 105px">'
                                +'<div class="shoppingCart_wareDetailTxt">'
                                +'<div class="print"><img src="'+_self[i].orderGoods[0].picture+'"></div>'
                                +'<div class="shoppingCart_wareTxt">'
                                +'<div class="myOrder_revealArea warp_Lt">'
                                +'<span class="warp_lC" style="height: 30px;">'+_self[i].orderGoods[0].productName+'</span>'
                                +'<span style="color: #cccccc;display: block">'+PPPPstr+'</span>'
                                +'<div class="myOrder_quality">七天包退</div>'
                                +'</div>'
                                +'<div class="myOrder_reverlAreaL warp_Rg">'
                                +'<span style="color:#E60012">￥'+_self[i].orderGoods[0].productPrice+'</span>'
                                +'<span style="text-decoration:line-through;display: block;">￥'+(parseInt(_self[i].orderGoods[0].productPrice)-1)+'</span>'
                                +'<br/><br/>'
                                +'<span>X'+_self[i].orderGoods[0].quantity+'</span>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                                // // <!--结算区-->
                                +'<div class="myOrder_settlementArea breadth bB">共'+_self[i].orderGoods[0].quantity+'件商品 合计：<span style="font-size:.9875rem">¥ '+_self[i].orderGoods[0].quantity*_self[i].orderGoods[0].productPrice+'</span>(含运费¥0.00)</div>'
                                +stast
                                +'</div>'
                        }
                        $('.myOrder').html(str);
                    }

                }
            }
        });
        $(document).ready(function(){
            $(".settlementBtn").click(function(){
                $(this).parent(".myOrder_settlementArea").find(".settlementBtn").removeClass("changeBtn");
                $(this).addClass("changeBtn")
            });
        });

    },

})
/***********************退款/售后end**********************/

/***********************我的店铺start**********************/
Views.personalStoreView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'personalStore',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var url = WEB_URL + '/api/store/merchants/store';
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
                    console.log(data);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    $('.storeLogo').html(_self.store.logo==null?'<img src="images/personalStore/logo.png" >':'<img src="'+_self.store.logo+'" >');
                    $('.storeName').html(_self.store.name);
                    $('.storeIdentity').html('我的店铺身份：'+_self.identity);
                    $('#content_01').html(_self.orderNumber);
                    $('#content_02').html(_self.refundNumber);
                    $('#content_03').html(_self.unpaidNumber);
                    $('#content_04').html(_self.notDeliverNumber);
                    $('#content_05').html(_self.onSaleNumber);
                    $('#content_06').html(_self.turnover==null?0:_self.turnover);
                    $('#content_07').html(_self.visitNumber);
                    $('#content_08').html(_self.store.onedayFlow);
                }
            }
        });

    }

})
/***********************我的店铺nd**********************/

/***********************店铺分销start**********************/
Views.storeDistributionView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'storeDistribution',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        var url = WEB_URL + '/api/store/merchants/store';
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
                if(data.msg == '没有开通店铺!'){
                    var url = WEB_URL +'/api/shopConfig/selectAllByUser';
                    $.ajax({
                        type:'GET',
                        dataType:'json',
                        url:url,
                        data:{},
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest, textStatus, errorThrown);
                        },
                        success:function(data){
                            if(!data.success) {
                                console.log(data);
                            }else{
                                var _self = data.data;
                                console.log(_self);
                                if(_self.store == undefined){
                                    $('#storeList_03').hide();
                                    var str = '';
                                    for (var i=0 ;i<_self.shopConfigs.length;i++){
                                        if(_self.shopConfigs[i]==null){
                                            $('#storeList_01').hide();
                                        }else{
                                            var date = new Date(_self.shopConfigs[i].createTime);
                                            Y = date.getFullYear() + '.';
                                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                                    date.getMonth()+1) + '.';
                                            D = date.getDate() + ' ';
                                            h = date.getHours() + ':';
                                            m = date.getMinutes() + ':';
                                            s = date.getSeconds();
                                            str +='<div class="sdList">'
                                                +'<div class="storeLogo" style="background-image: url('+(_self.shopConfigs[i].store.logo==null?'images/headT.png':_self.shopConfigs[i].store.logo)+')"></div>'
                                                +'<div class="sdContent ui_btn" data-action="goInStoreDetails">'
                                                +'<div class="storeName">'+_self.shopConfigs[i].store.name+'</div>'
                                                +'<div class="sdStoreIntroduce">'
                                                +'<div class="identity">店铺身份：'+_self.shopConfigs[i].shopRoleName+'</div>'
                                                +'<div class="sdTime">'+Y+M+D+'</div>'
                                                +'</div>'
                                                +'</div>'
                                                +'<div class="commissionPrompt ui_btn" data-action="commissionPrompt">分佣总计</div>'
                                                +'<div class="commission ui_btn" data-action="commission">￥'+(_self.shopConfigs[i].totalMoney==null?0:_self.shopConfigs[i].totalMoney)+'</div>'
                                                +'</div>'
                                        }
                                        $('#storeList_01').html(str);
                                    }
                                    var strTwo = '';
                                    for (var j=0 ;j<_self.shopMembers.length;j++){
                                        if(_self.shopMembers[i]==null){
                                            $('#storeList_02').hide();
                                        }else{
                                            var dateTwo = new Date(_self.shopMembers[j].createTime);
                                            Y = date.getFullYear() + '.';
                                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                                    date.getMonth()+1) + '.';
                                            D = date.getDate() + ' ';
                                            h = date.getHours() + ':';
                                            m = date.getMinutes() + ':';
                                            s = date.getSeconds();
                                            strTwo +='<div class="sdList">'
                                                +'<div class="storeLogo" style="background-image: url('+(_self.shopMembers[j].store.logo==null?'images/headT.png':_self.shopMembers[j].store.logo)+')"></div>'
                                                +'<div class="sdContent ui_btn" data-action="goInStoreDetails">'
                                                +'<div class="storeName">'+_self.shopMembers[j].store.name+'</div>'
                                                +'<div class="sdStoreIntroduce">'
                                                +'<div class="identity">店铺身份：'+_self.shopMembers[j].shopRoleName+'</div>'
                                                +'<div class="sdTime">'+Y+M+D+'</div>'
                                                +'</div>'
                                                +'</div>'
                                                +'<div class="commissionPrompt ui_btn" data-action="commissionPrompt">分佣总计</div>'
                                                +'<div class="commission ui_btn" data-action="commission">￥'+(_self.shopMembers[j].totalMoney==null?0:_self.shopMembers[j].totalMoney)+'</div>'
                                                +'</div>'
                                        }
                                        $('#storeList_02').html(strTwo);
                                    }
                                }else{
                                    var str = '';
                                    for (var i=0 ;i<_self.shopConfigs.length;i++){
                                        if(_self.shopConfigs[i]==null){
                                            $('#storeList_01').hide();
                                        }else{
                                            var date = new Date(_self.shopConfigs[i].createTime);
                                            Y = date.getFullYear() + '.';
                                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                                    date.getMonth()+1) + '.';
                                            D = date.getDate() + ' ';
                                            h = date.getHours() + ':';
                                            m = date.getMinutes() + ':';
                                            s = date.getSeconds();
                                            str +='<div class="sdList">'
                                                +'<div class="storeLogo" style="background-image: url('+(_self.shopConfigs[i].store.logo==null?'images/headT.png':_self.shopConfigs[i].store.logo)+')"></div>'
                                                +'<div class="sdContent ui_btn" data-action="goInStoreDetails">'
                                                +'<div class="storeName">'+_self.shopConfigs[i].store.name+'</div>'
                                                +'<div class="sdStoreIntroduce">'
                                                +'<div class="identity">店铺身份：'+_self.shopConfigs[i].shopRoleName+'</div>'
                                                +'<div class="sdTime">'+Y+M+D+'</div>'
                                                +'</div>'
                                                +'</div>'
                                                +'<div class="commissionPrompt ui_btn" data-action="commissionPrompt">分佣总计</div>'
                                                +'<div class="commission ui_btn" data-action="commission">￥'+(_self.shopConfigs[i].totalMoney==null?0:_self.shopConfigs[i].totalMoney)+'</div>'
                                                +'</div>'
                                        }
                                        $('#storeList_01').html(str);
                                    }
                                    var strTwo = '';
                                    for (var j=0 ;j<_self.shopMembers.length;j++){
                                        if(_self.shopMembers[i]==null){
                                            $('#storeList_02').hide();
                                        }else{
                                            var dateTwo = new Date(_self.shopMembers[j].createTime);
                                            Y = date.getFullYear() + '.';
                                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                                    date.getMonth()+1) + '.';
                                            D = date.getDate() + ' ';
                                            h = date.getHours() + ':';
                                            m = date.getMinutes() + ':';
                                            s = date.getSeconds();
                                            strTwo +='<div class="sdList">'
                                                +'<div class="storeLogo" style="background-image: url('+(_self.shopMembers[j].store.logo==null?'images/headT.png':_self.shopMembers[j].store.logo)+')"></div>'
                                                +'<div class="sdContent ui_btn" data-action="goInStoreDetails">'
                                                +'<div class="storeName">'+_self.shopMembers[j].store.name+'</div>'
                                                +'<div class="sdStoreIntroduce">'
                                                +'<div class="identity">店铺身份：'+_self.shopMembers[j].shopRoleName+'</div>'
                                                +'<div class="sdTime">'+Y+M+D+'</div>'
                                                +'</div>'
                                                +'</div>'
                                                +'<div class="commissionPrompt ui_btn" data-action="commissionPrompt">分佣总计</div>'
                                                +'<div class="commission ui_btn" data-action="commission">￥'+(_self.shopMembers[j].totalMoney==null?0:_self.shopMembers[j].totalMoney)+'</div>'
                                                +'</div>'
                                        }
                                        $('#storeList_02').html(strTwo);
                                    }

                                    var strThree = '';
                                    var date = new Date(_self.store.createTime);
                                    Y = date.getFullYear() + '.';
                                    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                            date.getMonth()+1) + '.';
                                    D = date.getDate() + ' ';
                                    h = date.getHours() + ':';
                                    m = date.getMinutes() + ':';
                                    s = date.getSeconds();
                                    strThree ='<div class="sdList">'
                                        +'<div class="storeLogo" style="background-image: url('+(_self.store.logo==null?'images/headT.png':_self.store.logo)+')"></div>'
                                        +'<div class="sdContent ui_btn" data-action="goInStoreDetails">'
                                        +'<div class="storeName">'+_self.store.name+'</div>'
                                        +'<div class="sdStoreIntroduce">'
                                        +'<div class="identity">店铺身份：店长</div>'
                                        +'<div class="sdTime">'+Y+M+D+'</div>'
                                        +'</div>'
                                        +'</div>'
                                        +'<div class="commissionPrompt ui_btn" data-action="commissionPrompt">分佣总计</div>'
                                        +'<div class="commission ui_btn" data-action="commission">￥0</div>'
                                        +'</div>'
                                    $('#storeList_03').hide();
                                }
                                var z = 0;
                                $('.storeList').each(function () {
                                    console.log($(this))
                                    if($(this).css('display') == 'block'){
                                        z++
                                    }
                                })
                                $('.storeTotal').html('店铺总数：'+z);
                            }

                        }
                    });
                }else{
                    var url = WEB_URL +'/api/shopConfig/selectAllByUser';
                    $.ajax({
                        type:'GET',
                        dataType:'json',
                        url:url,
                        data:{},
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest, textStatus, errorThrown);
                        },
                        success:function(data){
                            if(!data.success) {
                                console.log(data);
                            }else{
                                var _self = data.data;
                                console.log(_self);
                                if(_self.store == undefined){
                                    $('#storeList_03').hide();
                                    var str = '';
                                    for (var i=0 ;i<_self.shopConfigs.length;i++){
                                        if(_self.shopConfigs[i]==null){
                                            $('#storeList_01').hide();
                                        }else{
                                            var date = new Date(_self.shopConfigs[i].createTime);
                                            Y = date.getFullYear() + '.';
                                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                                    date.getMonth()+1) + '.';
                                            D = date.getDate() + ' ';
                                            h = date.getHours() + ':';
                                            m = date.getMinutes() + ':';
                                            s = date.getSeconds();
                                            str +='<div class="sdList">'
                                                +'<div class="storeLogo" style="background-image: url('+(_self.shopConfigs[i].store.logo==null?'images/headT.png':_self.shopConfigs[i].store.logo)+')"></div>'
                                                +'<div class="sdContent ui_btn" data-action="goInStoreDetails">'
                                                +'<div class="storeName">'+_self.shopConfigs[i].store.name+'</div>'
                                                +'<div class="sdStoreIntroduce">'
                                                +'<div class="identity">店铺身份：'+_self.shopConfigs[i].shopRoleName+'</div>'
                                                +'<div class="sdTime">'+Y+M+D+'</div>'
                                                +'</div>'
                                                +'</div>'
                                                +'<div class="commissionPrompt ui_btn" data-action="commissionPrompt">分佣总计</div>'
                                                +'<div class="commission ui_btn" data-action="commission">￥'+(_self.shopConfigs[i].totalMoney==null?0:_self.shopConfigs[i].totalMoney)+'</div>'
                                                +'</div>'
                                        }
                                        $('#storeList_01').html(str);
                                    }
                                    var strTwo = '';
                                    for (var j=0 ;j<_self.shopMembers.length;j++){
                                        if(_self.shopMembers[i]==null){
                                            $('#storeList_02').hide();
                                        }else{
                                            var dateTwo = new Date(_self.shopMembers[j].createTime);
                                            Y = date.getFullYear() + '.';
                                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                                    date.getMonth()+1) + '.';
                                            D = date.getDate() + ' ';
                                            h = date.getHours() + ':';
                                            m = date.getMinutes() + ':';
                                            s = date.getSeconds();
                                            strTwo +='<div class="sdList">'
                                                +'<div class="storeLogo" style="background-image: url('+(_self.shopMembers[j].store.logo==null?'images/headT.png':_self.shopMembers[j].store.logo)+')"></div>'
                                                +'<div class="sdContent ui_btn" data-action="goInStoreDetails">'
                                                +'<div class="storeName">'+_self.shopMembers[j].store.name+'</div>'
                                                +'<div class="sdStoreIntroduce">'
                                                +'<div class="identity">店铺身份：'+_self.shopMembers[j].shopRoleName+'</div>'
                                                +'<div class="sdTime">'+Y+M+D+'</div>'
                                                +'</div>'
                                                +'</div>'
                                                +'<div class="commissionPrompt ui_btn" data-action="commissionPrompt">分佣总计</div>'
                                                +'<div class="commission ui_btn" data-action="commission">￥'+(_self.shopMembers[j].totalMoney==null?0:_self.shopMembers[j].totalMoney)+'</div>'
                                                +'</div>'
                                        }
                                        $('#storeList_02').html(strTwo);
                                    }
                                }else{
                                    var str = '';
                                    for (var i=0 ;i<_self.shopConfigs.length;i++){
                                        if(_self.shopConfigs[i]==null){
                                            $('#storeList_01').hide();
                                        }else{
                                            var date = new Date(_self.shopConfigs[i].createTime);
                                            Y = date.getFullYear() + '.';
                                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                                    date.getMonth()+1) + '.';
                                            D = date.getDate() + ' ';
                                            h = date.getHours() + ':';
                                            m = date.getMinutes() + ':';
                                            s = date.getSeconds();
                                            str +='<div class="sdList">'
                                                +'<div class="storeLogo" style="background-image: url('+(_self.shopConfigs[i].store.logo==null?'images/headT.png':_self.shopConfigs[i].store.logo)+')"></div>'
                                                +'<div class="sdContent ui_btn" data-action="goInStoreDetails">'
                                                +'<div class="storeName">'+_self.shopConfigs[i].store.name+'</div>'
                                                +'<div class="sdStoreIntroduce">'
                                                +'<div class="identity">店铺身份：'+_self.shopConfigs[i].shopRoleName+'</div>'
                                                +'<div class="sdTime">'+Y+M+D+'</div>'
                                                +'</div>'
                                                +'</div>'
                                                +'<div class="commissionPrompt ui_btn" data-action="commissionPrompt">分佣总计</div>'
                                                +'<div class="commission ui_btn" data-action="commission">￥'+(_self.shopConfigs[i].totalMoney==null?0:_self.shopConfigs[i].totalMoney)+'</div>'
                                                +'</div>'
                                        }
                                        $('#storeList_01').html(str);
                                    }
                                    var strTwo = '';
                                    for (var j=0 ;j<_self.shopMembers.length;j++){
                                        if(_self.shopMembers[i]==null){
                                            $('#storeList_02').hide();
                                        }else{
                                            var dateTwo = new Date(_self.shopMembers[j].createTime);
                                            Y = date.getFullYear() + '.';
                                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                                    date.getMonth()+1) + '.';
                                            D = date.getDate() + ' ';
                                            h = date.getHours() + ':';
                                            m = date.getMinutes() + ':';
                                            s = date.getSeconds();
                                            strTwo +='<div class="sdList">'
                                                +'<div class="storeLogo" style="background-image: url('+(_self.shopMembers[j].store.logo==null?'images/headT.png':_self.shopMembers[j].store.logo)+')"></div>'
                                                +'<div class="sdContent ui_btn" data-action="goInStoreDetails">'
                                                +'<div class="storeName">'+_self.shopMembers[j].store.name+'</div>'
                                                +'<div class="sdStoreIntroduce">'
                                                +'<div class="identity">店铺身份：'+_self.shopMembers[j].shopRoleName+'</div>'
                                                +'<div class="sdTime">'+Y+M+D+'</div>'
                                                +'</div>'
                                                +'</div>'
                                                +'<div class="commissionPrompt ui_btn" data-action="commissionPrompt">分佣总计</div>'
                                                +'<div class="commission ui_btn" data-action="commission">￥'+(_self.shopMembers[j].totalMoney==null?0:_self.shopMembers[j].totalMoney)+'</div>'
                                                +'</div>'
                                        }
                                        $('#storeList_02').html(strTwo);
                                    }

                                    var strThree = '';
                                    var date = new Date(_self.store.createTime);
                                    Y = date.getFullYear() + '.';
                                    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                            date.getMonth()+1) + '.';
                                    D = date.getDate() + ' ';
                                    h = date.getHours() + ':';
                                    m = date.getMinutes() + ':';
                                    s = date.getSeconds();
                                    strThree ='<div class="sdList">'
                                        +'<div class="storeLogo" style="background-image: url('+(_self.store.logo==null?'images/headT.png':_self.store.logo)+')"></div>'
                                        +'<div class="sdContent ui_btn" data-action="goInStoreDetails">'
                                        +'<div class="storeName">'+_self.store.name+'</div>'
                                        +'<div class="sdStoreIntroduce">'
                                        +'<div class="identity">店铺身份：店长</div>'
                                        +'<div class="sdTime">'+Y+M+D+'</div>'
                                        +'</div>'
                                        +'</div>'
                                        +'<div class="commissionPrompt ui_btn" data-action="commissionPrompt">分佣总计</div>'
                                        +'<div class="commission ui_btn" data-action="commission">￥0</div>'
                                        +'</div>'
                                    $('#storeList_03').html(strThree);
                                }
                                var z = 0;
                                $('.storeList').each(function () {
                                    console.log($(this))
                                    if($(this).css('display') == 'block'){
                                        z++
                                    }
                                })
                                $('.storeTotal').html('店铺总数：'+z);
                            }

                        }
                    });
                }
            }
        });






    },
    commissionPrompt:function(btn){
        $(btn).parent().siblings('.sdList').children('.commission').hide();
        $(btn).parent().siblings('.sdList').children('.commissionPrompt').show();
        $(btn).hide();
        $(btn).siblings('.commission').show();
    },
    commission:function(btn){
        $(btn).parent().siblings('.sdList').children('.commissionPrompt').show();
        $(btn).hide();
        $(btn).siblings('.commissionPrompt').show();
    },
    // goInStoreDetails:function(){
    //     Views.storeDetailsView.show();
    // }

})
/***********************店铺分销nd**********************/

/***********************店铺身份start**********************/
Views.dpsfView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'dpsf',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        var url     = WEB_URL +'/api/indexProductConf/show/store';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: {},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                    if(data.msg == '你还没有自己的店铺或代理商店铺！'){
                        alert(data.msg);
                        Views.indexMineView.show();
                    }else{
                        alert(data.msg);
                    }
                }else{
                    var _thisData           = data.data;
                    console.log(_thisData);
                    $('#superiorData_pt input').val(_thisData.PlatformStore);
                    if(_thisData.partnersStore==null){
                        $('#superiorData_my').hide();
                    }else{
                        $('#superiorData_my input').val(_thisData.partnersStore.id);
                        $('#superiorData_my .left').html(_thisData.partnersStore.name==''?'我的店铺':_thisData.partnersStore.name);
                    }
                    if(_thisData.agentStoreList==null){
                        alert('您没有代理商店铺')
                    }else{
                        var _self = _thisData.agentStoreList;
                        var str   ='';
                        for(var i=0;i<_self.length;i++){
                            str +='<div class="msList">'
                                +'<div class="left">'+_self[i].storeName+'  ('+_self[i].shopRoleName+')'+'</div>'
                                +'<div class="right"><input type="radio" name="leavl" value="'+_self[i].storeId+'" style="width:20px;height:20px;"></div>'
                                +'</div>'
                        }
                        $('#dddddd').html(str);
                    }
                }
            }
        });


        $(document).on('click','.msList input',function(){
            $('#msHead_01').html($(this).parent().siblings().text());
            $('#ddddddd').val($(this).val());
        });

    },
    msHead_02:function(){
        var urlTwo =   WEB_URL +'/api/indexProductConf/update/show/store';
        var storeId  =   parseInt($('#ddddddd').val());
        var data={storeId:storeId};
        console.log(data)
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwo,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                   alert(data.msg);
                }else{
                    var _thisData           = data.data;
                    console.log(_thisData);
                    alert('修改成功')
                    $('#fixedssss').show();

                }
            }
        });
        $('#msHead_name').html($('#msHead_01').text());
    }

})
/***********************店铺身份nd**********************/


/***********************店铺详情start**********************/
Views.storeDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'storeDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var swiper3 = new Swiper('.swiper3', {
            loop: true,
            autoplay: 5000,

        });
        $(function(){


            //导航条的显示隐藏
            window.onclick = function(e){

                e = e|| window.event;
                var el = e.srcElement;
                var className =  el.className;
                var id = el.id;

                if(className == "moreClose" || className == "list"){
                    $('#sDNew').show();
                    //$('#sDNew').attr("data-state","hide")
                }

                //分享
                if(id == "newShare"){
                    $('#bgMask').show();
                    $('#sDNew').hide();
                    $('#shareShowT').show();
                    $('#shareShowT').stop().animate({
                        bottom:0
                    });
                }
                if(id == "bgMask" || id == "bgCancel"){
                    $('#bgMask').hide();
                    $('#shareShow').hide();
                    $('#shareShowT').stop().animate({
                        bottom:'-405px'
                    });
                }
                //$('#sDNew').attr("data-state","show")
            }

            //店招
            window.onscroll = function () {
                var t = document.documentElement.scrollTop || document.body.scrollTop;
                if (t > 10) {
                    $('#shopSigns').stop().slideUp('500');
                    $('#shopHead').css("position","fixed");
                    $('#shopHead').css("top","0");
                    $('#shopHead').css("z-index","99");
                    $('#shopHead').css("height","44px");
                    $('#shopHead').css("background","rgb(191, 190, 190)");
                    // $('#shopHead').css("opacity",".9");

                    $('#windowBottom').stop().slideUp();
                }else{
                    $("#shopHead").removeAttr("style");
                    $('#shopSigns').stop().slideDown();
                    $('#windowBottom').stop().slideDown();
                }
            };
        });

        var urlTwoS  = WEB_URL + '/api/indexAdvert/app/store/list';
        var datass = {storeId:dataGet('storeId')}; //店铺ID
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwoS,
            data: JSON.stringify(datass),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    var _self = data.data;
                    var sytsss = '';
                    for (var i=0;i<_self.length;i++){
                        sytsss +='<div class="swiper-slide index_head ui_btn" data-action="banner_link"><img src="images/index/banner.png" alt="" style="position: relative;height:210px;width:100%;"></div>'
                    }
                }
            }
        });


        var url  = WEB_URL + '/api/store/selectOne/'+dataGet('ipAddress');
        var data = {id:dataGet('storeId')}; //店铺ID

        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    var _thisData       = data.data;
                    //店长信息
                    dataSave('dzUserId',_thisData.store.userId)
                    // 分佣线区分店铺
                    if(_thisData.store.commissionLine == 2){ //花想容

                        var _thisName       = _thisData.store.name;//店铺名称
                        var _thisLogo       = _thisData.store.logo;//店铺Logo
                        var _thisIdentity   = _thisData.identity;//当前登录身份
                        var _thisIdCode     = _thisData.idCode;//店铺身份
                        dataSave('idCode', _thisIdCode);//存储当前身份 1(有身份) / 0
                        $('#information').show();//花想容会员信息
                        if(_thisLogo == null ){
                            _thisLogo = 'images/headT.png'
                        }else{
                            _thisLogo = _thisLogo;
                        }
                        $('.sdbLogo').css('background-image','url('+_thisLogo+')');
                        $('.shopName .name').html(_thisName);
                        $('.shopName .identity').html('我的店铺身份：'+_thisIdentity);
                        _thisData.coreCollection!=null?$('#collection').html('取消收藏'):$('#collection').html('收藏')
                        if(_thisData.coreCollection!=null){
                            dataSave('collectionIds',_thisData.coreCollection.id);
                        }else{

                        }
                        if(_thisIdCode == 0){
                            var str ='';
                            var strs ='';
                            var shopRole = _thisData.shopRole;
                            if(shopRole.length!==0){
                                for (var i=shopRole.length-1;i>=0;i--){
                                    str += '<div class="becomeLeft ui_btn" data-action="becomeSort">' +shopRole[i].name+'</div>'
                                }
                                $('.become').html(str)
                            }else{
                                $('.become').html('该店铺目前还没有合伙人!')
                            }
                        }else if(_thisIdCode == 1) {
                            var str = '';
                            var shopRole = _thisData.shopRole;
                            if(shopRole.length!==0){
                                if(_thisData.identity == '金卡'){
                                    $('.become').html('<div class="becomeLeft ui_btn" data-action="becomeSort" style="width:100%;">' +shopRole[1].name+'</div>');
                                }else if (_thisData.identity == '钻卡'){
                                    $('.become').html('<div class="becomeLefts" data-action="becomeSort">您的身份已经为钻卡</div>');
                                }
                            }else{
                                $('.become').html('暂时不能补货')
                            }
                        }else if(_thisIdCode == 2){
                            var str ='';
                            var strs ='';
                            var shopRole = _thisData.shopRole;
                            if(shopRole.length!==0){
                                for (var i=shopRole.length-1;i>=0;i--){
                                    str += '<div class="becomeLeft" data-action="becomeSort">' +shopRole[i].name+'</div>'
                                }
                                $('.become').html(str)
                            }else{
                                $('.become').html('该店铺目前还没有合伙人!')
                            }
                        }
                        $('.become div').each(function(){
                            if($(this).index()%2 !== 0){
                                $(this).css({borderRight:'inherit',width:'50%'});
                            }
                        });
                    }else if(_thisData.store.commissionLine == 3){
                        var _thisName       = _thisData.store.name;//店铺名称
                        var _thisLogo       = _thisData.store.logo;//店铺Logo
                        var _thisIdentity   = _thisData.identity;//当前登录身份
                        var _thisIdCode     = _thisData.idCode;//店铺身份
                        dataSave('idCode', _thisIdCode);//存储当前身份 1(有身份) / 0
                        $('#information').show();//花想容会员信息
                        if(_thisLogo == null ){
                            _thisLogo = 'images/headT.png'
                        }else{
                            _thisLogo = _thisLogo;
                        }
                        alert('这是磁疗贴!')
                    }else {

                        var _thisName       = _thisData.store.name;//店铺名称
                        var _thisLogo       = _thisData.store.logo;//店铺Logo
                        var _thisIdentity   = _thisData.identity;//当前登录身份
                        var _thisIdCode     = _thisData.idCode;//店铺身份
                        dataSave('idCode', _thisIdCode);//存储当前身份 1(有身份) / 0
                        $('.sdbLogo').css('background-image','url('+_thisLogo+')');
                        $('.shopName .name').html(_thisName);
                        $('.shopName .identity').html('我的店铺身份：'+_thisIdentity);
                        _thisData.coreCollection!=null?$('#collection').html('取消收藏'):$('#collection').html('收藏')
                        if(_thisData.coreCollection!=null){
                            dataSave('collectionIds',_thisData.coreCollection.id);
                        }else{

                        }
                        if(_thisIdCode == 0){
                            var str ='';
                            var strs ='';
                            var shopRole = _thisData.shopRole;
                            if(shopRole.length!==0){
                                for (var i=shopRole.length-1;i>=0;i--){
                                    str += '<div class="becomeLeft ui_btn" data-action="becomeSort">' +shopRole[i].name+'</div>'
                                }
                                $('.become').html(str)
                            }else{
                                $('.become').html('该店铺目前还没有合伙人!')
                            }
                        }else if(_thisIdCode == 1) {
                            var str = '';
                            var shopRole = _thisData.shopRole;
                            if(shopRole.length!==0){
                                $('.become').html('<div class="becomeLefts ui_btn" data-action="becomeSort">补货区</div>');
                            }else{
                                $('.become').html('暂时不能补货')
                            }
                        }else if(_thisIdCode == 2){
                            var str ='';
                            var strs ='';
                            var shopRole = _thisData.shopRole;
                            if(shopRole.length!==0){
                                for (var i=shopRole.length-1;i>=0;i--){
                                    str += '<div class="becomeLeft" data-action="becomeSort">' +shopRole[i].name+'</div>'
                                }
                                $('.become').html(str)
                            }else{
                                $('.become').html('该店铺目前还没有合伙人!')
                            }
                        }
                        $('.become div').each(function(){
                            if($(this).index()%2 !== 0){
                                $(this).css({borderRight:'inherit',width:'50%'});
                            }
                        });
                    }
                }
            }
        });


        // 店铺商品列表
        var urlTwo  = WEB_URL + '/api/goods/selectListOfSeller';
        var datas = {pageNum: 1, size: 10, saleStatus: 1, storeId: dataGet('storeId')};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwo,
            data: JSON.stringify(datas),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    var _length = data.data.list;
                    var str ='';
                    for (var i=0;i<_length.length;i++){
                        if(_length[i].carouselPicture==null){
                            _length[i].carouselPicture = ''
                        }else{
                            _length[i].carouselPicture = _length[i].carouselPicture.split(',')[0];
                        }
                        str += '<div class="product ui_btn" data-action="productSort" data-uuid="'+_length[i].id+'">'
                                +'<div class="pic"><img src="'+_length[i].carouselPicture+'" alt=""></div>'
                                +'<div class="content">'
                                +'<div class="contentTitle">'+_length[i].name+'</div>'
                                +'<div class="contentIntroduce">'+_length[i].goodsDesc+'</div>'
                                +'<div class="contentPrice"><span>￥</span>'+_length[i].price+'</div>'
                                +'</div>'
                                +'</div>'
                    }
                    $('.productArea').html(str);
                }
            }
        })




    },
    // 会员信息  跳转
    vipinformation:function(btn){
        var storeId = dataGet('storeId');  //根据店铺id 查找会员信息   花想容为3，磁疗贴 为15
        if(dataGet('idCode')==0){
            alert('您未开通店铺身份，无法进入！')
        }else{
            if(storeId == 3){
                Views.hxmineView.show();
            }else if(storeId == 15){
                alert('这是进磁疗贴的')
            }
        }
    },
    windowBottomLeft:function(){
        Views.commodityEvaluationView.show();
    },
    lxmj:function(){
        var url = WEB_URL + '/api/orderMall/selectMobileByStoreId';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify({storeId:parseInt(dataGet('storeId'))}),
            // data: JSON.stringify({storeId:parseInt(2)}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(data.msg=='成功'){
                    alert('该店家未设置号码!')
                }else{
                    console.log(data);
                    window.location.href='tel:'+data.msg
                }

            }
        });
    },
    collection:function(btn){
        if($(btn).html()=='收藏'){
            var url     = WEB_URL +'/api/coreCollection/add';
            var type    =2;
            var theId   =dataGet('storeId');
            var data    ={type:type,theId:theId};

            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                        if(data.msg == '未登陆/登陆超时'){
                            Views.signInView.show();
                        }
                    }else{
                        var _thisData           = data.data;
                        alert('收藏成功！');
                        console.log(_thisData);
                        $('#collection').html('取消收藏');
                    }
                }
            });
        }else{
            var url     = WEB_URL +'/api/coreCollection/rmUserCollection';
            var data    ={id:dataGet('collectionIds')};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        var _thisData           = data.data;
                        alert('已取消收藏！');
                        console.log(_thisData);
                        $('#collection').html('收藏');
                    }
                }
            });

        }
    },
    goInIntroduction:function(){
        Views.shopIntroductionView.show();
    },
    link_lc:function(){
        Views.commodityDetailsView.show();
    },
    link_zd:function(){
        Views.commodityDetailsView.show();
    },
    partake:function(){
        Views.partakeView.show();
    },
    sweepTheFace:function(){
        Views.sweepTheFaceView.show();
    },
    com_index:function(){
        Views.indexView.show();
    },
    // 客服
    com_customer:function(){
        Views.customerServiceView.show();
    },
    // 我的
    com_mine:function(){
        Views.indexMineView.show();
    },
    // 店铺简介
    com_dianpu:function(){
        Views.shopIntroductionView.show();
    },
    // 购买身份或补货
    becomeSort:function(){
        if($('.identity').html()=='我的店铺身份：未登录'){
            alert('未登录，登录超时');
            Views.signInView.show();
        }else{
            Views.becomeDetailsView.show();
        }

    },
    productSort:function(btn){
            dataSave('commodityUuid',$(btn).attr('data-uuid'));
            Views.commodityDetailsView.show();
    },
    moreClose:function(){
        var state =$('#sDNew').attr("data-state");
        if(state == "hide"){
            $('#sDNew').show();
            $('#sDNew').attr("data-state","show");
        }else{
            $('#sDNew').hide();
            $('#sDNew').attr("data-state","hide");
        }
    },
    search_r:function(){
        var names        =$('.search input').val();
        dataSave('proName',$('.search input').val());
            var urlTwo      = WEB_URL + '/api/indexSearch/product/search';
            var name        =names;
            var isVolume    =true;
            var isAvgEva    =true;
            var pageNum     =1;
            var size        =20;
            var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:urlTwo,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        Views.sCommodityListView.show();
                    }
                }
            });
    }



})
/***********************店铺详情nd**********************/

/***********************店铺介绍start**********************/
Views.shopIntroductionView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'shopIntroduction',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var url  = WEB_URL + '/api/store/selectOne/'+dataGet('ipAddress');
        var data = {id:dataGet('storeId')}; //店铺ID

        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    var _thisData       = data.data;
                    var _thisName       = _thisData.store.name;//店铺名称
                    var _thisLogo       = _thisData.store.logo;//店铺Logo
                    var _thisIdentity   = _thisData.identity;//当前登录身份
                    var _thisIdCode     = _thisData.idCode;//店铺身份
                    dataSave('idCode', _thisIdCode);//存储当前身份 1(有身份) / 0
                    if(_thisLogo == null){
                        _thisLogo = 'images/null.png'
                    }else{
                        _thisLogo = _thisLogo
                    }
                    $('.shopIntroduction_nav_logo').css('background-image','url('+_thisLogo+')');
                    $('.name').html(_thisName);
                    $('.identity').html('我的店铺身份：'+_thisIdentity);
                    _thisData.coreCollection!=null?$('.shopIntroduction_nav_btn').html('取消收藏'):$('.shopIntroduction_nav_btn').html('收藏')
                    if(_thisData.coreCollection!=null){
                        dataSave('collectionIds',_thisData.coreCollection.id);
                    }else{

                    }
                }
            }
        });
    },
    collection:function(btn){
        if($(btn).html()=='收藏'){
            var url     = WEB_URL +'/api/coreCollection/add';
            var type    =2;
            var theId   =parseInt(dataGet('storeId'));
            var data    ={type:type,theId:theId};

            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                        if(data.msg == '未登陆/登陆超时'){
                            Views.signInView.show();
                        }
                    }else{
                        var _thisData           = data.data;
                        alert('收藏成功！');
                        console.log(_thisData);
                        $('.shopIntroduction_nav_btn').html('取消收藏');
                        dataSave('collectionIds',_thisData.id)
                    }
                }
            });
        }else{
            var url     = WEB_URL +'/api/coreCollection/rmUserCollection';
            var data    ={id:parseInt(dataGet('collectionIds'))};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        var _thisData           = data.data;
                        alert('已取消收藏！');
                        console.log(_thisData);
                        $('.shopIntroduction_nav_btn').html('收藏');
                    }
                }
            });

        }
    },
})
/***********************店铺介绍nd**********************/

/***********************客服start**********************/
Views.customerServiceView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'customerService',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

})
/***********************客服nd**********************/

/***********************当面扫码**********************/
Views.sweepTheFaceView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'sweepTheFace',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },
    partake_off:function(){
        Views.storeDetailsView.show();
    }
})
/***********************当面扫码end**********************/

/***********************分享长图**********************/
Views.partakeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'partake',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },
    partake_off:function(){
        Views.storeDetailsView.show();
    }
})
/***********************end**********************/

/***********************兑换记录**********************/
Views.exchangeRecordView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'exchangeRecord',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var url     =   WEB_URL +'/api/userCashFlow/find/record';
        var pageNum =1;
        var pageSize=30;
        var type    =15;
        var data    ={pageNum:pageNum,pageSize:pageSize,type:type};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    var _thisData       = data.data;
                    var _length         = _thisData.list;
                    var str             ='';
                    if(_length == 0){
                        $('#side1').html('<div class="lists">暂无转账记录</div>');
                    }else{
                        for (var i=0;i<_length.length;i++){
                            var date = new Date(_length[i].createTime);
                            Y = date.getFullYear() + '.';
                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                            D = date.getDate() + ' ';
                            h = date.getHours() + ':';
                            m = date.getMinutes() + ':';
                            s = date.getSeconds();
                            str +='<div class="lists">'
                                +'<div class="lists_01">'+_length[i].quota+'张</div>'
                                +'<div class="lists_02">'+parseInt(_length[i].quota)*100+'张</div>'
                                +'<div class="lists_03"> <p>'+Y+M+D+'</p> <p>'+h+m+s+'</p> </div>'
                                +'</div>'
                        }
                        $('#side1').html(str);
                    }

                }
            }
        });
    },

    already:function(btn){
        $('.chooseBox div').removeClass('selection');
        $(btn).addClass('selection');
        var num = $(btn).attr('data-side');
        if(num==15){
            $('#content_01').show();
            $('#content_02').hide();
            var url     =   WEB_URL +'/api/userCashFlow/find/record';
            var pageNum =1;
            var pageSize=30;
            var type    =num;
            var data    ={pageNum:pageNum,pageSize:pageSize,type:type};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        console.log(data);
                        var _thisData       = data.data;
                        var _length         = _thisData.list;
                        var str             ='';
                        if(_length == 0){
                            $('#side1').html('<div class="lists">暂无转账记录</div>');
                        }else{
                            for (var i=0;i<_length.length;i++){
                                var date = new Date(_length[i].createTime);
                                Y = date.getFullYear() + '.';
                                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                                D = date.getDate() + ' ';
                                h = date.getHours() + ':';
                                m = date.getMinutes() + ':';
                                s = date.getSeconds();
                                str +='<div class="lists">'
                                    +'<div class="lists_01">'+_length[i].quota+'张</div>'
                                    +'<div class="lists_02">'+parseInt(_length[i].quota)*100+'张</div>'
                                    +'<div class="lists_03"> <p>'+Y+M+D+'</p> <p>'+h+m+s+'</p> </div>'
                                    +'</div>'
                            }
                            $('#side1').html(str);
                        }
                    }
                }
            });
        }else{
            $('#content_02').show();
            $('#content_01').hide();
            var url     =   WEB_URL +'/api/userCashFlow/find/record';
            var pageNum =1;
            var pageSize=30;
            var type    =num;
            var data    ={pageNum:pageNum,pageSize:pageSize,type:type};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        console.log(data);
                        var _thisData       = data.data;
                        var _length         = _thisData.list;
                        if(_length == 0){
                            $('#side1').html('<div class="lists">暂无转账记录</div>');
                        }else{
                            var str             ='';
                            for (var i=0;i<_length.length;i++){
                                var date = new Date(_length[i].createTime);
                                Y = date.getFullYear() + '.';
                                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                                D = date.getDate() + ' ';
                                h = date.getHours() + ':';
                                m = date.getMinutes() + ':';
                                s = date.getSeconds();
                                str +='<div class="lists">'
                                    +'<div class="lists_01">'+_length[i].quota+'张</div>'
                                    +'<div class="lists_02">'+parseInt(_length[i].quota)*100+'张</div>'
                                    +'<div class="lists_03"> <p>'+Y+M+D+'</p> <p>'+h+m+s+'</p> </div>'
                                    +'</div>'
                            }
                            $('#side1').html(str);
                        }

                    }
                }
            });
        }
    }


})
/***********************end**********************/