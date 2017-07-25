/**
 * Created by Administrator on 2017/6/24 0024.
 */
document.getElementById('goWxPay').addEventListener('click', function(){
    var url  = WEB_URL + "/api/coreMoney/wxpay";
    $.ajax({
        type:'POST',
        dataType:'json',
        url:url,
        data:JSON.stringify({tradeNo:"20170623204818656227872488"}),
        contentType:'application/json;charset=utf-8',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest, textStatus, errorThrown);
        },
        success:function(data){
            if (data.codeEnum == 'OVERTIME') {
                Views.signInView.show();
            }else{
                var _responseText;
                try {
                    _responseText = JSON.parse(JSON.stringify(data));
                } catch(error) {
                    _responseText = {success:true};
                }
                if (false == _responseText.success) {
                    alert(_responseText.msg);
                }else{
                    //调起支付
                    var wxPay = api.require('wxPay');
                    wxPay.payOrder(_responseText, function(ret, err) {
                        if (ret.status) {
                            //支付成功
                            alert('支付成功');
                            //......

                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                }
            }

        }
    });

});