﻿/**
 * Created by Administrator on 2017/5/19 0019.
 */
/***********************搜索**********************/
Views.rakeThroughView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'rakeThrough',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

                $(".eye").click(function(){
                if($(this).hasClass("seSelected")) {
                    $(this).removeClass("seSelected");
                    $(this).parent().parent().find(".searchInput").hide();
                    $(this).parent().parent().find(".rankThrough_record").show();
                }else {
                    $(this).addClass("seSelected");
                    $(this).parent().parent().find(".searchInput").show();
                    $(this).parent().parent().find(".rankThrough_record").hide();
                }
            });

        var urlSS         = WEB_URL + '/api/indexSearch/select/list';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlSS,
            data: {},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    alert(data.msg);
                }else{
                    console.log(data);
                    if(data.data==null){
                        $('#rankThrough_record').html('<div class="rankThrough_historyIcon ui_btn">暂无历史记录</div>');
                    }else{
                        var _length = data.data.searchStore.records;
                        var strA    = '';
                        if(_length.length ==0){
                            $('.rankThrough_historyTop').hide();
                            $('.history').html('<p style="text-align: center"><img src="images/null.png"></p>')
                        }else{
                            for (var i=0;i<_length.length;i++){
                                strA +='<div class="rankThrough_historyIcon ui_btn" data-action="shopping_list" data-id="'+_length[i].id+'">'+_length[i].content+'</div>'
                            }
                            // $('#rankThrough_record').html(strA);
                            // console.log(strA);
                        }
                        var _lengths = data.data.searchProduct.records;
                        var strB    = '';
                        if(_lengths.length ==0 && _length.length ==0){
                            $('.rankThrough_historyTop').hide();
                            $('.history').html('<p style="text-align: center"><img src="images/null.png"></p>')
                        }else{
                            for (var j=0;j<_lengths.length;j++){
                                strB +='<div class="rankThrough_historyIcon ui_btn" data-action="shopping_list" data-id="'+_lengths[j].id+'">'+_lengths[j].content+'</div>'
                            }
                            // $('#rankThrough_record').html(strA);
                            console.log(strB);
                        }
                        $('#rankThrough_record').html(strA+strB);
                    }
                }
            }
        });
