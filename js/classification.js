/**
 * Created by Administrator on 2017/5/22 0022.
 */
/***********************个人美妆start**********************/
Views.classificationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'classification',
        hasFootNav: true,
        footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        $('.dropDown').click(function(){
            $('.ciMask').css("display","block");
            $('.dropDownBox').css("display","block");
            $('html').css({'overflow':'hidden','height':'100%'});
            $('body').css({'overflow':'hidden','height':'100%'});
        })

        $('.ciMask').click(function(){
            $('.ciMask').css("display","none");
            $('.dropDownBox').css("display","none");
            $('html').css({'overflow':'auto'});
            $('body').css({'overflow':'auto'});
        })

        $('.whole .right').click(function(){
            $('.ciMask').css("display","none");
            $('.dropDownBox').css("display","none");
            $('html').css({'overflow':'auto'});
            $('body').css({'overflow':'auto'});
        })

        $('.more').click(function (e) {
            if($('#sDNew').css('display')=='none'){
                $('#sDNew').show();
            }else{
                $('#sDNew').hide();
            }
            $(document).click(function(){
                $('#sDNew').hide();
            })
            e.stopPropagation();
        });




    },

    goInCommodityList:function(){
        Views.commodityListView.show();
    },
})
/***********************个人美妆end**********************/

