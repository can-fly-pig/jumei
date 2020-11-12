import './library/jquery.js';
import './library/jquery.md5.js';
import funParabola from './library/goodsflyin.js';
import creatcar from './library/right_buycar.js';
import floor from './library/floor.js';
import './library/jquery.lazyload.min.js';
import index_rander from './library/index_rander.js';

// 1.购物车飞入
$(".quick_links_panel li").mouseenter(function() {
    $(this).children(".mp_tooltip").animate({
        left: -92,
        queue: true
    });
    $(this).children(".mp_tooltip").css("visibility", "visible");
    $(this).children(".ibar_login_box").css("display", "block");
});
$(".quick_links_panel li").mouseleave(function() {
    $(this).children(".mp_tooltip").css("visibility", "hidden");
    $(this).children(".mp_tooltip").animate({
        left: -121,
        queue: true
    });
    $(this).children(".ibar_login_box").css("display", "none");
});
$(".quick_toggle li").mouseover(function() {
    $(this).children(".mp_qrcode").show();
});
$(".quick_toggle li").mouseleave(function() {
    $(this).children(".mp_qrcode").hide();
});

// 元素以及其他一些变量
var eleFlyElement = document.querySelector("#flyItem"),
    eleShopCart = document.querySelector("#shopCart");
var numberItem = 0;
// 抛物线运动
var myParabola = funParabola(eleFlyElement, eleShopCart, {
    speed: 400, //抛物线速度
    curvature: 0.0008, //控制抛物线弧度
    complete: function() {
        eleFlyElement.style.visibility = "hidden";
        eleShopCart.querySelector("span").innerHTML = ++numberItem;
    }
});
// 绑定点击事件
if (eleFlyElement && eleShopCart) {

    [].slice.call(document.getElementsByClassName("btnCart")).forEach(function(button) {
        button.addEventListener("click", function(event) {
            // 滚动大小
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
            eleFlyElement.style.left = event.clientX + scrollLeft + "px";
            eleFlyElement.style.top = event.clientY + scrollTop + "px";
            eleFlyElement.style.visibility = "visible";

            // 需要重定位
            myParabola.position().move();
        });
    });
}


//2.创建购物车等右侧边栏
creatcar();



//3.楼梯效果
floor();
//滚轮事件触发
$(window).on('scroll', function() {
    floor();
});

//hover背景图位置变化
$('.home_nav_list a').hover(function() { $(this).css({ 'background-position': '-86px,88px', 'height': 40 + 'px' }) }, function() {
    $(this).removeAttr('style')
})




//4.懒加载
$('.lazy').lazyload({
    effect: 'fadeIn',
    placeholder: "../images/lading.gif",
});


//5.数据渲染
index_rander();