//绑定输入框，这里只能 是ID
        $("#searchdd").keydown(function(event){
            event=document.all?window.event:event;
            if((event.keyCode || event.which)==13){
                if($('#searchdd').val() == ''){
                    alert('请输入您需要搜索的商品或店铺')
                }else{
                    var names        =$('#searchdd').val();
                    dataSave('proName',$('#searchdd').val());
                    if($('#searchSel_demo').text() === '商家'){
                        var url         = WEB_URL + '/api/indexSearch/store/search';
                        var name        =names;
                        var isVolume    =true;
                        var isAvgEva    =true;
                        var pageNum     =1;
                        var size        =20;
                        var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
                        Views.searchShopView.show();
                    }else{
                        var urlTwo      = WEB_URL + '/api/indexSearch/product/search';
                        var name        =names;
                        var isVolume    =true;
                        var isAvgEva    =true;
                        var pageNum     =1;
                        var size        =20;
                        var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
                        Views.sCommodityListView.show();
                        // $.ajax({
                        //     type:'POST',
                        //     dataType:'json',
                        //     url:urlTwo,
                        //     data: JSON.stringify(data),
                        //     contentType:'application/json;charset=utf-8',
                        //     error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        //     success:function(data){
                        //         if(!data.success){
                        //             console.log(data.msg);
                        //         }else{
                        //             Views.sCommodityListView.show();
                        //         }
                        //     }
                        // });
                    }
                }
            }
        });
    },
    del:function(){
        $('#fixed_close').show();
    },
    shopping_list:function(btn){
        // Views.commodityDetailsView.show();
        $('#searchdd').val($(btn).text());
    },
    searchSel_demo:function(btn){
        if($('.new').css('display')=='none'){
            $(btn).find('.new').show();
            $('#PPPP').show();
        }else{
            $(btn).find('.new').hide();
            $('#PPPP').hide();
        }
    },
    asdasdas:function(btn){
        $('#searchSel_demo').html($(btn).html()+'<span style="float:right;margin-right: 20%;"><img src="images/index/icon_01.png" alt=""></span>');

        $('#PPPP').hide()
        if($(btn).html()=='商家'){
            var urlSS         = WEB_URL + '/api/indexSearch/select/list';
            $.ajax({
                type:'POST',
                dataType:'json',
                url:urlSS,
                data: {},
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        alert(data.msg);
                    }else{
                    }
                }
            });
        }else{
            var urlSS         = WEB_URL + '/api/indexSearch/select/list';
            $.ajax({
                type:'POST',
                dataType:'json',
                url:urlSS,
                data: {},
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        alert(data.msg);
                    }else{
                    }
                }
            });
        }
        // $(btn).parent().css('display','none');
    },
    scearchssss:function(){
        if($('#searchdd').val() == ''){
            alert('请输入您需要搜索的商品或店铺')
        }else{
            var names        =$('#searchdd').val();
            dataSave('proName',$('#searchdd').val());
            if($('#searchSel_demo').text() === '商家'){
                var url         = WEB_URL + '/api/indexSearch/store/search';
                var name        =names;
                var isVolume    =true;
                var isAvgEva    =true;
                var pageNum     =1;
                var size        =20;
                var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
                Views.searchShopView.show();
            }else{
                var urlTwo      = WEB_URL + '/api/indexSearch/product/search';
                var name        =names;
                var isVolume    =true;
                var isAvgEva    =true;
                var pageNum     =1;
                var size        =20;
                var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
                Views.sCommodityListView.show();
                // $.ajax({
                //     type:'POST',
                //     dataType:'json',
                //     url:urlTwo,
                //     data: JSON.stringify(data),
                //     contentType:'application/json;charset=utf-8',
                //     error: function (XMLHttpRequest, textStatus, errorThrown) {},
                //     success:function(data){
                //         if(!data.success){
                //             console.log(data.msg);
                //         }else{
                //             Views.sCommodityListView.show();
                //         }
                //     }
                // });
            }
        }
    },
    dels:function(){
        var str=[]
        $('.rankThrough_historyIcon').each(function(){
            str.push($(this).data('id'))
        })
        var join = str.join(",");
        var url  = WEB_URL + '/api/indexSearch/delete/batchIds';
        var ids  =join;
        var data ={ids:ids};
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
                }
            }
        });
        $('#fixed_close').hide();
        Views.rakeThroughView.show();
    },
    cels:function(){
        $('#fixed_close').hide();
        Views.rakeThroughView.show();
    },
    warp_Rg:function(){
        Views.indexView.show();
    }
});