/***********************商品详情start**********************/
Views.commodityDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'commodityDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        addEventListener();
        dataSave('sssssssss',0);
        dataSave('areaHtml','');

        var urlTwo = WEB_URL + '/api/goods/selectOne' ;//根据id 获取商品
        var commodityUuid = parseInt(dataGet('commodityUuid'));
        var data   = {id:commodityUuid};
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
                    var _thisData           = data.data;
                    console.log(_thisData);
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
                    $('.properties_top .header').html('<img src="'+_thisData.carouselPicture+'" alt="" style="height: 100%;">')
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
                    $('.shoppingCart_quality .shoppingCart_qualityArea').eq(1).find('.shoppingCart_qualityBtn').eq(1).css('display','none');


                    //评价
                    $('#nameL').html(_thisData.ordersEvaluate.userName);//昵称
                    if(_thisData.ordersEvaluate.crate == 1){
                        _thisData.ordersEvaluate.crate = '普通会员'
                    }else if(_thisData.ordersEvaluate.crate == 2){
                        _thisData.ordersEvaluate.crate = '创客'
                    }else if (_thisData.ordersEvaluate.crate == 3){
                        _thisData.ordersEvaluate.crate = '创客商'
                    }
                    if(_thisData.ordersEvaluate.evaluateReplyList.length == 0){
                        $('.evaluateContent').html('该商品暂无评价');
                    }else{
                        $('#nameL_01').html(_thisData.ordersEvaluate.crate);//身份
                        var img = '';
                        if(_thisData.ordersEvaluate.evaluateReplyList[0].user.headImg == null){
                            img = 'images/null.png'
                        }else{
                            img = _thisData.ordersEvaluate.evaluateReplyList.user.headImg;
                        }
                        $('.citLogo').html('<img style="vertical-align: sub;" src="'+img+'">');//头像
                        $('#liulan').html('浏览量：'+_thisData.ordersEvaluate.browser);//浏览量
                        $('.information').html(_thisData.ordersEvaluate.content);


                        var date = new Date(_thisData.ordersEvaluate.createTime);
                        Y = date.getFullYear() + '-';
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        D = date.getDate() + ' ';
                        h = date.getHours() + ':';
                        m = date.getMinutes() + ':';
                        s = date.getSeconds();
                        $('#attribute_time').html(Y+M+D);
                    }

                }
            }
        });



        //头部
        window.onscroll = function () {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t > 3) {
                $('.headTwo').stop().fadeIn(500);
                $('.headOne').stop().fadeOut(100);
            }else{
                $('.headOne').stop().fadeIn(500);
                $('.headTwo').stop().fadeOut(100);

            }
        };
        addEventListener();
        function addcoll(){
            if($('#collection').hasClass('collection')){
                $('#collection').removeClass('collection').addClass('collections');
            }else{
                $('#collection').removeClass('collections').addClass('collection');
            }
        }

        $('.more').click(function (e) {
            if($('#sDNew').css('display')=='none'){
                $('#sDNew').show();
            }else{
                $('#sDNew').hide();
            }
            $(document).click(function(){
                $('#sDNew').hide();
            })
            e.stopPropagation();
        });
        $(".discount").click(function(){
            $("#mine_warp_01 .shoppingCart_properties").show();
            $("#mine_warp_01 .shoppingCart_black").show();
            $("#mine_warp_01 .shoppingCart_check").show()
        });
        $("#attribute_02").click(function(){
            $("#mine_warp_03 .shoppingCart_properties").show();
            $("#mine_warp_03 .shoppingCart_black").show();
            $("#mine_warp_03 .shoppingCart_check").show()
        });
        $(document).on('touchstart','.area',function(){
            if($(this).is('.unchecked')){
                return;
            }
            $(this).parent().parent(".shoppingCart_qualityArea").find(".area").removeClass("pitchOn");
            $(this).addClass("pitchOn");
            dataSave('areaUuid', $(this).attr('data-uuid'));
            dataSave('areaHtml', $(this).text());
            dataSave('sssssssss',1);

        });

        $('#type1').on('click',function(){$("html,body").animate({scrollTop: $(".headFigure").offset().top}, 500);});
        $('#type2').on('click',function(){$("html,body").animate({scrollTop: $("#evaluate").offset().top}, 500);});
        $('#type3').on('click',function(){$("html,body").animate({scrollTop: $("#evaluateTitle").offset().top}, 500);});
        $(function(){
            dataSave('areaNum', 1);
        });

        $(document).on('click','.shoppingCart_black',function(){
            $('.shoppingCart_black').hide();
            $('.shoppingCart_properties').hide();
            $('.shoppingCart_check').hide();
        });
    },
    // 各链接跳转
    // 首页
    mine_warp:function(){
        $("#mine_warp_02 .shoppingCart_properties").show();
        $("#mine_warp_02 .shoppingCart_black").show();
        $("#mine_warp_02 .shoppingCart_check").show();
        dataSave('ddddddddd',0);
    },
    //跳首页
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
    // 分享
    com_fenxiang:function(){
        alert('网站域名未备案，暂无法分享');
        // $('#bgMask').show();
        // $('#sDNew').hide();
        // $('#shareShowT').show();
        // $('#shareShowT').animate({
        //     bottom:0
        // });
    },
    shoppingCart_check:function(){
        if(dataGet('areaHtml') == ''){
            alert('请选择规格')
        }else{
            if(dataGet('ddddddddd')==0){
                $(".shoppingCart_properties").hide();
                $(".shoppingCart_black").hide();
                $(".shoppingCart_check").hide();
                dataSave('areaNum', $('.num').html());
            }else if(dataGet('ddddddddd')==1){
                $(".shoppingCart_properties").hide();
                $(".shoppingCart_black").hide();
                $(".shoppingCart_check").hide();
                dataSave('areaNum', $('.num').html());
                if(dataGet('countId')==1){
                    var urlTwo = WEB_URL + '/api/orderMall/selectOfConfirm' ;//app确认订单页面所需数据查询
                    var areaUuid = dataGet('areaUuid');//id
                    var areaNum = dataGet('areaNum');//数量
                    var areaHtml = dataGet('areaHtml');//参数
                    var arr = [{'specId':areaUuid,'quantity':areaNum}];
                    var data   = {orderType:5,orderGoods:arr};
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
                                if (data.codeEnum == 'OVERTIME') {
                                    alert('您未登录，请先登录！');
                                    Views.signInView.show();
                                }else{
                                    alert(data.msg);
                                }
                            }else{
                                var _thisData = data.data;
                                if(_thisData.address ==null){
                                    alert('请先设置收货地址');
                                    Views.addedAddressView.show();
                                    return;
                                }else{
                                    console.log(data)
                                    Views.successOrderView.show();
                                }

                            }
                        }
                    });
                }else{
                    var urlTwo = WEB_URL + '/api/orderMall/selectOfConfirm' ;//app确认订单页面所需数据查询
                    var arr = eval('('+dataGet('arr')+')');
                    var data   = {orderType:5,orderGoods:arr};
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
                                console.log(data.msg);
                            }else{
                                var _thisData = data.data;
                                if(_thisData.address ==null){
                                    alert('请先设置收货地址');
                                    Views.addedAddressView.show();
                                    return;
                                }else{
                                    console.log(data)
                                    Views.successOrderView.show();
                                }

                            }
                        }
                    });
                }
            }else{
                $(".shoppingCart_properties").hide();
                $(".shoppingCart_black").hide();
                $(".shoppingCart_check").hide();
                dataSave('areaNum', $('.num').html());
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
                            console.log(data);
                            if (data.codeEnum == 'OVERTIME') {
                                alert('您未登录，请先登录！');
                                Views.signInView.show();
                            }else{
                                alert(data.msg);
                            }

                        }else{
                            var url         = WEB_URL + '/api/shopCart/add';
                            var goodsId     = dataGet('commodityUuid');//商品id
                            var goodsCount  = dataGet('areaNum');//商品数量
                            var specId      = dataGet('areaUuid');//商品规格id
                            var data        = {goodsId:goodsId,goodsCount:goodsCount,specId:specId};
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
                                        console.log(_thisData);
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
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

    commodityEvaluation:function(){
        Views.commodityEvaluationView.show();
    },


    bgCancel:function(){
        $('#bgMask').hide();
        $('#shareShow').hide();
        $('#shareShowT').animate({
            bottom:'-405px'
        });
    },
    // 店铺详情
    shop_room:function(){
        Views.storeDetailsView.show();
    },
    // 跳购物车
    go_shoppingcar:function(){
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
                    console.log(data);
                    if (data.codeEnum == 'OVERTIME') {
                        alert(data.msg);
                        Views.signInView.show();
                    }else{
                        alert(data.msg);
                    }

                }else{
                    var _self = data.data;
                    // console.log(_self);
                    Views.shoppingCartView.show();
                }
            }
        });

    },
    shppping:function(){
        // var isLoginFlag = isLogin();
        // if(!isLoginFlag) {
        //     return;
        // }
        if(dataGet('sssssssss')==0){
            $('#mine_warp_02 .shoppingCart_black').show();
            $('#mine_warp_02 .shoppingCart_properties').show();
            $('#mine_warp_02 .shoppingCart_check').show();
            dataSave('ddddddddd',1);
        }else{
            dataSave('countId',1);
            dataSave('sssssssss',0);
            if(dataGet('countId')==1){
                var urlTwo = WEB_URL + '/api/orderMall/selectOfConfirm' ;//app确认订单页面所需数据查询
                var areaUuid = dataGet('areaUuid');//id
                var areaNum = dataGet('areaNum');//数量
                var areaHtml = dataGet('areaHtml');//参数
                var arr = [{'specId':areaUuid,'quantity':areaNum}];
                var data   = {orderType:5,orderGoods:arr};
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
                            var _thisData = data.data;
                            if(_thisData.address ==null){
                                alert('请先设置收货地址');
                                Views.addedAddressView.show();
                                return;
                            }else{
                                console.log(data)
                                Views.successOrderView.show();
                            }

                        }
                    }
                });
            }else{
                var urlTwo = WEB_URL + '/api/orderMall/selectOfConfirm' ;//app确认订单页面所需数据查询
                var arr = eval('('+dataGet('arr')+')');
                var data   = {orderType:5,orderGoods:arr};
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
                            var _thisData = data.data;
                            if(_thisData.address ==null){
                                alert('请先设置收货地址');
                                Views.addedAddressView.show();
                                return;
                            }else{
                                console.log(data)
                                Views.successOrderView.show();
                            }

                        }
                    }
                });
            }

        }

    },
    // 收藏
    collection:function(btn){
        if($(btn).hasClass('coll')){
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
                        $('#collection').css({backgroundImage:'url(images/commodityDetails/collection_hide.png)',color:'#ccc'}).removeClass('coll');
                        alert('已取消收藏！');
                    }
                }
            });
        }else{
            var urls     = WEB_URL +'/api/coreCollection/add';
            var type    =1;
            var theId   =dataGet('commodityUuid');
            var datas   ={type:type,theId:theId};

            $.ajax({
                type:'POST',
                dataType:'json',
                url:urls,
                data: JSON.stringify(datas),
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
                        dataSave('collectionIds',_thisData.id);
                        $('#collection').css({backgroundImage:'url(images/commodityDetails/collection.png)',color:'#ccc'}).addClass('coll');
                        alert('已添加收藏');
                        console.log(_thisData);
                    }
                }
            });
        }
    },
    //加入购物车
    joinCar:function(){
        $("#mine_warp_02 .shoppingCart_properties").show();
        $("#mine_warp_02 .shoppingCart_black").show();
        $("#mine_warp_02 .shoppingCart_check").show();
        dataSave('ddddddddd',3)
    },
    guanbi01:function(btn){
        $('#mine_warp_01 .shoppingCart_black').hide();
        $('#mine_warp_01 .shoppingCart_properties').hide();
        $('#mine_warp_01 .shoppingCart_check').hide();
    },
    guanbi03:function(btn){
        $('#mine_warp_03 .shoppingCart_black').hide();
        $('#mine_warp_03 .shoppingCart_properties').hide();
        $('#mine_warp_03 .shoppingCart_check').hide();
    }

});
/***********************商品详情end**********************/
/***********************所有评价start**********************/
Views.commodityEvaluationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'commodityEvaluation',
        hasFootNav: true,
        footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
        $('#footNavBar').css('display','none');
    },

    didShow: function () {
        addEventListener();

        var url         = WEB_URL +'/api/ordersEvaluate/selectByGoodsId';
        var goodsId     =dataGet('commodityUuid');
        var pageNum     =1;
        var size        =20;
        var data        ={goodsId:goodsId,pageNum:pageNum,size:size}
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
                    var _thisData = data.data.list;
                    var str = '';
                    for (var i=0;i<_thisData.length;i++){
                        if(_thisData[i].status == 1){
                            _thisData[i].status = '普通会员'
                        }else if(_thisData[i].status == 2){
                            _thisData[i].status = '创客'
                        }else if (_thisData[i].status == 3){
                            _thisData[i].status = '创客商'
                        }
                        var date = new Date(_thisData[i].createTime);
                        Y = date.getFullYear() + '.';
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                        D = date.getDate() + ' ';
                        h = date.getHours() + ':';
                        m = date.getMinutes() + ':';
                        s = date.getSeconds();
                        str +='<div class="evaluationArea breadth">'
                                +'<div class="evaluationArea_top">'
                                +'<div class="figure"><img src="'+_thisData[i].userHeadImg+'" alt=""></div>'
                                +'<span style="font-size: 14px;">'+_thisData[i].userName+'    </span>'
                                +'<span>'+_thisData[i].status+'</span>'
                                +'<span style="color: #666" class="warp_Rg">浏览次数：'+_thisData[i].browser+'</span>'
                                +'</div>'
                                +'<div class="speechArea">'
                                +'<p style="color: #666">'+Y+M+D+'</p>'
                                +'<div class="speech">'+_thisData[i].content+'</div>'
                                +'</div>'
                                +'</div>'
                    }
                    $('.pingJia').html(str);
                    console.log(_thisData)
                }
            }
        });

        addEventListener();
        function addcoll(){
            if($('#collection').hasClass('collection')){
                $('#collection').removeClass('collection').addClass('collections');
            }else{
                $('#collection').removeClass('collections').addClass('collection');
            }
        }

        $('.more').click(function (e) {
            if($('#sDNew').css('display')=='none'){
                $('#sDNew').show();
            }else{
                $('#sDNew').hide();
            }
            $(document).click(function(){
                $('#sDNew').hide();
            })
            e.stopPropagation();
        });


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


    },

    //商品详情
    commodityDetails:function(){
        Views.commodityDetailsView.show();
    },
})
/***********************所有评价end**********************/

