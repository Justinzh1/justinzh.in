$(document).ready(function() {
    // $('#hermione').click(function(){
    //     console.log('hello');
    //     $('#hermione-info').css('display','block');
    //     $('#hermione-info').addClass('active-card');
    //     $('.nav').css('background-color', 'black');
    //     $('body').css('overflow', 'hidden');
    //     $('#justin').css('color', 'white');
    // });
    // $('.active-card').click(function(){
    //     $('#hermione-info').css('display', 'none');
    //     $('#herminoe-info').removeClass('active-card');
    // });
    //
    // $('#cpu').click(function(){
    //     console.log('hello');
    //     $('#hermione-info').css('display','block');
    //     $('#hermione-info').addClass('active-card');
    //     $('.nav').css('background-color', 'black');
    //     $('body').css('overflow', 'hidden');
    //     $('#justin').css('color', 'white');
    // });

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
        // $(tab).click(function() {
            console.log('working ' + this);
            $(info).css('display', 'block');
            $(info).addClass('active-card');
            $('.nav').css('background-color', 'black');
            $('body').css('overflow', 'hidden');
            $('#justin').css('color', 'white');
        // });
        // $('.active-card').click(function() {
        //     $(info).css('display', 'none');
        //     $(info).removeClass('active-card');
        // });
    });
});
