var $ = require('jquery');

var quizTemplate = $('#quizTemplate');
var themeTemplate = $('#themeTemplate');

$('#myQuizButton').on('click', function () {

    if (quizTemplate.css('display') === 'none'){
        console.log("quiz none");
        themeTemplate.fadeOut("fast", function () {
            quizTemplate.fadeIn();
        })
    }

});

$('#myThemeButton').on('click', function () {

    if (themeTemplate.css('display') === 'none'){
        quizTemplate.fadeOut("fast", function () {
            themeTemplate.fadeIn();
        })
    }

});

$(document).ready(function () {

    if($('#flash-message') !== null){
        setTimeout(function () {
            $('#flash-message').fadeOut();
        }, 5000);
    }

});