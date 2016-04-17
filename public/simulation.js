function rnd(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
  }

  var counter = 1;
$(document).ready( function (){
  
  setInterval(function(){
    counter++;
    var x = rnd(0,20);
    
    if(x>12){
      oneStepCommon1();
    }else if(x < 9){
      oneStepCommon2();
    }
    else{
      oneStep();
    }
    
  },500);
      
      
      
      
});



  
function oneStep(){
     var init = "/useReport?time="+rnd(10,1000)+"&mtravel="+rnd(10,400)+"&mtravetime="+rnd(10,2000)+"&cpm="+rnd(1,10)+"&wpm="+rnd(1,10);
      $.get(init,function(data, status){
           
		pageConfig = {cstyle: (Math.random() > 0.5), extraTypes:(Math.random() > 0.5), layout:(Math.random() > 0.5)};
		
	$.get("/getConfig", function (data,status){
		if(data != false){
		console.log(data);  
		pageConfig = data;	      	      
	      }
	    
		    $.ajax({
		      method: "GET",
		      url: "/finalReport",
		      data: { selectedConfig:pageConfig, userReaction: {clicks: rnd(1,4), scroll: rnd(1,5), time: rnd(10,600)} }
		  })
		  .done(function( msg ) {
		    
		  });
	});
      });
}      
      
      
function oneStepCommon1(){
      var initobj = {time: rnd(950,1000), mtravel: rnd(350,400),mtravetime:rnd(1900,2000) ,cpm:rnd(8,10) ,wpm:rnd(9,10)};
      var init ="/useReport?time="+initobj.time+"&mtravel="+initobj.mtravel+"&mtravetime="+initobj.mtravetime+"&cpm="+initobj.cpm+"&wpm="+initobj.wpm;
      $.get(init,   function(data, status){
           
		pageConfig = {cstyle: (Math.random() < 0.5), extraTypes:(Math.random() < 0.5), layout: (Math.random() < 0.5)};
		
	$.get("/getConfig", function (data,status){
		if(data != false){
		console.log(data);  
		pageConfig = data;	      	      
	      }
	    
		    $.ajax({
		      method: "GET",
		      url: "/finalReport",
		      data: { selectedConfig:pageConfig, userReaction: {clicks: 7, scroll: rnd(4,8), time: rnd(590,800)} }
		  })
		  .done(function( msg ) {
		    console.log(counter+"---"+ "1>>>>>>>>>>>" + init +" >>>>> "+ pageConfig );
		    
		    if(data == false){
		     $('#myTable tbody').append('<tr class="child"><td>'+counter+'</td><td>'+JSON.stringify(initobj)+'</td><td>'+JSON.stringify(pageConfig)+'</td></tr>');
		    }else{
		      $('#myTable tbody').append('<tr class="child"><td>*'+counter+'</td><td>'+JSON.stringify(initobj)+'</td><td>'+JSON.stringify(pageConfig)+'</td></tr>');
		    }
		  });
	});
      });
}
      
      
      
function oneStepCommon2(){
     var initobj = {time: rnd(10,11), mtravel: rnd(10,11),mtravetime:rnd(40,42) ,cpm:rnd(1,2) ,wpm:rnd(1,2)};
     var init ="/useReport?time="+initobj.time+"&mtravel="+initobj.mtravel+"&mtravetime="+initobj.mtravetime+"&cpm="+initobj.cpm+"&wpm="+initobj.wpm;
      $.get(init, function(data, status){
           
		pageConfig = {cstyle: (Math.random() > 0.5), extraTypes:(Math.random() < 0.5), layout: (Math.random() < 0.5)};
		
	$.get("/getConfig", function (data,status){
		if(data != false){
		console.log(data);  
		pageConfig = data;	      	      
	      }
	    
		    $.ajax({
		      method: "GET",
		      url: "/finalReport",
		      data: { selectedConfig:pageConfig, userReaction: {clicks: 10, scroll: 9, time: rnd(500,600)} }
		  })
		  .done(function( msg ) {
		    
		    if(data == false){
		     $('#myTable tbody').append('<tr class="child"><td>'+counter+'</td><td>'+JSON.stringify(initobj)+'</td><td>'+JSON.stringify(pageConfig)+'</td></tr>');
		    }else{
		      $('#myTable tbody').append('<tr class="child"><td>*'+counter+'</td><td>'+JSON.stringify(initobj)+'</td><td>'+JSON.stringify(pageConfig)+'</td></tr>');
		    }
		  });
	});
      });
}