/***********************搜索商家start**********************/
Views.searchShopView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'searchShop',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();


            var url         = WEB_URL + '/api/indexSearch/store/search';
            var name        =dataGet('proName');
            var isVolume    =true;
            var isAvgEva    =true;
            var pageNum     =1;
            var size        =20;
            var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
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
                        var _slef = data.data.list;
                        if(_slef == null || _slef == 0){
                            $('#ss_shop').html('<p style="text-align: center;"><img src="images/null.png"></p>');
                        }else{
                            var str   ='';
                            for (var i=0;i<_slef.length;i++){
                                var strs   ='';
                                if (_slef[i].logo == null){
                                    _slef[i].logo = 'images/storeDetails/head.png'
                                }else{
                                    _slef[i].logo =_slef[i].logo;
                                };
                                if(_slef[i].orderSum == null){
                                    _slef[i].orderSum = 0
                                }else{
                                    _slef[i].orderSum=_slef[i].orderSum;
                                }
                                for(var j=0;j<_slef[i].goodsList.length;j++){
                                    if(_slef[i].goodsList.length == 0){
                                        strs +='<div class="picBox">暂无图片</div>'
                                    }else{
                                        strs +='<div class="picBox"><img src="'+_slef[i].goodsList[j].carouselPicture+'"></div>'
                                    }
                                }
                                str +='<div class="ss_shop">'
                                    +'<div class="shopData">'
                                    +'<div class="pic"><img src="'+_slef[i].logo+'"/></div>'
                                    +'<div class="sdData">'
                                    +'<div class="name">'+_slef[i].name+'</div>'
                                    +'<div class="number">销量：'+_slef[i].orderSum+'</div>'
                                    +'</div>'
                                    +'<div class="goIn ui_btn" data-action="jindian" data-dpid="'+_slef[i].id+'">进店</div>'
                                    +'</div>'
                                    +'<div class="shopPic">'+strs+'</div>'
                                    +'</div>'
                                // '+_slef[i].goodsList[i].carouselPicture+'
                            }
                            $('#ss_shop').html(str);
                        }

                    }
                }
            });


        //绑定输入框，这里只能 是ID
        $(".search input").keydown(function(event){
            event=document.all?window.event:event;
            if((event.keyCode || event.which)==13){
                if($('.search input').val() == ''){
                    alert('请输入您需要搜索的商品或店铺')
                }else{
                    dataSave('proName',$('.search input').val());
                    var url         = WEB_URL + '/api/indexSearch/store/search';
                    var name        =$('.search input').val();
                    var isVolume    =true;
                    var isAvgEva    =true;
                    var pageNum     =1;
                    var size        =20;
                    var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
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
                                // alert(data.data.list[0].name);
                                // Views.searchShopView.show();
                                console.log(data.data)
                                var _slef = data.data.list;
                                var str   ='';
                                for (var i=0;i<_slef.length;i++){
                                    var strs   ='';
                                    if (_slef[i].logo == null){
                                        _slef[i].logo = 'images/storeDetails/head.png'
                                    }else{
                                        _slef[i].logo =_slef[i].logo;
                                    };
                                    if(_slef[i].orderSum == null){
                                        _slef[i].orderSum = 0
                                    }else{
                                        _slef[i].orderSum=_slef[i].orderSum;
                                    }
                                    for(var j=0;j<_slef[i].goodsList.length;j++){
                                        if(_slef[i].goodsList.length == 0){
                                            strs +='<div class="picBox">暂无图片</div>'
                                        }else{
                                            strs +='<div class="picBox"><img src="'+_slef[i].goodsList[j].carouselPicture+'"></div>'
                                        }
                                    }
                                    str +='<div class="ss_shop">'
                                        +'<div class="shopData">'
                                        +'<div class="pic"><img src="'+_slef[i].logo+'"/></div>'
                                        +'<div class="sdData">'
                                        +'<div class="name">'+_slef[i].name+'</div>'
                                        +'<div class="number">销量：'+_slef[i].orderSum+'</div>'
                                        +'</div>'
                                        +'<div class="goIn ui_btn" data-action="jindian" data-dpid="'+_slef[i].id+'">进店</div>'
                                        +'</div>'
                                        +'<div class="shopPic"> '+strs+'</div>'
                                        +'</div>'
                                }
                                $('#ss_shop').html(str);
                            }
                        }
                    });
                }
            }
        });



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
            // $('.ssSort .right').click(function(){
            //     $('.screen').show();
            //     $('.ssMask').show();
            // })

            //筛选关闭
            $('.screen .close').click(function(){
                $('.screen').hide();
                $('.ssMask').hide();
            })
            $('.ssMask').click(function(){
                $('.screen').hide();
                $('.ssMask').hide();
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
    jindian:function(btn){
        dataSave('storeId',$(btn).data('dpid'));
        Views.storeDetailsView.show();
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
        alert('网站域名未备案，暂无法分享')
        // $('#bgMask').show();
        // $('#sDNew').hide();
        // $('#shareShowT').show();
        // $('#shareShowT').animate({
        //     bottom:0
        // });
    },
    // 账号排名
    zh:function(){
        var url         = WEB_URL + '/api/indexSearch/store/search';
        var name        =dataGet('proName');
        var isVolume    =true;
        var isAvgEva    =true;
        var pageNum     =1;
        var size        =20;
        var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
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
                    var _slef = data.data.list;
                    var str   ='';
                    for (var i=0;i<_slef.length;i++){
                        var strs   ='';
                        if (_slef[i].logo == null){
                            _slef[i].logo = 'images/storeDetails/head.png'
                        }else{
                            _slef[i].logo =_slef[i].logo;
                        };
                        if(_slef[i].orderSum == null){
                            _slef[i].orderSum = 0
                        }else{
                            _slef[i].orderSum=_slef[i].orderSum;
                        }
                        for(var j=0;j<_slef[i].goodsList.length;j++){
                            if(_slef[i].goodsList.length == 0){
                                strs +='<div class="picBox">暂无图片</div>'
                            }else{
                                strs +='<div class="picBox"><img src="'+_slef[i].goodsList[j].carouselPicture+'"></div>'
                            }
                        }
                        str +='<div class="ss_shop">'
                            +'<div class="shopData">'
                            +'<div class="pic"><img src="'+_slef[i].logo+'"/></div>'
                            +'<div class="sdData">'
                            +'<div class="name">'+_slef[i].name+'</div>'
                            +'<div class="number">销量：'+_slef[i].orderSum+'</div>'
                            +'</div>'
                            +'<div class="goIn ui_btn" data-action="jindian" data-dpid="'+_slef[i].id+'">进店</div>'
                            +'</div>'
                            +'<div class="shopPic">'+strs+' </div>'
                            +'</div>'
                    }
                    $('#ss_shop').html(str);
                }
            }
        });
    },
    // 按销量排名
    xl:function(){
        var url         = WEB_URL + '/api/indexSearch/store/search';
        var name        =dataGet('proName');
        var isVolume    =true;
        var isAvgEva    =false;
        var pageNum     =1;
        var size        =20;
        var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
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
                    var _slef = data.data.list;
                    var str   ='';
                    for (var i=0;i<_slef.length;i++){
                        var strs   ='';
                        if (_slef[i].logo == null){
                            _slef[i].logo = 'images/storeDetails/head.png'
                        }else{
                            _slef[i].logo =_slef[i].logo;
                        };
                        if(_slef[i].orderSum == null){
                            _slef[i].orderSum = 0
                        }else{
                            _slef[i].orderSum=_slef[i].orderSum;
                        }
                        for(var j=0;j<_slef[i].goodsList.length;j++){
                            if(_slef[i].goodsList.length == 0){
                                strs +='<div class="picBox">暂无图片</div>'
                            }else{
                                strs +='<div class="picBox"><img src="'+_slef[i].goodsList[j].carouselPicture+'"></div>'
                            }
                        }
                        str +='<div class="ss_shop">'
                            +'<div class="shopData">'
                            +'<div class="pic"><img src="'+_slef[i].logo+'"/></div>'
                            +'<div class="sdData">'
                            +'<div class="name">'+_slef[i].name+'</div>'
                            +'<div class="number">销量：'+_slef[i].orderSum+'</div>'
                            +'</div>'
                            +'<div class="goIn ui_btn" data-action="jindian" data-dpid="'+_slef[i].id+'">进店</div>'
                            +'</div>'
                            +'<div class="shopPic"> '+strs+'</div>'
                            +'</div>'
                    }
                    $('#ss_shop').html(str);
                }
            }
        });
    },
    // 按好评
    hp:function(){
        var url         = WEB_URL + '/api/indexSearch/store/search';
        var name        =dataGet('proName');
        var isVolume    =false;
        var isAvgEva    =true;
        var pageNum     =1;
        var size        =20;
        var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
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
                    var _slef = data.data.list;
                    var str   ='';
                    for (var i=0;i<_slef.length;i++){
                        var strs   ='';
                        if (_slef[i].logo == null){
                            _slef[i].logo = 'images/storeDetails/head.png'
                        }else{
                            _slef[i].logo =_slef[i].logo;
                        };
                        if(_slef[i].orderSum == null){
                            _slef[i].orderSum = 0
                        }else{
                            _slef[i].orderSum=_slef[i].orderSum;
                        }
                        for(var j=0;j<_slef[i].goodsList.length;j++){
                            if(_slef[i].goodsList.length == 0){
                                strs +='<div class="picBox">暂无图片</div>'
                            }else{
                                strs +='<div class="picBox"><img src="'+_slef[i].goodsList[j].carouselPicture+'"></div>'
                            }
                        }
                        str +='<div class="ss_shop">'
                            +'<div class="shopData">'
                            +'<div class="pic"><img src="'+_slef[i].logo+'"/></div>'
                            +'<div class="sdData">'
                            +'<div class="name">'+_slef[i].name+'</div>'
                            +'<div class="number">销量：'+_slef[i].orderSum+'</div>'
                            +'</div>'
                            +'<div class="goIn ui_btn" data-action="jindian" data-dpid="'+_slef[i].id+'">进店</div>'
                            +'</div>'
                            +'<div class="shopPic"> '+strs+'</div>'
                            +'</div>'
                    }
                    $('#ss_shop').html(str);
                }
            }
        });
    },
    // 搜索店家
    search_r:function(){
        dataSave('proName',$('.search input').val());
        var url         = WEB_URL + '/api/indexSearch/store/search';
        var name        =$('.search input').val();
        var isVolume    =true;
        var isAvgEva    =true;
        var pageNum     =1;
        var size        =20;
        var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
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
                    // alert(data.data.list[0].name);
                    // Views.searchShopView.show();
                    console.log(data.data)
                    var _slef = data.data.list;
                    var str   ='';
                    for (var i=0;i<_slef.length;i++){
                        var strs   ='';
                        if (_slef[i].logo == null){
                            _slef[i].logo = 'images/storeDetails/head.png'
                        }else{
                            _slef[i].logo =_slef[i].logo;
                        };
                        if(_slef[i].orderSum == null){
                            _slef[i].orderSum = 0
                        }else{
                            _slef[i].orderSum=_slef[i].orderSum;
                        }
                        for(var j=0;j<_slef[i].goodsList.length;j++){
                            if(_slef[i].goodsList.length == 0){
                                strs +='<div class="picBox">暂无图片</div>'
                            }else{
                                strs +='<div class="picBox"><img src="'+_slef[i].goodsList[j].carouselPicture+'"></div>'
                            }
                        }
                        str +='<div class="ss_shop">'
                            +'<div class="shopData">'
                            +'<div class="pic"><img src="'+_slef[i].logo+'"/></div>'
                            +'<div class="sdData">'
                            +'<div class="name">'+_slef[i].name+'</div>'
                            +'<div class="number">销量：'+_slef[i].orderSum+'</div>'
                            +'</div>'
                            +'<div class="goIn ui_btn" data-action="jindian" data-dpid="'+_slef[i].id+'">进店</div>'
                            +'</div>'
                            +'<div class="shopPic"> '+strs+'</div>'
                            +'</div>'
                    }
                    $('#ss_shop').html(str);
                }
            }
        });
    }
})
/***********************搜索商家end**********************/


