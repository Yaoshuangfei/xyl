/**
 * Created by Administrator on 2017/7/25 0025.
 */
/***********************店铺身份start**********************/
Views.hxmineView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'hxmine',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
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
                    $('.msHead img').attr('src',user.headImg==null?'images/hxrImg/mine_02.png':user.headImg);
                    $('#name').html(user.nickName);
                    $('#mineSf').html(shopMember.shopRoleName);
                    $('.informationMoney').html(shopMember.shopWallet);
                    $('.informationJf').html(shopMember.shopIntegral);
                    dataSave('memberId',shopMember.memberId)
                    dataSave('mobile',user.mobile)
                }
            }
        })
    },
    myTj:function(){
        Views.myTjView.show();
    },
    myYq:function(){
        Views.myhxCircleOfFriendsView.show();
    },
    myFys:function(){
        Views.myhxBillView.show();
    },
    jifen:function(){
        Views.hxaccountBalanceView.show();
    },
    qianbao:function(){
        Views.myhxWalletView.show();
    }
})
/***********************店铺身份end**********************/


/***********************我的推荐人start**********************/
Views.myTjView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myTj',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var urls      = WEB_URL + '/api/shopMember/selectOfStore';
        var storeId  = parseInt(dataGet('storeId'));
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urls,
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
                    // console.log(user)
                    console.log(data.data)
                    //如果memberId ==0 则 推荐人为店长
                    if(shopMember.inviterMemberId == 0){
                        var url     = WEB_URL + '/api/coreUser/selectOne';
                        $.ajax({
                            type:'POST',
                            dataType:'json',
                            url:url,
                            data: JSON.stringify({id:parseInt(dataGet('dzUserId'))}),
                            contentType:'application/json;charset=utf-8',
                            error: function (XMLHttpRequest, textStatus, errorThrown) {},
                            success:function(data){
                                if(!data.success){
                                    console.log(data.msg);
                                }else{
                                    console.log(data)
                                    var _this = data.data;
                                    if(_this.headImg == null){
                                        _this.headImg = 'images/headT.png'
                                    }else{
                                        _this.headImg = _this.headImg
                                    }
                                    $('.pic').html('<img src="'+_this.headImg+'">');
                                    $('.name p').html(_this.nickName);
                                    $('.name .right').html(_this.userName);
                                    $('.mobile .right').html(_this.mobile);
                                    $('.level .right').html('店长');
                                }
                            }
                        });
                    }else{
                        // 我的推荐人
                        var urlTWO     = WEB_URL + '/api/shopMember/selectOne?memberId='+parseInt(shopMember.inviterMemberId);
                        $.ajax({
                            type:'GET',
                            dataType:'json',
                            url:urlTWO,
                            data: {},
                            contentType:'application/json;charset=utf-8',
                            error: function (XMLHttpRequest, textStatus, errorThrown) {},
                            success:function(data){
                                if(!data.success){
                                    console.log(data.msg);
                                }else{
                                    console.log(data)
                                    var _this = data.data.coreUser;
                                    if(_this.headImg == null){
                                        _this.headImg = 'images/headT.png'
                                    }else{
                                        _this.headImg = _this.headImg
                                    }
                                    $('.pic').html('<img src="'+_this.headImg+'">');
                                    $('.name p').html(_this.nickName);
                                    $('.name .right').html(_this.userName==null?_this.nickName:_this.userName);
                                    $('.mobile .right').html(_this.mobile);
                                    $('.level .right').html(data.data.shopRoleName);
                                }
                            }
                        });
                    }
                }
            }
        });
    },

})
/***********************我的推荐人end**********************/


/***********************我邀请的人start**********************/
Views.myhxCircleOfFriendsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myhxCircleOfFriends',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        // 获取昵称
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
                    if(user.headImg == null){
                        user.headImg = 'images/headT.png'
                    }else{
                        user.headImg = user.headImg
                    }
                    $('.pic').html('<img src="'+user.headImg+'">');
                    $('.name').html(user.nickName);
                    $('.smData .fL').html('级别：'+shopMember.shopRoleName);
                }
            }
        })


        //邀请人集合
        var urlTwo     = WEB_URL + '/api/shopMember/selectOne';
        var pageNum =1;
        var size    =20;
        var memberId   = parseInt(dataGet('memberId'));
        var data    ={pageNum:pageNum,size:size,memberId:memberId}
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
                    console.log(data)
                    var _this = data.data;
                    $('.smData .fR').html('共邀请：'+_this.total+'人');
                    var _thislengh = _this.list;
                    if(_thislengh.length ==0){
                        $('#side1').html('<p style="text-align: center;"><img src="images/null.png" alt=""></p>')
                    }else{
                        var str = '';
                        for(var i=0;i<_thislengh.length;i++){
                            var date = new Date(_thislengh[i].createTime);
                            Y = date.getFullYear() + '.';
                            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                            D = date.getDate() + ' ';
                            h = date.getHours() + ':';
                            m = date.getMinutes() + ':';
                            s = date.getSeconds();
                            if(_thislengh[i].coreUser.headImg == null){
                                _thislengh[i].coreUser.headImg = 'images/headT.png'
                            }else{
                                _thislengh[i].coreUser.headImg = _thislengh[i].coreUser.headImg
                            }
                            str +='<div class="cList">'
                                    +'<div class="cfHead fL" style="background: #000;"><img src="'+_thislengh[i].coreUser.headImg+'"></div>'
                                    +'<div class="cfData fL"><div class="name">'+_thislengh[i].coreUser.nickName+'</div><div class="howManyPeople">共邀请'+_thislengh[i].inviterNum+'人</div></div>'
                                    +'<div class="cfTime fR">'+Y+M+D+'</div>'
                                    +'</div>'
                        }
                        $('#side1').html(str);
                    }
                }
            }
        })

    },

})
/***********************我邀请的人end**********************/


