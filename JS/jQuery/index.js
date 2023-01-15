// $('h1').addClass('bigtitle');
// $('h1').text('Sssup');
$('button').html("<em> Don't click me !</em>");

$('h1').click(function(){
    $('h1').text('I Love You');
    setTimeout(changename, 100 );
})
function changename(){
    $('h1').text('Hello');
   
}

$('body').keypress(function (event){
    press = (event.key);
    $('h1').text( press)  ;
    setTimeout(changename, 300 );
    
})