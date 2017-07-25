/**
 * Created by Administrator on 2017/5/19 0019.
 */

/***********************电话首页**********************/
Views.telephoneView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'telephone',
        hasFootNav: true,
        footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        $('#tel').css('display','block');
        $('#index').css('display','none');
        $('#telTwo').css('display','none');
        this.show(param, isBackPage);
    },

    didShow: function () {
        var $number ="";
        // 写号码
        $('.number_in').click(function(){
            $('.dialList').show();
            $('.dialListT').hide();

            var deleteNumber = $('.acHead .h_in .number').html();


            if($(this).children('.nI').length != 0){
                $number += $(this).children('.nI').html();
            }else{
                $number += $(this).html();
            }
            $('.acHead .number').html($number);
            if( $number.length === 11){
                //查询号码归属地
                $('.acHead .h_in .region').html("中国");
            }else{
                $('.acHead .h_in .region').html("号码归属地");
            }
        })

        // 删除号码
        $('.dialList .tDelete ').click(function(){
            var deleteNumber = $('.acHead .number').html();
            var len = deleteNumber.length;
            if( len !=0){
                $number = deleteNumber.substr(0, len-1);
                console.log($number)
            }
            $('.acHead .number').html($number);
            if( $number.length === 11){
                //查询号码归属地
                $('.acHead .h_in .region').html("中国");
            }else{
                $('.acHead .h_in .region').html("号码归属地");
            }

            if($number.length == 0){
                if(!$(this).hasClass('add')){
                    $('#tel').show();
                    $('.dialList').hide();
                    $('.h_in').html('记录');
                }

            }
        })



        //
        $('.phoneBook').click(function(){
            $('.keyboard .number').stop().slideToggle();
            // $('.phoneBook').addClass("yes");
            // if($(this).hasClass("yes")){
            //     $('.phoneBook').css("background-image","url(images/dial/phoneBook.png)");
            //     $('.phoneBook').removeClass("yes");
            // }else{
            //     $('.phoneBook').css("background-image","url(images/dial/phoneBookT.png)");
            //     $('.phoneBook').addClass("yes");
            // }

        })

    },
    back_index:function(){
        Views.indexView.show();
        $('#tel').css('display','none');
        $('#index').css('display','block');
        $('#telTwo').css('display','none');
    },
    tpCancel:function(){
        $('.dialSettings').hide();
        $('.tpMask').hide();
    },

    //goInContacts:function(){
    //    Views.dialView.show();
    //},

    //goInRecharge:function(){
    //    Views.rechargeView.show();
    //},
    //
    //goInMy:function(){
    //    Views.mineDialView.show();
    //},

})


/***********************联系人start**********************/
Views.contactsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'contacts',
        hasFootNav: true,
        footItemOrder: 1, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        $('#tel').css('display','block');
        $('#index').css('display','none');
        $('#telTwo').css('display','none');
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    goInAddContact:function(){
        Views.addContactView.show();
    }
})
/***********************联系人end**********************/

