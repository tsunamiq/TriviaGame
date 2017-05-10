$(document).ready(function(){


//==========================================
//                Variable Declarations
//==========================================

var questions = [
  {
    question:"What's Spider Man's human name?",
    answers: ["Peter Parker", "Carol Jason","Werner Bator", "Lamar Willer"],
    correctAnswer: "Peter Parker"
  },
  {
    question:"What is material of Wolverine's Bones?",
    answers: ["Titanium", "Adamantium","Molten Cobalt", "Tantalum"],
    correctAnswer: "Adamantium"
  },
  {
    question:"Who consumes Jean Grey near the end of her life and becomes her final form?",
    answers: ["Rouge", "Carnegie","Storm", "Phoenix"],
    correctAnswer: "Phoenix"
  },
  {
    question:"What is the name of iron man's side kick?",
    answers: ["Sentinel", "Baymax","War Machine", "Destroyer"],
    correctAnswer: "War Machine"
  },
  {
    question:"Which of the following character is nick named the 'Merc with a Mouth'",
    answers: ["Loki", "Dead Pool","Star Lord", "Groot"],
    correctAnswer: "Dead Pool"
  }
]

var qCount = 0;
var qCountMax = questions.length;
var timeNum;
var correct = 0; 
var incorrect = 0; 

console.log(questions[0].question);
console.log("array length: " +questions.length);





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
  timeNum = 5;
  timer();

  // Qcount eval
  console.log("array length: " +questions.length);
  console.log("qCount: " +qCount);
  if(qCount===qCountMax){
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
      incorrect++;
      setTimeout(function(){questionStart()},3000);
    
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
    
    var img = $("<img>");
    var i;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+encodeURIComponent(questions[qCount].correctAnswer)+"&api_key=dc6zaTOxFJmzC";
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(giphy) {
        console.log(giphy);
        console.log("qCount: " + qCount);
        if(qCount === 1 || qCount === 5 ){
          i = giphy.data[1].images["fixed_height"].url;
        }else{
          i = giphy.data[0].images["fixed_height"].url;
        }
          if(i.indexOf("http") == 0)
            img.attr("src",i);
          
    });
    img.appendTo(".content");

    console.log("current qCount: " + qCount);
    setTimeout(function(){questionStart()},4000);
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
//                Reset     in object
//==========================================

$(document).on("click",".reset",function(){
  qCount = 0;
  correct = 0; 
  incorrect = 0;
  questionStart();

});

//==========================================
//                Ajax     
//==========================================











});