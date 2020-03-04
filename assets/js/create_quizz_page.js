var $ = require('jquery');
document.getElementById("newQO").addEventListener('click',function () {
    addQuestion(false);
});
document.getElementById("newQCM").addEventListener('click',function () {
    addQuestion(true);
});
document.getElementById("delQuizz").onclick=deleteAll;
document.getElementById("btn-del-1").addEventListener('click', function(){
    deleteQuestion(1);
});
function addQuestion(qcm){
    var numItems = $('.questionCard').length;
    let idQuestion=numItems+1;
    var container = document.getElementById("quizz");
    var deleteQuestionButton=createElement("button",{"type":"button" ,"class":"btn btn-outline-danger","id":"but-del-".concat(idQuestion)},"Supprimer");
    deleteQuestionButton.addEventListener('click', function(){
        deleteQuestion(idQuestion);
    });
    var divDeleteQuestionButton = createElement("div",{"class":"text-right"},deleteQuestionButton);
    var difficulteInput=createElement("input",{"id":"difficulte", "type":"number", "placeholder":"Difficulté","class":"col-6", "min":"0", "max":"10","name":"QuestionDifficulty".concat(idQuestion)}),
        difficulteLabel=createElement("label",{"for":"difficulte"},"Difficulté"),
        divCol=createElement("div",{"class":"col-6"},[difficulteLabel,difficulteInput]),
        questionInput=createElement("input",{"type":"text" ,"placeholder":"Question" ,"class":"col-6","name":"QuestionText".concat(idQuestion)}),
        divRowQuestion=createElement("div",{"class":"row mt-2"},[questionInput,divCol]);
    var divContainer=createElement("div",{"class":"container"},[divDeleteQuestionButton,divRowQuestion]);
    if(qcm){
        var answerInput = createElement("input",{"type":"text","placeholder":"Réponse","class":"form-control","name":"Q".concat(idQuestion).concat("-A1-txt")}),
            answerCheck = createElement("input",{"class":"custom-control-input align-middle","type":"checkbox","value":"Correct","name":"Q".concat(idQuestion).concat("-A1-check")}),
            imgButtonDel=createElement("i",{"class":"fas fa-ban"});
        var buttonDel=createElement("button",{"type":"button","class":"btn btn-danger","id":"delAnswer1"},imgButtonDel);
        buttonDel.addEventListener('click',function () {
            removeAnswer(1);
        });
        var divAnswer  = createElement("div",{"class":"custom-control custom-check col-8 answer","id":"answer1"},[answerCheck,answerInput,buttonDel]),
            imgButtonAdd=createElement("i",{"class":"fas fa-plus"});
        var buttonAdd=createElement("button",{"type":"button","class":"btn btn-outline-dark col-2","id":"addAnswerQ".concat(idQuestion)},imgButtonAdd);
        buttonAdd.addEventListener('click',function () {
            addAnswer(idQuestion);
        });
        var divAnswers = createElement("div",{"class":"row mt-2","id":"answersQ".concat(idQuestion)},[divAnswer,buttonAdd]);
        divContainer.appendChild(divAnswers);
    }
    var divJumbotron=createElement("div",{"class":"jumbotron jumbotron-fluid"},[divContainer]),
        divQuestion=createElement("div",{"id":"question".concat(idQuestion),"class":"questionCard"},[divJumbotron]);
    container.appendChild(divQuestion);
}
function deleteQuestion(id) {
    var question = document.getElementById("question".concat(id));
    while (question.hasChildNodes()) {
        question.removeChild(question.lastChild);
    }
    question.parentNode.removeChild(question);
}
function deleteAll() {
    let numItems = $('.questionCard').length;
    for(let i=1;i<=numItems;i++){
        deleteQuestion(i);
    }
}
function addAnswer(idQuestion) {
    var answersContainer = document.getElementById("answersQ".concat(idQuestion));
    var idAnswer = $("#answersQ".concat(idQuestion).concat(" > .answer")).length + 1;
    var answerInput = createElement("input",{"type":"text","placeholder":"Réponse","class":"form-control","name":"Q".concat(idQuestion).concat("-A").concat(idAnswer).concat("-txt")}),
        answerCheck = createElement("input",{"class":"form-check-input align-middle","type":"checkbox","value":"Correct","name":"Q".concat(idQuestion).concat("-A").concat(idAnswer).concat("-check")}),
        imgButtonDel=createElement("i",{"class":"fas fa-ban"});
    var buttonDel=createElement("button",{"type":"button","class":"btn btn-danger","id":"delAnswer".concat(idAnswer)},imgButtonDel);
    buttonDel.addEventListener('click',function () {
        removeAnswer(idAnswer);
    });
    var divAnswer = createElement("div",{"class":"form-check col-8 answer mt-2","id":"answer".concat(idAnswer)},[answerCheck,answerInput,buttonDel]);
    answersContainer.appendChild(divAnswer);
}
function removeAnswer(idAnswer) {
    var answer = document.getElementById("answer".concat(idAnswer));
    while (answer.hasChildNodes()){
        answer.removeChild(answer.lastChild);
    }
    answer.parentNode.removeChild(answer);
}
function createElement(element, attribute, inner) {
    if (typeof(element) === "undefined") {
        return false;
    }
    if (typeof(inner) === "undefined") {
        inner = "";
    }
    var el = document.createElement(element);
    if (typeof(attribute) === 'object') {
        for (var key in attribute) {
            el.setAttribute(key, attribute[key]);
        }
    }
    if (!Array.isArray(inner)) {
        inner = [inner];
    }
    for (var k = 0; k < inner.length; k++) {
        if (inner[k].tagName) {
            el.appendChild(inner[k]);
        } else {
            el.appendChild(document.createTextNode(inner[k]));
        }
    }
    return el;
}