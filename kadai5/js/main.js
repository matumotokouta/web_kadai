$(function(){
    $(".hamburger").click(function(){
        $(this).toggleClass("open");
        $(".navi").toggleClass("open");
    });
});