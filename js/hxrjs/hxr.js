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
                    var _length = data.data.list;
                    var str ='';
                    console.log(data.data)
                }
            }
        })
    },
})
/***********************店铺身份end**********************/