/***********************购买店铺详情start**********************/
Views.becomeDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'becomeDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        addEventListener();

        var urls  = WEB_URL + '/api/store/selectOne/'+dataGet('ipAddress');
        var datas = {id:dataGet('storeId')}; //店铺ID

        $.ajax({
            type:'POST',
            dataType:'json',
            url:urls,
            data: JSON.stringify(datas),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    dataSave('data-name',data.data.identity);
                    if(data.data.store.commissionLine == '2'){//花想容
                        var url     = WEB_URL + '/api/shopRole/selectOne';
                        var data    ={storeId:parseInt(dataGet('storeId')),introType:parseInt(dataGet('idCode'))};
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
                                    var _thisData       = data.data;
                                    var _thisBanner     = _thisData.pictureUrl;//店铺详情轮播图
                                    var _thisShopRoles  = _thisData.shopRoles;//店铺身份分类
                                    //店铺详情轮播图赋值
                                    var strBanner = '';
                                    // for(var i=0;i<_thisBanner.length;i++){
                                    //     strBanner +='<div class="swiper-slide ui_btn">'
                                    //         +'<img src="'+_thisBanner[i]+'" alt="" style="min-height: 300px;">'
                                    //         +'</div>'
                                    // }
                                    $('#bannerImg').html(strBanner);
                                    var swiper1 = new Swiper('.swiper4', {
                                        loop: true,
                                        autoplay: 3000,

                                    });

                                    //店铺分类赋值
                                    var strShop = '';
                                    // for (var i=_thisShopRoles.length-1;i>=0;i--){
                                        strShop += '<span data-icon="'+_thisShopRoles[1].icon
                                            +'" data-id="'+_thisShopRoles[1].id
                                            +'" data-price="'+_thisShopRoles[1].price+'">'+_thisShopRoles[1].name+'</span>'
                                    // }
                                    $('#shopSort').hide();
                                    $('#shopSorts').html(strShop);
                                    // $('#shopSorts span').each(function(){
                                    //     if($(this).text()==dataGet('data-name')){
                                            $('#shopSorts span').addClass('actives');
                                            $('.header').html('<img src="'+$('#shopSorts span').data('icon')+'" style="height:100%;" alt="">');
                                            $('.arrange').html('￥'+$('#shopSorts span').data('price'));
                                            dataSave('roleId',$('#shopSorts span').data('id'));
                                        // }
                                    // })
                                }
                            }
                        });
                    }else if (data.data.store.commissionLine == '3'){//磁疗贴
                        alert('磁疗贴')
                    }else {
                        if(data.data.identity=='暂无身份'){
                            var url     = WEB_URL + '/api/shopRole/selectOne';
                            var data    ={storeId:parseInt(dataGet('storeId')),introType:parseInt(dataGet('idCode'))};

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
                                        var _thisBanner     = _thisData.pictureUrl;//店铺详情轮播图
                                        var _thisShopRoles  = _thisData.shopRoles;//店铺身份分类
                                        //店铺详情轮播图赋值
                                        var strBanner = '';
                                        // for(var i=0;i<_thisBanner.length;i++){
                                        //     strBanner +='<div class="swiper-slide ui_btn">'
                                        //         +'<img src="'+_thisBanner[i]+'" alt="" style="min-height: 300px;">'
                                        //         +'</div>'
                                        // }
                                        $('#bannerImg').html(strBanner);
                                        var swiper1 = new Swiper('.swiper4', {
                                            loop: true,
                                            autoplay: 3000,

                                        });

                                        //店铺分类赋值
                                        var strShop = '';
                                        for (var i=_thisShopRoles.length-1;i>=0;i--){
                                            strShop += '<span data-icon="'+_thisShopRoles[i].icon
                                                +'" data-id="'+_thisShopRoles[i].id
                                                +'" data-price="'+_thisShopRoles[i].price+'">'+_thisShopRoles[i].name+'</span>'
                                        }
                                        $('#shopSort').html(strShop);
                                        $('#shopSorts').hide();
                                    }
                                }
                            });
                        } else{
                            var url     = WEB_URL + '/api/shopRole/selectOne';
                            var data    ={storeId:parseInt(dataGet('storeId')),introType:parseInt(dataGet('idCode'))};
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
                                        var _thisData       = data.data;
                                        var _thisBanner     = _thisData.pictureUrl;//店铺详情轮播图
                                        var _thisShopRoles  = _thisData.shopRoles;//店铺身份分类
                                        //店铺详情轮播图赋值
                                        var strBanner = '';
                                        // for(var i=0;i<_thisBanner.length;i++){
                                        //     strBanner +='<div class="swiper-slide ui_btn">'
                                        //         +'<img src="'+_thisBanner[i]+'" alt="" style="min-height: 300px;">'
                                        //         +'</div>'
                                        // }
                                        $('#bannerImg').html(strBanner);
                                        var swiper1 = new Swiper('.swiper4', {
                                            loop: true,
                                            autoplay: 3000,

                                        });

                                        //店铺分类赋值
                                        var strShop = '';
                                        for (var i=_thisShopRoles.length-1;i>=0;i--){
                                            strShop += '<span data-icon="'+_thisShopRoles[i].icon
                                                +'" data-id="'+_thisShopRoles[i].id
                                                +'" data-price="'+_thisShopRoles[i].addPrice+'">'+_thisShopRoles[i].name+'</span>'
                                        }
                                        $('#shopSort').hide();
                                        $('#shopSorts').html(strShop);
                                        $('#shopSorts span').each(function(){
                                            if($(this).text()==dataGet('data-name')){
                                                $(this).addClass('actives');
                                                $('.header').html('<img src="'+$(this).data('icon')+'" alt="">');
                                                $('.arrange').html('￥'+$(this).data('price'));
                                                dataSave('roleId',$(this).data('id'));
                                            }
                                        })
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });






        //头部
        window.onscroll = function () {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t > 3) {
                $('.headTwo').stop().fadeIn(500);
                $('.headOne').stop().fadeOut(100);
            }else{
                $('.headOne').stop().fadeIn(500);
                $('.headTwo').stop().fadeOut(100);

            }
        };
        addEventListener();
        function addcoll(){
            if($('#collection').hasClass('collection')){
                $('#collection').removeClass('collection').addClass('collections');
            }else{
                $('#collection').removeClass('collections').addClass('collection');
            }
        }

        $('.more').click(function (e) {
            if($('#sDNew').css('display')=='none'){
                $('#sDNew').show();
            }else{
                $('#sDNew').hide();
            }
            $(document).click(function(){
                $('#sDNew').hide();
            })
            e.stopPropagation();
        });

        $('.shoppingCart_black').click(function(){
            $(".shoppingCart_properties").hide();
            $(".shoppingCart_black").hide();
            $(".shoppingCart_check").hide()
        });

        $(document).on('click','#shopSort span',function(){
            var s = ''
            if($(this).data('icon') == null){
                s = 'images/null.png';
            }else{
                s = $(this).data('icon');
            }
            $('#shopSort span').removeClass('actives');
            $(this).addClass('actives');
            $('.header').html('<img style="height:100%;" src="'+s+'" alt="">');
            $('.arrange').html('￥'+$(this).data('price'));
            dataSave('roleId',$(this).data('id'));
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
    // 各链接跳转
    // 首页
    com_index:function(){
        Views.indexView.show();
    },
    shoppingCart_checks:function(){
        if(dataGet('idCode')==1){
            var url         = WEB_URL + '/api/orderMall/selectOfConfirm';
            var orderType   =8;
            var orderGoods  =[{specId:dataGet('roleId'),quantity:1}];
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
                        $(".shoppingCart_properties").hide();
                        $(".shoppingCart_check").hide();
                        $(".shoppingCart_black").hide();
                        $(".wantToRecharge_shady").hide();
                        $('#yqm').hide();
                        Views.storeDetailsView.show();

                    }else{
                        console.log(data);
                        $('.mine_warp').hide();
                        var EMbile = '';
                        if(dataGet('mobile')==''){
                            EMbile = dataGet('user_name')
                        }else{
                            EMbile = dataGet('mobile');
                        }
                        var EMail = '';
                        if(dataGet('zipCode') ==''){
                            EMail = '000000'
                        }else{
                            EMail = dataGet('zipCode');
                        }
                        var url         = WEB_URL + '/api/orderMall/addRole';
                        var storeId     = dataGet('storeId'); //店铺id
                        var orderType   = dataGet('idCode')==0?6:8; //订单类型3业务充值 4余额充值 6店铺身份购买 7平台身份购买 8补货 9金豆充值
                        var consignee   =dataGet('realNames'); //地址信息   当为3购买平台身份时不必填  当为1或2时地址信息必填
                        var mobile = EMbile; //电话
                        var zipCode = EMail;//邮编
                        var province = dataGet('cityCode');//省id
                        var provinceName = dataGet('cityText');//省名称
                        var city = dataGet('provinceCode');//市id
                        var cityName = dataGet('provinceText');//市名称
                        var county = dataGet('countyCode');//区id
                        var countyName = dataGet('countyText');//区名称
                        var address = dataGet('address');//详细地址信息
                        var buyerMess   =$('#textarea').val();
                        var shopRoleDist={roleId:dataGet('roleId')};
                        var datas        ={storeId:storeId,orderType:orderType,consignee:consignee,mobile:mobile,zipCode:zipCode,province:province,provinceName:provinceName,city:city,cityName:cityName,county:county,countyName:countyName,address:address,buyerMess:buyerMess,shopRoleDist:shopRoleDist};
                        console.log(datas);
                        if(datas.address == null){
                            alert('请先设置收货地址！');
                            Views.addedAddressView.show();
                        }else{
                            $.ajax({
                                type:'POST',
                                dataType:'json',
                                url:url,
                                data: JSON.stringify(datas),
                                contentType:'application/json;charset=utf-8',
                                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                                success:function(data){
                                    if(!data.success){
                                        console.log(data.msg);
                                        $(".shoppingCart_properties").hide();
                                        $(".shoppingCart_check").hide();
                                        $(".shoppingCart_black").hide();
                                        $(".wantToRecharge_shady").hide();
                                        $('#yqm').hide();
                                        Views.storeDetailsView.show();
                                    }else{
                                        console.log(data);
                                        dataSave('payIdsss',data.data.id);
                                        $(".wantToRecharge_shady").show();
                                        $(".wantToRecharge_payment").slideToggle();
                                        $(".wantToRechargePay").show();
                                    }
                                }
                            });
                        }
                    }
                }
            });

        }else{
            $(".shoppingCart_properties").hide();
            $(".shoppingCart_check").hide();
            $(".wantToRecharge_shady").show();
            $('#yqm').show();
        }

    },

    yqmQd:function(){
        $(".shoppingCart_properties").hide();
        $(".shoppingCart_check").hide();
        $(".shoppingCart_black").hide();
        $('#yqm').hide();
        var EMbile = '';
        if(dataGet('mobile')==''){
            EMbile = dataGet('user_name')
        }else{
            EMbile = dataGet('mobile');
        }
        var EMail = '';
        if(dataGet('zipCode') ==''){
            EMail = '000000'
        }else{
            EMail = dataGet('zipCode');
        }
        var url         = WEB_URL + '/api/orderMall/addRole';
        var storeId     = dataGet('storeId'); //店铺id
        var orderType   = dataGet('idCode')==0?6:8; //订单类型3业务充值 4余额充值 6店铺身份购买 7平台身份购买 8补货 9金豆充值
        var consignee   =dataGet('realNames'); //地址信息   当为3购买平台身份时不必填  当为1或2时地址信息必填
        var mobile = EMbile; //电话
        var zipCode = EMail;//邮编
        var province = dataGet('cityCode');//省id
        var provinceName = dataGet('cityText');//省名称
        var city = dataGet('provinceCode');//市id
        var cityName = dataGet('provinceText');//市名称
        var county = dataGet('countyCode');//区id
        var countyName = dataGet('countyText');//区名称
        var address = dataGet('address');//详细地址信息
        var buyerMess   =$('#textarea').val();
        var shopRoleDist={roleId:dataGet('roleId'),invitedNum:$('#txqyqm').val()};
        var data        ={storeId:storeId,orderType:orderType,consignee:consignee,mobile:mobile,zipCode:zipCode,province:province,provinceName:provinceName,city:city,cityName:cityName,county:county,countyName:countyName,address:address,buyerMess:buyerMess,shopRoleDist:shopRoleDist};
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
                    if(data.msg == '请填写收货人'){
                        alert(data.msg);
                        Views.addedAddressView.show();
                    } else{
                        alert(data.msg);
                        $(".shoppingCart_properties").hide();
                        $(".shoppingCart_check").hide();
                        $(".shoppingCart_black").hide();
                        $(".wantToRecharge_shady").hide();
                        $('#yqm').hide();
                        Views.storeDetailsView.show();
                    }


                }else{
                    console.log(data);
                    dataSave('payIdsss',data.data.id);
                    $(".wantToRecharge_shady").show();
                    $(".wantToRecharge_payment").slideToggle();
                    $(".wantToRechargePay").show();
                }
            }
        });
    },
    yqmQx:function(){
        $(".shoppingCart_properties").hide();
        $(".shoppingCart_check").hide();
        $(".shoppingCart_black").hide();
        $('#yqm').hide();
    },

    payFors:function(){
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
                        dataSave('PayIdss',data.data.payId)
                    }
                }
            });

            $('#payFixed').show();
        }else{
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
    },
    paySuccesssssd:function(){
        var urlTwos = WEB_URL + '/api/coreMoney/balancePay' ;//支付
        var tradeNo = dataGet('PayIdss');
        var payPassword = $('#passwords').val();
        console.log(payPassword);
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
                    alert(data.msg);
                    if(data.msg == '账户余额不足'){
                        Views.wantToRechargeView.show();
                    }else if (data.msg == '支付密码错误'){
                        $('#passwords').val('')
                    }else if(data.msg == '请先设置支付密码'){
                        Views.fillinNewPasswordView.show();
                    }
                }else{
                    console.log(data);
                    alert('您已支付成功！');
                    $('.wantToRecharge_shady').hide();
                    $('.wantToRecharge_payment').hide();
                    Views.storeDetailsView.show();
                    $('#payFixed').hide();
                }
            }
        });

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
    // 分享
    com_fenxiang:function(){
        $('#bgMask').show();
        $('#sDNew').hide();
        $('#shareShowT').show();
        $('#shareShowT').animate({
            bottom:0
        });
    },

    bgCancel:function(){
        $('#bgMask').hide();
        $('#shareShow').hide();
        $('#shareShowT').animate({
            bottom:'-405px'
        });
    },
    // 收藏
    discount:function(){
        // var url  =WEB_URL + '/api/userShippingAddress/selectOne';
        // var id   =dataGet('user_id');
        // var data ={id:id}
        // $.ajax({
        //     type:'POST',
        //     dataType:'json',
        //     url:url,
        //     data: JSON.stringify(data),
        //     contentType:'application/json;charset=utf-8',
        //     error: function (XMLHttpRequest, textStatus, errorThrown) {},
        //     success:function(data){
        //         if(!data.success){
        //             alert(data.msg);
        //             Views.storeDetailsView.show();
        //
        //         }else{
        //             console.log(data);
        //         }
        //     }
        // });
        // if(data.address == null){
        //     alert('请先设置收货地址！');
        //     Views.addedAddressView.show();
        // }else{
        //
        // }
        $("#mine_warp_02 .shoppingCart_properties").show();
        $("#mine_warp_02 .shoppingCart_black").show();
        $("#mine_warp_02 .shoppingCart_check").show()
    },
    cencalss:function(){
        $('#payFixed').hide();
    },
    go_shoppingcar:function(){
        Views.shoppingCartView.show();
    }
});
/***********************购买店铺详情end**********************/

