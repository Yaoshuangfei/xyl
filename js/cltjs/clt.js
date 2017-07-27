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
                    $("#name_tj").html(data.data.coreUser.realName);
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
        // var name = dataGet('cltncName');
        var img = dataGet('cltheadimg');
        // var cltinviterNum = dataGet('cltinviterNum');
        // var cltRoleName = dataGet('cltRoleName');
        // console.log(cltinviterNum)

        console.log(id);
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
                    // var name =
                    var _length = data.data.list;
                    var str ='';
                    console.log(data);
                    // $("#Name_clt").html(name);


                }
            }
        });
        // var url     = WEB_URL + '/api/shopConfig/clt/person';
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
                    // var _length = data.data.list;
                    // var str ='';
                    console.log(data);
                    $("#Jb_num").html(data.data.shopConfig.shopRoleName);
                    $("#resnu").html(data.data.shopConfig.inviterNum);
                    $("#Name_clt").html(data.data.user.nickName);
                    $("#img_hd").attr("src",data.data.user.headImg);
                    // dataSave('configId',data.data.shopConfig.configId)
                    // dataSave('cltId',data.data.shopConfig.id)
                    // dataSave('cltheadimg',data.data.user.headImg)
                    // // dataSave('cltncName',data.data.shopConfig.nickName)
                    // // dataSave('cltinviterNum',data.data.user.inviterNum)
                    // // dataSave('cltRoleName',data.data.user.shopRoleName)
                    // $("#name").html(data.data.user.nickName);
                    // $("#mineSf").html(data.data.shopConfig.shopRoleName);
                    // $("#cltWalth").html(data.data.shopConfig.shopWallet);
                    // $("#imageId").attr("src",data.data.user.headImg);
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
        var url     = WEB_URL + '/api/shopMember/selectCommissions';
        var storeId = parseInt(dataGet('storeId'));
        console.log()
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
    }
});