var express = require('express');
var Mind = require('node-mind');
var app = express();

var learningCount = 0;
var learningMax = 50;

var sessionList = {};

app.use(express.static('public'));


// /useReport?time=105&mtravel=333&mtravetime=4582&cpm=25&wpm=8
/*
 * 
 { time: '453',
  mtravel: '1657',
  mtravetime: '18239',
  cpm: '2',
  wpm: '1' }
 */
app.get('/useReport', function(req, res) {
  
   console.log('/useReport '+JSON.stringify(req.query));
  
  if (!(sessionList[req.sessionID]))
  {
    sessionList[req.sessionID] = {};
  }
  if(learningCount < learningMax)
  {
    learningCount++;
    saveToLearn(req,res);
  }else{
    res.send(true);
  }
   
  res.send('OK');
});

function saveToLearn(req,res){
   var rep = req.query ;
   rep.time = Math.min(40, rep.time / 100);
   rep.mtravel = Math.min(50, rep.mtravel / 100);
   rep.mtravetime = Math.min(250, rep.mtravetime / 100);
    sessionList[req.sessionID].initialReport = rep;
    console.log(">>"+JSON.stringify(sessionList[req.sessionID]));
}


app.get('/getConfig',function(req,res){
  
  
  
  if(learningCount < learningMax)
  {
   res.send(false);
  }else{
    
    var initRep = sessionList[req.sessionID].initialReport;
    
    
    // find best page config
    var ii=0, jj=0, kk=0, max;
    for(i=0; i<=1; i++){
     for(j=0; j<=1; j++){
       for(k=0; k<=1; k++){
	 var inputArr = [initRep.time, initRep.mtravel, initRep.mtravetime, initRep.cpm, initRep.wpm, i, j, k];
	 val = mind.predict(inputArr);	  
	 var temp = val[0]+val[1]+val[2];
	  if (temp > max)
	  {
	    max = temp;
	    ii = i; jj = j; kk=k;
	  }
      }      
     } 
    }
  
    var best = {cstyle:ii, extraTypes:jj, layout: kk};
    console.log('we solve: /useReport response'+JSON.stringify(best));
    
    res.send()
  }
});


// req.query> selectedConfig:{cstyle:0, extraTypes:1, layout: 0};
// > userReaction: {clicks: 3, scroll: 0, time: 13};
app.get('/finalReport',function(req,res){
 
  console.log('/finalReport '+JSON.stringify(req.query));
    
  if(sessionList[req.sessionID]){
    learnMind(req.query.selectedConfig, req.query.userReaction, sessionList[req.sessionID].initialReport);
    console.log('/finalReport we learn');
  }
 
  res.send(null);
});

function learnMind(sconfig, reaction, initRep){
  reaction.clicks = Math.min(100,reaction.clicks);
  reaction.scroll = Math.min(100,reaction.scroll);
  reaction.time = Math.min(200,reaction.time / 1000 );
  
  var inputArr = [initRep.time, initRep.mtravel, initRep.mtravetime, initRep.cpm, initRep.wpm, sconfig.cstyle, sconfig.extraTypes, sconfig.layout];
  var outputArr = [reaction.clicks, reaction.scroll, reaction.time];
  mind.learn([{input: inputArr, output: outputArr}]);
}

app.get('/', function(req, res) {
  res.sendFile("Home.html",{root: './public'});
});


app.listen(8080, function () {
  console.log('Cognitive Website listening on port 8080');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


var mind = Mind();