/***********************确认订单start**********************/
Views.successOrderView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'successOrder',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        if(dataGet('countId')==1){
            var urlTwo = WEB_URL + '/api/orderMall/selectOfConfirm' ;//app确认订单页面所需数据查询
            var areaUuid = dataGet('areaUuid');//id
            var areaNum = dataGet('areaNum');//数量
            var areaHtml = dataGet('areaHtml');//参数
            var arr = [{'specId':areaUuid,'quantity':areaNum}];
            var data   = {orderType:5,orderGoods:arr};
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
                        console.log(data);
                        var _thisData = data.data;
                            console.log(data.data)
                            $('#logisticsAreaName').html(_thisData.address.realName +'  '+_thisData.address.contact); //收货人
                            $('#logisticsAddress').html(_thisData.address.provinceName+' '+_thisData.address.cityName+' '+_thisData.address.countyName+' '+_thisData.address.address);//地址
                            var _length = _thisData.stores;
                            var str =   '';
                            for (var i=0;i<_length.length;i++){
                                if(_length[i].goodsList[0].carouselPicture == null){
                                    _length[i].goodsList[0].carouselPicture == 'images/null.png'
                                }else{
                                    _length[i].goodsList[0].carouselPicture =_length[i].goodsList[0].carouselPicture
                                }
                                str +='<div class="shoppingCart_wareArea" data-storeid="'+_length[i].id+'" data-productid="'+_length[i].goodsList[0].goodsSpecs[0].goodsId+'" data-specid="'+_length[i].goodsList[0].goodsSpecs[0].id+'" data-quantity="'+_length[i].goodsList[0].goodsSpecs[0].buyNum+'">'
                                    // <!--头部店铺选择-->
                                    +'<div class="shoppingCart_wareStore"> <div class="shop"></div> <span class="warp_Lt">'+_length[i].name+'</span> <div class="quiet"></div> <span class="warp_Rg myOrder_reveal" >等待买家付款</span> </div>'
                                    // <!--商品属性展示区-->
                                    +'<div class="shoppingCart_wareDetails">'
                                    +'<div class="shoppingCart_wareDetailTxt">'
                                    +'<div class="print"><img src="'+_length[i].goodsList[0].carouselPicture+'" alt=""></div>'
                                    +'<div class="shoppingCart_wareTxt"> <div class="myOrder_revealArea warp_Lt"> <span class="warp_lC" style="height: 30px;">'+_length[i].goodsList[0].name+'</span> <span style="color: #cccccc;display: block" id="colors"></span> <div class="myOrder_quality">七天包退</div> </div> <div class="myOrder_reverlAreaL warp_Rg"> <span style="color:#E60012" id="monrys">￥'+_length[i].goodsList[0].price+'</span> <span style="text-decoration:line-through;">￥400.00</span> <br/><br/> <span id="numss">X'+_length[i].goodsList[0].goodsSpecs[0].buyNum+'</span> </div> </div>'
                                    +'</div>'
                                    +'</div>'
                                    // <!--结算区-->
                                    +'<div class="myOrder_freight bB" style="padding-left: 10%;padding-right: 3%;color: #333"> <p>运费险<span style="font-size: .875rem;" class="warp_Rg">¥0.00</span></p> <p style="margin-top: 3px;">实付（含运费）<span class="warp_Rg" style="color: #EB6100">￥<span style="font-size: .9375rem" id="shijiMoney">'+_length[i].goodsList[0].price*_length[i].goodsList[0].goodsSpecs[0].buyNum+'</span></span></p> </div>'
                                    +'</div>'


                            }
                            $('.pendingReceipt').html(str);
                            var arr =[];
                            var nums=0;
                            $('.shoppingCart_wareArea').each(function(){
                                nums +=parseFloat($(this).find('#shijiMoney').text());
                                arr.push({storeId:$(this).data('storeid'),expressValue:0,isGold:0,discount:0,consignee:$('#logisticsAreaName').text(),mobile:dataGet('mobile'),zipCode:dataGet('zipCode'),province:dataGet('cityCode'),provinceName:dataGet('cityText'),city:dataGet('provinceCode'),cityName:dataGet('provinceText'),county:dataGet('countyCode'),countyName:dataGet('countyText'),address:dataGet('address'),orderGoods:[{productId:$(this).data('productid'),specId:$(this).data('specid'),quantity:$(this).data('quantity'),mode:0}]})
                            });
                            // 金豆抵扣
                            var bindA = parseInt(dataGet('goldBind'))-_thisData.goldSumFrozen;//可使用金豆
                            var bindB =parseInt(_thisData.stores[0].goodsList[0].goodsSpecs[0].deductibleImazamox);//抵扣金豆
                            var bind = bindA - bindB;
                            $('#sumMoney').html((nums-bindB));
                            dataSave('orderarr',JSON.stringify(arr));
                            dataSave('bind',bindB)
                        dataSave('numsMoney',nums)
                    }
                }
            });
        }else{
            var urlTwo = WEB_URL + '/api/orderMall/selectOfConfirm' ;//app确认订单页面所需数据查询
            var arr = eval('('+dataGet('arr')+')');
            var data   = {orderType:5,orderGoods:arr};
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
                        var _thisData = data.data;
                            console.log(data)
                            $('#logisticsAreaName').html(_thisData.address.realName); //收货人
                            $('#logisticsAddress').html(_thisData.address.provinceName+' '+_thisData.address.cityName+' '+_thisData.address.countyName+' '+_thisData.address.address);//地址
                            var _length = _thisData.stores;
                            var str =   '';
                            for (var i=0;i<_length.length;i++){
                                if(_length[i].goodsList[0].carouselPicture == null){
                                    _length[i].goodsList[0].carouselPicture == 'images/null.png'
                                }else{
                                    _length[i].goodsList[0].carouselPicture =_length[i].goodsList[0].carouselPicture
                                }
                                str +='<div class="shoppingCart_wareArea" data-storeid="'+_length[i].id+'" data-productid="'+_length[i].goodsList[0].goodsSpecs[0].goodsId+'" data-specid="'+_length[i].goodsList[0].goodsSpecs[0].id+'" data-quantity="'+_length[i].goodsList[0].goodsSpecs[0].buyNum+'">'
                                    // <!--头部店铺选择-->
                                        +'<div class="shoppingCart_wareStore"> <div class="shop"></div> <span class="warp_Lt">'+_length[i].name+'</span> <div class="quiet"></div> <span class="warp_Rg myOrder_reveal" >等待买家付款</span> </div>'
                                    // <!--商品属性展示区-->
                                        +'<div class="shoppingCart_wareDetails">'
                                        +'<div class="shoppingCart_wareDetailTxt">'
                                        +'<div class="print"><img src="'+_length[i].goodsList[0].carouselPicture+'" alt=""></div>'
                                        +'<div class="shoppingCart_wareTxt"> <div class="myOrder_revealArea warp_Lt"> <span class="warp_lC" style="height: 30px;">'+_length[i].goodsList[0].name+'</span> <span style="color: #cccccc;display: block" id="colors"></span> <div class="myOrder_quality">七天包退</div> </div> <div class="myOrder_reverlAreaL warp_Rg"> <span style="color:#E60012" id="monrys">￥'+_length[i].goodsList[0].price+'</span> <span style="text-decoration:line-through;">￥400.00</span> <br/><br/> <span id="numss">X'+_length[i].goodsList[0].goodsSpecs[0].buyNum+'</span> </div> </div>'
                                        +'</div>'
                                        +'</div>'
                                    // <!--结算区-->
                                        +'<div class="myOrder_freight bB" style="padding-left: 10%;padding-right: 3%;color: #333"> <p>运费险<span style="font-size: .875rem;" class="warp_Rg">¥0.00</span></p> <p style="margin-top: 3px;">实付（含运费）<span class="warp_Rg" style="color: #EB6100">￥<span style="font-size: .9375rem" id="shijiMoney">'+_length[i].goodsList[0].price*_length[i].goodsList[0].goodsSpecs[0].buyNum+'</span></span></p> </div>'
                                        +'</div>'


                            }
                            $('.pendingReceipt').html(str);
                            var arr =[];
                            var nums=0;
                            $('.shoppingCart_wareArea').each(function(){
                                nums +=parseFloat($(this).find('#shijiMoney').text());
                                arr.push({storeId:$(this).data('storeid'),expressValue:0,isGold:1,discount:0,consignee:$('#logisticsAreaName').text(),mobile:dataGet('mobile'),zipCode:dataGet('zipCode'),province:dataGet('cityCode'),provinceName:dataGet('cityText'),city:dataGet('provinceCode'),cityName:dataGet('provinceText'),county:dataGet('countyCode'),countyName:dataGet('countyText'),address:dataGet('address'),orderGoods:[{productId:$(this).data('productid'),specId:$(this).data('specid'),quantity:$(this).data('quantity'),mode:0}]})
                            })
                            $('#sumMoney').html((nums-_thisData.goldSumFrozen));
                            dataSave('orderarr',JSON.stringify(arr));
                        dataSave('bind',_thisData.goldSumFrozen)
                        dataSave('numsMoney',nums)
                    }
                }
            });
        }


        $('.selectfoot').click(function(){
            var urlThree = WEB_URL + '/api/orderMall/add' ;//生成订单
            var data     =dataGet('orderarr')
            $.ajax({
                type:'POST',
                dataType:'json',
                url:urlThree,
                data: data,
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        alert(data.msg);
                    }else{

                        dataSave('PayId', data.data[0].id);//支付商品id
                        console.log(data.data);
                    }
                }
            });
            if($(this).attr('class') == 'voucherCenter_Area first'){
                console.log($(this))
                $(this).children().removeClass('rSelected');
            }else{
                $(".wantToRecharge_shady").show();
                $(".wantToRecharge_payment").slideToggle();
                $(".wantToRechargePay").show();
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

    // $('.defray').click(function(){
    // $('.defray').removeClass('change');
    // $(this).addClass('change');
    // $('.defray').find('div').removeClass('warp_Lt').addClass('warp_Rg');
    // $(this).find('div').removeClass('warp_Rg').addClass('warp_Lt');

// });
    warp_Rg:function(btn){
        if($(btn).hasClass('change')){
            $(btn).removeClass('change');
            $(btn).find('div').removeClass('warp_Lt').addClass('warp_Rg');
            $('#sumMoney').html(parseFloat(dataGet('numsMoney'))-parseFloat(dataGet('bind')))
            dataSave('orderarr',JSON.stringify([{storeId:$('.shoppingCart_wareArea').data('storeid'),expressValue:0,isGold:0,discount:0,consignee:$('#logisticsAreaName').text(),mobile:dataGet('mobile'),zipCode:dataGet('zipCode'),province:dataGet('cityCode'),provinceName:dataGet('cityText'),city:dataGet('provinceCode'),cityName:dataGet('provinceText'),county:dataGet('countyCode'),countyName:dataGet('countyText'),address:dataGet('address'),orderGoods:[{productId:$('.shoppingCart_wareArea').data('productid'),specId:$('.shoppingCart_wareArea').data('specid'),quantity:$('.shoppingCart_wareArea').data('quantity'),mode:0}]}]));
        }else{
            $('.defray').removeClass('change');
            $(btn).addClass('change');
            $('.defray').find('div').removeClass('warp_Lt').addClass('warp_Rg');
            $(btn).find('div').removeClass('warp_Rg').addClass('warp_Lt');
            $('#sumMoney').html(dataGet('numsMoney'))
            dataSave('orderarr',JSON.stringify([{storeId:$('.shoppingCart_wareArea').data('storeid'),expressValue:0,isGold:1,discount:0,consignee:$('#logisticsAreaName').text(),mobile:dataGet('mobile'),zipCode:dataGet('zipCode'),province:dataGet('cityCode'),provinceName:dataGet('cityText'),city:dataGet('provinceCode'),cityName:dataGet('provinceText'),county:dataGet('countyCode'),countyName:dataGet('countyText'),address:dataGet('address'),orderGoods:[{productId:$('.shoppingCart_wareArea').data('productid'),specId:$('.shoppingCart_wareArea').data('specid'),quantity:$('.shoppingCart_wareArea').data('quantity'),mode:0}]}]));
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
                            var id = dataGet('PayId');//id
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
                            var id = dataGet('PayId');//id
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
                    console.log(data.msg);
                    alert(data.msg)
                    if(data.msg == '支付密码错误'){
                        $('#passwords').val('');
                    }else if (data.msg == '账户余额不足'){
                        Views.wantToRechargeView.show();
                    }
                    // Views.fillinNewPasswordView.show();
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
        $('.wantToRecharge_shady').hide();
        $('.wantToRecharge_payment').hide();
    },
    orderDetails_logistics:function(){
        Views.addressManagementView.show();
    }

})
/***********************确认订单end**********************/
/***********************商品列表start**********************/
Views.commodityListView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'commodityList',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var urlTwo      = WEB_URL + '/api/indexSearch/product/search';
        var name        =name;
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
                    Views.commodityListView.show();
                }
            }
        });



        $(function() {
            //导航条的显示隐藏
            $('#more').click(function(e){
                var state =$('#sDNew').attr("data-state");
                if(state == "hide"){
                    $('#sDNew').show();
                    $('#sDNew').attr("data-state","show");
                }else{
                    $('#sDNew').hide();
                    $('#sDNew').attr("data-state","hide");
                }
                $(document).click(function(){
                    $('#sDNew').hide();
                    $('#sDNew').attr("data-state","hide");
                })
                e.stopPropagation();
            });

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
            });
            // 排序
            $('.sort .right').click(function(){
                // $('#showsss').append('<i><img src="images/storeDetails/icon_02.png" alt=""></i>').addClass('showsss').css('color','#666');
                $('#showsss img').attr('src','images/storeDetails/icon_02.png');
                $('#showsss').addClass('showsss').css('color','#666');
                $('#fixed').hide();
                });
            $('.left .type').click(function(){
                if($(this).attr('id')=='showsss'){
                    $('.left .type').removeClass('actives').find('i').remove();
                    $(this).addClass('actives');
                }else{
                    $('.left .type').removeClass('actives').find('i').remove();
                    $(this).addClass('actives');
                    $('#showsss').append('<i><img src="images/storeDetails/icon_02.png" alt=""></i>').addClass('showsss').css('color','#666');
                    $('#fixed').hide();
                }
            });
            $('#showsss').click(function(e){
                if($(this).hasClass('showsss')){
                    $(this).append('<i><img src="images/storeDetails/icon_01.png" alt=""></i>').removeClass('showsss').css('color','#f00');
                    $('#fixed').show();
                }else{
                    $(this).append('<i><img src="images/storeDetails/icon_02.png" alt=""></i>').addClass('showsss').css('color','#666');
                    $('#fixed').hide();
                }
                $(document).click(function(){
                    $('#showsss img').attr('src','images/storeDetails/icon_02.png');
                    $('#showsss').addClass('showsss').css('color','#666');
                    $('#fixed').hide();
                });
                e.stopPropagation();
            });
            $('#fixed .fixed_sort').click(function(){
                $('#fixed_list .fixed_sort').removeClass('fixed_list_active').find('i').remove();
                $(this).addClass('fixed_list_active').append('<i><img src="images/storeDetails/icon_03.png" alt=""></i>');
                $('#fixed').hide();
                $('#showsss img').attr('src','images/storeDetails/icon_02.png');
                $('#showsss').addClass('showsss').css('color','#666');
                $('#fixed').hide();
            });
        })
    },

    //商品详情
    commodityDetails:function(){
        Views.commodityDetailsView.show();
    },
})
/***********************商品列表end**********************/