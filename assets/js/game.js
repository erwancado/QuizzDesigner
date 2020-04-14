import $ from 'jquery';
var isQCM;
var reponses;
document.addEventListener('DOMContentLoaded', function() {
    isQCM=$('.question-div').data('isQcm');
    console.log(isQCM);
    reponses=$('.question-div').data('infosQcm');
    /*while(reponses_string.length>1){
        reponses.push(parseInt(reponses_string.substring(0,reponses_string.indexOf(","))));
        if(reponses_string.indexOf(",")+1<reponses_string.length)
            reponses_string=reponses_string.substring(reponses_string.indexOf(","))
        else
            reponses_string="";
    }*/
    console.log(reponses);
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
});

