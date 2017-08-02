/**
 * Created by Administrator on 2017/7/25 0025.
 */
/***********************店铺身份start**********************/
Views.clmineView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'clmine',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var url     = WEB_URL + '/api/shopConfig/clt/person';
        var storeId = parseInt(dataGet('storeId'));
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify({storeId:storeId}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    var _length = data.data.list;
                    var str ='';
                    console.log(data);
                    dataSave('configId',data.data.shopConfig.configId)
                    dataSave('cltId',data.data.shopConfig.id)
                    dataSave('cltheadimg',data.data.user.headImg)
                    // dataSave('cltncName',data.data.shopConfig.nickName)
                    // dataSave('cltinviterNum',data.data.user.inviterNum)
                    // dataSave('cltRoleName',data.data.user.shopRoleName)
                    $("#name").html(data.data.user.nickName);
                    $("#mineSf").html(data.data.shopConfig.shopRoleName);
                    $("#cltWalth").html(data.data.shopConfig.shopWallet);
                    $("#imageId").attr("src",data.data.user.headImg);
                }
            }
        });
    },
    walletBtn:function () {
        Views.cltWalletView.show();
    },
    tuijianBtn:function () {
        Views.clSuperiorView.show();
    },
    downwoBtn:function () {
        Views.clmyYqView.show();
    },
    fenyongBtn:function () {
        Views.clfylistView.show();
    }
});
/***********************我的钱包**********************/
Views.cltWalletView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'cltWallet',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var url     = WEB_URL + '/api/shopConfig/clt/person';
        var storeId = parseInt(dataGet('storeId'));
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify({storeId:storeId}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    var _length = data.data.list;
                    var str ='';
                    console.log(data);
                    $(".mmNumber").html(data.data.shopConfig.shopWallet);
                }
            }
        });
    },
    goInWithdraw:function(){
        $('#payFixed').show();
    },
    cencalss:function(){
        $('#payFixed').hide();
    },
    paySuccesss:function(){
        var reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test($('#money').val())) {
            dataSave('money',$('#money').val())
            var url = WEB_URL + '/api/coreUser/sendMsmOrEmail/6';
            var mobileEmail = dataGet('mobile');
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify({mobileEmail:mobileEmail}),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        alert(data.msg);
                    }else{
                        console.log(data)
                        $('#hxpayFixed').show();
                        $('#payFixed').hide();
                    }
                }
            })
        }else{
            alert('请输入正确金额');
            $('#money').val('')
        }
    },
    hxcencalss:function(){
        $('#payFixed').hide();
        $('#hxpayFixed').hide();
    },
    hxpaySuccesss:function(){
        var url                 = WEB_URL + '/api/withdrawals/add';
        var storeId             = parseInt(dataGet('storeId'));
        var withdrawalsPrice    = parseFloat(dataGet('money'));
        var vecode              = $('#hxyan').val();
        var data                ={storeId:storeId,withdrawalsPrice:withdrawalsPrice,vecode:vecode}
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
                    console.log(data)
                    var url     = WEB_URL + '/api/shopMember/selectOfStore';
                    var storeId = parseInt(dataGet('storeId'));
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        data: JSON.stringify({storeId:storeId}),
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(!data.success){
                                console.log(data.msg);
                            }else{
                                // 用户
                                var user        =data.data.user;
                                // 店铺 积分 等
                                var shopMember  =data.data.shopMember;
                                console.log(user)
                                console.log(shopMember)
                                $('.mmNumber').html('￥'+shopMember.shopWallet);
                            }
                        }
                    })
                    alert('成功发起转出！');
                    $('#payFixed').hide();
                    $('#hxpayFixed').hide();
                }
            }
        })
    },
    zd:function(btn){
        // dataSave('goInBilling',$(btn).data('uuids'));
        Views.cltBillView.show();
    }
});
// 账单
Views.cltBillView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'cltBill',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var url     = WEB_URL + '/api/withdrawals/selectShopWalletAll';
        var storeId = parseInt(dataGet('storeId'));
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify({storeId:storeId,pageNum:1,size:50}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data)
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
                            +'<p>'+_self.list[i].pmType+_self.list[i].withdrawalsPrice+'</p>'
                            +'<span class="warp_lC" style="-webkit-line-clamp:1">'+_self.list[i].reason+'</span>'
                            +'</div>'
                            +'</div>'
                            +'</div>'
                    }
                    $('#myBillArea').html(str);
                }
            }
        });
    }
});

