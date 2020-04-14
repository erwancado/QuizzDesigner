import $ from 'jquery';
var isQCM;
var reponses;
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});
document.addEventListener('DOMContentLoaded', function() {
    var questionDiv=$('.question-div');
    isQCM=questionDiv.data('isQcm');
    reponses=questionDiv.data('infosQcm');
    var nb_reponses=parseInt(questionDiv.data('checkLimit'));
    if(isQCM)
        {
            checkboxlimit($('.custom-control-input'),nb_reponses);
            document.getElementById("form_suivant").style.display="none";
            document.getElementById("validation").addEventListener('click',function () {
                for(let i=0;i<reponses.length;i++){
                    let input=document.getElementById("form_QCMreponse".concat(i+""));
                    if(parseInt(reponses[i])>0){
                        input.parentElement.classList.add("alert");
                        input.parentElement.classList.add("alert-success");
                    }
                    else{
                        input.parentElement.classList.add("alert");
                        input.parentElement.classList.add("alert-danger");
                    }
                    input.disabled=true;
                }
                document.getElementById("form_suivant").disabled=false;
                document.getElementById("form_suivant").classList.add("btn-primary");
                document.getElementById("form_suivant").style.display="block";
                this.disabled=true;
                this.style.display="none";
            });
            document.getElementById("form_suivant").addEventListener('click',function () {
                for(let i=0;i<reponses.length;i++) {
                    document.getElementById("form_QCMreponse".concat(i + "")).disabled=false;
                }
            });
        }
    else{
        var libelle_reponse=$('#answers').data('libCorrect');
        console.log(decodeURIComponent(libelle_reponse));
        document.getElementById("form_suivant").style.display="none";
        document.getElementById("validation").addEventListener('click',function () {
            let correct_reponse=libelle_reponse.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            console.log(correct_reponse);
            var inputDiv=document.getElementById('form_reponse');
            let submit_reponse=inputDiv.value;
            submit_reponse=submit_reponse.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            correct_reponse=correct_reponse.toLowerCase();
            submit_reponse=submit_reponse.toLowerCase();
            if(submit_reponse===correct_reponse){
                inputDiv.value=libelle_reponse;
                inputDiv.classList.add("alert");
                inputDiv.classList.add("alert-success");
            }
            else{
                inputDiv.classList.add("alert");
                inputDiv.classList.add("alert-danger");
                var alert=document.createElement("DIV");
                alert.innerHTML="<div class=\"alert alert-danger alert-dismissible fade show text-center\" role=\"alert\">\n" +
                    "                    La réponse correcte était <strong>"+libelle_reponse+"</strong>.\n" +
                    "                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
                    "                        <span aria-hidden=\"true\">&times;</span>\n" +
                    "                    </button>\n" +
                    "                </div>";
                document.getElementById('answers').appendChild(alert);
            }
            inputDiv.readOnly=true;
            document.getElementById("form_suivant").disabled=false;
            document.getElementById("form_suivant").classList.add("btn-primary");
            document.getElementById("form_suivant").style.display="block";
            this.disabled=true;
            this.style.display="none";
        });

    }


});
function checkboxlimit(checkgroup, limit){
    for (var i=0; i<checkgroup.length; i++){
        checkgroup[i].onclick=function(){
            var checkedcount=0;
            for (var i=0; i<checkgroup.length; i++)
                checkedcount+=(checkgroup[i].checked)? 1 : 0;
            if (checkedcount>limit){
                var alert=document.createElement("DIV");
                alert.innerHTML="<div class=\"alert alert-warning alert-dismissible fade show text-center\" role=\"alert\">\n" +
                    "                    Vous pouvez sélectionner un maximum de "+limit+" réponses à cette question.\n" +
                    "                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
                    "                        <span aria-hidden=\"true\">&times;</span>\n" +
                    "                    </button>\n" +
                    "                </div>";
                document.getElementById('answers').appendChild(alert);
                this.checked=false;
            }
        }
    }
}

