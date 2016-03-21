/**CHECK IS MOBILE**/
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry|BB/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Nokia: function() {
        return navigator.userAgent.match(/Nokia/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Nokia() || isMobile.Opera() || isMobile.Windows());
    }
};

var opHeader = 0.6 ; // opacity header default
//Enable swiping...
$(".carousel-inner").swipe({
    //Generic swipe handler for all directions
    swipeLeft:function(event, direction, distance, duration, fingerCount) {
        $(this).parent().carousel('next'); 
    },
    swipeRight: function() {
        $(this).parent().carousel('prev'); 
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold:0,
});
$('.item.rate').css({'position': 'relative'});

$('#header').css({'box-shadow':'none', '-webkit-box-shadow':'none'});

/**
 * Scroll to div with animation effect
 */
$("#header #bs-example-navbar-collapse-1 a").click(function(event){
    event.preventDefault();
    
	$("#header #bs-example-navbar-collapse-1 a.active").removeClass("active");
	$(this).addClass("active");

    var id = $(this).attr("hreft");
    var tt=$(this).attr("tt");
    console.show(tt);
    var widthScr = $(window).width();
    var heightHeader = 40;
    if(isMobile.any() && $(window).width() > 767)
    	heightHeader = 80;

    $('html, body').animate({
    	scrollTop:$(id).offset().top- heightHeader
    },600, 'easeOutQuad');

});

$("#header #bs-example-navbar-collapse-1 a").click(function(event){
	$("#header .navbar-collapse").collapse('hide');
});

/**
 * Set opacity for element
 * @param {[String]} ele    [id or class of element]
 * @param {[Number]} num    [number opacity]
 * @param {[String]} effect [name effect (Jquert UI)]
 * @param {[Number]} speed  [number effect transition]
 */
function setOpacity(ele, num, effect, speed){
	$(ele).css({'opacity': num, 'transition': 'opacity '+ speed +'s ' + effect});
}

/**
 * Set color when focus input, textarea in form
 */
$("#maps input, #maps textarea").focus(function(){
	var parentE = $(this).parent();
	$(parentE).find('label').css({
		"color":"#005c9c",
	})

	$(this).css({
		"color":"#005c9c",
		"border-color":"#005c9c",
		"outline":"none",
	});
});

//Set style for input, textarea in form when blur
$("#maps input, #maps textarea").blur(function(){
	var parentE = $(this).parent();
	$(parentE).find('label').css({
		"color":"#005c9c",
	})
	
	$(this).css({
		"color":"#005c9c",
		"border-color":"#ccc",
	});

});

//function of notify library
function reset() {
    $("#toggleCSS").attr("href", "public/libs/alertify.js-0.3.11/themes/alertify.default.css");
    alertify.set({
        labels : {
            ok     : "OK",
            cancel : "Cancel"
        },
        delay : 5000,
        buttonReverse : false,
        buttonFocus   : "ok"
    });

    $( ".carousel" ).carousel({ interval: false });
}

/**
 * Send contact from web page
 * @return {[type]} [description]
 */

function sendContact(){
	var data = $('#form-contact').serialize();
	var url = 'sendcontact';
	$("#maps form .success, #maps form .error").hide();
	$("#maps form button").attr({"disabled":"disabled"});
	$(" #maps form .sending").show();
	$.ajax({
		url: url,
		data: data,
		type:'POST',
		//dataType:'json',
		success:function(dtRespone){
			//console.log(dtRespone);
			reset();
			if(dtRespone.status == "success"){
				//alertify.success(dtRespone.messenger);
				$("#maps form .success").html(dtRespone.messenger);
				$("#maps form .success").show();
				$(" #maps form .sending").hide();
				$("#maps form")[0].reset();
			}
			else{
				//alertify.error(dtRespone.messenger);
				$("#maps form .error").html(dtRespone.messenger);
				$(" #maps form .sending").hide();
				$("#maps form .error").show();					
			}
			$("#maps form button").prop("disabled", false);
			return false;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
		}
	});
}

function subscribeEmail(){
	var data = $('#f-subscribe').serialize();
	$("#footer form button").attr({"disabled":"disabled"});
	var url = 'subscribe';
	$.ajax({
		url: url,
		data: data,
		type:'POST',
		//dataType:'json',
		success:function(dtRespone){
			//console.log(dtRespone);
			reset();
			if(dtRespone.status == "success"){
				alertify.success(dtRespone.messenger);
				$('#f-subscribe #email').val('');
			}
			else
				alertify.error(dtRespone.messenger);
			$("#footer form button").prop("disabled", false);	
			return false;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
		}
	});
}


//Set slider fullpage
function fullSlider(){	
	var pding = 0;
	if(isMobile.any() && $(window).width() <= 767){
		pding = $('#header .menu-head').height();
	}

	$("#slider").css({'height':$(window).height() - pding});
	$( window ).resize(function() {
		$("#slider").css({'height':$(window).height() - pding});
	});
}

/**
 * ScrollPage function
 * @return {[type]} [description]
 */
function scrollPage(){
	$(window).scroll(function(){
		var windowScroll = $(window).scrollTop();

		//check active item menu
		$("body .row.item").each(function(i){
			var top = $(this).position().top;
			var bottom = $(this).position().top + $(this).outerHeight(true);
			if(top < (windowScroll + 81)){//Default 80. 81:firefox
				var id = $(this).attr('id');
				if($("#header #bs-example-navbar-collapse-1 a.mn-" + id).length){
					$("#header #bs-example-navbar-collapse-1 a.active").removeClass("active");
					$("#header #bs-example-navbar-collapse-1 a.mn-" + id).addClass("active");
				}
			}
		});
		
		//check opacity menu
		if(!isMobile.any()){
			if(windowScroll > 200){
	    		collapseHeader();
	    		if(!$('#header').is(':hover')){
	    			setOpacity('#header', opHeader, 'ease-in-out', 0.3);
	    		}
			}else{
				extendHeader();
				setOpacity('#header', 1, 'ease-in-out', 0.3);
			}
		}

		//Background animation set for the desktop and mobile phone with screen >= 768
		if(!isMobile.any() || (isMobile.any() && $(window).width() >= 768)){
			backgroundAnimation();
		}
	}).scroll();
}

/**
 * Set background animation when scroll page
 * @return {[type]} [description]
 */
function backgroundAnimation(){
	var top = 40;
	var tem = 0;
	var tl =9;
	var windowScrollTop = $(window).scrollTop();
	var windowScrollBottom = windowScrollTop +  $(window).height();
	//console.log(windowScrollTop);
	var aboutPositionTop = $('#about-us').position().top - top;
	var aboutPositionBot= aboutPositionTop + $('#about-us').height();
	var seaPositionTop = $('#sea').position().top - top;
	var seaPositionBot = seaPositionTop +  $('#sea').height();
	// var taxPositionTop = $('#tax').position().top - top;
	// var taxPositionBot = taxPositionTop +  $('#tax').height();
	// var hlPositionTop = $('#home-loan').position().top - top;
	// var hlPositionBot = hlPositionTop + $('#home-loan').height();
	// var fpPositionTop = $('#financial').position().top - top;
	// var fpPositionBot = fpPositionTop + $('#financial').height();

	var aboutP = ((windowScrollTop - aboutPositionTop) / tl) + tem;
	var seaP = ((windowScrollTop - seaPositionTop) / tl) + tem;
	// var taxP = ((windowScrollTop - taxPositionTop) / tl) + tem;
	// var hlP = ((windowScrollTop - hlPositionTop) / tl) + tem;
	// var fpP = ((windowScrollTop - fpPositionTop) / tl) + tem;
	// console.log(windowScrollBottom);
	// console.log($('#about-us').position().top);
	//$('#about-us .over-layout').css('background-position','0% '+parseInt( - windowScrollTop/2)+'px');
	
	if(windowScrollBottom > aboutPositionTop && windowScrollTop < aboutPositionBot){
		$('#about-us .over-layout').css('background-position','0% ' + parseInt( -aboutP)+'px');
			document.querySelector("#about-us .over-layout").style.backgroundPositionX = "center";
			document.querySelector("#about-us .over-layout").style.backgroundPositionY = 50 + parseInt( -aboutP) + '%';
		$('#about-us .over-layout').css('background-position','0% ' + '50%' );
	}
	if(windowScrollBottom > seaPositionTop && windowScrollTop < seaPositionBot){
		//$('#about-us .over-layout').css('background-position','0% ' + parseInt( -aboutP)+'px');
			//document.querySelector("#about-us .over-layout").style.backgroundPositionX = "center";
			
		//$('#about-us .over-layout').css('background-position','0% ' + '50%' );
		// $('#about-us .over-layout').css('background-position','0% ' + '50%' );
	}
	// if(windowScrollBottom > seaPositionTop && windowScrollTop < seaPositionBot){
	// 	//$('#about-us .over-layout').css('background-position','0% ' + parseInt( -aboutP)+'px');
	// 		//document.querySelector("#about-us .over-layout").style.backgroundPositionX = "center";
	// 		document.querySelector("#about-us .over-layout").style.backgroundPositionY = 50 + parseInt( -aboutP) + '%';
	// 	//$('#about-us .over-layout').css('background-position','0% ' + '50%' );
	// }

	// if(windowScrollBottom > taxPositionTop && windowScrollTop < taxPositionBot){
	// 	//$('#tax .over-layout').css('background-position','0% ' + parseInt( -taxP)+'px');
	// 	document.querySelector("#tax .over-layout").style.backgroundPositionY = 50 + parseInt( -taxP) + '%';
	// }

	// if(windowScrollBottom > hlPositionTop && windowScrollTop < hlPositionBot){
	// 	//$('#home-loan .over-layout').css('background-position','0% ' + parseInt( -hlP)+'px');
	// 	document.querySelector("#home-loan .over-layout").style.backgroundPositionY = 20 + parseInt( -hlP) + '%';
	// }

	// if(windowScrollBottom > fpPositionTop && windowScrollTop < fpPositionBot){
	// 	// $('#financial .over-layout').css('background-position','0% ' + parseInt( -fpP)+'px');	
	// 	//document.querySelector("#financial .over-layout").style.backgroundPositionY = 50 + parseInt( -fpP) + '%';
		
	// 	document.querySelector("#financial .over-layout").style.backgroundPositionY = 20 + parseInt( -fpP) + '%';
	// }
	
}


//Check set opacity on over/leaver menu on menu
function evenMouseOverMenu(){
	$('#header').on('mouseover', function(){
		$('#header').css({'opacity':1, 'transition': 'opacity 0.3s ease-in-out'});
	});

	$('#header').on('mouseleave', function(){
		var windowScroll = $(window).scrollTop();
		if(!isMobile.any() && windowScroll > 0){
			$('#header').css({'opacity': opHeader, 'transition': 'opacity 0.3s ease-in-out'});
		}
	});
}


/**
 * Extend header
 * @return {[type]} [description]
 */
function extendHeader(){
	$('#header').css({'height':'80px', 'transition': 'opacity 0.3s ease-in-out'});
	$('#header .bar').css({'display':'block', 'transition': 'opacity 0.3s ease-in-out'});
	$('#header .menu-head').css({'height':'100%', 'transition': 'opacity 0.3s ease-in-out'});
	if($(window).width() >= 768){
		$('.header .logo a').css({'line-height':'80px'});
	}
}

/**
 * Collapse header
 * @return {[type]} [description]
 */
function collapseHeader(){	
	$('#header').css({'height':'80px', 'transition': 'opacity 0.3s ease-in-out'});
	$('#header .bar').css({'display':'none', 'transition': 'opacity 0.3s ease-in-out'});
	$('#header .menu-head').css({'height':'100%', 'transition': 'opacity 0.3s ease-in-out'});
	$('.header .logo a').css({'line-height':'40px'});
}

function setLayoutAbout(){
    $('#about-us .over-layout').css({'height': $('#about-us').height() + 40 + 'px'});
}

function setLayoutFinancial(){
	if(!isMobile.any() && $(window).width() > 992){
		$('#financial').css({'height':'650px'});
	}
	if(isMobile.any() && $(window).width() < 992){
		$('#financial .financial-ly-ico .row.rt').each(function(index){
			var el = $(this).html();
			$('#financial .financial-ly-ico').append(el);
			$(this).remove();
		});

		var height = 0;
		$('#financial .financial-ly-ico .financial-ly-ico-item').each(function(index){

			if(index != 0 && index%2 != 0){
				if($(this).prevAll('.financial-ly-ico-item').height() >= $(this).height()){
					$(this).css({
						'height': height + 'px'
					})
				}else{
					$(this).css({
						'height': $(this).height() + 'px'
					});

					$(this).prevAll('.financial-ly-ico-item').css({
						'height': $(this).height() + 'px'
					});
				}
			}else{
				height = $(this).height();
				$(this).css({
					'height':height + 'px',
				});
			}
		});
	}

    $('#financial .over-layout').css({'height': $('#financial').height() + 40 + 'px'});
}

function setLayoutHomeloan(){
	if(!isMobile.any() && $(window).width() > 992){
		$('#home-loan').css({'height':'650px'});
	}

	if(isMobile.any() && $(window).width() < 992){
		$('#home-loan .home-loan-ly-ico .row.rt').each(function(index){
			var el = $('#home-loan .home-loan-ly-ico .row.rt .ct').html();
			$('#home-loan .home-loan-ly-ico').append(el);
			$(this).remove();
		});

		var height = 0;
		$('#home-loan .home-loan-ly-ico .home-loan-ly-ico-item').each(function(index){
			if(index != 0 && index%2 != 0){
				if($(this).prev().height() >= $(this).height()){
					$(this).css({
						'height': height + 'px'
					})
				}else{
					$(this).css({
						'height': $(this).height() + 'px'
					});

					$(this).prev().css({
						'height': $(this).height() + 'px'
					});
				}
			}else{
				height = $(this).height();
				$(this).css({
					'height':height + 'px',
				});
			}
		});
	}

		
    $('#home-loan .over-layout').css({'height': $('#home-loan').height() + 40 + 'px'});
}
function setLayoutSea(){
	if(!isMobile.any() && $(window).width() > 992){
		$('#sea').css({'height':'650px'});
	}

	if(isMobile.any() && $(window).width() < 992){
		$('#sea .service-ly-ico .row.rt').each(function(index){
			var el = $('#sea .service-ly-ico .row.rt .ct').html();
			$('#sea .home-service-ly-ico').append(el);
			$(this).remove();
		});

		var height = 0;
		$('#sea .service-ly-ico').each(function(index){
			if(index != 0 && index%2 != 0){
				if($(this).prev().height() >= $(this).height()){
					$(this).css({
						'height': height + 'px'
					})
				}else{
					$(this).css({
						'height': $(this).height() + 'px'
					});

					$(this).prev().css({
						'height': $(this).height() + 'px'
					});
				}
			}else{
				height = $(this).height();
				$(this).css({
					'height':height + 'px',
				});
			}
		});
	}

		
    // $('#sea .over-layout').css({'height': $('#sea').height() + 40 + 'px'});
}

function setLayoutTax(){
	if(!isMobile.any() && $(window).width() > 992){
		$('#tax').css({'height':'650px'});
	}

	if(isMobile.any() && $(window).width() < 992){
		var height = 0;
		$('#tax .tax-ly-ico .row.rt').each(function(index){
			$(this).find('.tax-ly-ico-item').each(function(index){
				if(index != 0 && index%2 != 0){
					if($(this).prev().height() >= $(this).height()){
						$(this).css({
							'height': height + 'px'
						})
					}else{
						$(this).css({
							'height': $(this).height() + 'px'
						});

						$(this).prev().css({
							'height': $(this).height() + 'px'
						});
					}
				}else{
					height = $(this).height();
					$(this).css({
						'height':height + 'px',
					});
				}
			});
		});
	}
    //Set
    $('#tax .over-layout').css({'height': $('#tax').height() + 40 + 'px'});

    //Replace src for image layout TAX, because image upload by redactor editor error path image
    $('#tax img').each(function() {
        var srcNew = $(this).attr('src').replace('../', '');
        $(this).attr({
            'src':srcNew,
        });
    });
}