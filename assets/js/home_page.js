import $ from 'jquery';


$(document).ready(function () {

    $(".carouselCard").on('click', function () {
        themesFilter(this);

    });

    $(".theme-selector").on('click',function () {
        themesFilter(this);
    });

    $(".partie-selector").on('click',function () {
        partiesFilter(this);
    });
    $("#showAllQuizzes").on('click', function () {
        $(".quizz").each(function () {
            $(this).fadeIn(1000);
        });
        $(this).fadeOut(1000);
        $("#theme-selector-title").text("Tous les thèmes");
    })

});
function themesFilter(element) {
    let theme = $(element).data("theme");
    $(".quizz").each(function () {
        if ($(this).data("theme") !== theme){
            $(this).fadeOut(1000);
        }
        else{
            $(this).fadeIn(1000);
        }
    });
    $("#showAllQuizzes").fadeIn(1000);
    $("#theme-selector-title").text(theme);
}
function partiesFilter(element) {
    let filter = element.value;
    if(filter==="En cours"){
        $(".quizz").each(function () {
            if (!$(this).data("onGoing")){
                $(this).fadeOut(1000);
            }
            else{
                $(this).fadeIn(1000);
            }
        });
        $("#partie-selector-title").text("Quizz en cours");
    }
    else if(filter==="Termine"){
        $(".quizz").each(function () {
            if (!$(this).data("onGoing") && $(this).data("played")){
                $(this).fadeIn(1000);
            }
            else{
                $(this).fadeOut(1000);
            }
        });
        $("#partie-selector-title").text("Quizz terminés");
    }
    else if(filter==="Jamais"){
        $(".quizz").each(function () {
            if ($(this).data("onGoing") || $(this).data("played")){
                $(this).fadeOut(1000);
            }
            else{
                $(this).fadeIn(1000);
            }
        });
        $("#partie-selector-title").text("Quizz jamais faits");
    }
    else{
        $(".quizz").each(function () {
            $(this).fadeIn(1000);
        });
        $("#partie-selector-title").text("Tous les quizz");
    }
}