import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';



$('.submit_btn').on('click', function() {
    // console.log(4);
    let password = $.md5($('#password').val());
    $.ajax({
        type: "post",
        url: "http://localhost:8888/users/login",
        data: {
            username: $('#username').val(),
            password: password,
            phone: $('#mobile').val(),
        },
        dataType: "json",
        success: function(response) {
            console.log(response);
        }
    });
});

//页面加载时失去焦点
$('input').on('blur');

var oMbilflag = true;
var oNameflag = true;
var oPasflag = true;
var oReflag = true;
//注册页面input得到失去焦点
$('.textbox_ui').children('input').on('focus', function() {
    if ($(this).val() !== '') {
        $(this).siblings('.focus_text').css('display', 'none');
        $(this).siblings('.invalid').css('display', 'block')
    } else {
        $(this).siblings('.focus_text').css('display', 'block');
        $(this).siblings('.invalid').css('display', 'none')
    }
});
$('.textbox_ui').children('input').on('blur', function() {
    $(this).siblings('.focus_text').css('display', 'none');
    $(this).siblings('.invalid').css('display', 'block')
});

//用户名判断
$('#username').on('blur', (function() {
    if ($(this).val() !== '') {
        var len = $(this).val().length;
        var reg = /^\w+$/;
        if (len >= 6) {
            if (reg.test($(this).val())) {
                $(this).siblings('.invalid').css('display', 'none').children('.msg').text('');
                oNameflag = true;
            } else {
                $(this).siblings('.invalid').css('display', 'block').children('.msg').text('用户名不合法').css('color', 'red');
            }
        } else {
            $(this).siblings('.invalid').css('display', 'block').children('.msg').text('用户名长度不对').css('color', 'red');
        }
    } else {
        $(this).siblings('.invalid').css('display', 'block').children('.msg').text('用户名不能为空').css('color', 'red');
    }
}));

//手机号判断
$('#mobile').on('blur', (function() {
    if ($(this).val() !== '') {
        var reg = /^1[3589][0-9]{9}$/g;
        if (reg.test($(this).val())) {
            $(this).siblings('.invalid').css('display', 'none').children('.msg').text('')
            oMbilflag = true;
        } else {
            $(this).siblings('.invalid').css('display', 'block').children('.msg').text('手机号不合法').css('color', 'red');
        }
    } else {
        $(this).siblings('.invalid').css('display', 'block').children('.msg').text('手机号不能为空').css('color', 'red');
    }
}));

//密码判断
$('#password').on('blur', (function() {
    var len = $(this).val().length;
    if (len >= 6 && len <= 20) {
        var regnum = /\d+/g
        var regul = /[a-z]+/g
        var regll = /[A-Z]+/g
        var regzf = /\W+/g
        var num = 0

        if (regnum.test($(this).val())) {
            ++num;
        }
        if (regul.test($(this).val())) {
            ++num;
        }
        if (regll.test($(this).val())) {
            ++num;
        }
        if (regzf.test($(this).val())) {
            ++num;
        }
        switch (num) {
            case 1:
                $(this).siblings('.invalid').children('.msg').css('display', 'none').siblings('#msg_red').css({ 'background': 'red' });
                oPasflag = false;
                break;
            case 2:
            case 3:
                $(this).siblings('.invalid').children('i').css('display', 'none').siblings('.msg').css('display', 'none').siblings('#msg_yellow').css({ 'background': 'yellow' }).siblings('#msg_red').css({ 'background': '#999' });
                oPasflag = true;
                break;
            case 4:
                $(this).siblings('.invalid').children('i').css('display', 'none').siblings('.msg').css('display', 'none').siblings('#msg_green').css({ 'background': 'green' }).siblings('#msg_red').css({ 'background': '#999' }).siblings('#msg_yellow').css({ 'background': '#999' });
                oPasflag = true;
                break;
        }
    } else {
        $(this).siblings('.invalid').css('display', 'block').children('.msg').text('换个密码试试').css('color', 'red').siblings().css('display', 'none');
    }
}));


//重复密码
$('#password2').on('blur', (function() {
    if ($(this).val() === $('#password').val()) {
        $(this).siblings('.invalid').css('display', 'none').children('.msg').text('')
        oReflag = true;
    } else {
        $(this).siblings('.invalid').children('.msg').text('密码不一致').css('color', 'red');
    }
}));


//提交
$('.submit_btn').submit(function() {
    if (mobile.val('')) {
        spanmob.text('手机号不能为空').css('color', 'red')
        oMbilflag = false;
    }
    if (username.val('')) {
        spanmob.text('用户名不能为空').css('color', 'red')
        oNameflag = false;
    }
    if (passowrd.val('')) {
        spanmob.text('密码不能为空').css('color', 'red')
        oPasflag = false;
    }
    if (spanrepas.val('')) {
        spanmob.text('请再次输入密码').css('color', 'red')
        oReflag = false;
    }
    if (!oMbilflag || !oNameflag || !oPasflag || !oReflag) {
        return false;
    }
})