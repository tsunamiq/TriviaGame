$(document).ready(function(){


//==========================================
//                Variable Declarations
//==========================================
var questions = [
   q0 = {
    question:"What's Spider Man's human name?",
    answers: ["Peter Parker", "name1","name2", "name3"],
    correctAnswer: "Peter Parker"
  },
   q1 = {
    question:"What's Wolverine real name?",
    answers: ["James Howlett", "name1","name2", "name3"],
    correctAnswer: "James Howlett"
  }
]

var qCount = 0;
var qCountMax = 2;
var timeNum;
var correct = 0; 
var incorrect = 0; 

console.log(questions[0].question);





//==========================================
//                Start Game
//==========================================

$(".startGame").on("click",function(){
  questionStart();
  

});

//==========================================
//                Display Questions      
//==========================================

function questionStart(){
  $(".content").text("");

  //Start Timer
  timeNum = 15;
  timer();

  // Qcount eval
  if(qCount==qCountMax){
    //reset
    clearInterval(timeId);
    results();
    return;
  }

  var qPanel = $("<div>").addClass("panel panel-default qPanel").appendTo(".content");

  //Question Input
  var qPanelHeading = $("<div>").addClass("panel-heading qHeading").appendTo(".qPanel"); 

  //Question List
  var qPanelBody = $("<div>").addClass("panel-body qBody").appendTo(".qPanel");

  $(qPanelHeading).text(questions[qCount].question );
  var qOrderList = $("<ol>").appendTo(qPanelBody);

  for(var i =0 ; i<4 ; i++){
    //list of answers 
    var qList = $("<li>").attr("id",i).text((i+1) + ". " + questions[qCount].answers[i]).appendTo(qOrderList);
  }
}




//==========================================
//                Timer and Display      
//==========================================

function timer(){
  
  // Creating DIVs/ Panels
  var timerPanel = $("<div>").addClass("panel panel-default").appendTo(".timer");
  var timerHeading = $("<div>").addClass("panel-heading").text("Timer").appendTo(timerPanel); 

  //Question List
  var timerBody = $("<div>").addClass("panel-body").appendTo(timerPanel);

  // Timing Algorithms and display
  $(timerBody).text("00:05");
  timeId = setInterval(function(){ 
    timeNum-- ;
    if(timeNum>9){
      $(timerBody).text("00:"+timeNum);
       
    }else if(timeNum==0){
      timeEval(); 
      clearInterval(timeId);
    }else if(timeNum<10){
      $(timerBody).text("00:"+"0"+timeNum);
    }
     
    console.log(timeNum);
  },1000);
};


//==========================================
//              Time  Evaluation     
//==========================================

function timeEval(){

    // Time is equal to 0 display message display new questions
    if(timeNum == 0){
      $(".timer").text("");
      $(".content").text("");
      $("<h1>").text("You're Out of Time!").appendTo(".content");
      $("<h2>").text("The correct answer was: "+ questions[qCount].correctAnswer).appendTo(".content");
      timeNum = 15;
      qCount++;

      // qCount counts questions. Out of questions = game over
      if(qCount==qCountMax){
        setTimeout(function(){
          $(".timer").text("");
          $(".content").text("");
          $("<h1>").text("GameOver!").appendTo(".content");
          return;
          }, 3000);
      }else{
        setTimeout(function(){questionStart()},3000);
      };
    }
}


//==========================================
//                Click Events   
//==========================================

  // Click Events
  $(document).on("click","#0",function(){
    clearInterval(timeId);
    console.log(questions[qCount].answers[0]);
    clickEval(questions[qCount].answers[0]);
    
  });
  $(document).on("click","#1",function(){
    clearInterval(timeId);
    console.log(questions[qCount].answers[1]);
    clickEval(questions[qCount].answers[1]);
    
  });
  $(document).on("click","#2",function(){
    clearInterval(timeId);
    console.log(questions[qCount].answers[2]);
    clickEval(questions[qCount].answers[2]);

  });
  $(document).on("click","#3",function(){
    clearInterval(timeId);
    console.log(questions[qCount].answers[3]);
    clickEval(questions[qCount].answers[3]);
   
  });



//==========================================
//   Click - Evaluate Correct/Incorrect Guess
//==========================================

function clickEval(clickevt){
  if(clickevt == questions[qCount].correctAnswer){
    $(".timer").text("");
    $(".content").text("");
    $("<h1>").text("Correct Answer!").appendTo(".content");
    
    console.log("current qCount: " + qCount);
      setTimeout(function(){questionStart()},3000);
      qCount++;
      correct++; 
      
  }else{
    $(".timer").text("");
    $(".content").text("");
    $("<h1>").text("Wrong Choice!!").appendTo(".content");
    $("<h2>").text("The correct answer was: "+ questions[qCount].correctAnswer).appendTo(".content");
    
    console.log("current qCount: " + qCount);
    setTimeout(function(){questionStart()},3000);
    qCount++;
    incorrect++;

  }
}



//==========================================
//                Results     
//==========================================

function results(){
  $(".timer").text("");
  $(".content").text("");
  $("<h1>").text("Score:").appendTo(".content");
  $("<h2>").text("Number of Correct Answers: "+ correct).appendTo(".content");
  $("<h2>").text("Number of Incorrect Answers: "+ incorrect).appendTo(".content");
  $("<h2>").addClass("reset").text("Reset?").appendTo(".content");

}

//==========================================
//                Reset     
//==========================================

$(document).on("click",".reset",function(){
  qCount = 0;
  qCountMax = 2;
  timeNum;
  correct = 0; 
  incorrect = 0;
  questionStart();

});




});