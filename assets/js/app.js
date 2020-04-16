/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.scss in this case)
import '../css/app.scss';
import $ from "jquery";
require('popper.js');
require('bootstrap');
require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');
require('bootstrap4-toggle');

$(function () {
    document.getElementById('help-switch').addEventListener('click',function () {
        if(this.innerText==="Désactiver l'aide"){
            $('[data-toggle="popover"]').popover('hide');
            $('[data-toggle="popover"]').popover('disable');
            $('[data-toggle="popover"]').popover('dispose');
            this.innerText="Activer l'aide";
            this.classList.replace("text-info","text-primary");
        }
        else{
            $('[data-toggle="popover"]').popover();
            this.innerText="Désactiver l'aide";
            this.classList.replace("text-primary","text-info");
        }

    });
});
