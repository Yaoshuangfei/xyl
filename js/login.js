/**
 * Created by Administrator on 2017/5/27 0027.
 */
/***********************登录start**********************/
Views.signInView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'signIn',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(function(){
            var ok1=false,ok2=false;
//            判断手机或邮箱格式是否正确
            var $phone = $('#account');
            function email(){
//                regs=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;//验证邮箱正则(输入前7位至11位)
                regs=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if(!regs.test($phone.val())){
                    var str = '<div class="rePrompt">请填写正确邮箱！</div>';
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    $('#account').parent().parent().parent().append(str);
                    ok1=false;
                }else {
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    ok1=true;
                }
            }
            function phone(){
                reg=/^1[3|4|5|7|8][0-9]\d{4,8}$/i;//验证手机正则(输入前7位至11位)
                if(!reg.test($phone.val())){
                    var str = '<div class="rePrompt">请填写正确的手机号！</div>';
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    $('#account').parent().parent().parent().append(str);
                    ok1=false;
                } else if(!($phone.val().length==11)){
                    var str = '<div class="rePrompt">手机号码位数不足11位！</div>';
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    $('#account').parent().parent().parent().append(str);
                    ok1=false;
                }else {
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    ok1=true;
                }
            }
            $phone.blur(function(){
                if($phone.val() == ''){
                    var str = '<div class="rePrompt">手机号/邮箱不能为空！</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok1=false;
                }
                else if (!isNaN($phone.val())){
                    phone();
                }
                else if (isNaN($phone.val())){
                    email();
                }
                if(ok1==true && ok2==true){
                    $('#signInBtn').attr('disabled',false).css('background-color','#26a5ff');
                }
            });

//            判断密码
            var $key = $('#password');
            $key.blur(function(){
                if( $key.val()==""){
                    var str = '<div class="rePrompt">密码不能为空！</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok2=false;
                }
                else if ($key.val().replace(/(^s*)|(s*$)/g, "").length <6) {
                    var str='<div class="rePrompt">请输入6-16位的密码，区分大小写</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok2=false;
                }
                else if ($key.val().replace(/(^s*)|(s*$)/g, "").length >18) {
                    var str='<div class="rePrompt">请输入6-18位的密码，区分大小写</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok2=false;
                }
                else{
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    ok2=true;
                }
                // if(ok1==true && ok2==true){
                //     $('#signInBtn').attr('disabled',false).css('background-color','#26a5ff');
                // }
            });
        });
        this.countdown=60;
    },
    signInBtns:function(){
        var userName    = $('#account').val();
        var password    = $('#password').val();
        var data        ={userName:userName,password:password};
        var url         = WEB_URL + "/api/core/login";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(data.success == false){
                    alert(data.msg);
                    dataSave('isNotLogin', "true");
                    dataSave('user_id', '');
                    dataSave('user_name', '');
                    dataSave('user_password', '');
                    dataSave('user_token', '');
                }else{
                    dataSave('user_id', data.data.id);
                    dataSave('user_name', data.data.userName);
                    dataSave('user_password', data.data.password);
                    dataSave('user_token', data.data.token);
                    dataSave('isNotLogin', "false");
                    //设置cookie
                    // var domain_url = WEB_URL.split('://')[1];
                    // if (domain_url.indexOf(':') > -1) {
                    //     domain_url = domain_url.split(':')[0];
                    // }else{
                    //     domain_url = domain_url.split('/')[0];
                    // }
                    // document.cookie = "JSESSIONID="+data.data.token+";path=/;domain="+domain_url;
                    Views.indexView.show();
                }
            }
        });
    },
    goInRegister:function(){
        Views.registerView.show();
    },

    goInForgot:function(){
        Views.forgotPasswordView.show();
    }
})
/***********************登录end**********************/

