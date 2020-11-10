import './jquery.js';


const floor = function() {
    let top = $(window).scrollTop(); //滚动条的top值。
    top >= 500 ? $('.home_nav_border').stop(true).animate({ opacity: 1, }) : $('.home_nav_border').stop(true).animate({ opacity: 0, });

    //滚动加类名
    if ($('#mustsee').offset().top < top) {
        $('.imgt').removeClass('act');
        $('.imgb').addClass('act');
    } else {
        $('.imgt').addClass('act');
        $('.imgb').removeClass('act');
    };
    if ($('.main1 .today').offset().top < top) {
        $('.imgc').addClass('act');
        $('.imgb').removeClass('act');
    } else { $('.imgc').removeClass('act'); }
}

export default floor;