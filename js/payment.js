/**
 * Created by Administrator on 2017/5/23 0023.
 */
/***********************扫码付首页start**********************/
Views.sweepCodeHomeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'sweepCodeHome',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    goInSweepCode:function(){
        Views.sweepCodeView.show();
    },

    goInAccountBalance:function(){
        Views.accountBalanceView.show();
    },

    goInReceiveDividents:function(){
        Views.receiveDividentsView.show();
    },
    goInBillingDetails:function(){
        Views.billingDetailsView.show();
    },

    goInIncomeDetails:function(){
        Views.incomeDetailsView.show();
    },

    goInPersonalStores:function(){
        Views.personalStoresView.show();
    },
    sm_index:function(){
        Views.indexView.show();
    },

    //跳转到消息
    goInInformation:function(){
        Views.informationView.show();
    },
})
/***********************扫码付首页end**********************/


/***********************扫码付start**********************/
Views.sweepCodeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'sweepCode',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    goInSelectorChannel:function(){
        Views.selectorChannelView.show();
    }
})
/***********************扫码付end**********************/

/***********************扫码付下一步(选着通道)start**********************/
Views.selectorChannelView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'selectorChannel',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $(".channerl_cost").click(function () {
            $(".wantToRecharge_shady").show();
            $(".wantToRecharge_payment").slideToggle();
            $(".wantToRechargePay").show();
        });
        $('.wantToRecharge_shady').click(function (){
            $(this).hide();
            $(".wantToRecharge_payment").slideUp();
            $(".wantToRechargeChange").show();
        });
        $(".wantToRechargeChangeArea").eq(0).click(function () {
            $(".wantToRechargePay").hide();
            $(".wantToRechargeChange").show();
            $(".wantToRechargeHeader span").html("付款方式");
        });
        $(".wantToRechargeChangeArea").click(function () {
            $(this).parent(".wantToRechargeChange").find(".wantToRechargeChangeArea").removeClass("selecteds");
            $(this).addClass("selecteds");
            $('.wantToRecharge_shady').hide();
            $(".wantToRechargeChange").show();
            $(".wantToRecharge_payment").slideUp();
        });
        $('#backs').click(function(){
            $('.wantToRecharge_shady').hide();
            $(".wantToRecharge_payment").slideUp();
            $(".wantToRechargeChange").slideUp();
        });
    },
    next_link:function(){
        Views.gatheringView.show();
    }
})
/***********************扫码付下一步(选着通道)end**********************/


/***********************账户余额start**********************/
Views.accountBalanceView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'accountBalance',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    goInBillingDetails:function(){
        Views.billingDetailsView.show();
    }
})
/***********************账户余额end**********************/

/***********************账单详情start**********************/
Views.billingDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'billingDetails',
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
/***********************账单详情end**********************/

/***********************分红start**********************/
Views.receiveDividentsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'receiveDividents',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    goInImmediateWithdrawal:function(){
        Views.immediateWithdrawalView.show();
    },

    goInIncomeDetails:function(){
        Views.incomeDetailsView.show();
    },


})
/***********************分红end**********************/

/***********************我要提现start**********************/
Views.immediateWithdrawalView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'immediateWithdrawal',
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
/***********************我要提现end**********************/

/***********************分红明细start**********************/
Views.incomeDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'incomeDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        $(document).ready(function(){
            $("#plain").click(function(){
                $(this).parent(".incomeDetails_ordinary").find(".incomeDetails_ordinaryArea").removeClass("idSelected")
                $("#businesses").hide();
                $("#common").show();
                $(this).addClass("idSelected");
            });
            $("#seller").click(function(){
                $(this).parent(".incomeDetails_ordinary").find(".incomeDetails_ordinaryArea").removeClass("idSelected")
                $("#businesses").show();
                $("#common").hide();
                $(this).addClass("idSelected");
            });

        });


    },
})
/***********************分红明细end**********************/

/***********************我要店铺start**********************/
Views.personalStoresView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'personalStores',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

            $(".details_Btn").click(function(){
                $(this).html("等待审核");
            })
    },
})
/***********************我要店铺end**********************/

/***********************收款二维码**********************/
Views.collectionCodeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'collectionCode',
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
/***********************end**********************/

/***********************付款二维码**********************/
Views.paymentView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'payment',
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
/***********************end**********************/

/***********************我要店铺start**********************/
Views.gatheringView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'gathering',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },
    fenxiang:function(){
        Views.paymentView.show();
    }
})
/***********************end**********************/