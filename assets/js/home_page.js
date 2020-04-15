import $ from 'jquery';


$(document).ready(function () {

    $(".carouselCard").on('click', function () {
        let theme = $(this).data("theme");



        $(".quizz").each(function () {
            if ($(this).data("theme") !== theme){
                $(this).fadeOut(1000);
            }
            else{
                $(this).fadeIn(1000);
            }
        });
        $("#showAllQuizzes").fadeIn(1000);

    });

    $("#showAllQuizzes").on('click', function () {
        $(".quizz").each(function () {
            $(this).fadeIn(1000);
        });
        $(this).fadeOut(1000);
    })

});