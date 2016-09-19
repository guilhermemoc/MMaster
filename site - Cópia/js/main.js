

// blur on scroll
$(window).on('scroll', function () {
    var pixs, position = $(document).scrollTop()
    pixs = pixs / 200;
    $(".header").css({"-webkit-filter": "blur("+pixs+"px)","filter": "blur("+pixs+"px)" });

    var demoPosition = $('.demo:first').position().top;

    if(parseInt(position) >= parseInt(demoPosition)) {
      console.log(demoPosition , position);
      $('.burger_global').css("border-top", "5px solid #fff");
    } else {
      $('.burger_global').css("border-top" , "5px solid #f38181");
    }
});






$(function(){

$('.burger_deluxe').click(function() {

  $('.patty').toggleClass("pattyfade");
  $('.top_bun').toggleClass("rotate_top");
  $('.bottom_bun').toggleClass("rotate_bottom");

  var viewportHeight = $(window).height();
  if($('.top_bun').hasClass("rotate_top")) {
    $('.overlay').css('visibility','visible');
    $('.overlay').css('height', viewportHeight);
    $('.overlay').find('a').css('opacity', '1');
    setTimeout(function()
    {
    	$('.active').css('background-color', 'transparent');
    }, 750);
  }
  else
  {
    $('.overlay').css('height', '0');
    $('.overlay').find('a').css('opacity', '0');
    $('.overlay').css('visibility','hidden');
    $('.active').css('background-color', 'transparent');
  }
});
$('.nav-links a').click(function(){
  setTimeout(function(){
    $('.overlay').css('height', '0');
    $('.overlay').find('a').css('opacity', '0');
    $('.overlay').css('visibility','hidden');
    $('.active').css('background-color', 'transparent');
    $('.patty').toggleClass("pattyfade");
    $('.top_bun').toggleClass("rotate_top");
    $('.bottom_bun').toggleClass("rotate_bottom");
  },750);
});

$('.slide-center-out').click(function() {
  $('.slide-center-out').find('span').removeClass('active');
  $('.slide-center-out').find('span').css('background-color','');
  $(this).find('span').toggleClass('active');
});


$(window).resize(function() {
  var viewportHeight = $(window).height();
  if($('.top_bun').hasClass("rotate_top")) {
    $('.overlay').css('height', viewportHeight);
  }
});
});
