pageConfig = {cstyle: (Math.random() > 0.5), extraTypes:(Math.random() > 0.5), layout: (Math.random() > 0.5)};
var clicks = 0
var startTime = new Date();
var scrolls =0;

function getConfigs() 
{
  $.get("/getConfig", function (data,status){
    if(data != false){
      console.log(data);  
      pageConfig = data;
      //data = {cstyle: (Math.random() > 0.5), extraTypes:(Math.random() > 0.5), layout: (Math.random() > 0.5)};
       //data = {cstyle: 0, extraTypes:1, layout: 0};
      
    }
    
    // req.query> selectedConfig:{cstyle:0, extraTypes:1, layout: 0};
    
    if(pageConfig.cstyle == 1 ){
     $(".navbar-custom").removeClass("navbar-custom").addClass("navbar-nav");
    }else{
      $("nav .navbar-nav").removeClass("navbar-nav").addClass("navbar-custom");
     // $("head").append("<link rel='stylesheet' id='extracss' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' type='text/css' />");
    }
    
    
    if(pageConfig.extraTypes == 1 ){
      $("#people").hide();
      $("#example").hide();
    
    }
    
    if(pageConfig.layout == 1 ){
        $("#page1").hide();
	$("#page2").show();
    }else{
        $("#page2").hide();
	$("#page1").show();
    }
    
    
    
    
  });
}

getConfigs();

window.onclick = function() {clicks++;}
window.onscroll = function() {scrolls++;}

window.onbeforeunload = function(event) {
     
     $.ajax({
	      method: "GET",
	      url: "/finalReport",
	      data: { selectedConfig:pageConfig, userReaction: {clicks: clicks, scroll: scrolls, time: (new Date()) - startTime} }
	  })
	  .done(function( msg ) {
	    alert( "Data Saved: " + msg );
	  });
    return null;
};