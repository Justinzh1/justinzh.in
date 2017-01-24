$(document).ready(function() {

    $('.toolbar').mouseenter(function() {
        // $(this).css('color', 'white');
        // $(this).children('.card-link').css('color', 'white');
    })
    .mouseleave(function() {
        // $(this).css('color', 'black');
        // $(this).children('.card-link').css('color', 'black');
    });

    $('.info-button').click(function(){
        id = $(this).attr('id');
        tab = '#' + id;
        info = tab + '-info';
        $(info).css('display', 'block');
        $(info).addClass('active-card');
        $('.nav').css('background-color', 'black');
        $('body').css('overflow', 'hidden');
        $('#justin').css('color', 'white');
    });
});
