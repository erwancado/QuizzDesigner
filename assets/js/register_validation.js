var $ = require('jquery');

$(document).ready(function () {

    var emailInput = $('#registration_form_email');
    var confirmedEmailInput = $('#registration_form_ConfirmEmail');
    var passwordInput = $('#registration_form_plainPassword');
    var confirmedPasswordInput = $('#registration_form_ConfirmPassword');

    emailInput.on('change', checkEmail);
    confirmedEmailInput.on('change', checkEmail);

    passwordInput.on('change', checkMdp);
    confirmedPasswordInput.on('change', checkMdp);

    function checkEmail() {

        var email = $('#registration_form_email').val();
        var confirmedEmail = $('#registration_form_ConfirmEmail').val();

        if (email !== confirmedEmail){

            if ($("#errorEmail").val() == null)
                $("#divErrorEmail").append('<p style="color: red; margin: 0 auto" id="errorEmail">Email does not match</p>')
        }
        else{
            if ($("#errorEmail") !== null){
                $("#errorEmail").remove();
            }
        }
    }

    function checkMdp() {

        var password = $('#registration_form_plainPassword').val();
        var confirmedPassword = $('#registration_form_ConfirmPassword').val();

        if (password !== confirmedPassword){
            if ($("#errorPassword").val() == null)
                $("#divErrorPassword").append('<p style="color: red; margin: 0 auto" id="errorPassword">Password does not match</p>')
        }
        else{
            if ($("#errorPassword") !== null){
                $("#errorPassword").remove();
            }
        }
    }

});
