import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';



$('input').on('click', function() {
    // console.log(4);
    let password = $.md5($('#password').val());
    $.ajax({
        type: "post",
        url: "http://localhost:8888/users/reg",
        data: {
            username: $('#username').val(),
            password: password,
            // email: $('[name=email]').val(),
            phone: $('#mobile').val(),
            // address: $('[name=address]').val(),
        },
        dataType: "json",
        success: function(response) {
            console.log(response);
        }
    });
});