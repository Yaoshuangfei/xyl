/**
 * Created by Administrator on 2017/5/19 0019.
 */
/***********************首页**********************/
Views.indexView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'index',
        hasFootNav: true,
        footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
        $('#tel').css('display','none');
        $('#index').css('display','block');
        $('#asd').css('display','none');
    },

    didShow: function () {


        var Urlss   =   WEB_URL + '/api/coreUser/userInfo/refresh';
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: Urlss,
            data: {},
            contentType: 'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            },
            success: function (data) {
                if (!data.success) {
                    alert(data.msg);
                } else {
                    // console.log(data)
                }
            }
        });

        var url = WEB_URL + '/api/indexAdvert/app/list';//首页顶部banner
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: url,
            data: {},
            contentType: 'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            },
            success: function (data) {
                if (!data.success) {
                    alert(data.msg);
                } else {
                    var _length = data.data.list;
                    var str = ''
                    for (var i = 0; i < _length.length; i++) {
                        str += '<div class="swiper-slide index_head ui_btn" data-action="banner_link">'
                            + '<img src="' + _length[i].picture + '" alt="" style="height:232px;width:100%;">'
                            + '</div>'

                    }
                    $('#swiper_sort').html(str);
                    var swiper1 = new Swiper('.swiper1', {
                        loop: true,
                        autoplay: 3000,

                    });
                }
            }
        });

        var urlOne = WEB_URL + '/api/indexProductConf/app/list/one';//火爆商品
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
                    $('.index_fireStorm').remove();
                }else{
                    var _length = data.data.listGoods;
                    var styleId = data.data.styleId;
                    dataSave('styleId',styleId);
                    var str     = '';
                    var Vimg    ='';
                    if(styleId==8){
                        //蓝色
                        $('.index_warp .index_top').css('background','#007cc3');
                        $('.index_footer').css('background-color','#007cc3');
                        $('.swiper2').show();
                        $('.styleRed').hide();
                        $('.styleBlack').hide();
                        $('#imgssss').attr('src','images/index/tel.png');
                        for(var i=0;i<_length.length;i++){
                            if(_length[i].carouselPicture==null){
                                _length[i].carouselPicture = ''
                            }else{
                                _length[i].carouselPicture = _length[i].carouselPicture.split(',')[0];
                            }
                            str +='<div class="swiper-slide ui_btn" data-action="commodityDetails" data-uuid="'+_length[i].id+'">'
                                +'<img src="'+_length[i].carouselPicture+'" alt="">'
                                +'</div>'
                        }
                        $('#swiper_hot').html(str);
                    }else if(styleId==9){
                        //黑色
                        $('.index_warp .index_top').css('background','#333');
                        $('.index_footer').css('background-color','#333');
                        $('.swiper2').hide();
                        $('.styleRed').hide();
                        $('.styleBlack').show();
                        $('#imgssss').attr('src','images/index/telblack.png');

                    }else if(styleId==10){
                        //红色
                        $('.index_warp .index_top').css('background','#e64b42');
                        $('.index_footer').css('background-color','#e64b42');
                        $('.swiper2').hide();
                        $('.styleRed').show();
                        $('.styleBlack').hide();
                        $('#imgssss').attr('src','images/index/telred.png');
                    }
                }
                var swiper2 = new Swiper('.swiper2', {
                    loop: false,
                    freeMode : true,
                    freeModeMomentumRatio :0.5,
                    slidesPerView:2,
                    spaceBetween:2,
                });
                $('#swiper_hot').find('img').addClass('advert');
            }
        });

        var urlTwo = WEB_URL + '/api/indexProductConf/app/list/two?pageNum=1&pageSize=20' //猜你喜欢
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwo,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data)
                    var _length = data.data.listGoods;
                    var str     = '';
                    var Vimg    ='';
                    for(var i=0;i<_length.length;i++){
                        if(_length[i].carouselPicture==null){
                            _length[i].carouselPicture = ''
                        }else{
                            _length[i].carouselPicture = _length[i].carouselPicture.split(',')[0];
                        }
                        if(_length[i].goodsDesc==null){
                            _length[i].goodsDesc = '该商品暂无简介'
                        }else{
                            _length[i].goodsDesc = _length[i].goodsDesc;
                        }
                        str +='<div class="guessYoulike_area  ui_btn" data-uuid="'+_length[i].id+'" data-action="commodityDetails">'
                            +'<div class="guessYoulike_area_img"><img src="'+_length[i].carouselPicture+'" alt=""></div>'
                            +'<div class="guessYoulike_area_txt">'
                            +'<span>'+_length[i].name+'</span>'
                            +'<span>'+_length[i].goodsDesc+'</span>'
                            +'<span>￥ </span>'
                            +'<span style="margin-right: 8px;">'+_length[i].price+'</span>'
                            +'<span>'+_length[i].price+'付款</span>'
                            +'<div class="dian"></div>'
                            +'</div>'
                            +'</div>'
                    }
                    $('#max_width').html(str);
                }
            }
        });
        $(function(){
            var str = $('#ips').html().substring(78);
            var ip	=eval('('+str+')').ip;
            dataSave('ipAddress',ip);
        });

    },
    // banner_link:function(){
    //     Views.storeDetailsView.show();
    // },
    //跳转到消息
    information:function(){
        Views.informationView.show();
    },

    //搜索
    seach:function(){
        Views.rakeThroughView.show();
    },

    //公益
    raise:function(){
        Views.raiseListView.show();
        $('#tel').css('display','none');
        $('#index').css('display','none');
        $('#asd').css('display','block');
    },

    //扫码支付
    payment:function(){
        Views.sweepCodeHomeView.show();
    },

    //个人美妆
    classification:function(){
        Views.classificationView.show();
    },

    //充值
    recharge:function(){
        Views.voucherCenterView.show();
    },

    //商品详情
    commodityDetails:function(btn){
            dataSave('commodityUuid', $(btn).attr('data-uuid'));//商品ID
        Views.commodityDetailsView.show();
    },
})


