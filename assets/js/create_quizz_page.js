import $ from 'jquery';
document.getElementById("newQuestion").onclick=addQuestion;
function addQuestion(){
    var numItems = $('.questionCard').length;
    console.log(numItems);
    var container = document.getElementById("quizz");
    var difficulteInput=createElement("input",{"id":"difficulte", "type":"number", "placeholder":"Difficulté","class":"col-6", "min":"0", "max":"10","name":"QuestionDifficulty".concat(numItems+1)}),
        difficulteLabel=createElement("label",{"for":"difficulte"},"Difficulté"),
        divCol=createElement("div",{"class":"col-6"},[difficulteLabel,difficulteInput]),
        questionInput=createElement("input",{"type":"text" ,"placeholder":"Question" ,"class":"col-6","name":"QuestionText".concat(numItems+1)}),
        divRow=createElement("div",{"class":"row"},[questionInput,divCol]),
        divContainer=createElement("div",{"class":"container"},[divRow]),
        divJumbotron=createElement("div",{"class":"jumbotron jumbotron-fluid","id":"jumbotronQ1"},[divContainer]),
        divQuestion=createElement("div",{"id":"question".concat(numItems+1),"class":"questionCard"},[divJumbotron]);
    container.appendChild(divQuestion);

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