/***********************注册start**********************/
Views.registerView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'register',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        this.countdown = 60;
        var ok1=false,ok2=false, ok3=false , ok4=false , ok5=false;
        $(function(){
//            判断手机或邮箱格式是否正确
            var $phone = $('#account');
            function email(){
//                regs=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;//验证邮箱正则(输入前7位至11位)
                regs=/^\w+@[a-zA-Z0-9]+(\.[a-z]{2,3}){1,2}$/;
                if(!regs.test($phone.val())){
                    var str = '<div class="rePrompt">请填写正确邮箱！</div>';
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    $('#account').parent().parent().parent().append(str);
                    ok1=false;
                }else {
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    ok1=true;
                }
            }
            function phone(){
                reg=/^1[3|4|5|7|8][0-9]\d{4,8}$/i;//验证手机正则(输入前7位至11位)
                if(!reg.test($phone.val())){
                    var str = '<div class="rePrompt">请填写正确的手机号！</div>';
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    $('#account').parent().parent().parent().append(str);
                    ok1=false;
                } else if(!($phone.val().length==11)){
                    var str = '<div class="rePrompt">手机号码位数不足11位！</div>';
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    $('#account').parent().parent().parent().append(str);
                    ok1=false;
                }else {
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    ok1=true;
                }
            }
            $phone.blur(function(){
                if($phone.val() == ''){
                    var str = '<div class="rePrompt">手机号/邮箱不能为空！</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok1=false;
                }
                else if (!isNaN($phone.val())){
                    phone();
                }
                else if (isNaN($phone.val())){
                    email();
                }
                if(ok1==true && ok2==true && ok3==true && ok4==true && ok5==true){
                    $('#login_sub').attr('disabled',false).css('background-color','#26a5ff');
                }
            });

//            判断密码
            var $key = $('#password');
            $key.blur(function(){
                if( $key.val()==""){
                    var str = '<div class="rePrompt">密码不能为空！</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok2=false;
                }
                else if ($key.val().replace(/(^s*)|(s*$)/g, "").length <6) {
                    var str='<div class="rePrompt">请输入6-16位的密码，区分大小写</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok2=false;
                }
                else if ($key.val().replace(/(^s*)|(s*$)/g, "").length >18) {
                    var str='<div class="rePrompt">请输入6-18位的密码，区分大小写</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok2=false;
                }
                else{
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    ok2=true;
                }
                if(ok1==true && ok2==true && ok3==true && ok4==true && ok5==true){
                    $('#login_sub').attr('disabled',false).css('background-color','#26a5ff');
                }
            });

//            判断两次密码是否一致
            var $keys = $('#passwords');
            $keys.blur(function(){
                if($keys.val() !== $key.val()){
                    var str='<div class="rePrompt">两次密码输入不一样!</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok3=false;
                }else {
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    ok3=true;
                }
                if(ok1==true && ok2==true && ok3==true && ok4==true && ok5==true){
                    $('#login_sub').attr('disabled',false).css('background-color','#26a5ff');
                }
            });

//            判断邀请码格式是否正确
            var $num = $('#yq_num');
            $num.blur(function(){
                if($num.val()==''){
                    var str='<div class="rePrompt">邀请码不能为空!</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok4=false;
                }else{
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    ok4=true;
                }
                if(ok1==true && ok2==true && ok3==true && ok4==true && ok5==true){
                    $('#login_sub').attr('disabled',false).css('background-color','#26a5ff');
                }
            });

            //	验证码栏失去焦点
            var $yan = $("#yan");
            $yan.blur(function(){
                if( $yan.val()==""){
                    var str='<div class="rePrompt">验证码不能为空!</div>';
                    $('.verification').find('.rePrompt').remove();
                    $('.verification').append(str);
                    ok5=false;
                }
                else{
                    $('.verification').find('.rePrompt').remove();
                    ok5=true;
                }
                // if(ok1==true && ok2==true && ok3==true && ok4==true && ok5==true){
                //     $('#login_sub').attr('disabled',false).css('background-color','#26a5ff');
                // }
            });


        });


    },
    yans:function(){
        var InterValObj; //timer变量，控制时间
        var count = 60; //间隔函数，1秒执行
        var curCount;//当前剩余秒数
        var code = ""; //验证码
        var codeLength = 6;//验证码长度
        curCount = count;
        var mobileEmail = $('#account').val();
            if(mobileEmail !=''){
                $("#verify_code").attr("disabled", true);
                $("#verify_code").val("重发(" + curCount+')');
                InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
                var data = {mobileEmail:mobileEmail};
                var url  = WEB_URL + "/api/coreUser/sendMsmOrEmail/1";
                $.ajax({
                    type: "POST", //用POST方式传输
                    dataType: "json", //数据格式:JSON
                    url: url,
                    data: JSON.stringify(data),
                    contentType: 'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success: function (data) {
                    }
                });
            }else {
                alert('手机号不能为空!');
            }
        //timer处理函数
        function SetRemainTime() {
            if (curCount == 0) {
                window.clearInterval(InterValObj);//停止计时器
                $("#verify_code").removeAttr("disabled");//启用按钮
                $("#verify_code").val("重新发送验证码");
                code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
            }
            else {
                curCount--;
                $("#verify_code").val("重发(" + curCount+')');
            }
        }
    },
    registerBtns:function(){
        var userName    = $('#account').val();
        var password    = $('#password').val();
        var inviteCode  = $('#yq_num').val();
        var vecode      = $('#yan').val();
        var data = {userName:userName,password:password,inviteCode:inviteCode,vecode:vecode};
        var url  = WEB_URL + "/api/coreUser/register";
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "json", //数据格式:JSON
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success: function (data) {
                if(data.success == false){
                    alert(data.msg);
                }else{
                    alert("恭喜您，注册成功！！");
                    Views.signInView.show();
                }
            }
        });
    },
    goInsignIn:function(){
        Views.signInView.show();
    }
})
/***********************注册end**********************/

