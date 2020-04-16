import $ from 'jquery';

$(document).ready(function() {
    console.log('Test');
    var duration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            console.log("Scroll !!");
            // Si un défillement de 100 pixels ou plus.
            // Ajoute le bouton
            $('#scrollUp').fadeIn(duration);
            $('#scrollUp').css('right','50px');
        } else {
            // Sinon enlève le bouton
            $('#scrollUp').fadeOut(duration);
            $('#scrollUp').removeAttr( 'style' );
        }
    });

    $('#scrollUp').click(function(event) {
        // Un clic provoque le retour en haut animé.
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
});