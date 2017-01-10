$(document).ready(function() {
    $('#hermione').click(function(){
        console.log('hello');
        $('#hermione-info').css('display','block');
        $('#hermione-info').addClass('active-card');
        $('.nav').css('background-color', 'black');
        $('body').css('overflow', 'hidden');
    });
    $('.active-card').click(function(){
        $('#hermione-info').css('display', 'none');
        $('#herminoe-info').removeClass('active-card');
    });
});
