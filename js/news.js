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
        var url     = WEB_URL + '/api/notify/selectListGroup';
        var data    =[2,7,11,14,3,13];
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
                    console.log(data)

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

                                str += '<div>'
                                    +'<div class="logisticsMessage_area_date">'+Y+M+D+'</div>'
                                    +'<div class="logisticsMessage_area_tidings ui_btn" data-action="goInMessage" data-obj="'+_self[i].objectId+'">'
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
        dataSave('goInBilling',$(btn).attr('data-obj'))
        Views.XXbillingDetailsAView.show();
    },
    goInMessageWL:function(btn){
        dataSave('goInBilling',$(btn).attr('data-obj'));
        Views.viewLogisticssView.show();
    }
})
/***********************物流消息end**********************/