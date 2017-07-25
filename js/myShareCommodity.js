
//手势
// var n=1;
// var num = $('.crousel a').length;

    //var h = document.getElementsByClassName('crousel').clientHeight,
    //var h = $(".in").outerHeight();
function a() {


    var list = $('body .shareCommodity .mcList');
    //var list =  $('body .shareCommodity .list');
    // var list =  $('body');
    var sign = false;
    var signT = false;
    var listInde = "";
    for (var x = 0; x < list.length; x++) {
        list[x].addEventListener('touchstart', function (ev) {

            console.log("aa");
            listInde = $(this).index();
            var ss = ev.path[0];
            //  console.log(ss.getAttribute("class"));

            var className = ss.getAttribute("class");
            //  console.log(className);
            if (className != "select" && className != "but" && className != "singleDelete") {
                list.css("margin-left", "0%");
                slide(listInde);

                $('.shareCommodity .mcList').css("margin-left", "0%");
                $('.edit ').text("编辑");
                $('.edit').addClass('eYes');
                $('.editWhole').hide();
                $('.positionBottom').hide();

                // $(list).children('.select').children('.but').css('background-image','url(images/storeDetails/noChoice.png)');
                $(list).children('.select').addClass('wYes');

                $('.but').css('background-image', 'url(images/storeDetails/noChoice.png)');
                // $(this).addClass('wYes');
                $('.mcList .select').removeClass('selectYes');

            }

            if (className == "but") {
                if ($(list[listInde]).children('.select').hasClass('wYes')) {
                    $(list[listInde]).children('.select').children('.but').css('background-image', 'url(images/storeDetails/choice.png)');
                    $(list[listInde]).children('.select').removeClass('wYes');
                    $(list[listInde]).children('.select').addClass('selectYes');

                } else {
                    $(list[listInde]).children('.select').children('.but').css('background-image', 'url(images/storeDetails/noChoice.png)');
                    $(list[listInde]).children('.select').addClass('wYes');
                    $(list[listInde]).children('.select').removeClass('selectYes');

                }
            }
        }, true);
    }

    // slide();
    function slide(index) {
        sign = true;

        mybody = $('body')[0];
        // mybody = document.getElementsByClassName('list')[index];
        // mybody.style.height = h + 'px';

        //返回角度

        function GetSlideAngle(dx, dy) {

            return Math.atan2(dy, dx) * 180 / Math.PI;

        }

        //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动

        function GetSlideDirection(startX, startY, endX, endY) {

            var dy = startY - endY;

            var dx = endX - startX;

            var result = 0;


            //如果滑动距离太短

            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {

                return result;

            }

            var angle = GetSlideAngle(dx, dy);

            if (angle >= -45 && angle < 45) {

                result = 4;

            } else if (angle >= 45 && angle < 135) {

                // result = 1;

            } else if (angle >= -135 && angle < -45) {

                // result = 2;

            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {

                result = 3;

            }

            return result;

        }

        //滑动处理

        var startX, startY;

        mybody.addEventListener('touchstart', function (ev) {

            //ev.preventDefault();

            startX = ev.touches[0].pageX;

            startY = ev.touches[0].pageY;

        }, false);


        mybody.addEventListener('touchmove', function (ev) {

            var endX, endY;

            //ev.preventDefault();

            endX = ev.changedTouches[0].pageX;

            endY = ev.changedTouches[0].pageY;


            var direction = GetSlideDirection(startX, startY, endX, endY);

            switch (direction) {

                case 0:

                    //alert("没滑动");
                    index = "";
                    break;

                case 1:

                    // alert("向上");
                    index = "";
                    break;

                case 2:


                    // alert("向下");
                    index = "";
                    break;

                case 3:

                    var ll = list[index];

                    $(ll).css("margin-left", "-15%");
                    index = "";
                    console.log();
                    // alert("向左");

                    break;

                case 4:

                    var ll = list[index];

                    $(ll).css("margin-left", "0%");
                    index = "";
                    //alert("向右");

                    break;

                default:

            }

        }, true);
    }


    //编辑

    $('.edit').click(function () {

        if ($(this).hasClass('eYes')) {
            $('.shareCommodity .mcList').css("margin-left", "10%");
            $(this).text("完成");
            $(this).removeClass('eYes');
            $('.editWhole').show();
            $('.positionBottom').show();
        } else {
            $('.shareCommodity .mcList').css("margin-left", "0%");
            $(this).text("编辑");
            $(this).addClass('eYes');
            $('.editWhole').hide();
            $('.positionBottom').hide();
        }
    })


    //全选
    $('.wholeSelect').click(function () {
        if ($(this).hasClass('wYes')) {
            $('.but').css('background-image', 'url(images/storeDetails/choice.png)');
            $(this).removeClass('wYes');
            $('.list .select').addClass('selectYes');
        } else {
            $('.but').css('background-image', 'url(images/storeDetails/noChoice.png)');
            $(this).addClass('wYes');
            $('.list .select').removeClass('selectYes');
        }
    })

    //多个删除
    $('.wholeDelete').click(function () {

        var selectYes = $('body .shareCommodity .list .selectYes');

        for (var i = 0; i < selectYes.length; i++) {
            $(selectYes).parent('.mcList').remove();
            list = $('body .shareCommodity .list');
        }


    })

    //单个删除
    $('.singleDelete').click(function () {


        $(this).parent('.mcList').remove();
        list = $('body .shareCommodity .list');


    })

}