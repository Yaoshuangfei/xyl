/**
 * Created by Administrator on 2017/5/19 0019.
 */
/***********************众筹捐款**********************/
Views.raiseListView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'raiseList',
        hasFootNav: true,
        footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
        $('#tel').css('display','none');
        $('#index').css('display','none');
        $('#asd').css('display','block');
        },

    didShow: function () {
        var wh=$(window).height();
        window.onscroll=function(){
            var h = wh-$(window).scrollTop();
            if(h<500){
                $(".option").addClass('box_shadow');
            }else{
                $(".option").removeClass('box_shadow');
            }
        };
    },

    Complete:function(){
        Views.raiseCompleteView.show();
    },

    goInMy:function(){
        Views.myDonationView.show();
    },
    cs_index:function(){
        Views.indexView.show();
        $('#tel').css('display','none');
        $('#index').css('display','block');
        $('#asd').css('display','none');
    }
})
/***********************众筹捐款**********************/

/***********************筹集完成**********************/
//样式未添加
Views.raiseCompleteView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'raiseComplete',
        hasFootNav: true,
        footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
        $('#tel').css('display','none');
        $('#index').css('display','none');
        $('#asd').css('display','block');
    },

    didShow: function () {

    },

    goInUnderway:function(){
        Views.raiseListView.show();
    }

})
/***********************筹集完成**********************/



/***********************公益产品**********************/
Views.charityGoodsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'charityGoods',
        hasFootNav: true,
        footItemOrder: 2, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
        $('#tel').css('display','none');
        $('#index').css('display','none');
        $('#asd').css('display','block');
    },

    didShow: function () {


        $(function() {
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
            $('.cgScreen .theme .listName').click(function(){
                if($(this).hasClass('listName')){
                    $(this).removeClass('listName');
                    $(this).addClass('selected');
                    $(this).append("<div class='delete'></div>");
                }else{
                    $(this).children('.delete').remove();
                    $(this).removeClass('selected');
                    $(this).addClass('listName');
                }

            });

            //筛选打开
            $('.cgSort .right').click(function(){
                $('.cgScreen').show();
                $('.cgMask').show();
                $('html').css({'overflow':'hidden','height':'100%'});
                $('body').css({'overflow':'hidden','height':'100%'});
            })

            //筛选关闭
            $('.cgScreen .close').click(function(){
                $('.cgScreen').hide();
                $('.cgMask').hide();
                $('html').css({'overflow':'auto'});
                $('body').css({'overflow':'auto'});
            })
            $('.cgMask').click(function(){
                $('.cgScreen').hide();
                $('.cgMask').hide();
                $('html').css({'overflow':'auto'});
                $('body').css({'overflow':'auto'});
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
                $('.cgScreen .theme .selected').children('.delete').remove();
                $('.cgScreen .theme .selected').removeClass('selected').addClass('listName');
            })

            //完成
            $('.complete').click(function(){
                var screen =[];
                var len =  $('.cgScreen .theme .selected').length;
                for(var i=0; i<len; i++){
                    screen[i] = $('.cgScreen .theme .selected').eq(i).text();
                }
                //var aa = $('.screen .theme .selected').text()+",";
                console.log(screen);
            })
        })
    },

})
/***********************公益产品**********************/

/***********************一对一**********************/
Views.oneOnOneView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'oneOnOne',
        hasFootNav: true,
        footItemOrder: 1, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        $('#tel').css('display','none');
        $('#index').css('display','none');
        $('#asd').css('display','block');
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    goInDetails:function(){
        Views.oneOnOneDetailsView.show();
    }

})
/***********************一对一**********************/

/***********************一对一详情**********************/
Views.oneOnOneDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'oneOnOneDetails',
        //hasFootNav: true,
        //footItemOrder: 1, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        $('#tel').css('display','none');
        $('#index').css('display','none');
        $('#asd').css('display','block');
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

})
/***********************一对一详情**********************/

/***********************公益我的**********************/
Views.raiseListMineView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'raiseListMine',
        hasFootNav: true,
        footItemOrder: 3, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        $('#tel').css('display','none');
        $('#index').css('display','none');
        $('#asd').css('display','block');
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    goInDonation:function(){
        Views.myDonationView.show();
    },

    goInShare:function(){
        Views.myShareView.show();
    },

    goInFeedback:function(){
        Views.feedbackOView.show();
    }


})
/***********************公益我的**********************/

/***********************我的捐赠**********************/
Views.myDonationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myDonation',
        hasFootNav: true,
        footItemOrder: 3, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        $('#tel').css('display','none');
        $('#index').css('display','none');
        $('#asd').css('display','block');
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

})
/***********************我的捐赠**********************/

/***********************我的分享**********************/
Views.myShareView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myShare',
        hasFootNav: true,
        footItemOrder: 3, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        $('#tel').css('display','none');
        $('#index').css('display','none');
        $('#asd').css('display','block');
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

})
/***********************我的分享**********************/

/***********************意见反馈**********************/
Views.feedbackOView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'feedbackO',
        //hasFootNav: true,
        //footItemOrder: 1, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        //$('#tel').css('display','none');
        //$('#index').css('display','none');
        //$('#asd').css('display','block');
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

})
/***********************意见反馈**********************/
