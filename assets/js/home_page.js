import $ from 'jquery';


$(document).ready(function () {

    let quizzThemeArray = $(".quizzImgCard").map(function () {
            return $(this).data("theme");
    }).get();



    $(".carouselCard").on('click', function () {
       let theme = $(this).data("theme");

       $("#showAllQuizzes").fadeIn(1000);

        $(".quizzImgCard").each(function () {
            if ($(this).data("theme") !== theme){
                $(this).fadeOut(1000);
            }
            else{
                $(this).fadeIn(1000);
            }
        })
    });

    $("#showAllQuizzes").on('click', function () {
        $(".quizzImgCard").each(function () {
            $(this).fadeIn(1000);
        });
        $(this).fadeOut(1000);
    })

});