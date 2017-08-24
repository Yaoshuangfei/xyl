/***********************消息start**********************/
Views.informationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'information',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var urlTwo     = WEB_URL + '/api/notify/selectList';
        var dataTwo    ={pageNum:1,size:30,notifyType:'',readingNum:''};
        // $.ajax({
        //     type:'POST',
        //     dataType:'json',
        //     url:urlTwo,
        //     data: JSON.stringify(dataTwo),
        //     contentType:'application/json;charset=utf-8',
        //     error: function (XMLHttpRequest, textStatus, errorThrown) {},
        //     success:function(data){
        //         if(!data.success) {
        //             alert(data.msg);
        //         }else{
        //             var _self = data.data.list;
        //             console.log(_self)
        //             var str = '';
        //             var img = '';
        //             var text= '';
        //             for (var i=0;i<_self.length;i++){
        //                 if(_self[i].notifyType == 2){
        //                     img  = 'images/news/logistics.png';
        //                     text = '物流消息';
        //                 }else if (_self[i].notifyType == 3){
        //                     img  = 'images/news/icon_01.png';
        //                     text = '分佣通知';
        //                 }else if (_self[i].notifyType == 1){
        //                     img  = 'images/news/tidings.png';
        //                     text = '订单消息';
        //                 }else if (_self[i].notifyType == 4){
        //                     img  = 'images/news/tidings.png';
        //                     text = '聊天消息通知';
        //                 }else if (_self[i].notifyType == 5){
        //                     img  = 'images/news/tidings.png';
        //                     text = '商家钱包金额提现到平台钱包通知';
        //                 }else if (_self[i].notifyType == 6){
        //                     img  = 'images/news/tidings.png';
        //                     text = '平台钱包提现通知';
        //                 }else if (_self[i].notifyType == 7){
        //                     img  = 'images/news/scanCode.png';
        //                     text = '扫码支付消息';
        //                 }else if (_self[i].notifyType == 8){
        //                     img  = 'images/news/tidings.png';
        //                     text = '评论消息';
        //                 }else if (_self[i].notifyType == 9){
        //                     img  = 'images/news/tidings.png';
        //                     text = '商品消息';
        //                 }else if (_self[i].notifyType == 10){
        //                     img  = 'images/news/tidings.png';
        //                     text = '订单消息';
        //                 }else if (_self[i].notifyType == 11){
        //                     img  = 'images/news/tidings.png';
        //                     text = '公告消息';
        //                 }else if (_self[i].notifyType == 12){
        //                     img  = 'images/news/tidings.png';
        //                     text = '商家消息';
        //                 }else if (_self[i].notifyType == 13){
        //                     img  = 'images/news/icon_02.png';
        //                     text = '充值消息';
        //                 }else if (_self[i].notifyType == 14){
        //                     img  = 'images/news/imazamox.png';
        //                     text = '金豆消息';
        //                 }else if (_self[i].notifyType == 15){
        //                     img  = 'images/news/tidings.png';
        //                     text = '问题反馈消息';
        //                 }else if (_self[i].notifyType == 16){
        //                     img  = 'images/news/tidings.png';
        //                     text = '平台钱包金额变动通知';
        //                 }
        //                 var date = new Date(_self[i].createTime);
        //                 Y = date.getFullYear() + '/';
        //                 M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
        //                 D = date.getDate() + ' ';
        //                 h = date.getHours() + ':';
        //                 m = date.getMinutes() + ':';
        //                 s = date.getSeconds();
        //                 str +='<div class="information_nav  ui_btn" data-ids="'+_self[i].notifyType+'" data-action="viewMessage">'
        //                         +'<img src="'+img+'" alt="" class="information_icon"/>'
        //                         +'<div class="information_txt">'
        //                         +'<span class="namessss">'+text+'</span>'
        //                         +'<span style="float: right">'+Y+M+D+'</span> '
        //                         +'<span>'+_self[i].notifyContent+'</span><hr/>'
        //                         +'</div>'
        //                         +'</div>'
        //             }
        //             $('#xiaoxi').html(str);
        //         }
        //     }
        // });

        var urlTwos     = WEB_URL + '/api/notify/selectCountGroup';
        $.ajax({
            type:'GET',
            dataType:'json',
            url:urlTwos,
            data: {},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(data)
                    var str = '';
                    var img = '';
                    var text= '';
                    for (var i=0;i<_self.length;i++){
                        if(_self[i].type == 2){
                            img  = 'images/news/logistics.png';
                            text = '物流消息';
                        }else if (_self[i].type == 3){
                            img  = 'images/news/icon_01.png';
                            text = '分佣通知';
                        }else if (_self[i].type == 1){
                            img  = 'images/news/tidings.png';
                            text = '订单消息';
                        }else if (_self[i].type == 4){
                            img  = 'images/news/tidings.png';
                            text = '聊天消息通知';
                        }else if (_self[i].type == 5){
                            img  = 'images/news/tidings.png';
                            text = '商家钱包金额提现到平台钱包通知';
                        }else if (_self[i].type == 6){
                            img  = 'images/news/tidings.png';
                            text = '平台钱包提现通知';
                        }else if (_self[i].type == 7){
                            img  = 'images/news/scanCode.png';
                            text = '扫码支付消息';
                        }else if (_self[i].type == 8){
                            img  = 'images/news/tidings.png';
                            text = '评论消息';
                        }else if (_self[i].type == 9){
                            img  = 'images/news/tidings.png';
                            text = '商品消息';
                        }else if (_self[i].type == 10){
                            img  = 'images/news/tidings.png';
                            text = '订单消息';
                        }else if (_self[i].type == 11){
                            img  = 'images/news/tidings.png';
                            text = '公告消息';
                        }else if (_self[i].type == 12){
                            img  = 'images/news/tidings.png';
                            text = '商家消息';
                        }else if (_self[i].type == 13){
                            img  = 'images/news/icon_02.png';
                            text = '充值消息';
                        }else if (_self[i].type == 14){
                            img  = 'images/news/imazamox.png';
                            text = '金豆消息';
                        }else if (_self[i].type == 15){
                            img  = 'images/news/tidings.png';
                            text = '问题反馈消息';
                        }else if (_self[i].type == 16){
                            img  = 'images/news/tidings.png';
                            text = '平台钱包金额变动通知';
                        }
                        if(_self[i].content == null){
                            _self[i].content = ''
                        }
                        var date = new Date(_self[i].payTime);
                        Y = date.getFullYear() + '/';
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
                        D = date.getDate() + ' ';
                        h = date.getHours() + ':';
                        m = date.getMinutes() + ':';
                        s = date.getSeconds();
                        str +='<div class="information_nav  ui_btn" data-ids="'+_self[i].type+'" data-action="viewMessage">'
                            +'<img src="'+img+'" alt="" class="information_icon"/>'
                            +'<div class="information_txt">'
                            +'<span class="namessss">'+text+'</span>'
                            +'<span style="float: right">'+Y+M+D+'</span> '
                            +'<span>'+_self[i].content+'</span><hr/>'
                            +'</div>'
                            +'</div>'
                    }
                    $('#xiaoxi').html(str);
                    $('#xiaoxi .information_txt img').hide();
                }
            }
        });

    },

    viewMessage:function(btn){
        dataSave('notifyType',$(btn).attr('data-ids'))
        dataSave('namessss',$(btn).find('.namessss').text())
        Views.logisticsMessageView.show();
    }
})
/***********************消息end**********************/

