import $ from 'jquery';

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

/*$('.custom-file-input').change(function(e){

    //get the file name
    var fileName = e.target.files[0].name;
    //replace the "Choose a file" label
    console.log(fileName);
    $(this).next('.custom-file-label').text(fileName);
});*/

$(document).on('change', '.custom-file-input', function (event) {
    $(this).next('.custom-file-label').text(event.target.files[0].name);
    console.log(event.target.files[0]);
});

document.getElementById("newQO").addEventListener('click',function () {
    addQuestion(false);
});
document.getElementById("newQCM").addEventListener('click',function () {
    addQuestion(true);
});
document.getElementById("delQuizz").onclick=deleteAll;



function addQuestion(qcm){
    var numItems = $('.questionCard').length;
    let idQuestion=numItems+1;
    var container = document.getElementById("quizz");
    var fileInput = createElement("input",{"type":"file","class":"custom-file-input","name":"customFile".concat(idQuestion)});
    var fileLabel = createElement("label",{"class":"custom-file-label","for":"customFile".concat(idQuestion)},"Ajouter une image");
    var divFile = createElement("div",{"class":"custom-file col-3"},[fileInput,fileLabel]);
    var questionInput = createElement("input",{"type":"text" ,"placeholder":"Question" ,"class":"col-11","name":"QuestionText".concat(idQuestion)});
    var divQuestion = createElement("div",{"class":"col-7"},questionInput);
    var deleteQuestionButton = createElement("button",{"type":"button","class":"btn btn-danger","id":"btn-del-".concat(idQuestion)},"Supprimer");
    deleteQuestionButton.addEventListener('click',function () {
        deleteQuestion(idQuestion);
    });
    var colDel = createElement("div",{"class":"col-1"},deleteQuestionButton);
    var row1 = createElement("div",{"class":"row"},[divQuestion,divFile,colDel]);
    if(!qcm){
        var helpInput=createElement("input",{"type":"text" ,"placeholder":"Indice" ,"class":"col-12","name":"QuestionHelp".concat(idQuestion)});
        var col1 = createElement("div",{"class":"col-7"},helpInput);
        var questionPointsInput = createElement("input",{"id":"nb-points-Q".concat(idQuestion),"type":"number","value":"5","class":"col-10","placeholder":"Nombre de points","min":"1", "max":"50" ,"name":"QuestionDifficulty".concat(idQuestion)});
        var col2 = createElement("div",{"class":"col-3"},questionPointsInput);
        var row2 = createElement("div",{"class":"row mt-2"},[col1,col2]);
        var answerInput=createElement("input",{"type":"text" ,"placeholder":"Réponse" ,"class":"col-10","name":"QuestionAnswer".concat(idQuestion)});
        var row3 = createElement("div",{"class":"row mt-4 justify-content-center"},answerInput);
        var divContainer=createElement("div",{"class":"container"},[row1,row2,row3]);
        var divJumbotron=createElement("div",{"class":"jumbotron jumbotron-fluid"},[divContainer]),
            divQuestion=createElement("div",{"id":"question".concat(idQuestion),"class":"questionCard"},[divJumbotron]);
        container.appendChild(divQuestion);
    }
    else{
        var helpInput=createElement("input",{"type":"text" ,"placeholder":"Indice" ,"class":"col-12","name":"QuestionHelp".concat(idQuestion)});
        var col1 = createElement("div",{"class":"col-6"},helpInput);
        var questionPointsInput = createElement("input",{"id":"nb-points-Q".concat(idQuestion),"type":"number","class":"col-10","placeholder":"Nombre de points","min":"1", "max":"50" ,"name":"QuestionDifficulty".concat(idQuestion)});
        questionPointsInput.addEventListener('input',function () {
            updatePoints(idQuestion);
        });
        var col2 = createElement("div",{"class":"col-3"},questionPointsInput);
        var divTextSwitch = createElement("div",{"class":"col-2"},"Calcul auto des points");
        var spanSwitch = createElement("span",{"class":"slider round"});
        var pointsSwitch = createElement("input",{"id":"auto-points-".concat(idQuestion),"type":"checkbox","class":"default" ,"checked":"true"});
        pointsSwitch.addEventListener('click',function() {
            updateFieldsStates(idQuestion);
        });
        var labelSwitch = createElement("label",{"class":"switch col-1.5"},[pointsSwitch,spanSwitch]);
        var row2 = createElement("div",{"class":"row mt-2"},[col1,col2,divTextSwitch,labelSwitch]);
        var answers = renderAnswer(idQuestion,1);
        var row3 = createElement("div",{"class":"row mt-2","id":"answersQ".concat(idQuestion)},answers);
        var imgAddButton = createElement("i",{"class":"fas fa-plus"});
        var addQuestionButton = createElement("button",{"type":"button","class":"btn btn-primary col-12","id":"addAnswerQ".concat(idQuestion)},[imgAddButton," Ajouter une réponse"]);
        addQuestionButton.addEventListener('click',function () {
            addAnswer(idQuestion);
        });
        var divQB = createElement("div",{"class":"col-3"},addQuestionButton);
        var row4 = createElement("div",{"class":"row mt-2 justify-content-center"},divQB);
        var divContainer=createElement("div",{"class":"container"},[row1,row2,row3,row4]);
        var divJumbotron=createElement("div",{"class":"jumbotron jumbotron-fluid"},[divContainer]),
            divQuestion=createElement("div",{"id":"question".concat(idQuestion),"class":"questionCard"},[divJumbotron]);
        container.appendChild(divQuestion);
    }

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
function renderAnswer(idQuestion,idAnswer) {
    var spanSwitch = createElement("span",{"class":"slider round"});
    var checkbox=createElement("input",{"type":"checkbox","class":"success answer-check","value":"Correct","name":"check-Q".concat(idQuestion).concat("-A").concat(idAnswer)});
    checkbox.addEventListener("click",function () {
        updatePoints(idQuestion);
        updateFieldsStates(idQuestion);
    });
    var divSwitch = createElement("label",{"class":"switch col-1.5"},[checkbox,spanSwitch]);
    var span1 = createElement("span",{"class":"col-1"});
    var answerInput = createElement("input",{"type":"text","placeholder":"Réponse","class":"form-control col-8 answer-text","name":"txt-Q".concat(idQuestion).concat("-A").concat(idAnswer)});
    var col1=createElement("div",{"class":"col-7 form-check form-check-inline"},[divSwitch,span1,answerInput]);
    var pointsInput=createElement("input",{"type":"number","readonly":"","class":"col-4 answer-points","placeholder":"Points","min":"0","max":"50","name":"points-Q".concat(idQuestion).concat("-A").concat(idAnswer)});
    pointsInput.addEventListener('input',function () {
        updatePoints(idQuestion);
    });
    var span2=createElement("span",{"class":"col-3"});
    var imgDelButton=createElement("i",{"class":"fas fa-ban"});
    var deleteAnswerButton=createElement("button",{"type":"button","class":"btn btn-danger col-2"},imgDelButton);
    deleteAnswerButton.addEventListener('click',function () {
        removeAnswer(idQuestion,idAnswer);
    });
    var col2 = createElement("div",{"class":"col-4 form-check form-check-inline"},[pointsInput,span2,deleteAnswerButton]);
    return createElement("div",{"id":"answer-Q".concat(idQuestion).concat("-A").concat(idAnswer),"class":"answer col-12"},[col1,col2]);
}
function addAnswer(idQuestion) {
    var answersContainer = document.getElementById("answersQ".concat(idQuestion));
    var idAnswer = $("#answersQ".concat(idQuestion).concat(" > .answer")).length + 1;
    var divAnswer=renderAnswer(idQuestion,idAnswer);
    answersContainer.appendChild(divAnswer);
    updatePoints(idQuestion);
}
function removeAnswer(idQuestion,idAnswer) {
    var answer = findAnswer(idQuestion,idAnswer);
    while (answer.hasChildNodes()){
        answer.removeChild(answer.lastChild);
    }
    answer.parentNode.removeChild(answer);
    var i=idAnswer+1;
    while (findAnswer(idQuestion,i)!=null){
        var newID=i-1;
        newID=newID.toString();
        findAnswer(idQuestion,i).getElementsByClassName("answer-check").item(0).setAttribute('name',"check-Q".concat(idQuestion).concat("-A").concat(newID));
        findAnswer(idQuestion,i).getElementsByClassName("answer-text").item(0).setAttribute('name',"txt-Q".concat(idQuestion).concat("-A").concat(newID));
        findAnswer(idQuestion,i).getElementsByClassName("answer-points").item(0).setAttribute('name',"points-Q".concat(idQuestion).concat("-A").concat(newID));
        findAnswer(idQuestion,i).id="answer-Q".concat(idQuestion).concat("-A").concat(newID);
        i++;
    }
    updatePoints(idQuestion);
}
function findAnswer(idQuestion,idAnswer) {
    return document.getElementById("answer-Q".concat(idQuestion).concat("-A").concat(idAnswer));
}
function updatePoints(idQuestion) {
    if($('#auto-points-'.concat(idQuestion)).prop('checked')){
        var nbAnswers = $("#answersQ".concat(idQuestion).concat(" > .answer")).length;
        var nbAnswersChecked = 0;
        for(let iCheck=1;iCheck<=nbAnswers;iCheck++){
            if(findAnswer(idQuestion,iCheck).getElementsByClassName("answer-check").item(0).checked){
                nbAnswersChecked++;
            }
        }
        var nbPoints = document.getElementById('nb-points-Q'.concat(idQuestion)).value;
        var questionPoints=nbPoints/nbAnswersChecked;
        for(let iCheck=1;iCheck<=nbAnswers;iCheck++){
            if(findAnswer(idQuestion,iCheck).getElementsByClassName("answer-check").item(0).checked){
                findAnswer(idQuestion,iCheck).getElementsByClassName("answer-points").item(0).value=questionPoints;
            }
            else{
                findAnswer(idQuestion,iCheck).getElementsByClassName("answer-points").item(0).value=0;
            }
        }
    }
    else {
        var nbPoints=0;
        var nbAnswers = $("#answersQ".concat(idQuestion).concat(" > .answer")).length;
        var i=1;
        while (i<=nbAnswers){
            if(!findAnswer(idQuestion,i).getElementsByClassName("answer-check").item(0).checked){
                findAnswer(idQuestion,i).getElementsByClassName("answer-points").item(0).value=0;
            }
            nbPoints+=parseInt(findAnswer(idQuestion,i).getElementsByClassName("answer-points").item(0).value);
            i++;
        }
        document.getElementById('nb-points-Q'.concat(idQuestion)).value=nbPoints;
    }
}
function updateFieldsStates(idQuestion) {
    if($("#auto-points-".concat(idQuestion)).prop('checked')){
        updatePoints(idQuestion);
        var i=1;
        while (findAnswer(idQuestion,i)!=null){
            findAnswer(idQuestion,i).getElementsByClassName("answer-points").item(0).readOnly=true;
            i++;
        }
        document.getElementById('nb-points-Q'.concat(idQuestion)).readOnly=false;
    }
    else{
        updatePoints(idQuestion);
        var i=1;
        while (findAnswer(idQuestion,i)!=null){
            if(findAnswer(idQuestion,i).getElementsByClassName("answer-check").item(0).checked){
                findAnswer(idQuestion,i).getElementsByClassName("answer-points").item(0).readOnly=false;
            }
            i++;
        }
        document.getElementById('nb-points-Q'.concat(idQuestion)).readOnly=true;
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