import $ from 'jquery';
document.getElementById('quizz').addEventListener('submit',function (event) {
    if(!validateForm())
        event.preventDefault();
},);
function validateForm() {
    let isValid=true;
    let nb_questions=$('.questionCard').length;
    if(nb_questions===0){
        var alert=document.createElement("DIV");
        alert.innerHTML="<div class=\"alert alert-warning alert-dismissible fade show text-center\" role=\"alert\">\n" +
            "                    Vous devez ajouter au moins une question au quizz.\n" +
            "                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
            "                        <span aria-hidden=\"true\">&times;</span>\n" +
            "                    </button>\n" +
            "                </div>";
        document.getElementById("quizz").appendChild(alert);
        isValid=false;
    }
    for (let i=0; i<nb_questions; i++){
        if($('#auto-points-'+i)){
            let answers=$(('#answersQ'+(i+1)).concat(" > .answer"));
            let nb_answers=answers.length;
            console.log(nb_answers);
            if(nb_answers<2){
                var alert=document.createElement("DIV");
                alert.innerHTML="<div class=\"alert alert-warning alert-dismissible fade show text-center\" role=\"alert\">\n" +
                    "                    Vous devez ajouter au moins deux réponses possibles à cette question.\n" +
                    "                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
                    "                        <span aria-hidden=\"true\">&times;</span>\n" +
                    "                    </button>\n" +
                    "                </div>";
                document.getElementById("innerQCM"+(i+1)).appendChild(alert);
                isValid=false;
            }
            let nb_checked=$(('#answersQ'+(i+1)).concat(' input[type=checkbox]:checked')).length;
            console.log(nb_checked);
            if(nb_checked===0 && nb_answers>1){
                var alert=document.createElement("DIV");
                alert.innerHTML="<div class=\"alert alert-warning alert-dismissible fade show text-center\" role=\"alert\">\n" +
                    "                    Vous devez sélectionner une réponse correcte à cette question.\n" +
                    "                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
                    "                        <span aria-hidden=\"true\">&times;</span>\n" +
                    "                    </button>\n" +
                    "                </div>";
                document.getElementById("innerQCM"+(i+1)).appendChild(alert);
                isValid=false;
            }
            if(nb_answers>1 && nb_checked===nb_answers){
                console.log("pas de réponse fausse");
                var alert=document.createElement("DIV");
                alert.innerHTML="<div class=\"alert alert-warning alert-dismissible fade show text-center\" role=\"alert\">\n" +
                    "                    Vous devez laisser au moins une réponse fausse à cette question.\n" +
                    "                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
                    "                        <span aria-hidden=\"true\">&times;</span>\n" +
                    "                    </button>\n" +
                    "                </div>";
                document.getElementById("innerQCM"+(i+1)).appendChild(alert);
                isValid=false;
            }
        }
    }
    return isValid;
}