/***********************我的分佣start**********************/
Views.myhxBillView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myhxBill',
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
        var size            =36;
        var storeId         =parseInt(dataGet('storeId'));
        var data            ={pageNum:pageNum,size:size,storeId:storeId};
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
                    console.log(_self.list[0])
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
})
/***********************我的分佣end**********************/


/***********************积分来源**********************/
Views.exhxchangeRecordView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'exhxchangeRecord',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var url         =   WEB_URL +'/api/withdrawals/selectShopIntegralAll';
        var pageNum     =1;
        var size        =30;
        var storeId     =dataGet('storeId');
        var data    ={pageNum:pageNum,size:size,storeId:storeId};
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
                    var _thisData       = data.data;
                    var _length         = _thisData.list;
                    var str             ='';
                    if(_length == 0){
                        $('#side1').html('<div class="lists"><p style="text-align: center;"><img src="images/null.png"></p></div>');
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
                                +'<div class="lists_01">'+dataGet('nickName')+'</div>'
                                +'<div class="lists_02">'+_length[i].withdrawalsPrice+'</div>'
                                +'<div class="lists_03"> <p>'+Y+M+D+'</p> <p>'+h+m+s+'</p> </div>'
                                +'</div>'
                        }
                        $('#side1').html(str);
                    }

                }
            }
        });
    },



})
/***********************积分来源**********************/



/***********************我的钱包start**********************/
Views.myhxWalletView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myhxWallet',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
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
    zd:function(){
        Views.myhxzdBillView.show();
    }

})
/***********************我的钱包end**********************/



/***********************我的账单start**********************/
Views.myhxzdBillView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myhxzdBill',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url             = WEB_URL + '/api/withdrawals/selectShopWalletAll';
        var pageNum         =1;
        var size            =36;
        var storeId         =parseInt(dataGet('storeId'));
        var data            ={pageNum:pageNum,size:size,storeId:storeId};
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
                    console.log(_self)
                    var _length = _self.list;
                    if(_length.length==0){
                        $('#myBillArea').html('<p style="text-align: center;"><img src="images/null.png"></p>');
                    }else{
                        var str     ='';
                        for (var i=0;i<_length.length;i++){
                            if(_self.list[i].reason == null){
                                _self.list[i].reason = ''
                            }else {
                                _self.list[i].reason = _self.list[i].reason;
                            }
                            if(_self.list[i].type == 1){
                                _self.list[i].type = '-';
                                if(_self.list[i].status == 1){
                                    _self.list[i].status = '提现成功'
                                }else if(_self.list[i].status == 2){
                                    _self.list[i].status = '提现审核中'
                                }else if(_self.list[i].status == 3){
                                    _self.list[i].status = '提现被拒绝'
                                }
                            }else{
                                _self.list[i].type = '+'
                                if(_self.list[i].status == 1){
                                    _self.list[i].status = '冻结中'
                                }else if(_self.list[i].status == 2){
                                    _self.list[i].status = '已解冻'
                                }else if(_self.list[i].status == 3){
                                    _self.list[i].status = '退款作废'
                                }
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
                                +'<div class="myBillDetails" style="position:relative;">'
                                +'<span style="position: absolute;top:5px;right:0;color: #f1c330;">'+_self.list[i].status+'</span>'
                                +'<p>'+_self.list[i].type+_self.list[i].withdrawalsPrice+'</p>'
                                +'<span class="warp_lC" style="-webkit-line-clamp:1">'+_self.list[i].reason+'</span>'
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
})
/***********************我的账单end**********************/


/***********************我的积分start**********************/
Views.hxaccountBalanceView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'hxaccountBalance',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
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
                    $('#num').html(shopMember.shopIntegral);
                }
            }
        })
    },

    goInBillingDetails:function(){
        Views.exhxchangeRecordView.show();
    }
})
/***********************我的积分end**********************/