/***********************搜索店铺start**********************/
Views.sCommodityListView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'sCommodityList',
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
            var name        =dataGet('proName');
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
                    console.log(data.data.list);
                    if(data.data.list == '' || data.data.list == null){
                        $('#clProduct').html('<p style="text-align: center;"><img src="images/null.png"></p>');
                    }else{
                        var _self   = data.data.list;
                        var str     = '';
                        for (var i=0;i<_self.length;i++){
                            if(_self[i].carouselPicture==null){
                                _self[i].carouselPicture = 'icon.png'
                            }else{
                                _self[i].carouselPicture = _self[i].carouselPicture.split(',')[0];
                            }
                            str +='<div class="clProduct ui_btn" data-action="joinDp" data-spid="'+_self[i].id+'" style="margin-bottom: 10px;">'
                                +'<div class="productPic fL"><img src="'+_self[i].carouselPicture+'" alt=""></div>'
                                +'<div class="productDesc fR">'
                                +'<div class="descTitle">'+_self[i].name+'</div>'
                                +'<div class="descIp"> <div class="ipTop">杭州</div> <div class="express">包邮</div> </div>'
                                +'<div class="count">'
                                +'<div class="price fL"><span>￥</span>'+_self[i].price+'</div>'
                                +'<div class="paymentNumber fL">'+_self[i].paidNum+'付款</div>'
                                +'<div class="more fR"></div>'
                                +'</div>'
                                +'</div>'
                                +'</div>'
                        }
                        $('#clProduct').html(str);
                    }

                }
            }
        });


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
            // $('.slSort .right').click(function(){
            //     $('.screen').show();
            //     $('.slMask').show();
            // })

            //筛选关闭
            $('.screen .close').click(function(){
                $('.screen').hide();
                $('.slMask').hide();
            })
            $('.slMask').click(function(){
                $('.screen').hide();
                $('.slMask').hide();
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
    joinDp:function(btn){
        dataSave('commodityUuid',$(btn).data('spid'));
        Views.commodityDetailsView.show();

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
        alert('网站域名未备案，暂无法分享')
        // $('#bgMask').show();
        // $('#sDNew').hide();
        // $('#shareShowT').show();
        // $('#shareShowT').animate({
        //     bottom:0
        // });
    },
    // 账号排名
    zh:function(){
        var url         = WEB_URL + '/api/indexSearch/product/search';
        var name        =dataGet('proName');
        var isVolume    =null;
        var isAvgEva    =null;
        var pageNum     =1;
        var size        =20;
        var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
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
                    console.log(data.data.list);
                    var _self   = data.data.list;
                    var str     = '';
                    for (var i=0;i<_self.length;i++){
                        if(_self[i].carouselPicture==null){
                            _self[i].carouselPicture = 'icon.png'
                        }else{
                            _self[i].carouselPicture = _self[i].carouselPicture.split(',')[0];
                        }
                        str +='<div class="clProduct ui_btn" data-action="joinDp" data-spid="'+_self[i].id+'" style="margin-bottom: 10px;">'
                            +'<div class="productPic fL"><img src="'+_self[i].carouselPicture+'" alt=""></div>'
                            +'<div class="productDesc fR">'
                            +'<div class="descTitle">'+_self[i].name+'</div>'
                            +'<div class="descIp"> <div class="ipTop">杭州</div> <div class="express">包邮</div> </div>'
                            +'<div class="count">'
                            +'<div class="price fL"><span>￥</span>'+_self[i].price+'</div>'
                            +'<div class="paymentNumber fL">'+_self[i].paidNum+'付款</div>'
                            +'<div class="more fR"></div>'
                            +'</div>'
                            +'</div>'
                            +'</div>'
                    }
                    $('#clProduct').html(str);
                }
            }
        });
    },
    // 按销量排名
    xl:function(){
        var url         = WEB_URL + '/api/indexSearch/product/search';
        var name        =dataGet('proName');
        var isVolume    =true;
        var isAvgEva    =null;
        var pageNum     =1;
        var size        =20;
        var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
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
                    console.log(data.data.list);
                    var _self   = data.data.list;
                    var str     = '';
                    for (var i=0;i<_self.length;i++){
                        if(_self[i].carouselPicture==null){
                            _self[i].carouselPicture = 'icon.png'
                        }else{
                            _self[i].carouselPicture = _self[i].carouselPicture.split(',')[0];
                        }
                        str +='<div class="clProduct ui_btn" data-action="joinDp" data-spid="'+_self[i].id+'" style="margin-bottom: 10px;">'
                            +'<div class="productPic fL"><img src="'+_self[i].carouselPicture+'" alt=""></div>'
                            +'<div class="productDesc fR">'
                            +'<div class="descTitle">'+_self[i].name+'</div>'
                            +'<div class="descIp"> <div class="ipTop">杭州</div> <div class="express">包邮</div> </div>'
                            +'<div class="count">'
                            +'<div class="price fL"><span>￥</span>'+_self[i].price+'</div>'
                            +'<div class="paymentNumber fL">'+_self[i].paidNum+'付款</div>'
                            +'<div class="more fR"></div>'
                            +'</div>'
                            +'</div>'
                            +'</div>'
                    }
                    $('#clProduct').html(str);
                }
            }
        });
    },
    // 按好评
    hp:function(){
        var url         = WEB_URL + '/api/indexSearch/product/search';
        var name        =dataGet('proName');
        var isVolume    =null;
        var isAvgEva    =true;
        var pageNum     =1;
        var size        =20;
        var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
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
                    console.log(data.data.list);
                    var _self   = data.data.list;
                    var str     = '';
                    for (var i=0;i<_self.length;i++){
                        if(_self[i].carouselPicture==null){
                            _self[i].carouselPicture = 'icon.png'
                        }else{
                            _self[i].carouselPicture = _self[i].carouselPicture.split(',')[0];
                        }
                        str +='<div class="clProduct ui_btn" data-action="joinDp" data-spid="'+_self[i].id+'" style="margin-bottom: 10px;">'
                            +'<div class="productPic fL"><img src="'+_self[i].carouselPicture+'" alt=""></div>'
                            +'<div class="productDesc fR">'
                            +'<div class="descTitle">'+_self[i].name+'</div>'
                            +'<div class="descIp"> <div class="ipTop">杭州</div> <div class="express">包邮</div> </div>'
                            +'<div class="count">'
                            +'<div class="price fL"><span>￥</span>'+_self[i].price+'</div>'
                            +'<div class="paymentNumber fL">'+_self[i].paidNum+'付款</div>'
                            +'<div class="more fR"></div>'
                            +'</div>'
                            +'</div>'
                            +'</div>'
                    }
                    $('#clProduct').html(str);
                }
            }
        });
    },
    // 搜索店家
    search_r:function(){
        dataSave('proName',$('.search input').val());
        var url         = WEB_URL + '/api/indexSearch/product/search';
        var name        =$('.search input').val();
        var isVolume    =true;
        var isAvgEva    =true;
        var pageNum     =1;
        var size        =20;
        var data        ={name:name,isVolume:isVolume,isAvgEva:isAvgEva,pageNum:pageNum,size:size};
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
                    console.log(data.data.list);
                    var _self   = data.data.list;
                    var str     = '';
                    for (var i=0;i<_self.length;i++){
                        if(_self[i].carouselPicture==null){
                            _self[i].carouselPicture = 'icon.png'
                        }else{
                            _self[i].carouselPicture = _self[i].carouselPicture.split(',')[0];
                        }
                        str +='<div class="clProduct ui_btn" data-action="joinDp" data-spid="'+_self[i].id+'" style="margin-bottom: 10px;">'
                            +'<div class="productPic fL"><img src="'+_self[i].carouselPicture+'" alt=""></div>'
                            +'<div class="productDesc fR">'
                            +'<div class="descTitle">'+_self[i].name+'</div>'
                            +'<div class="descIp"> <div class="ipTop">杭州</div> <div class="express">包邮</div> </div>'
                            +'<div class="count">'
                            +'<div class="price fL"><span>￥</span>'+_self[i].price+'</div>'
                            +'<div class="paymentNumber fL">'+_self[i].paidNum+'付款</div>'
                            +'<div class="more fR"></div>'
                            +'</div>'
                            +'</div>'
                            +'</div>'
                    }
                    $('#clProduct').html(str);
                }
            }
        });
    }
})
/***********************搜索店铺end**********************/