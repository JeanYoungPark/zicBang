$(document).ready(function(){
    $('.tab li').on('click',function(){
        $('.tab li').removeClass('on');
        $(this).addClass('on');
        var placeholder = $(this).find('span').attr('data-txt');
        $('.search .input input').attr('placeholder',placeholder);
    });
});