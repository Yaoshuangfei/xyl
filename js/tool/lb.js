/**
 * Created by Administrator on 2017/5/19 0019.
 */
$(function(){
    var swiper1 = new Swiper('.swiper1', {
        loop: true,
        autoplay: 3000,

    });
    var swiper2 = new Swiper('.swiper2', {
        loop: true,
        freeMode : true,
        freeModeMomentumRatio :0.5,
        slidesPerView:3,
        spaceBetween:10,
    });

})