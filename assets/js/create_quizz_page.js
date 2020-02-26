import $ from 'jquery';

$(document).ready(function () {

    var nbQuestion = 1;


    var templatePath = "templates/questionTemplate/";

    var valeur2 = $.get(templatePath + "questionTemplate.html.twig", function (data) {
        console.log(data);
    });



    var valeur = document.getElementById("jumbotronQ1").innerHTML;
    //console.log(valeur);
    $('#newQuestion').click(function () {
        $('#quizz').append($('<div>', {id : ('question' + (++nbQuestion)), class: 'questionCard'}));
        $('#question'+ nbQuestion).append($('<div>', {id : ('jumbotronQ'+nbQuestion), class: 'jumbotron jumbotron-fluid'}));
        //$('jumbotronQ'+nbQuestion).html($('jumbotronQ1').html());
        $('#jumbotronQ'+nbQuestion).append(valeur);

    })

});