/***********************忘记密码start**********************/
Views.forgotPasswordView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'forgotPassword',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var ok1=false,ok2=false, ok3=false , ok4=false;
        $(function(){
//            判断手机或邮箱格式是否正确
            var $phone = $('#account');
            function email(){
//                regs=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;//验证邮箱正则(输入前7位至11位)
                regs=/^\w+@[a-zA-Z0-9]+(\.[a-z]{2,3}){1,2}$/;
                if(!regs.test($phone.val())){
                    var str = '<div class="rePrompt">请填写正确邮箱！</div>';
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    $('#account').parent().parent().parent().append(str);
                    ok1=false;
                }else {
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    ok1=true;
                }
            }
            function phone(){
                reg=/^1[3|4|5|7|8][0-9]\d{4,8}$/i;//验证手机正则(输入前7位至11位)
                if(!reg.test($phone.val())){
                    var str = '<div class="rePrompt">请填写正确的手机号！</div>';
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    $('#account').parent().parent().parent().append(str);
                    ok1=false;
                } else if(!($phone.val().length==11)){
                    var str = '<div class="rePrompt">手机号码位数不足11位！</div>';
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    $('#account').parent().parent().parent().append(str);
                    ok1=false;
                }else {
                    $('#account').parent().parent().parent().find('.rePrompt').remove();
                    ok1=true;
                }
            }
            $phone.blur(function(){
                if($phone.val() == ''){
                    var str = '<div class="rePrompt">手机号/邮箱不能为空！</div>';
                    console.log($(this))
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok1=false;
                }
                else if (!isNaN($phone.val())){
                    phone();
                }
                else if (isNaN($phone.val())){
                    email();
                }
            });

//            判断密码
            var $key = $('#password');
            $key.blur(function(){
                if( $key.val()==""){
                    var str = '<div class="rePrompt">密码不能为空！</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok2=false;
                }
                else if ($key.val().replace(/(^s*)|(s*$)/g, "").length <6) {
                    var str='<div class="rePrompt">请输入6-16位的密码，区分大小写</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok2=false;
                }
                else if ($key.val().replace(/(^s*)|(s*$)/g, "").length >18) {
                    var str='<div class="rePrompt">请输入6-18位的密码，区分大小写</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok2=false;
                }
                else{
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    ok2=true;
                }
            });

//            判断两次密码是否一致
            var $keys = $('#passwords');
            $keys.blur(function(){
                if($keys.val() !== $key.val()){
                    var str='<div class="rePrompt">两次密码输入不一样!</div>';
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok3=false;
                }else {
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    ok3=true;
                }
            });

            //	验证码栏失去焦点
            var $yan = $("#yan");
            $yan.blur(function(){
                if( $yan.val()==""){
                    var str='<div class="rePrompt">验证码不能为空!</div>';
                    $(this).parent().parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().parent().append(str);
                    ok4=false;
                }
                else{
                    $(this).parent().parent().parent().find('.rePrompt').remove();
                    $(this).parent().parent().parent().append(str);
                    ok4=true;
                }
            });


        });
    },
    verificationBtns:function(){
        var InterValObj; //timer变量，控制时间
        var count = 60; //间隔函数，1秒执行
        var curCount;//当前剩余秒数
        var code = ""; //验证码
        var codeLength = 6;//验证码长度
        curCount = count;
        var mobileEmail = $('#account').val();
        if(mobileEmail !=''){
            $("#verify_code").attr("disabled", true);
            $("#verify_code").val("重发(" + curCount+')');
            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
            var data = {mobileEmail:mobileEmail};
            var url  = WEB_URL + "/api/coreUser/sendMsmOrEmail/22";
            $.ajax({
                type: "POST", //用POST方式传输
                dataType: "json", //数据格式:JSON
                url: url,
                data: JSON.stringify(data),
                contentType: 'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success: function (data) {
                    if(!data.success) {
                        alert(data.msg);
                    }else{
                        console.log(data)
                    }
                }
            });
        }else {
            alert('手机号格式错误!');
        }
        //timer处理函数
        function SetRemainTime() {
            if (curCount == 0) {
                window.clearInterval(InterValObj);//停止计时器
                $("#verify_code").removeAttr("disabled");//启用按钮
                $("#verify_code").val("重新发送验证码");
                code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
            }
            else {
                curCount--;
                $("#verify_code").val("重发(" + curCount+')');
            }
        }
    },
    registerBtns:function(){
        var userName = $('#account').val();
        var password = $('#password').val();
        var passwords = $('#passwords').val();
        var vecode   = $('#yan').val();
        var isMobileNo = IsMobile(userName);
        if(!isMobileNo){
            alert('手机或邮箱格式错误！');
            return;
        }
        if(password == ''){
            var str = '<div class="rePrompt">密码不能为空！</div>';
            $('#password').parent().parent().parent().find('.rePrompt').remove();
            $('#password').parent().parent().parent().append(str);
            return;
        }
        if(vecode == ''){
            var str = '<div class="rePrompt">验证码不能为空！</div>';
            $('#yan').parent().parent().parent().find('.rePrompt').remove();
            $('#yan').parent().parent().parent().append(str);
            return;
        }
        var url      = WEB_URL + '/api/coreUser/updateUserPassword';
        var data     = {mobileEmail:userName,password:passwords,vecode:vecode};
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "json", //数据格式:JSON
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success: function (data) {
                if(data.success == false){
                    console.log(data.msg);
                }else{
                    alert("恭喜您，修改成功！！");
                    Views.signInView.show();
                }
            }
        });
        // Views.signInView.show();
    }
})
/***********************忘记密码end**********************/

/***********************分享start**********************/
Views.fenxiangView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'fenxiang',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        jQuery('#qrcode').qrcode({
            render: "canvas",
            width: 100,
            height: 100,
            correctLevel: 0,
            background: "#ffffff", //二维码的后景色
            foreground: "#000000", //二维码的前景色
            //text: "minwuyou://" + JSON.stringify(data)
            text: 'http://www.51att.cn/sm666/fenxiang.html?'+dataGet('mobile')
        });
    }
})
/***********************分享end**********************/





// 判断是否登录
function isLogin() {
    // var user_name = dataGet('user_name');
    var isNotLogin = dataGet('isNotLogin');
    // var accountPassword = dataGet('user_password');
    if(isNotLogin == 'true') {
        Views.signInView.willShow();
        return false;
    }
    return true;
}
