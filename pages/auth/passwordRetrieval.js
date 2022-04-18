function postMail() {
    let email = $('#email').val();
    let currentUrl = "http://localhost:63342/Module4_CaseStudy_FrontEnd/pages/auth/changePassword.html";
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/forgot_password`,
        data: {email, currentUrl},
        success: function (data) {
            // for (let i = 0; i < data.length; i++) {
            $('#message-send-mail').html(data.message);
            $('#error-send-mail').html(data.error);
            // }
        }//End of Sucess Function
    })//End of ajax
}//End of postMail

function getUserInfo() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token')
    let password = $('#newPassword').val();
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/reset_password`,
        data: {token ,password},
        success: function (data) {
            $('#message').html(data.message);
        }
    })

}

$(document).ready(function () {


    $('#email').on('input', function () {
        var input = $(this);
        var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var is_email = re.test(input.val());
        if (is_email) {
            input.removeClass("invalid").addClass("valid");
            $('#error_email').removeClass("error_show").addClass("error");
        } else {
            input.removeClass("valid").addClass("invalid");
            $('#error_email').removeClass("error").addClass("error_show");
        }
    });


});
