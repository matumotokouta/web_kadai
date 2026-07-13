$(function(){
    $('.hamburger').on('click',function(){
        $(this).toggleClass('active');
        $('.nav').toggleClass('active');
    });
});
