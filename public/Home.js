// home


//$.get('http://www.google.com?q=test',function (data,stat){
//  console.log(data);
//});

 var mrefreshinterval = 500; // update display every 500ms
 var startLoading = new Date();
 
 ///////////////// Mouse Travel
 var lastmousex=-1; 
 var lastmousey=-1;
 var mousestarttime = new Date();
 
 
 var mousetravel = 0;
 $('html').mousemove(function(e) {
     var mousex = e.pageX;
     var mousey = e.pageY;
     if (lastmousex > -1)
     {
         var step = Math.max( Math.abs(mousex-lastmousex), Math.abs(mousey-lastmousey) );
	 mousetravel += step;
     }else{
       mousestarttime = new Date(); 
    }
     
     lastmousex = mousex;
     lastmousey = mousey;
 });
 
 
 //////////////////////////  Type Speed
 
 var iTime = 0;
 var iTotal = 0;
 var iKeys = 0;
 var iWords = 0;
	    
  $(function() {
                $('#searchTxt')
                    .keyup(checkSpeed);
            });

            var iLastTime = 0;
           

            function checkSpeed() {
                iTime = new Date().getTime();

                if (iLastTime != 0) {
                    iKeys++;
                    iTotal += iTime - iLastTime;
                    iWords = $('#searchTxt').val().split(/\s/).length;
                    //$('#CPM').html();
                    //$('#WPM').html();
                }

                iLastTime = iTime;
            }

 
 ///////////////////////////   ready func
 
 var loadingTime = 0;
$(document).ready(function(){
   
      var nowTime = new Date();
      loadingTime = nowTime - startLoading;
	console.log(nowTime);
	console.log(mousestarttime);
	console.log(nowTime - mousestarttime);
      
});




//////////////////////// Search

function search(){
  var cpm = Math.round(iKeys / iTotal * 6000, 2);
  var wpm = Math.round(iWords / iTotal * 6000, 2);
  $.get("/useReport?time="+loadingTime+"&mtravel="+mousetravel+"&mtravetime="+((new Date()) - mousestarttime)+"&cpm="+cpm+"&wpm="+wpm,
	function(data, status){
           window.location.href = "/Second_1.html"; 
	});
}
