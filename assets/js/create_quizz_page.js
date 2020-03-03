var $ = require('jquery');
document.getElementById("newQuestion").onclick=addQuestion;
document.getElementById("delQuizz").onclick=deleteAll;
document.getElementById("btn-del-1").addEventListener('click', function(){
    deleteQuestion(1);
});
function addQuestion(){
    var numItems = $('.questionCard').length;
    let idQuestion=numItems+1;
    var container = document.getElementById("quizz");
    var supprimerButton=createElement("button",{"type":"button" ,"class":"btn btn-outline-danger","id":"but-del-".concat(idQuestion)},"Supprimer");
    supprimerButton.addEventListener('click', function(){
        deleteQuestion(idQuestion);
    });
    var difficulteInput=createElement("input",{"id":"difficulte", "type":"number", "placeholder":"Difficulté","class":"col-6", "min":"0", "max":"10","name":"QuestionDifficulty".concat(idQuestion)}),
        difficulteLabel=createElement("label",{"for":"difficulte"},"Difficulté"),
        divCol=createElement("div",{"class":"col-6"},[difficulteLabel,difficulteInput]),
        questionInput=createElement("input",{"type":"text" ,"placeholder":"Question" ,"class":"col-6","name":"QuestionText".concat(idQuestion)}),
        divRow=createElement("div",{"class":"row"},[questionInput,divCol,supprimerButton]),
        divContainer=createElement("div",{"class":"container"},[divRow]),
        divJumbotron=createElement("div",{"class":"jumbotron jumbotron-fluid"},[divContainer]),
        divQuestion=createElement("div",{"id":"question".concat(idQuestion),"class":"questionCard"},[divJumbotron]);
    container.appendChild(divQuestion);
}
function deleteQuestion(id) {
    var question = document.getElementById("question".concat(id));
    while (question.hasChildNodes()) {
        question.removeChild(question.firstChild);
    }
}
function deleteAll() {
    let numItems = $('.questionCard').length;
    for(let i=1;i<=numItems;i++){
        deleteQuestion(i);
    }
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