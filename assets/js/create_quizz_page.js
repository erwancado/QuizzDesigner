import $ from 'jquery';

$(document).ready(function () {

    var nbQuestion = 1;

    $('#newQuestion').click(function () {
        //$('#quizz').append(insertOpenQuestion((++nbQuestion)));
        $('#choseQuestionModal').modal(options)
    })

});

function insertOpenQuestion(num) {

    var resultat = '<div id=\"question'+ num + '\" class="questionCard">\n' +
        '            <div class="jumbotron jumbotron-fluid" id="jumbotronQ' + num + '">\n' +
        '                <div class="container">\n' +
        '                    <form action="">\n' +
        '                        <div class="row">\n' +
        '                            <input type="text" placeholder="Question" class="col-6">\n' +
        '                            <div class="col-6">\n' +
        '                                <label for="difficulte">Difficulté</label>\n' +
        '                                <input id="difficulte" type="number" placeholder="Question" class="col-6" min="0" max="10">\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </form>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>';

    return resultat;
}