/***********************物流消息start**********************/
Views.logisticsMessageView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'logisticsMessage',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);

    },

    didShow: function () {
        $('.mine_top span').html(dataGet('namessss'));
        if(dataGet('notifyType') == 2){
            var url         = WEB_URL +'/api/notify/selectList';
            var pageNum     =1;
            var size        =30;
            var notifyType  =parseInt(dataGet('notifyType'));
            var data        ={pageNum:pageNum,size:size,notifyType:notifyType}
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
                        var _self = data.data.list;
                        console.log(_self)
                        if(_self == ''){
                            $('.logisticsMessage_area').html('<div style="text-align: center;"><img src="images/null.png" alt=""></div>');
                        }else{
                            var str='';
                            for (var i=0;i<_self.length;i++){
                                var date = new Date(_self[i].createTime);
                                Y = date.getFullYear() + '年';
                                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                        date.getMonth()+1) + '月';
                                D = date.getDate() + '日';
                                h = date.getHours() + ':';
                                m = date.getMinutes() + ':';
                                s = date.getSeconds();

                                str += '<div>'
                                    +'<div class="logisticsMessage_area_date">'+Y+M+D+'</div>'
                                    +'<div class="logisticsMessage_area_tidings ui_btn" data-action="goInMessageWL" data-obj="'+_self[i].objectId+'">'
                                    +'<span style="color: #007cc3;font-size:1rem">'+_self[i].notifyTitle+'</span>'
                                    +'<div class="logisticsMessage_area_detail">'
                                    +'<div class="banner"><img style="height:100%;" src="'+(_self[i].notifyImage==null?'images/headT.png':_self[i].notifyImage)+'"></div>'
                                    +' <span>'+_self[i].notifyTitle+'：   '+_self[i].notifyContent+'</span>'
                                    +'<span>运单编号：'+_self[i].objectId+'</span>'
                                    +'</div>'
                                    +'</div>'
                                    +'</div>'

                            }
                            $('.logisticsMessage_area').html(str);
                        }

                    }
                }
            });
        }else{
            var url         = WEB_URL +'/api/notify/selectList';
            var pageNum     =1;
            var size        =30;
            var notifyType  =parseInt(dataGet('notifyType'));
            var data        ={pageNum:pageNum,size:size,notifyType:notifyType}
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
                        var _self = data.data.list;
                        console.log(_self)
                        if(_self == ''){
                            $('.logisticsMessage_area').html('<div style="text-align: center;"><img src="images/null.png" alt=""></div>');
                        }else{
                            var str='';
                            for (var i=0;i<_self.length;i++){
                                var date = new Date(_self[i].createTime);
                                Y = date.getFullYear() + '年';
                                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) :
                                        date.getMonth()+1) + '月';
                                D = date.getDate() + '日';
                                h = date.getHours() + ':';
                                m = date.getMinutes() + ':';
                                s = date.getSeconds();

                                if(_self[i].objectId == null){
                                    _self[i].objectId = '该消息无运单编号'
                                }
                                if(_self[i].notifyType == 10 || _self[i].notifyType==9){
                                    _self[i].notifyId = _self[i].objectId
                                }else if(_self[i].notifyType == 6){
                                    _self[i].notifyId = _self[i].objectId
                                }else if(_self[i].notifyType == 3){
                                    _self[i].notifyId = _self[i].objectId
                                }else if(_self[i].notifyType == 13){
                                    _self[i].notifyId = _self[i].objectId
                                }
                                if(_self[i].notifyType == 14){
                                    _self[i].notifyId = _self[i].receiverUserId
                                }


                                str += '<div>'
                                    +'<div class="logisticsMessage_area_date">'+Y+M+D+'</div>'
                                    +'<div class="logisticsMessage_area_tidings ui_btn" data-action="goInMessage" data-obj="'+_self[i].notifyId+'">'
                                    +'<span style="color: #007cc3;font-size:1rem">'+_self[i].notifyTitle+'</span>'
                                    +'<div class="logisticsMessage_area_detail">'
                                    +'<div class="banner"><img style="height:100%;" src="'+(_self[i].notifyImage==null?'images/headT.png':_self[i].notifyImage)+'"></div>'
                                    +' <span>'+_self[i].notifyTitle+'：   '+_self[i].notifyContent+'</span>'
                                    +'<span>运单编号：'+_self[i].objectId+'</span>'
                                    +'</div>'
                                    +'</div>'
                                    +'</div>'

                            }
                            $('.logisticsMessage_area').html(str);
                        }

                    }
                }
            });
        }

    },

    goInMessage:function (btn) {
        if(dataGet('notifyType')==10){
            dataSave('goInBilling',$(btn).attr('data-obj'))
            Views.pendingPaymentDetailsView.show();
        }else if(dataGet('notifyType')==9){
            dataSave('commodityUuid',$(btn).attr('data-obj'))
            Views.commodityDetailsView.show();
        }
        else {
            dataSave('goInBilling',$(btn).attr('data-obj'))
            Views.XXbillingDetailsAView.show();
        }


    },
    goInMessageWL:function(btn){
        dataSave('goInBilling',$(btn).attr('data-obj'));
        Views.viewLogisticssView.show();
    }
})
/***********************物流消息end**********************/