/***********************我的上级**********************/
Views.clSuperiorView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'clSuperior',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var url     = WEB_URL + '/api/shopConfig/superiors';
        var storeId = parseInt(dataGet('storeId'));
        var configId = configId = dataGet('configId');
        console.log(storeId);
        console.log(configId);
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify({storeId:storeId,configId:configId}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    var _length = data.data.list;
                    var str ='';
                    console.log(data);
                    if(data.data.coreUser.headImg == null || data.data.coreUser.headImg == ''){
                        $("#tjrImg").attr("src",'images/headT.png');
                    }else{
                        $("#tjrImg").attr("src",data.data.coreUser.headImg);
                    }
                    $(".name p").html(data.data.coreUser.nickName);
                    if(data.data.coreUser.realName == '' || data.data.coreUser.realName == null){
                        $("#name_tj").html(data.data.coreUser.nickName);
                    }else{
                        $("#name_tj").html(data.data.coreUser.realName);
                    }
                    $("#moblie_tj").html(data.data.coreUser.realMobile);
                    $("#vip_tj").html(data.data.shopMember.shopRoleName);

                    // $(".mmNumber").html(data.data.shopConfig.shopWallet);
                }
            }
        });
    }
});
/***********************我邀请的人**********************/
Views.clmyYqView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'clmyYq',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var url     = WEB_URL + '/api/shopConfig/subordinate/list';
        var id = parseInt(dataGet('cltId'));
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify({id:id,pageNum:1,size:10}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    var _length = data.data.list;
                    var str ='';
                    console.log(data);
                    var html_div ='';
                    var img = 'images/storeDetails/head.png'
                    for(var i = 0;i<_length.length;i++){
                        var time = new Date(_length[i].createTime).toLocaleString()
                        html_div += '<div class="list_sort" style="display: block;" id="side1"><div class="cList"><div class="cfHead fL">'
                         + '<img src="'+_length[i].coreUser.headImg+'"></div><div class="cfData fL">'
                         + '<div class="name">'+_length[i].coreUser.nickName+'</div>'
                         +'<div class="howManyPeople">共邀请'+_length[i].inviterNum+'人</div></div><div class="cfTime fR">'+time+'</div></div></div>'
                    }
                    $(".numberList").html(html_div)
                }
            }
        });
        var storeId = parseInt(dataGet('storeId'));
        $.ajax({
            type:'POST',
            dataType:'json',
            url:WEB_URL + '/api/shopConfig/clt/person',
            data: JSON.stringify({storeId:storeId}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    $("#Jb_num").html(data.data.shopConfig.shopRoleName);
                    $("#resnu").html(data.data.shopConfig.inviterNum);
                    $("#Name_clt").html(data.data.user.nickName);
                    $("#img_hd").attr("src",data.data.user.headImg);
                }
            }
        });
    }
});
/***********************我的分佣**********************/
Views.clfylistView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'clfylist',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url             = WEB_URL + '/api/shopMember/selectCommissions';
        var pageNum         =1;
        var size            =50;
        var storeId         =parseInt(dataGet('storeId'));
        var data            ={pageNum:pageNum,size:size,storeId:storeId,commissionType:5};
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
                    alert(data.msg);
                }else{
                    console.log(data)
                    var _self   = data.data;
                    var _length = _self.list;
                    if(_length.length==0){
                        $('#myBillArea').html('<p style="text-align: center;"><img src="images/null.png"></p>');
                    }else{
                        var str     ='';
                        for (var i=0;i<_length.length;i++){
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
                                +'<p>+'+_self.list[i].totalMoney+'</p>'
                                +'<span class="warp_lC" style="-webkit-line-clamp:1">'+_self.list[i].remarks+'</span>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                        }
                        $('#myBillArea').html(str);
                    }
                }
            }
        });

    },
    change:function(){
        if($('#sDNew').css('display')=='none'){
            $('#sDNew').show();
        }else{
            $('#sDNew').hide();
        }
    },
    asdasdas:function(btn){
        $('#sDNew').hide();
        var url             = WEB_URL + '/api/shopMember/selectCommissions';
        var pageNum         =1;
        var size            =36;
        var storeId         =parseInt(dataGet('storeId'));
        var commissionType  =$(btn).attr('data-type')
        var data            ={pageNum:pageNum,size:size,storeId:storeId,commissionType:commissionType};
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
                    var _length = _self.list;
                    if(_length.length==0){
                        $('#myBillArea').html('<p style="text-align: center;"><img src="images/null.png"></p>');
                    }else{
                        var str     ='';
                        for (var i=0;i<_length.length;i++){
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
                                +'<p>+'+_self.list[i].totalMoney+'</p>'
                                +'<span class="warp_lC" style="-webkit-line-clamp:1">'+_self.list[i].remarks+'</span>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                        }
                        $('#myBillArea').html(str);
                    }

                }
            }
        });
    }
});