/***********************添加联系人start**********************/
Views.addContactView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'addContact',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        var number ="";

        // 写号码
        $('.number_in').click(function(){
            $('.dialList').show();
            $('.dialListT').hide();

            var deleteNumber = $('.acHead .ach_in .acNumber').html();
            // if(deleteNumber.length === 11){
            // 	return;
            // }


            // $(this).addClass('bg');
            // $(this).children().css("color","#fff");


            if($(this).children('.nI').length != 0){
                number += $(this).children('.nI').html();
            }else{
                number += $(this).html();
            }
            $('.acHead .acNumber').html(number);
            if( number.length === 11){
                //查询号码归属地
                $('.acHead .ach_in .acRegion').html("中国");
            }else{
                $('.acHead .ach_in .acRegion').html("号码归属地");
            }
        })

        // 删除号码
        $('.dialList .acDelete').click(function(){
            var deleteNumber = $('.acHead .acNumber').html();
            var len = deleteNumber.length;
            if( len !=0){
                number = deleteNumber.substr(0, len-1);
            }
            $('.acHead .acNumber').html(number);
            if( number.length === 11){
                //查询号码归属地
                $('.acHead .ach_in .acRegion').html("中国");
            }else{
                $('.acHead .ach_in .acRegion').html("号码归属地");
            }


            if(number.length == 0){
                if(!$(this).hasClass('add')){
                    $('.dialListT').show();
                    $('.dialList').hide();
                }

            }
        })

        // $('.number_in').ontouchstart(function(){
        // 	$(this).addClass('bg');
        // 	$(this).children().css("color","#fff");
        // })
        // $('.number_in').mouseup(function(){
        // 	$(this).removeClass('bg');
        // 	$(this).children().css("color","#333");
        // })

        // 查询号码归属地

        //
        // $('.number_in').touchstart(function(){

        // })


        //

        $('.phoneBook').click(function(){
            $('.keyboard .number').slideToggle();
            // $('.phoneBook').addClass("yes");
            if($('.phoneBook').hasClass("yes")){
                $('.phoneBook').css("background-image","url(images/dial/phoneBook.png)");
                $('.phoneBook').removeClass("yes");
            }else{
                $('.phoneBook').css("background-image","url(images/dial/phoneBookT.png)");
                $('.phoneBook').addClass("yes");
            }

        })
    },

})
/***********************添加联系人end**********************/

/***********************充值start**********************/
Views.rechargeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'recharge',
        hasFootNav: true,
        footItemOrder: 2, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        $(document).ready(function(){
            $(".telephoneFare").click(function(){
                $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
                $(this).addClass("rSelected");
            });
        });

    },
})
/***********************充值end**********************/

/***********************我的start**********************/
Views.mineDialView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'mineDial',
        hasFootNav: true,
        footItemOrder: 3, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    goInAccount:function(){
        Views.myAccountView.show();
    },

    goInSet:function(){
        Views.telephoneSetView.show();
    },
})
/***********************我的end**********************/

/***********************我的账户start**********************/
Views.myAccountView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myAccount',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    goInBill:function(){
        Views.callLogView.show();
    },

})
/***********************我的账户end**********************/
/***********************我的话单start**********************/
Views.callLogView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'callLog',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        // 日期开始
        laydate({

            elem: '#J-xlo'

        });
        // 日期结束
        laydate({

            elem: '#J-xlt'

        });
        //改变日历位置
        $('#J-xlt').click(function(){
            $('#laydate_box').css("left","45px");
        })



        $('.find').click(function(){
            var start = $('.start input').val();
            var end  = $('.end input').val();
            if(start == "" || end == ""){
                alert("请选着日期");
                return;
            }

            alert(start);
        })
    },
})
/***********************我的话单end**********************/

/***********************设置start**********************/
Views.telephoneSetView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'telephoneSet',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    goInDialSet:function(){
        Views.dialSetView.show();
    },

    goInOneKeySet:function(){
        Views.oneKeySetView.show();
    },

    goInAbout:function(){
        Views.aboutView.show();
    },
})
/***********************设置end**********************/

/***********************拨打设置start**********************/
Views.dialSetView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'dialSet',
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
/***********************拨打设置end**********************/

/***********************一键拨打设置start**********************/
Views.oneKeySetView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'oneKeySet',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $('.setNumber .numberBox').click(function(){
            $('.addMode').stop().animate({
                bottom:0
            });
            $('.oksMask').show();
        });
        $('.cancel').click(function(){
            $('.addMode').stop().animate({
                bottom:'-170px'
            });
            $('.oksMask').hide();
        });
        $('.oksMask').click(function(){
            $('.addMode').stop().animate({
                bottom:'-170px'
            });
            $('.oksMask').hide();
        });
        $('#shoudong').click(function(){
            $('.manualInput').show();
            $('.opacitys').show();
        });
        $('.btnBox div').click(function(){
            $('.manualInput').hide();
            $('.opacitys').hide();
        });
    },
    phone:function(){
        Views.contactsView.show();
        // $('#tel').css('display','block');
        // $('#index').css('display','none');
        // $('#asd').css('display','none');
    }
})
/***********************一键拨打设置end**********************/

/***********************关于start**********************/
Views.aboutView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'about',
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
/***********************关于end**********************/
